let nhanViens = new Array();
let validate = new Validate;

document.querySelector("#btnXacNhan").onclick = function (event) {
    let nhanVien1 = new NhanVien;
    nhanVien1.maNhanVien = validate.isNumber("#maNhanVien", "ma nhan vien");
    nhanVien1.tenNhanVien = validate.isEmail("#tenNhanVien", "ten nhan vien");
    nhanVien1.soGioLam =    (validate.inRange("#soGioLam", 50, 200, "so gio lam ngoai range"));
    nhanVien1.luongCoBan = parseFloat(validate.inRange("#luongCoBan", 1000, 2000, "luong co ban ngoai range"));
    let ChucVu = document.getElementById("chucVu");
    nhanVien1.tenChucVu = ChucVu.options[ChucVu.selectedIndex].innerHTML;
    nhanVien1.heSoChucVu = parseFloat(ChucVu.value);
    
    document.getElementById("txtMaNhanVien").innerHTML = nhanVien1.maNhanVien;
    document.getElementById("txtTenNhanVien").innerHTML = nhanVien1.tenNhanVien;
    document.getElementById("txtChucVu").innerHTML = nhanVien1.tenChucVu;
    document.getElementById("txtTongLuong").innerHTML = nhanVien1.tinhLuong();
    document.getElementById("txtXepLoai").innerHTML = nhanVien1.xepLoai();
    
    nhanVien1.backup();
    // if (checked(nhanVien1)) {
        nhanViens.push(nhanVien1);
        show("tblNhanVien", nhanViens);
    // }
}

document.querySelector("#btnCapNhat").onclick = function (event) {
    // todo: update new edition to local store
}

let restore = function () {
    let arr_a = [];
    let keys_as = Object.keys(localStorage);
    let i = keys_as.length;
    while (i--) {
        let json_s = localStorage.getItem(keys_as[i]);
        let nhanVien_o = Object.assign(new NhanVien, JSON.parse(json_s));
        console.log(nhanVien_o);
        arr_a.push(nhanVien_o);
    }
    console.log(arr_a);
    return arr_a;
}

let checked = function (NhanVien) {
    // todo: check function for all element
    // validate.isEmpty()
    return true
}

let show = function (id, array) {
    let content = document.getElementById(id);
    console.log(content);
    content.innerHTML = null;
    array.forEach(element => {
        content.innerHTML += addRow(element);
    });
}

let modify = function (maNhanVien) {
    let nhanVien = new NhanVien;
    nhanVien.restore(maNhanVien);
    if (nhanVien === null) {
        return;
    }
    render(nhanVien, ["#maNhanVien", "#tenNhanVien", "#chucVu", "#luongCoBan", "#soGioLam"]);
}

let render = function (nhanVien, ...selector) {
    // todo render all element.
    // for
    console.log(nhanVien, selector);
}

let deleteRow = function (maNhanVien) {
    for (let index = 0; index < nhanViens.length; index++) {
        const element = nhanViens[index];
        if (element == undefined) {
            continue;
        }
        if (maNhanVien === element.maNhanVien) {
            delete nhanViens[index];
            show("tblNhanVien", nhanViens);
            // return;
        }
    }
}

let addRow = function (NhanVien) {
    // 2nd way
    let content = `
    <tr>
    <td>${NhanVien.maNhanVien}</td>
    <td>${NhanVien.tenNhanVien}</td>
    <td>${NhanVien.tenChucVu}</td>
    <td>${NhanVien.heSoChucVu}</td>
    <td>${NhanVien.luongCoBan}</td>
    <td>${NhanVien.tinhLuong()}</td>
    <td>${NhanVien.soGioLam}</td>
    <td>${NhanVien.xepLoai()}</td>
    <td><button class="btn btn-danger" onclick="deleteRow('${NhanVien.maNhanVien}')">Xoa</button></td>
    <td><button class="btn btn-danger" onclick="modify('${NhanVien.maNhanVien}')">Chinh sua</button></td>
    </tr>
    `;
    return content;
}

let main = function () {
    nhanViens = restore();
    show("tblNhanVien", nhanViens);
}

main();