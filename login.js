let code = "";
const correctCode = "240669"; // ตั้งรหัสผ่าน 6 ตัวของคุณตรงนี้

function add(n) {
    // เปลี่ยนจาก 4 เป็น 6
    if (code.length < 6) {
        code += n;
        document.querySelectorAll('.dot')[code.length-1].classList.add('active');
    }
    
    // เปลี่ยนจาก 4 เป็น 6
    if (code.length === 6) {
        setTimeout(() => {
            if (code === correctCode) {
                window.location.href = "secret.html";
            } else {
                alert("รหัสไม่ถูกต้องครับ!");
                reset();
            }
        }, 200);
    }
}

function del() {
    if (code.length > 0) {
        document.querySelectorAll('.dot')[code.length-1].classList.remove('active');
        code = code.slice(0, -1);
    }
}

function reset() {
    code = "";
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
}