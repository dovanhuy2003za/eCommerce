const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { get } = require("lodash");
const { getInfoData } = require("../utils");

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
};

class AccessService {
    async signup(data) {
        const { name, email, password } = data;
        try {
            // Step 1: Kiểm tra email đã tồn tại chưa
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: 400,
                    message: 'Shop already registered',
                };
            }

            // Step 2: Hash mật khẩu
            const passwordHash = await bcrypt.hash(password, 10);

            // Step 3: Tạo shop mới
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            });

            if (!newShop) {
                return {
                    code: 500,
                    message: "Failed to create shop",
                };
            }

            // Step 4: Tạo cặp khóa RSA
            const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
            });

            // Chuyển đổi khóa thành chuỗi PEM
            const privateKeyString = privateKey.export({ type: 'pkcs8', format: 'pem' });
            const publicKeyString = publicKey.export({ type: 'spki', format: 'pem' });

            // Lưu public key vào database
            const savedKey = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey: publicKeyString
            });

            if (!savedKey) {
                return {
                    code: 500,
                    message: 'Error saving public key',
                };
            }

            // Step 5: Tạo JWT token
            const tokens = await createTokenPair(
                { userId: newShop._id, email },
                publicKeyString,
                privateKeyString
            );

            console.log(`Token creation successful:`, tokens);

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({fileds: ['_id', 'name', 'email'], object: newShop}),
                    tokens
                }
            };

        } catch (error) {
            console.error("Signup Error:", error);
            return {
                code: 500,
                message: error.message,
                status: 'error'
            };
        }
    }
}

module.exports = new AccessService();
