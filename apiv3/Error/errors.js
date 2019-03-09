const Messsages = require('./messages');
class Errors {
    constructor() {
        this.OK             = new Messsages(0,      "OK",               "OK");
        this.PARAMS         = new Messsages(1,      "PARAMS",           "Vui lòng truyền đủ prameters");
        this.EXIST          = new Messsages(2,      "EXIST",            "Đã tồn tại");
        this.NOT_EXIST      = new Messsages(3,      "NOT_EXIST",        "Không tồn tại");
        this.SIGNIN_INVALID = new Messsages(4,      "SIGNIN_INVALID",   "Đăng nhập không thành công");
        this.SESSION_EXPIRE = new Messsages(5,      "SESSION_EXPIRE",   "Phiên làm việc đã hết, vui lòng đăng nhập lại");

        this.UNKNOWN        = new Messsages(9999,   "UNKNOWN",          "Lỗi hệ thống vui lòng liên hệ +8435 260 8118");
    }
}

module.exports = Errors;