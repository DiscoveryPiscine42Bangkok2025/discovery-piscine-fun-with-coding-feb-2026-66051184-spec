// ตัวแปรอ้างอิง
var ft_list = document.getElementById('ft_list');
var newBtn = document.getElementById('newBtn');

// ฟังก์ชันดึงค่า Cookie
function getCookie(name) {
    var nameEq = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEq) === 0) return decodeURIComponent(c.substring(nameEq.length, c.length));
    }
    return null;
}

// ฟังก์ชัน Save ลง Cookie
function saveCookie() {
    var todos = [];
    var items = ft_list.children;
    // วนลูปเก็บข้อความจากทุก div ใน list
    for (var i = 0; i < items.length; i++) {
        todos.push(items[i].innerHTML);
    }
    // แปลงเป็น JSON string แล้วบันทึก (ตั้งเวลาหมดอายุ 7 วัน)
    var jsonStr = JSON.stringify(todos);
    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    
    // ชื่อ cookie
    document.cookie = "ft_list=" + encodeURIComponent(jsonStr) + ";" + expires + ";path=/";
}


// ฟังก์ชันสร้าง Div ใหม่
function addTodo(text) {
    var div = document.createElement('div');
    div.innerHTML = text;

    // เพิ่ม event: กดแล้วลบ
    div.onclick = function() {
        var confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            this.remove(); // ลบตัวเองออก
            saveCookie();  // อัปเดต cookie ใหม่
        }
    };

    // แทรกไว้บนสุด
    ft_list.prepend(div);
}


newBtn.onclick = function() {
    var text = prompt("Enter new TO DO:");
    // เช็กว่าไม่ใช่ค่าว่าง และไม่ได้กด Cancel
    if (text && text.trim() !== "") {
        addTodo(text);
        saveCookie(); // บันทึกทุกครั้งที่เพิ่ม
    }
};


// เปิดหน้าเว็บแล้วโหลด Cookie
window.onload = function() {
    var cookieData = getCookie("ft_list");
    if (cookieData) {
        var todos = JSON.parse(cookieData);
        // วนลูปจาก "ตัวท้ายสุด" ของ array ขึ้นมา
        for (var i = todos.length - 1; i >= 0; i--) {
            addTodo(todos[i]);
        }
    }
};