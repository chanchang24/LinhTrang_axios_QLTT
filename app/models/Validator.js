function Validator() {
    this.kiemTraRong = function (value, spanID, mess) {
        if (!value) {
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = mess;
            return false;
        }
        getEle(spanID).style.display = "none";
        return true;
    }
}
Validator.prototype.kiemTraTK = function (id, value, spanID, mess) {

    userService.xemUser(id).then(function (result) {
        if (result.data.taiKhoan === value) {
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = mess;
            return false;
        }
        getEle(spanID).style.display = "none";
        return true;
    })
}
Validator.prototype.kiemTraTen = function (value, spanID, mess) {
    var regex = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
    if (!regex.test(value)) {
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    return true;
}
Validator.prototype.kiemTraMatKhau = function (value, spanID, mess) {
    var regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[~!@#$%^&*\.]).{6,8}$/;
    if (!regex.test(value)) {
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    return true;
}
Validator.prototype.kiemTraEmail = function (value, spanID, mess) {
    var regex = /^(\w(\.?\w)*)+@(\w(\.?\w)*)+\.[a-z]{2,10}$/;
    if (!regex.test(value)) {
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    return true;
}
Validator.prototype.kiemTraND = function (value, spanID, mess) {
    if (value === "GV" || value === "HV") {
        getEle(spanID).style.display = "none";
        return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
}
Validator.prototype.kiemTraNN = function (value, spanID, mess) {
    if (value === "Ngôn Ngữ") {
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    getEle(spanID).style.display = "none";
    return true;
}
Validator.prototype.kiemTraMoTa = function (value, spanID, mess) {
    var regex = /^([a-zA-Z].*){0,60}$/;
    if (!regex.test(value)) {
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    return true;
}