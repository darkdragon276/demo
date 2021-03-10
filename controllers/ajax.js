// console.log(axios);

// // var objectAjax = {
// //     url: "../assets/data/SinhViens.json",
// //     method: "GET",
// //     responseType: "json",
// // }

// var objectAjax = {
//     url: "../assets/data/SinhViens.xml",
//     method: "GET",
//     responseType: "document",
// }

// var promise = axios(objectAjax);

// promise.then(function(result) {
//     console.log(result.data);
//     let sinhVien1 = result.data.querySelector('SinhVien').innerHTML;
//     console.log(sinhVien1);
// })

// promise.catch(function(err) {
//     console.log(err);
// })
let validate = new Validate;

document.querySelector("#btnXacNhan").onclick = function (event) {
    let nhanVien1 = new NhanVien;
    nhanVien1.maNhanVien = validate.isNumber("#maNhanVien", "ma nhan vien");
    nhanVien1.tenNhanVien = validate.isEmail("#tenNhanVien", "ten nhan vien");
    nhanVien1.soGioLamTrongThang = (validate.inRange("#soGioLam", 50, 200, "so gio lam ngoai range"));
    nhanVien1.luongCoBan = parseFloat(validate.inRange("#luongCoBan", 1000, 2000, "luong co ban ngoai range"));
    let ChucVu = document.getElementById("chucVu");
    nhanVien1.tenChucVu = ChucVu.options[ChucVu.selectedIndex].innerHTML;
    nhanVien1.heSoChucVu = parseFloat(ChucVu.value);

    document.getElementById("txtMaNhanVien").innerHTML = nhanVien1.maNhanVien;
    document.getElementById("txtTenNhanVien").innerHTML = nhanVien1.tenNhanVien;
    document.getElementById("txtChucVu").innerHTML = nhanVien1.tenChucVu;
    document.getElementById("txtTongLuong").innerHTML = nhanVien1.tinhLuong();
    document.getElementById("txtXepLoai").innerHTML = nhanVien1.xepLoai();

    addNhanVien(nhanVien1);
}

document.querySelector("#btnCapNhat").onclick = function (event) {
    let nhanVien1 = new NhanVien;
    nhanVien1.maNhanVien = validate.isNumber("#maNhanVien", "ma nhan vien");
    nhanVien1.tenNhanVien = validate.isEmail("#tenNhanVien", "ten nhan vien");
    nhanVien1.soGioLamTrongThang = (validate.inRange("#soGioLam", 50, 200, "so gio lam ngoai range"));
    nhanVien1.luongCoBan = parseFloat(validate.inRange("#luongCoBan", 1000, 2000, "luong co ban ngoai range"));
    let ChucVu = document.getElementById("chucVu");
    nhanVien1.tenChucVu = ChucVu.options[ChucVu.selectedIndex].innerHTML;
    nhanVien1.heSoChucVu = parseFloat(ChucVu.value);

    putNhanVien(nhanVien1);
}

var addRow = function (NhanVien) {
    // 2nd way
    let content = `
    <tr>
    <td>${NhanVien.maNhanVien}</td>
    <td>${NhanVien.tenNhanVien}</td>
    <td>${NhanVien.tenChucVu}</td>
    <td>${NhanVien.heSoChucVu}</td>
    <td>${NhanVien.luongCoBan}</td>
    <td>${NhanVien.tinhLuong()}</td>
    <td>${NhanVien.soGioLamTrongThang}</td>
    <td>${NhanVien.xepLoai()}</td>
    <td><button class="btn btn-danger" onclick="deleteNhanVien('${NhanVien.maNhanVien}')">Xoa</button></td>
    <td><button class="btn btn-danger" onclick="getNhanVien('${NhanVien.maNhanVien}')">Chinh sua</button></td>
    </tr>
    `;
    return content;
}

var showTable = function (arrays) {
    let content = document.getElementById("tblNhanVien");
    console.log(content);
    content.innerHTML = null;
    arrays.forEach(element => {
        let nhanVien = new NhanVien();
        Object.assign(nhanVien, element);
        content.innerHTML += addRow(nhanVien);
    });
}

var getNhanViens = function () {
    let promise = axios({
        url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
        method: "GET",
        reponseType: "json",
    })

    promise.then(function (result) {
        console.log(result);
        showTable(result.data);
    });

    promise.catch(function (error) {
        console.log(error);
    });
}

var reloadForm = function (nhanVien) {
    // console.log(nhanVien);
    document.getElementById('maNhanVien').value = nhanVien.maNhanVien;
    document.getElementById('tenNhanVien').value = nhanVien.tenNhanVien;
    document.getElementById('chucVu').selectedIndex = nhanVien.heSoChucVu - 1;
    document.getElementById('luongCoBan').value = nhanVien.luongCoBan;
    document.getElementById('soGioLam').value = nhanVien.soGioLamTrongThang;
}

var getNhanVien = function (maNhanVien) {
    let promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: "GET",
    })

    promise.then(function (result) {
        console.log(result);
        let nhanVien = Object.assign(new NhanVien(), result.data);
        console.log(nhanVien);
        reloadForm(nhanVien);
        // showTable(result.data);
    });

    promise.catch(function (error) {
        console.log(error);
    });
}

var addNhanVien = function (nhanVien) {
    let promise = axios({
        url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
        method: "POST",
        data: nhanVien,
        reponseType: "json",
    })

    promise.then(function (result) {
        console.log(result.data);
        // showTable(result.data);
        getNhanViens();
    });

    promise.catch(function (error) {
        console.log(error);
    });
}

var deleteNhanVien = function (maNhanVien) {
    let promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: "DELETE",
    })

    promise.then(function (result) {
        console.log(result.data);
        // showTable(result.data);
        getNhanViens();
    });

    promise.catch(function (error) {
        console.log(error);
    });
}

getNhanViens();