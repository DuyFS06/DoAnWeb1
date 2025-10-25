const defaultUsers = [
  {
    userName: "admin",
    email: "admin@example.com",
    password: "Admin123",
    address: "Hà Nội",
    isLoggedIn: false,
  },
  {
    userName: "demo",
    email: "demo@example.com",
    password: "Demo1234",
    address: "Thành phố Hồ Chí Minh",
    isLoggedIn: false,
  },
  {
    userName: "john",
    email: "john@example.com",
    password: "John1234",
    address: "Đà Nẵng",
    isLoggedIn: false,
  },
];

// Lấy userList từ localStorage hoặc khởi tạo rỗng
let userList = JSON.parse(localStorage.getItem("userList")) || [];

// Thêm các defaultUsers mà chưa có trong userList (so sánh theo email)
defaultUsers.forEach((du) => {
  const exists = userList.some(
    (u) => u.email.toLowerCase() === du.email.toLowerCase() || u.userName === du.userName
  );
  if (!exists) {
    userList.push(du);
  }
});

// Lưu lại userList (sau khi ghép default nếu cần)
localStorage.setItem("userList", JSON.stringify(userList));
