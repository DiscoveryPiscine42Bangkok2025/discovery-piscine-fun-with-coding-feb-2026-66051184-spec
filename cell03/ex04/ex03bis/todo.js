$(document).ready(function() {
    // ตัวแปรอ้างอิง
    var $ft_list = $('#ft_list');
    var $newBtn = $('#newBtn');

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

        $ft_list.children().each(function() {
            todos.push($(this).text());
        });
        var jsonStr = JSON.stringify(todos);
            var date = new Date();
            date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + date.toUTCString();
        
            document.cookie = "ft_list=" + encodeURIComponent(jsonStr) + ";" + expires + ";path=/";
    }
    


    // ฟังก์ชันสร้าง Div ใหม่
    function addTodo(text) {
        var $div = $('<div>').text(text);

    // เพิ่ม event: กดแล้วลบ
        $div.click(function() {
                var confirmDelete = confirm("Do you want to remove this TO DO?");
                if (confirmDelete) {
                    $(this).remove(); // ใช้คำสั่ง remove() ของ jQuery
                    saveCookie();
                }
            });
        // แทรกไว้บนสุด
        $ft_list.prepend($div);
    }


    $newBtn.click(function() {
        var text = prompt("Enter new TO DO:");
        // เช็กว่าไม่ใช่ค่าว่าง และไม่ได้กด Cancel
        if (text && text.trim() !== "") {
            addTodo(text);
            saveCookie(); // บันทึกทุกครั้งที่เพิ่ม
        }
    });


// เปิดหน้าเว็บแล้วโหลด Cookie
    var cookieData = getCookie("ft_list");
    if (cookieData) {
        var todos = JSON.parse(cookieData);
        // วนลูปจาก "ตัวท้ายสุด" ของ array ขึ้นมา
        for (var i = todos.length - 1; i >= 0; i--) {
            addTodo(todos[i]);
        }
    }
});