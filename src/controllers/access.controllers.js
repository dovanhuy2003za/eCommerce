const AccessService = require("../services/access.service");
const { CREATED } = require("../core/success.response");

class AccessController {
    signUp = async (req, res, next) => {
      
            console.log(`[P]::signUp::`, req.body);

            // Kiểm tra nếu dữ liệu đầu vào bị thiếu
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Gọi service để xử lý đăng ký
            new CREATED({
                message: "Đăng ký thành công",
                metadata: await AccessService.signup(req.body),
                options:{
                    limit:10,
                }
            }).send(res);
    };
}

module.exports = new AccessController();