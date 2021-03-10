var NhanVien = function () {
    this.maNhanVien = "";
    this.tenNhanVien = "";
    this.tenChucVu = "";
    this.heSoChucVu = 0;
    
    this.luongCoBan = 0;
    this.tinhLuong = function () {
        let tongLuong = this.luongCoBan * this.heSoChucVu;
        return tongLuong;
    }
    
    this.soGioLamTrongThang = 0;
    this.xepLoai = function () {
        let soGioLamTrongThang = this.soGioLamTrongThang;
        const factor = 10;
        const obset = 50;
        const max = 120;
        const min = 50;
        let type = ["trung binh", "trung binh", "trung binh", "kha", "kha", "gioi", "gioi", "xuat sac"];
        if(soGioLamTrongThang > max) {
            soGioLamTrongThang = max;
        } else if (soGioLamTrongThang <= min) {
            soGioLamTrongThang = min;
            return "khong xep loai";
        }
        
        let index = Math.round(((soGioLamTrongThang - obset) / factor) - 0.5);
        return type[index];
    }
    
    this.backup = function() {
        let json_s = JSON.stringify(this);
        console.log(json_s);
        localStorage.setItem("NhanVien" + this.maNhanVien, json_s);
    }

    this.restore = function(maNhanVien) {
        let json_s = localStorage.getItem("NhanVien" + maNhanVien);
        if(json_s === "") {
            return null;
        }
        let object_o = JSON.parse(json_s);
        return Object.assign(this, object_o);
    }

}