document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // เก็บค่าจากฟอร์ม
  const data = {
    type: document.getElementById("type").value,
    date: document.getElementById("date").value,
    category: document.getElementById("category").value,
    amount: document.getElementById("amount").value,
    note: document.getElementById("note").value
  };

  // URL ของ Google Apps Script ที่ Deploy แล้ว (ให้เปลี่ยนเป็นของคุณนัท)
  const scriptURL = "https://script.google.com/macros/s/AKfycbwW_oj30M0Ns77E-y7b5BTk_PlcirhHVPlzrIi-uQtXQEefrnanf4qlwSumDVISPieCZg/exec";

  // ส่งข้อมูลด้วย fetch()
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const text = await response.text();
    // แสดงข้อความสำเร็จในหน้าเว็บ
    document.getElementById("message").innerHTML = '<div class="alert alert-success">✅ ' + text + '</div>';
    // ล้างฟอร์ม
    document.getElementById("expense-form").reset();
  } catch (error) {
    console.error("ส่งข้อมูลล้มเหลว:", error);
    document.getElementById("message").innerHTML = '<div class="alert alert-danger">❌ ไม่สามารถส่งข้อมูลได้</div>';
  }
});