import express from "express";
const app = express();
const port = 3000;

// Cấu hình thư mục public để phục vụ file tĩnh
app.use(express.static("public"));

// Redirect từ / sang /TrangChu
app.get("/", (req, res) => {
  res.redirect("/TrangChu");
});

// Trang chủ
app.get("/TrangChu", (req, res) => {
  res.sendFile(__dirname + "/TrangChu.html");
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
