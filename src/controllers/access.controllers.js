const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);

            // Kiểm tra nếu dữ liệu đầu vào bị thiếu
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Gọi service để xử lý đăng ký
            const result = await AccessService.signup(req.body);

            return res.status(201).json(result);
        } catch (error) {
            console.error(`[E]::signUp::`, error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

module.exports = new AccessController();