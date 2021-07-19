
var userService = new userService();
function getEle(id) {
    return document.getElementById(id);
}

var listUsers = function (){
    userService.layDS().then(function(result) {
        renderTable(result.data);
        setLocaleStorage(result.data);
    }).catch(function(error) {
        console.log(error);
    })
}
listUsers();
function themNguoiDung(){
    var taiKhoan = getEle('TaiKhoan').value;
        var hoTen = getEle('HoTen').value;
        var matKhau = getEle('MatKhau').value;
        var email = getEle('Email').value;
        var hinhAnh = getEle('HinhAnh').value;
        var loaiND = getEle('loaiNguoiDung').value;
        var ngonNgu = getEle('loaiNgonNgu').value;
        var moTa =getEle('MoTa').value;

        var user = new User(taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh);
    userService.addUser(user).then(function(result){
        listUsers();
    }).catch(function (error) {
        console.log(error);
    })
}


getEle('btnThemNguoiDung').addEventListener('click', function(){
    getEle('formTT').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class =" btn btn-success" onclick="themNguoiDung()"> Thêm người dùng</button>`
})

function xoaUser(id){
    userService.xoaUser(id).then(function(){
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
                    <button class="btn btn-danger" onclick={xoaUser('${user.id}')>Xoá</button>
                    <button class="btn btn-success" onclick="xemSanPham('${sp.id}')>Xem</button>
                </td>

            </tr>
        `
    })
    getEle('tblDanhSachNguoiDung').innerHTML = content;

}
function setLocaleStorage(list) {
    localStorage.setItem('LIST',JSON.stringify(list));
}
function getLocaleStorage(){
    if(localStorage.getItem('LIST')){
        return JSON.parse(localStorage.getItem('LIST'))
    }
}
