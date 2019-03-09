const Messsages = require('./messages');
class Errors {
    constructor() {
        this.OK = new Messsages(0, "OK");
        this.PARAMS = new Messsages(1, "Vui lòng truyền đủ prameters");
        this.EXIST = new Messsages(2, "Đã tồn tại");
        this.NOT_EXIST = new Messsages(3, "Không tồn tại");

        this.UNKNOWN = new Messsages(9999, "Lỗi hệ thống vui lòng liên hệ +8435 260 8118");
    }
}

module.exports = Errors;