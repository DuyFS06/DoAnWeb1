// assets/js/taikhoan.js
(() => {
  const DATA_VERSION = "v1";
  const savedVersion = localStorage.getItem("dataVersion");

  // Nếu cần reset data khi version thay đổi, uncomment dòng dưới
  // if (savedVersion !== DATA_VERSION) { localStorage.removeItem("userList"); localStorage.setItem("dataVersion", DATA_VERSION); }

  const DEFAULT_AVATAR = "/DoAnWeb1/assets/img/Avatar/avtuser.jpg";

  const defaultUsers = [
    {
      userName: "admin",
      email: "admin@example.com",
      password: "Admin123",
      address: "Hà Nội",
      avatar: "./assets/img/Avatar/ava1.jpg",
      isLoggedIn: false,
    },
    {
      userName: "demo",
      email: "demo@example.com",
      password: "Demo1234",
      address: "TP. Hồ Chí Minh",
      avatar: "./assets/img/Avatar/ava2.jpg",
      isLoggedIn: false,
    },
    {
      userName: "john",
      email: "john@example.com",
      password: "John1234",
      address: "Đà Nẵng",
      avatar: "./assets/img/Avatar/ava3.jpg",
      isLoggedIn: false,
    },
  ];


  let userList = JSON.parse(localStorage.getItem("userList")) || [];


  defaultUsers.forEach((du) => {
    const exists = userList.some(
      (u) =>
        (u.email && du.email && u.email.toLowerCase() === du.email.toLowerCase()) ||
        (u.userName && du.userName && u.userName === du.userName)
    );
    if (!exists) {
      // nếu default user không khai avatar => gán mặc định
      const toAdd = { ...du, avatar: du.avatar || DEFAULT_AVATAR };
      userList.push(toAdd);
    }
  });

  userList = userList.map((u) => ({
    ...u,
    avatar: u.avatar || DEFAULT_AVATAR,
  }));

  localStorage.setItem("userList", JSON.stringify(userList));
  // Lưu version để về sau dễ reset nếu cần
  if (!localStorage.getItem("dataVersion")) localStorage.setItem("dataVersion", DATA_VERSION);
})();