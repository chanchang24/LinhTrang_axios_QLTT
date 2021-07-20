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
function capNhatUser(id){
    userService.capNhatUser(id,thongTin()).then(function (){
        listUsers();
        document.querySelector('.modal-content .close').click();
    }).catch(function (error) {
        console.log(error);
    })
}

var thongTin = function(){
    
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var ngonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;

    var user = new User(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    var isValid = true;
    isValid &= valid.kiemTraRong(taiKhoan,'tbTaiKhoan','Tài khoản không được để trống')
    
    if(!isValid) return;
    return user;

}

    
 
var themNguoiDung = function() {
    
    userService.addUser(thongTin()).then(function () {
        getEle('formTT').reset();
        listUsers();
    }).catch(function (error) {
        console.log(error);
    })
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
                <td>${index + 1}</td>
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
