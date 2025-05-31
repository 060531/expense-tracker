document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1. ดึงค่าจากฟอร์ม
  const data = {
    type: document.getElementById("type").value,         // ประเภท: รายรับ / รายจ่าย
    date: document.getElementById("date").value,         // วันที่
    category: document.getElementById("category").value, // หมวดหมู่
    amount: document.getElementById("amount").value,     // จำนวนเงิน
    note: document.getElementById("note").value          // หมายเหตุ
  };

  // 2. ใส่ URL ที่ได้จาก Google Apps Script ของคุณ
  const scriptURL = "https://script.google.com/macros/s/AKfycbwW_oj30M0Ns77E-y7b5BTk_PlcirhHVPlzrIi-uQtXQEefrnanf4qlwSumDVISPieCZg/exec";

  // 3. ส่งข้อมูล
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.text();
    alert("✅ " + result);
    document.getElementById("expense-form").reset(); // ล้างฟอร์ม
  } catch (error) {
    console.error("ส่งข้อมูลล้มเหลว:", error);
    alert("❌ ไม่สามารถส่งข้อมูลได้");
  }
});