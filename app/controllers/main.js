var valid = new Validator();
var userService = new userService();

function getEle(id) {
    return document.getElementById(id);
}

var listUsers = function () {
    userService.layDS().then(function (result) {

        renderTable(result.data);
        setLocaleStorage(result.data);
    }).catch(function (error) {
        console.log(error);
    })
}
listUsers();
function xemUser(id) {
    userService.xemUser(id).then(function (result) {
        getEle('btnThemNguoiDung').click();

        var user = result.data;
        //gan lai data
        getEle('TaiKhoan').value = user.taiKhoan;
        getEle('HoTen').value = user.hoTen;
        getEle('MatKhau').value = user.matKhau;
        getEle('Email').value = user.email;
        getEle('HinhAnh').value = user.hinhAnh;
        getEle('loaiNguoiDung').value = user.loaiND;
        getEle('loaiNgonNgu').value = user.ngonNgu;
        getEle('MoTa').value = user.moTa;

        var modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = `<button class =" btn btn-success" onclick="capNhatUser('${user.id}')"> Cập nhật</button>`

    }).catch(function (error) {
        console.log(error);
    })
}
function capNhatUser(id) {
    userService.capNhatUser(id, thongTin()).then(function () {
        listUsers();
        document.querySelector('.modal-content .close').click();
    }).catch(function (error) {
        console.log(error);
    })
}

var thongTin = function () {
    // var id = getEle('index').innerHTML;
    // console.log(id);
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    console.log(ngonNgu)
    var moTa = getEle('MoTa').value;

    var user = new User(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    var isValid = true;
    console.log(isValid);
    isValid &= valid.kiemTraRong(taiKhoan, 'tbTK', 'Tài khoản không được để trống')
    // &&  valid.kiemTraTK(id,taiKhoan,'tbTK','tài khoản đã tồn tại');   
    isValid &= valid.kiemTraRong(hoTen, 'tbTen', 'Tên không được để trống')
        && valid.kiemTraTen(hoTen, 'tbTen', 'Vui lòng nhập chữ');
    isValid &= valid.kiemTraRong(matKhau, 'tbMatKhau', 'Mật khẩu không được để trống')
        && valid.kiemTraMatKhau(matKhau, 'tbMatKhau', 'Vui lòng nhập 6-8 ký tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt');
    isValid &= valid.kiemTraRong(email, 'tbEmail', 'Email không được để trống')
        && valid.kiemTraEmail(email, 'tbEmail', 'Vui lòng nhập đúng định dạng');
    isValid &= valid.kiemTraRong(hinhAnh, 'tbHinhAnh', 'Hình ảnh không được để trống')
    isValid &= valid.kiemTraND(loaiND, 'tbND', 'Vui lòng  chọn loại người dùng hợp lệ');
    isValid &= valid.kiemTraNN(ngonNgu, 'tbNgonNgu', 'Vui lòng  chọn loại ngôn ngữ');
    isValid &= valid.kiemTraRong(moTa, 'tbMoTa', 'Mô tả không được để trống')
        && valid.kiemTraMoTa(moTa, 'tbMoTa', 'Vui lòng nhập không vượt quá 60 ký tự');
    if (!isValid)
        return;
    return user;


}



var themNguoiDung = function () {
    if (thongTin() != undefined) {
        userService.addUser(thongTin()).then(function () {
            getEle('formTT').reset();
            alert('Thêm thành công')
            listUsers();
        }).catch(function (error) {
            console.log(error);
        })
    }

}


getEle('btnThemNguoiDung').addEventListener('click', function () {
    getEle('formTT').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class =" btn btn-success" onclick="themNguoiDung()"> Thêm người dùng</button>`
})

function xoaUser(id) {
    userService.xoaUser(id).then(function () {
        listUsers();
    }).catch(function (error) {
        console.log(error);
    })
}

var renderTable = function (arrayUser) {
    var content = '';
    arrayUser.map(function (user, index) {
        content += `
            <tr>
                <td id="index">${index + 1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaUser('${user.id}')">Xoá</button>
                    <button class="btn btn-success" onclick="xemUser('${user.id}')" >Xem</button>
                </td>

            </tr>
        `
    })
    getEle('tblDanhSachNguoiDung').innerHTML = content;

}
function setLocaleStorage(list) {
    localStorage.setItem('LIST', JSON.stringify(list));
}
function getLocaleStorage() {
    if (localStorage.getItem('LIST')) {
        return JSON.parse(localStorage.getItem('LIST'))
    }
}
