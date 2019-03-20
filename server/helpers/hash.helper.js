import bcrypt from "bcryptjs";

class HashHelper {
     static hashPassword = (password, salt = 10) => bcrypt.hashSync(password, parseInt(salt, 10));
    static comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
}

export default HashHelper;
