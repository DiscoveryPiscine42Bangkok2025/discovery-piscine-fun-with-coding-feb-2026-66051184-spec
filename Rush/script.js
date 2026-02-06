// ฟังก์ชันทักทายตอนเลือกตัวละคร
function selectPlayer(name) {
    alert("You selected: " + name + "\nLoading Game...");
}

// ฟังก์ชันยืนยันก่อนส่งเมล (Requirement การโต้ตอบ)
function confirmContact() {
    // confirm จะคืนค่า true (ถ้าตอบ Yes) หรือ false (ถ้าตอบ No)
    return confirm("Do you really want to send an email?");
}