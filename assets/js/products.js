

const products = [
  {
    id: "CASIO-AQ230EGL-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 120,
    image: "assets/img/AQ-230EGL-9A.jpg"
  },
  {
    id: "CASIO-AQ230EL-1A",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 86,
    image: "assets/img/AQ-230EL-1A.jpg"
  },
  {
    id: "CASIO-AQ240E-3A",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 64,
    image: "assets/img/AQ-240E-3A.jpg"
  },
  {
    id: "CASIO-AQ240E-7A",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Vàng",
    glass: "Nhựa",
    strap: "Kim loại",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★☆",
    reviews: 48,
    image: "assets/img/AQ-240E-7A.jpg"
  },
  {
    id: "CASIO-AQ240EG-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 96,
    image: "assets/img/AQ-240EG-9A.jpg"
  },
  {
    id: "CASIO-MTPB145SG-1AV",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 77,
    image: "assets/img/MTP-B145SG-1AV.jpg"
  },
  {
    id: "CASIO-MTPB145SG-7AV",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 59,
    image: "assets/img/MTP-B145SG-7AV.jpg"
  },
  {
    id: "CASIO-MTPM307D-1BV",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★★",
    reviews: 112,
    image: "assets/img/MTP-M307D-1BV.jpg"
    },
  {
    id: "CASIO-AQ230EGL-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 120,
    image: "assets/img/AQ-230EGL-9A.jpg"
  },
  {
    id: "CASIO-AQ230EL-1A",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 86,
    image: "assets/img/AQ-230EL-1A.jpg"
  },
  {
    id: "CASIO-AQ240E-3A",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 64,
    image: "assets/img/AQ-240E-3A.jpg"
  },
  {
    id: "CASIO-AQ240E-7A",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Vàng",
    glass: "Nhựa",
    strap: "Kim loại",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★☆",
    reviews: 48,
    image: "assets/img/AQ-240E-7A.jpg"
  },
  {
    id: "CASIO-AQ240EG-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 96,
    image: "assets/img/AQ-240EG-9A.jpg"
  },
  {
    id: "CASIO-MTPB145SG-1AV",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 77,
    image: "assets/img/MTP-B145SG-1AV.jpg"
  },
  {
    id: "CASIO-MTPB145SG-7AV",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 59,
    image: "assets/img/MTP-B145SG-7AV.jpg"
  },
  {
    id: "CASIO-MTPM307D-1BV",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★★",
    reviews: 112,
    image: "assets/img/MTP-M307D-1BV.jpg"
    },
  {
    id: "CASIO-AQ230EGL-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 120,
    image: "assets/img/AQ-230EGL-9A.jpg"
  },
  {
    id: "CASIO-AQ230EL-1A",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 86,
    image: "assets/img/AQ-230EL-1A.jpg"
  },
  {
    id: "CASIO-AQ240E-3A",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 64,
    image: "assets/img/AQ-240E-3A.jpg"
  },
  {
    id: "CASIO-AQ240E-7A",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Vàng",
    glass: "Nhựa",
    strap: "Kim loại",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★☆",
    reviews: 48,
    image: "assets/img/AQ-240E-7A.jpg"
  },
  {
    id: "CASIO-AQ240EG-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 96,
    image: "assets/img/AQ-240EG-9A.jpg"
  },
  {
    id: "CASIO-MTPB145SG-1AV",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 77,
    image: "assets/img/MTP-B145SG-1AV.jpg"
  },
  {
    id: "CASIO-MTPB145SG-7AV",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 59,
    image: "assets/img/MTP-B145SG-7AV.jpg"
  },
  {
    id: "CASIO-MTPM307D-1BV",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★★",
    reviews: 112,
    image: "assets/img/MTP-M307D-1BV.jpg"
    },
  {
    id: "CASIO-AQ230EGL-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 120,
    image: "assets/img/AQ-230EGL-9A.jpg"
  },
  {
    id: "CASIO-AQ230EL-1A",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 86,
    image: "assets/img/AQ-230EL-1A.jpg"
  },
  {
    id: "CASIO-AQ240E-3A",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 64,
    image: "assets/img/AQ-240E-3A.jpg"
  },
  {
    id: "CASIO-AQ240E-7A",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Vàng",
    glass: "Nhựa",
    strap: "Kim loại",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★☆",
    reviews: 48,
    image: "assets/img/AQ-240E-7A.jpg"
  },
  {
    id: "CASIO-AQ240EG-9A",
    name: "Đồng hồ Nam CASIO AQP-240",
    gender: "Nam",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 2520000,
    price: "2.520.000₫",
    rating: "★★★★☆",
    reviews: 96,
    image: "assets/img/AQ-240EG-9A.jpg"
  },
  {
    id: "CASIO-MTPB145SG-1AV",
    name: "Đồng hồ Nữ CASIO LX-800H",
    gender: "Nữ",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 1315000,
    price: "1.315.000₫",
    rating: "★★★★★",
    reviews: 77,
    image: "assets/img/MTP-B145SG-1AV.jpg"
  },
  {
    id: "CASIO-MTPB145SG-7AV",
    name: "Đồng hồ Nam CASIO MTP",
    gender: "Nam",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 3107000,
    price: "3.107.000₫",
    rating: "★★★★☆",
    reviews: 59,
    image: "assets/img/MTP-B145SG-7AV.jpg"
  },
  {
    id: "CASIO-MTPM307D-1BV",
    name: "Đồng hồ Vàng CASIO AQ-240EG",
    gender: "Nam",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3428000,
    price: "3.428.000₫",
    rating: "★★★★★",
    reviews: 112,
    image: "assets/img/MTP-M307D-1BV.jpg"
  }
];


const grid = document.getElementById("product-grid");

function renderProducts(list, limit = null) {
    grid.innerHTML = ""; // Xóa sản phẩm cũ
    const toRender = limit ? list.slice(0, limit) : list; // chỉ lấy tối đa "limit" sản phẩm

  toRender.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="rating"><span>${p.rating}</span> (${p.reviews} đánh giá)</div>
      <p class="price">${p.price}</p>
    `;
    grid.appendChild(card);
  });
}


// Hiển thị tối đa 20 sản phẩm đầu tiên
renderProducts(products, 20);

// BỘ LỌC
document.querySelector("aside button").addEventListener("click", () => {
  const minPrice = parseInt(document.querySelector(".price-range input:nth-child(1)").value) || 0;
  const maxPrice = parseInt(document.querySelector(".price-range input:nth-child(2)").value) || Infinity;
  const selects = document.querySelectorAll(".filter-group select");

  const color = selects[0].value;
  const glass = selects[1].value;
  const strap = selects[2].value;
  const gender = selects[3].value;

  const filtered = products.filter(p => {
    const matchPrice = p.priceValue >= minPrice && p.priceValue <= maxPrice;
    const matchColor = color === "Tất cả" || p.color === color;
    const matchGlass = glass === "Tất cả" || p.glass === glass;
    const matchStrap = strap === "Tất cả" || p.strap === strap;
    const matchGender = (gender === "Tất cả" || gender === "") ? true : p.gender === gender;

    return matchPrice && matchColor && matchGlass && matchStrap && matchGender;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>";
  } else {
    renderProducts(filtered, 20);
  }
});

