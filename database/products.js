// ======== HÀM LOCAL STORAGE =========
//Cách đúng để đồng bộ sản phẩm giữa các file
//Chỉ cần đảm bảo mọi file đều gọi cùng một hàm getLocalProducts() khi cần.
function getLocalProducts() {
  try {
    const data = localStorage.getItem("productsLocal");
    if (data) {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      }
    }
    // Nếu không có dữ liệu hoặc dữ liệu không hợp lệ, sử dụng dữ liệu mẫu
    console.log("Khởi tạo lại dữ liệu sản phẩm từ mẫu");
    localStorage.setItem("productsLocal", JSON.stringify(products));
    return products;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    return products; // Trả về dữ liệu mẫu nếu có lỗi
  }
}

function saveLocalProducts(data) {
  localStorage.setItem("productsLocal", JSON.stringify(data));
  window.dispatchEvent(new Event("productsUpdated"));
}

function removeLocalProducts() {
  localStorage.removeItem("productsLocal");
}
// hhh
// database/products.js
const products = [
  //BABY-G
  {
    id: "BA-110AH-6A",
    catalog: "BABY-G",
    name: "BABY-G BA-110AH-6A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Tím",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 4420000,
    price: "4.420.000₫",
    image: "assets/img/Baby-G/BA-110AH-6A.jpg",
    importPrice: 3315000, // 75% của 4420000
    quantity: 250,
    soldQuantity: 0,
    visibility: "hidden",
    description: `
      Mềm mại và tinh tế, nhưng vẫn táo bạo và phong cách. Chúng tôi bắt đầu với chiếc BA-110 đặc trưng 
      và tô điểm cho sự kết hợp tinh tế giữa mặt số, vạch chỉ giờ và các bộ phận khác bằng tông màu pastel 
      nhẹ nhàng. Điểm nhấn trên kim đồng hồ tạo điểm nhấn màu sắc rực rỡ, tạo nên sự tương phản tươi vui, 
      bừng sáng bất cứ ngày nào. Không chỉ ngọt ngào và phong cách, những chiếc đồng hồ này còn sở hữu
      cấu trúc chống va đập, khả năng chống nước ở độ sâu 100 mét, cùng nhiều tính năng khác. Dù là thể thao, 
      giải trí hay niềm vui thường ngày, những chiếc đồng hồ BABY-G này sẽ luôn đồng hành cùng bạn.
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "43.4mm",
    thickness: "15.1mm",
    weight: "45g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "BG-169U-3",
    catalog: "BABY-G",
    name: "BABY-G BG-169U-3",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Xanh lá",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 2620000,
    price: "2.620.000₫",
    image: "assets/img/Baby-G/BG-169U-3.jpg",
    importPrice: 2096000, // 80% của 2620000
    quantity: 9,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Dòng BG-169 được trang bị với gờ bảo vệ phía trước dạng tròn tăng khả năng chống va đập. 
      Mẫu đồng hồ được trang bị đầy đủ các tính năng tiện lợi như chống nước ở độ sâu 200 mét.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "45.9mm",
    thickness: "16.1mm",
    weight: "52g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "BGA-280TD-7A",
    catalog: "BABY-G",
    name: "BABY-G BGA-280TD-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Trắng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3520000,
    price: "3.520.000₫",
    image: "assets/img/Baby-G/BGA-280TD-7A.jpg",
    importPrice: 2816000, // 80% của 3520000
    quantity: 300,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Mang đến nét vui tươi cho phong cách của bạn, với BABY-G có kiểu nhuộm loang nhẹ nhàng. 
      Chúng tôi bắt đầu với thiết kế mặt tròn của BGA-280, mặt số mặt đồng hồ xếp lớp để tạo ra họa tiết 
      nhuộm loang với những màu sắc tươi vui nhẹ nhàng và thêm các vạch chỉ giờ với lớp hoàn thiện 
      bằng hơi nước để thêm sự lấp lánh và tỏa sáng. Tràn đầy sức sống nhưng vẫn giản dị, 
      những chiếc đồng hồ này còn có cấu trúc chống va đập, khả năng chống nước ở độ sâu 100 mét, v.v., 
      tất cả để theo kịp những ngày năng động của bạn.
    `,
    movement: "Pin / Quartz",
    size: "39.9mm",
    thickness: "13.4mm",
    weight: "65g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "BGA-290-1A",
    catalog: "BABY-G",
    name: "BABY-G BGA-290-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3150000,
    price: "3.150.000₫",
    image: "assets/img/Baby-G/BGA-290-1A.png",
    importPrice: 2362500, // 75% của 3150000
    quantity: 180,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    Chiếc đồng hồ công phu bằng kim loại vừa tinh tế lại nổi bật tạo cho bạn một vẻ ngoài đầy phong cách.
    Chiếc đồng hồ BABY-G này có độ bền chắc như bạn mong đợi với phong cách thiết kế mỏng, nhẹ, có vỏ tròn, 
    đơn giản và mặt đồng hồ rộng giúp bạn dễ đọc hơn. Nổi bật với các vạch chỉ giờ bằng số La Mã tạo 
    nên điểm nhấn thanh lịch, trong khi kim đồng hồ, vạch chỉ giờ và đường gờ đều được xử lý bằng 
    phương pháp lắng đọng hơi nước màu vàng hồng tạo thành lớp kim loại bóng mịn đẹp mắt.
    Cấu trúc chống va đập bền chắc và khả năng chống nước ở độ sâu 100 mét trong một thiết kế vừa sành điệu 
    vừa thoải mái, giúp bạn luôn sẵn sàng đối mặt với bất cứ điều gì xảy ra
  `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "42.8mm",
    thickness: "7.5mm",
    weight: "56g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "BGA-310C-1A",
    catalog: "BABY-G",
    name: "BABY-G BGA-310C-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 4280000,
    price: "4.280.000₫",
    image: "assets/img/Baby-G/BGA-310C-1A.jpg",
    importPrice: 3424000, // 80% của 4280000
    quantity: 400,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    Thỏa sức ngao du ngoài trời với mẫu đồng hồ BGA-310 sành điệu và 
    mạnh mẽ. Đồng hồ BABY-G có nhiều chất liệu khác nhau giúp bạn thể hiện tình yêu 
    với thiên nhiên, trong đó có dây đeo bằng vải làm từ chai nhựa tái chế thân thiện với môi trường. 
    Chiếc đồng hồ có phần vấu nối dây đeo vừa vặn phù hợp với mọi chuyển động. Màu đen linh hoạt, 
    tuy cổ điển nhưng luôn hợp thời. Mặt đồng hồ tròn và rộng kết hợp dây đeo lớn và vạch chỉ giờ nổi 
    làm tôn lên vẻ ngoài nghịch ngợm và giúp bạn dễ đọc. Dây đeo màu sáng giúp hiển thị giờ rõ ràng 
    ngay cả trong bóng tối để bạn xem nhanh hơn.
  `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "51.9mm",
    thickness: "15.8mm",
    weight: "110g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "BGD-570BC-3",
    catalog: "BABY-G",
    name: "BABY-G BGD-570BC-3",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Xanh lá",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3850000,
    price: "3.850.000₫",
    image: "assets/img/Baby-G/BGD-570BC-3.png",
    importPrice: 2887500, // 75% của 3850000
    quantity: 5,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    Chiếc BGD-570 tiêu chuẩn với màu xanh pastel và hồng pastel. 
    Các màu này vốn được ưa chuộng vào những năm 1980 và thể hiện tinh thần tự do thời bấy giờ. 
    Mặt đồng hồ được trang trí bằng hình ảnh cây cọ và cảnh hoàng hôn trên biển với các màu pastel 
    hoài cổ, trong khi thiết kế tổng thể mang đến cảm giác hoài niệm về niềm vui mùa hè hoặc các cảnh đẹp 
    trong những tháng thời tiết ấm áp.
  `,
    movement: "Pin / Quartz",
    size: "51.7mm",
    thickness: "15.8mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "BGD-570XG-8",
    catalog: "BABY-G",
    name: "BABY-G BGD-570XG-8",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 4970000,
    price: "4.970.000₫",
    image: "assets/img/Baby-G/BGD-570XG-8.png",
    visibility: "visible",
    importPrice: 4224500, // 85% của 4970000
    quantity: 320,
    soldQuantity: 0,
    description: `
    Đặc điểm nổi bật của mẫu này là họa tiết ngựa vằn trên chất liệu nhựa màu đen 
    bán trong suốt. Ngựa vằn là họa tiết phổ biến trong những năm 90, là lựa chọn hoàn hảo 
    cho mẫu hợp tác kỷ niệm giai đoạn bắt đầu của BABY-G và X-girl.
    Vòng dây đeo và mặt đồng hồ tôn tôn lên logo của X-girl trong khi nắp sau làm nổi bật logo 
    do đạo diễn phim và video âm nhạc Mike Mills thiết kế.
  `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "28mm",
    thickness: "6.4mm",
    weight: "28g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "LOV-20A-7A-b",
    catalog: "BABY-G",
    name: "BABY-G LOV-20A-7A-b",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Trắng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 5520000,
    price: "5.520.000₫",
    image: "assets/img/Baby-G/LOV-20A-7A-b.png",
    importPrice: 4416000, // 80% của 5520000
    quantity: 200,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    Các mẫu đôi trong bộ sưu tập G PRESENTS LOVER 2020 với motif hoa hồng 
    tượng trưng cho tình yêu vĩnh cửu.
    Các mẫu cơ bản GA-120 và BA-130 được khoác lớp áo màu trắng cơ bản đại diện 
    cho tình yêu thuần khiết, và được tô điểm bằng các điểm nhấn màu vàng hồng.
    Trục kim đồng hồ được trang trí bằng một hoa hồng duy nhất, vì vậy khi mẫu đồng hồ này được đeo 
    theo cặp, chúng sẽ mang đến thông điệp “Cả thế giới này chỉ có đôi ta.”
    Nắp sau của các mẫu này được in hình thiên thần và ác quỷ cùng với năm 2020.
  `,
    movement: "Pin / Quartz",
    size: "44.4mm",
    thickness: "16.1mm",
    weight: "45g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "MSG-S200D-7A",
    catalog: "BABY-G",
    name: "BABY-G MSG-S200D-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 6250000,
    price: "6.250.000₫",
    image: "assets/img/Baby-G/MSG-S200D-7A.png",
    importPrice: 5000000, // 80% của 6250000
    quantity: 150,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    Từ dòng đồng hồ BABY-G G-MS dành cho phái nữ hiện đại năng động và tinh tế ngày nay, 
    một bộ sưu tập mẫu đồng hồ sành điệu mới sở hữu thiết kế kim loại nhỏ gọn dựa trên mẫu đồng hồ 
    hoàn toàn bằng kim loại MSG-S200 đã ra đời. Vỏ, gờ và dây đeo đều được làm bằng kim loại rắn và vạch 
    giờ cũng có sắc ánh kim làm tôn thêm vẻ sắc sảo của thiết kế. Vỏ, gờ và dây đeo của mẫu này có màu bạc nữ tính 
    hoặc vàng hồng. Cả hai màu sắc này đều kết hợp hài hòa với nhiều phong cách khác nhau.
  `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "51.9mm",
    thickness: "13.4mm",
    weight: "56g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "MSG-S500CD-7A",
    catalog: "BABY-G",
    name: "BABY-G MSG-S500CD-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 6980000,
    price: "6.980.000₫",
    image: "assets/img/Baby-G/MSG-S500CD-7A.png",
    importPrice: 5584000, // 80% của 6980000
    quantity: 280,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    Phần viền mỏng và sắc nét, vạch chỉ giờ hình tam giác, nút điều chỉnh bát giác cùng nhiều chi tiết 
    khác, tất cả đã tạo nên một kiệt tác hiện đại không thể cưỡng lại. Dây đeo được làm từ chất liệu kim loại 
    và nhựa composite mới.
    Mẫu đồng hồ sở hữu thiết kế vỏ mỏng phù hợp với mọi hoàn cảnh, ba kim chỉ thời gian và hiển thị ngày, 
    hoạt động bằng năng lượng mặt trời và khả năng chống nước tới 100m.
  `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "45.9mm",
    thickness: "7.5mm",
    weight: "42g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },

  // EDIFICE
  {
    id: "EFV-650D-2BV",
    catalog: "EDIFICE",
    name: "EDIFICE EFV-650D-2BV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 3820000,
    price: "3.820.000₫",
    image: "assets/img/Edifice/EFV-650D-2BV.jpg",
    importPrice: 2865000, // 75% của 3820000
    quantity: 230,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    Đánh đúng nhịp với đồng hồ ghi thời gian EDIFICE cổ điển cỡ trung. 
    Sự kết hợp tinh tế giữa chi tiết tinh xảo và thiết kế nổi bật với gờ mỏng tạo điểm nhấn bằng 
    mặt số rộng tạo nên phong cách nổi bật, thanh lịch.
  `,
    movement: "Pin / Quartz",
    size: "39.9mm",
    thickness: "15.8mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "EQS-940NL-1AV",
    catalog: "EDIFICE",
    name: "EDIFICE EQS-940NL-1AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 5120000,
    price: "5.120.000₫",
    image: "assets/img/Edifice/EQS-940NL-1AV.jpg",
    importPrice: 4352000, // 85% của 5120000
    quantity: 350,
    soldQuantity: 0,
    visibility: "visible",
    description: `
    chiếc đồng hồ EDIFICE được thiết kế để nắm bắt cảm giác lái xe vào ban đêm,
    được thiết kế phù hợp cho những người đam mê ô tô. Cảm giác hào hứng khi lái xe 
    trên đường phố vào đêm khuya được thể hiện bằng hiệu ứng chuyển màu rực rỡ trên đường gờ — bầu trời đêm 
    trên cao được tái tạo bằng lớp mạ ion màu xanh dương và ánh sáng rực rỡ của đèn đường phía dưới 
    được thể hiện bằng màu bạc từ quá trình gia công titan cacbua. Hiệu ứng chuyển màu giữa hai màu này tạo nên 
    một đường gờ tuyệt đẹp với độ sáng bóng tinh tế cũng được phản ánh trên các chi tiết của mặt số. 
  `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "43.4mm",
    thickness: "6.4mm",
    weight: "28g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "EFV-C120L-8A",
    catalog: "EDIFICE",
    name: "EDIFICE EFV-C120L-8A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 2980000,
    price: "2.980.000₫",
    image: "assets/img/Edifice/EFV-C120L-8A.jpg",
    importPrice: 2235000, // 75% của 2980000
    quantity: 2,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Giải phóng bản thân để tập trung tận hưởng cuộc sống. 
      Sở hữu chiếc đồng hồ kết hợp kim-số EFV-C120 có tuổi thọ pin đến 10 năm phù hợp cho mọi độ tuổi.
      EFV-C120 tiếp nối điều mà EFV-C110 đã bỏ sót, với tất cả ưu điểm của đồng hồ kết hợp kim-số và 
      thời lượng pin dài nhưng thậm chí còn có thiết kế đơn giản, nhỏ gọn hơn. 
    `,
    movement: "Pin / Quartz",
    size: "42.8mm",
    thickness: "15.1mm",
    weight: "45g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "EFV-550L-2AV",
    catalog: "EDIFICE",
    name: "EDIFICE EFV-550L-2AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Xanh",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 3780000,
    price: "3.780.000₫",
    image: "assets/img/Edifice/EFV-550L-2AV.png",
    importPrice: 3024000, // 80% của 3780000
    quantity: 270,
    visibility: "visible",
    description: `
      Bạn sẽ thích nhiều chức năng khác nhau, bao gồm giờ thế giới, đồng hồ bấm giờ, báo giờ, 
      đồng hồ đếm ngược và khả năng chống nước ở độ sâu tới 200 mét. 
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "51.7mm",
    thickness: "15.8mm",
    weight: "65g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "EFV-140L-1AV",
    catalog: "EDIFICE",
    name: "EDIFICE EFV-140L-1AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 4220000,
    price: "4.220.000₫",
    image: "assets/img/Edifice/EFV-140L-1AV.png",
    importPrice: 3376000, // 80% của 4220000
    quantity: 190,
    visibility: "visible",
    description: `
      Chào mừng bạn đến với EDIFICE EFV-140 – một chiếc đồng hồ thể thao và 
      đơn giản nhưng đầy màu sắc mang trên mình chiếc đồng hồ analog cổ điển với kim giây. 
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "44.4mm",
    thickness: "16.1mm",
    weight: "110g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "EFR-552GL-7AV",
    catalog: "EDIFICE",
    name: "EDIFICE EFR-552GL-7AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Nâu",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 5180000,
    price: "5.180.000₫",
    image: "assets/img/Edifice/EFR-552GL-7AV.png",
    importPrice: 3885000, // 75% của 5180000
    quantity: 310,
    visibility: "visible",
    description: `
       Khả năng chống nước ở độ sâu 100 mét, Đồng hồ bấm giờ 
       Kim phút quay ngược để có thể sử dụng chức năng đồng hồ bấm giờ.
       Mặt số lớn
    `,
    movement: "Pin / Quartz",
    size: "51.9mm",
    thickness: "13.4mm",
    weight: "42g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "EFB-730D-2BV",
    catalog: "EDIFICE",
    name: "EDIFICE EFB-730D-2BV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Bạc",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 6280000,
    price: "6.280.000₫",
    image: "assets/img/Edifice/EFB-730D-2BV.jpg",
    importPrice: 5338000, // 85% của 6280000
    quantity: 220,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Giới thiệu mẫu đồng hồ thể thao bấm giờ EDIFICE lấy cảm hứng từ chiếc xe thể thao cổ điển. 
      Kim chỉ số nổi bật kết hợp bố cục mặt số 3-6-9 huyền thoại trong một thiết kế thể thao vượt thời gian. 
      Đường kính nhỏ hơn của vỏ máy mang đến vẻ ngoài thanh lịch cho tốc độ tuyệt đối. 
      Với thiết kế tinh thể saphia, vỏ máy bằng thép không gỉ và dây đeo bằng thép không gỉ bền bỉ, chiếc đồng hồ này có khả năng chống nước ở độ sâu lên đến 100m. 
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "39.9mm",
    thickness: "15.8mm",
    weight: "56g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "EFB-710D-7AV",
    catalog: "EDIFICE",
    name: "EDIFICE EFB-710D-7AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Bạc",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 6120000,
    price: "6.120.000₫",
    image: "assets/img/Edifice/EFB-710D-7AV.jpg",
    importPrice: 4896000, // 80% của 6120000
    quantity: 260,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Mẫu đồng hồ công phu, táo bạo có vẻ ngoài gợi lại cảm giác và diện mạo sang trọng
      của mẫu đồng hồ EDIFICE thể thao cổ điển. Dây đeo kim loại chắc chắn, 
      được chế tác theo các khớp nối hình chữ H, mang lại cảm giác vừa vặn 
      thoải mái hơn cho cổ tay, bên cạnh mặt kính tinh thể sapphire chống xước bảo vệ đồng hồ
      của bạn và giúp bạn không phải lo lắng.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "43.4mm",
    thickness: "15.1mm",
    weight: "45g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "ECB-2200HTR-1A",
    catalog: "EDIFICE",
    name: "EDIFICE ECB-2200HTR-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 7150000,
    price: "7.150.000₫",
    image: "assets/img/Edifice/ECB-2200HTR-1A.jpg",
    importPrice: 6077500, // 85% của 7150000
    quantity: 340,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Chuyển sang “cảm giác” đua xe, chiếc đồng hồ này cho bạn cảm giác gần giống
      như đang “đeo” một chiếc xe Honda TYPE R trên cổ tay. Thiết kế này chứa đầy 
      các biểu tượng của TYPE R — huy hiệu “Chữ H màu đỏ”, sơn Màu trắng vô địch 
      chính hãng, các nút có ký hiệu R, logo TYPE trên vòng dây đeo và vỏ sau, 
      cũng như chất liệu Alcantara và đường khâu màu đỏ thực sự được sử dụng 
      trong nội thất xe hơi TYPE R. Cuối cùng, toàn bộ dòng TYPE R được vinh danh 
      với mã mẫu TYPE R mang tính biểu tượng được in trên dây da màu trắng.  
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "42.8mm",
    thickness: "7.5mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "ECB-900DB-1B",
    catalog: "EDIFICE",
    name: "EDIFICE ECB-900DB-1B",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 9250000,
    price: "9.250.000₫",
    image: "assets/img/Edifice/ECB-900DB-1B.png",
    importPrice: 6937500, // 75% của 9250000
    quantity: 290,
    visibility: "visible",
    description: `
      Những chiếc đồng hồ này cũng có Đèn chiếu sáng cực mạnh sử dụng chiếu sáng 
      bằng đèn LED có độ sáng cao tự động chiếu sáng mặt đồng hồ kim và màn hình 
      số được tự động chiếu sáng bất kỳ khi nào bạn để đồng hồ nghiêng một góc 
      với khuôn mặt của mình tại nơi có ánh sáng yếu. Những tính năng và 
      chức năng tiên tiến đầy ấn tượng trên chạy bằng hệ thống năng lượng mặt trời 
      với pin năng lượng mặt trời chính hãng của CASIO có khả năng tán sắc trong bóng râm, 
      giúp giảm thiểu mức đổ bóng theo tay đeo đồng hồ để tạo năng lượng có hiệu quả tiết kiệm cao.
    `,
    movement: "Pin / Quartz",
    size: "45.9mm",
    thickness: "6.4mm",
    weight: "110g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },

  // G-SHOCK
  {
    id: "GST-B600D-1A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GST-B600D-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 8250000,
    price: "8.250.000₫",
    image: "assets/img/G-Shock/GST-B600D-1A.jpg",
    importPrice: 6600000, // 80% của 8250000
    quantity: 0,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Xin giới thiệu GST-B600 — chiếc đồng hồ G-SHOCK nhỏ gọn hơn nữa 
      đồng thời là chiếc G-STEEL bằng nhựa kim loại mỏng nhất từ trước đến nay. 
      GST-B600 kết hợp các chi tiết kim loại và nhựa, có kích thước siêu mỏng 11,3 mm với 
      phần vỏ nhỏ gọn được ưa chuộng có đường kính chỉ 42 mm, trong khi vẫn giữ cấu trúc 
      gờ kim loại hai phần đặc trưng của G-STEEL.
    `,
    movement: "Pin / Quartz",
    size: "45.9mm",
    thickness: "6.4mm",
    weight: "110g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "GMW-B5000SS-2",
    catalog: "G-SHOCK",
    name: "G-SHOCK GMW-B5000SS-2",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Xanh dương",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 12900000,
    price: "12.900.000₫",
    image: "assets/img/G-Shock/GMW-B5000SS-2.jpg",
    importPrice: 10965000, // 85% của 12900000
    quantity: 450,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Giới thiệu chiếc đồng hồ kỷ niệm 50 năm thành lập đồng hồ Casio 
      có thiết kế dựa trên GMW-B5000, mẫu tái tạo hình dáng biểu tượng của
      chiếc G-SHOCK đầu tiên nhưng có vỏ ngoài hoàn toàn bằng kim loại. 
      Các đặc điểm thiết kế bao gồm các điểm nhấn màu xanh dương và vàng 
      cũng như thiết kế dạng rãnh thể hiện sự tôn kính đối với Casiotron 
      nguyên bản và mang đến cho chiếc đồng hồ 
      một vẻ ngoài đặc biệt vừa vặn gợi lên bầu trời và biển cả. 
    `,
    movement: "Pin / Quartz",
    size: "51.9mm",
    thickness: "15.8mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt vuông",
    waterRes: "200M",
  },
  {
    id: "GMA-S120SA-7A2",
    catalog: "G-SHOCK",
    name: "G-SHOCK GMA-S120SA-7A2",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Trắng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 4200000,
    price: "4.200.000₫",
    image: "assets/img/G-Shock/GMA-S120SA-7A2.jpg",
    importPrice: 3150000, // 75% của 4200000
    quantity: 130,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Biến phong cách của bạn trở nên sành điệu, hiện đại và thể thao, 
      với màu sắc nổi bật sống động. Với GMA-S120SA, chúng tôi bắt đầu với
      màu trắng cổ điển và thêm các điểm nhấn bằng các sắc thái rực rỡ lấy
      cảm hứng từ thiết bị thể thao để tạo ra sự tương phản nổi bật mang 
      đến phong cách thể thao hoàn chỉnh. 
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "44.4mm",
    thickness: "16.1mm",
    weight: "45g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "GMA-P2125W-6A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GMA-P2125W-6A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Tím",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 4150000,
    price: "4.150.000₫",
    image: "assets/img/G-Shock/GMA-P2125W-6A.jpg",
    importPrice: 3320000, // 80% của 4150000
    quantity: 160,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Chiếc đồng hồ đáng nhớ này có màu tím nhạt dễ thương, 
      tượng trưng cho công lý và phẩm giá, ở mặt trước và trung tâm, 
      với các điểm nhấn màu trắng và vàng rải rác khắp thiết kế.
      Được đóng gói đặc biệt với màu tím, chiếc đồng hồ này 
      là một món quà tuyệt vời dành cho người phụ nữ đặc biệt trong cuộc đời bạn.
      Đồng hồ kỹ thuật số tương tự phổ biến GMA-P2100 có thiết kế nhỏ gọn 
      để vừa vặn với cổ tay nhỏ hơn với sự thoải mái hoàn toàn.
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "28mm",
    thickness: "13.4mm",
    weight: "56g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "GMA-P2100PC-4A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GMA-P2100PC-4A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Hồng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 4350000,
    price: "4.350.000₫",
    image: "assets/img/G-Shock/GMA-P2100PC-4A.jpg",
    importPrice: 3480000, // 80% của 4350000
    quantity: 240,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Làm bừng sáng phong cách năng động của bạn với đồng hồ GMA-P2100 có mặt số màu phân cực. 
      Chiếc đồng hồ nhỏ gọn sang trọng này tỏa sáng rực rỡ từ mọi góc độ, 
      và các vạch chỉ giờ bóng loáng lấp lánh ấn tượng hơn nữa.
      Viền và dây đeo có kết cấu mờ tạo nên sự cân bằng ấn tượng, tinh tế, 
      làm nổi bật vẻ đẹp rực rỡ độc đáo của thiết kế.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "51.9mm",
    thickness: "15.8mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "GM-S2110B-8A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GM-S2110B-8A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 6980000,
    price: "6.980.000₫",
    image: "assets/img/G-Shock/GM-S2110B-8A.jpg",
    importPrice: 5235000, // 75% của 6980000
    quantity: 300,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Mạnh mẽ, cứng cáp, sành điệu — Phủ kim loại, giờ đây có những sắc thái rực rỡ với màu sắc trang nhã. Chiếc GM-S2110 hình bát giác 
      có ba màu mới — vàng hồng và đen, vàng hồng và hồng be, và xám đậm.
      Các thành phần kim loại trên mặt số tạo thêm độ sáng bóng và kết cấu, trong khi kích thước nhỏ gọn đảm bảo vừa vặn
      thoải mái với cổ tay thanh mảnh.
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "51.7mm",
    thickness: "15.8mm",
    weight: "65g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "GM-B2100SD-1A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GM-B2100SD-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 10400000,
    price: "10.400.000₫",
    image: "assets/img/G-Shock/GM-B2100SD-1A.jpg",
    importPrice: 8840000, // 85% của 10400000
    quantity: 400,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Xin giới thiệu chiếc đồng hồ hoàn toàn bằng kim loại mới nhất 
      trong dòng đồng hồ 2100 không ngừng cải tiến, 
      kế thừa từ chiếc DW-5000C, chiếc đồng hồ G-SHOCK đầu tiên. 
      Cấu trúc hoàn toàn bằng kim loại sang trọng với vỏ sau vặn vít, 
      gờ và dây đeo bằng thép không gỉ tạo ra một thiết kế đơn giản, tinh gọn, 
      nhưng vẫn đảm bảo khả năng bảo vệ cấu phần khỏi va đập khi rơi.
      Nhờ có công nghệ gắn kết mật độ cao, chiếc đồng hồ kết hợp kim-số này
      có cấu phần thanh mảnh nhưng vẫn đồng thời đảm bảo các chức năng cải tiến được yêu thích, 
      kiểu dáng nhỏ gọn và cảm giác vừa vặn, thoái mái khi đeo.
    `,
    movement: "Pin / Quartz",
    size: "42.8mm",
    thickness: "13.4mm",
    weight: "28g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "GM-2110D-2A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GM-2110D-2B",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Xanh dương",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 7850000,
    price: "7.850.000₫",
    image: "assets/img/G-Shock/GM-2110D-2A.jpg",
    importPrice: 6280000, // 80% của 7850000
    quantity: 210,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Xin giới thiệu GM-2110D — mẫu đồng hồ G-STEEL kết hợp kim-số 
      dựa trên GA-2100, giờ đây được cập nhật đường gờ và dây đeo bằng kim loại đầy phong cách. 
      Được rèn và đánh bóng tỉ mỉ, đường gờ bằng thép không gỉ hình bát giác đồng nhất 
      tạo nên một thiết kế đơn giản, không cầu kỳ với kiểu dáng tinh tế mà vẫn cứng cáp.
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "45.9mm",
    thickness: "15.1mm",
    weight: "52g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "GA-700BBR-1A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GA-700BBR-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3980000,
    price: "3.980.000₫",
    image: "assets/img/G-Shock/GA-700BBR-1A.jpg",
    importPrice: 2985000, // 75% của 3980000
    quantity: 170,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Trở nên táo bạo, bền bỉ và mãnh liệt với bộ sưu tập đen và đỏ của G-SHOCK.
      Kích hoạt đèn nền để chiếu sáng màn hình kỹ thuật số để có khả năng hiển thị tốt hơn nữa. 
      Tạo ấn tượng độc đáo với toàn bộ màu đen, điểm thêm một chút màu đỏ đậm.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "43.4mm",
    thickness: "16.1mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "GM-2110D-2B",
    catalog: "G-SHOCK",
    name: "G-SHOCK GM-2110D-2B",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Xanh dương",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 8250000,
    price: "8.250.000₫",
    image: "assets/img/G-Shock/GM-2110D-2B.jpg",
    importPrice: 7012500, // 85% của 8250000
    quantity: 360,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Xin giới thiệu GM-2110D — mẫu đồng hồ G-STEEL kết hợp kim-số dựa trên GA-2100, 
      giờ đây được cập nhật đường gờ và dây đeo bằng kim loại đầy phong cách. 
      Được rèn và đánh bóng tỉ mỉ, đường gờ bằng thép không gỉ hình bát giác đồng nhất 
      tạo nên một thiết kế đơn giản, không cầu kỳ với kiểu dáng tinh tế mà vẫn cứng cáp.
      Dây đeo kim loại, cùng với điểm nhấn màu sắc tươi mới trên mặt đồng hồ kim loại, 
      phù hợp cho mọi hoạt động dù trong công việc hay giải trí. 
    `,
    movement: "Pin / Quartz",
    size: "51.9mm",
    thickness: "7.5mm",
    weight: "45g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  // PRO-TREK
  {
    id: "PRG-340L-5",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRG-340L-5",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Nâu",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 9280000,
    price: "9.280.000₫",
    image: "assets/img/Pro-Trek/PRG-340L-5.jpg",
    importPrice: 7424000, // 80% của 9280000
    quantity: 280,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Thiết bị hoạt động ngoài trời thông thường-sành điệu dành cho 
      những người yêu thiên nhiên mong muốn thoát khỏi con đường quen thuộc!
      Xin giới thiệu PRG-340L, một chiếc PRO TREK chạy bằng năng lượng mặt trời 
      với các thành phần chính được làm từ nhựa sinh học,
      một loại vật liệu được kỳ vọng sẽ giúp giảm tác động đến môi trường.
      Được trang bị các tính năng nâng cao và tính thực tế hoàn toàn, 
      PRO TREK này sẵn sàng cho mọi cài đặt ngoài trời. Dựa trên PRG-340 với màn hình LCD hai lớp, 
      đồ họa la bàn xuất hiện ở lớp trên cùng, trong khi lớp dưới cùng cung cấp màn hình lớn 
      hiển thị thời gian và nhiều phép đo khác nhau, giúp bạn đọc dễ dàng hơn.
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "51.7mm",
    thickness: "13.4mm",
    weight: "56g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "PRJ-B001B-1",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRJ-B001B-1",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Vải",
    priceValue: 10300000,
    price: "10.300.000₫",
    image: "assets/img/Pro-Trek/PRJ-B001B-1.jpg",
    importPrice: 8240000, // 80% của 10300000
    quantity: 320,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Hãy bước ra khỏi con đường mòn và tiến xa hơn nữa với PRO TREK nhẹ nhất*, người bạn đồng hành hoàn hảo 
      cho những con đường mòn dài và những chuyến đi bộ đường dài siêu nhẹ.
      PRJ-B001 nâng tầm thiết bị lên một tầm cao mới với gờ bảo vệ xoay đầu tiên trong dòng PRO TREK. 
      Xoay gờ xoay để chuyển đổi giữa hai phong cách riêng biệt.
      Khi được đặt để thể hiện một thiết kế góc cạnh đầy phong cách, bổ sung cho phong cách thời trang hàng ngày, 
      gờ bao phủ các nút, ngăn ngừa việc vô tình nhấn nút khi đi bộ ra ngoài hoặc trong thị trấn.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "42.8mm",
    thickness: "15.8mm",
    weight: "110g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "PRT-B50-4",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRT-B50-4",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đỏ",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 7800000,
    price: "7.800.000₫",
    image: "assets/img/Pro-Trek/PRT-B50-4.png",
    importPrice: 5850000, // 75% của 7800000
    quantity: 140,
    visibility: "visible",
    description: `
      PRO TREK với khả năng kết hợp những thành tựu công nghệ xuất sắc nhất 
      cùng thiết kế sáng tạo đã trở thành lựa chọn đồng hồ cho người leo núi, đi bộ đường dài, 
      cắm trại và những người yêu thích các hoạt động ngoài trời khác. 
      Giờ đây, dòng PRT-B50 còn bổ sung tính năng Bluetooth® cho phép trao đổi dữ liệu với 
      điện thoại thông minh sử dụng ứng dụng PRO TREK Connected để đem lại sự tiện dụng tối ưu.
    `,
    movement: "Pin / Quartz",
    size: "43.4mm",
    thickness: "15.1mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "PRT-B70-2",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRT-B70-2",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Xanh dương",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 8100000,
    price: "8.100.000₫",
    image: "assets/img/Pro-Trek/PRT-B70-2.png",
    importPrice: 6480000, // 80% của 8100000
    quantity: 250,
    visibility: "visible",
    description: `
      Bluetooth® cho phép bạn liên kết với ứng dụng PRO TREK Connected trên điện thoại để 
      truy cập các tính năng và chức năng được thiết kế đặc biệt để câu cá.
      Tính năng THỜI ĐIỂM CÂU CÁ sử dụng biểu tượng cá để chỉ báo xác suất câu suốt cả ngày. 
      Một cảnh báo HẸN GIỜ CÂU CÁ tự động đếm ngược thời gian bằng kim giây cho đến khi sắp đến thời điểm câu cá tốt. 
      Bạn có thể sử dụng ứng dụng điện thoại của đồng hồ để truy cập thông tin của khoảng 3.300 điểm chính ven biển trên 
      toàn cầu để kiểm tra đồ thị thủy triều, thời gian sáng và tối và thông tin Tuổi trăng.
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "39.9mm",
    thickness: "16.1mm",
    weight: "52g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "PRW-30Y-1B",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-30Y-1B",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 9500000,
    price: "9.500.000₫",
    image: "assets/img/Pro-Trek/PRW-30Y-1B.png",
    importPrice: 8075000, // 85% của 9500000
    quantity: 300,
    visibility: "visible",
    description: `
      Với PRW-30, một dãy các nút kim loại lớn ở bên phải cung cấp khả năng truy cập một chạm vào la bàn, 
      các thông số áp suất không khí/độ cao và nhiệt độ xuất hiện trên màn hình LCD.
      Các biểu tượng trên kính của mặt đồng hồ bên cạnh mỗi nút giúp thông tin bạn cần dễ hiểu và dễ truy cập, 
      ngay cả trong môi trường ngoài trời khắc nghiệt.
      Ngoài ra, những mẫu này còn có vỏ nhỏ hơn và gờ mỏng hơn.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "28mm",
    thickness: "6.4mm",
    weight: "42g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "PRW-35-7",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-35-7",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 8700000,
    price: "8.700.000₫",
    image: "assets/img/Pro-Trek/PRW-35-7.jpg",
    importPrice: 6525000, // 75% của 8700000
    quantity: 180,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Chiếc đồng hồ này thực sự là sản phẩm hoàn thiện nhất với các chức năng ngoài trời 
      thuận tiện cùng vật liệu được kỳ vọng sẽ giúp làm giảm tác động đến môi trường. 
      Thỏa mãn niềm đam mê hoạt động ngoài trời và tình yêu thiên nhiên của bạn 
      với mẫu đồng hồ kỹ thuật số PRW-35. Dây đeo uretan mềm được thiết kế với 
      các khe bên giúp thoát khí và đeo thoải mái. Nhựa sinh học được sử dụng cho phần dây đeo 
      và các thành phần chính trong vỏ và mặt sau vỏ giúp kiểm soát trọng lượng đồng hồ để bạn đeo thoải mái 
      trong những ngày hoạt động sôi nổi ngoài trời. Chỉ cần ấn các nút chuyên dụng 
      lớn dọc bên phải phần vỏ để xem hướng la bàn, áp suất khí quyển/cao độ và nhiệt độ. 
    `,
    movement: "Pin / Quartz",
    size: "45.9mm",
    thickness: "15.8mm",
    weight: "56g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
  {
    id: "PRW-50Y-1A",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-50Y-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 11200000,
    price: "11.200.000₫",
    image: "assets/img/Pro-Trek/PRW-50Y-1A.png",
    importPrice: 9520000, // 85% của 11200000
    quantity: 410,
    visibility: "visible",
    description: `
      Thiết kế kim giờ, phút và giây rất dễ nhìn, mặt số không bóng giúp 
      giảm lóa và số Ả Rập lõm vào được nhúng chất liệu phát sáng mang đến 
      khả năng dễ dàng đọc kim tối đa. Vành bezel mạnh mẽ được thiết kế theo hình dáng 
      thiết bị mang đến dáng vẻ cơ học gai góc phù hợp cho thời trang ngoài trời, 
      trong khi dây đeo Dura Soft tạo cảm giác vừa vặn, thoải mái ngay cả trong điều kiện nhiệt độ thấp.
      Đây là những màu sắc kết hợp với phong cách kim loại để tạo ra thiết kế hữu dụng và thanh lịch.
      Về chức năng, những mẫu này có Cảm biến bộ ba phiên bản 3 với cảm biến có độ chính xác cao để đo độ cao, 
      nhiệt độ, áp suất khí quyển và hướng. 
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "51.9mm",
    thickness: "7.5mm",
    weight: "28g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "PRW-3500SYT-1",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-3500SYT-1",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Nhựa",
    priceValue: 14500000,
    price: "14.500.000₫",
    image: "assets/img/Pro-Trek/PRW-3500SYT-1.jpg",
    importPrice: 11600000, // 80% của 14500000
    quantity: 460,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Những mẫu này là mẫu bổ sung mới nhất vào dòng đồng hồ PRW Climber Line 
      tập trung cải thiện thao tác sao cho thân thiện với người dùng đồng thời thu nhỏ kích thước tổng thể.
      Climber Line nằm trong dòng sản phẩm PRO TREK. Đây là mẫu không ngừng đẩy lùi 
      các giới hạn về công nghệ tiên tiến và thiết kế đổi mới.
    `,
    movement: "Pin / Quartz",
    size: "44.4mm",
    thickness: "15.1mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },
  {
    id: "PRW-6000SC-7",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-6000SC-7",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 12500000,
    price: "12.500.000₫",
    image: "assets/img/Pro-Trek/PRW-6000SC-7.jpg",
    importPrice: 9375000, // 75% của 12500000
    quantity: 390,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Khoáng thủy tinh
      Con trỏ sơn dạ quang Neobrite
      Năng lượng mặt trời
      Chống nước đến 100 mét
      Ánh sáng LED kép (thời lượng chiếu sáng có thể lựa chọn)
      Chiếu sáng bề mặt LED hoàn toàn tự động Đèn nền màn hình LCD hoàn toàn tự động 
      Chức năng nhận sóng vô tuyến: nhận tín hiệu tự động (tối đa 6 lần một ngày, 
      không còn nhận được sau khi nhận thành công; nhận tín hiệu từ Trung Quốc, 5 lần một ngày) / nhận tín hiệu thủ công
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "42.8mm",
    thickness: "13.4mm",
    weight: "65g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },
  {
    id: "PRW-S3100-1",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-S3100-1",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Nhựa",
    priceValue: 9800000,
    price: "9.800.000₫",
    image: "assets/img/Pro-Trek/PRW-S3100-1.jpg",
    importPrice: 8330000, // 85% của 9800000
    quantity: 330,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Chức năng tiếp nhận sóng vô tuyến: nhận tín hiệu tự động (tối đa 6 lần một ngày 
      và không tiếp nhận sau khi nhận thành công;
      nhận tín hiệu từ Trung Quốc, 5 lần một ngày) / nhận tín hiệu thủ công
    `,
    movement: "Pin / Quartz",
    size: "51.7mm",
    thickness: "16.1mm",
    weight: "110g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },

  //SHEEN
  {
    id: "SHE-3517L-1A",
    catalog: "SHEEN",
    name: "SHEEN SHE-3517L-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 3450000,
    price: "3.450.000₫",
    image: "assets/img/Sheen/SHE-3517L-1A.jpg",
    importPrice: 2587500, // 75% của 3450000
    quantity: 110,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Chiếc đồng hồ thanh lịch, bóng bẩy và lung linh với thiết kế màn hình
       kim, đa mặt số tạo nên hệ thống chức năng vô cùng tinh vi. 
       Thiết kế lộng lẫy với các vạch chỉ giờ và đường gờ gắn tinh thể 
       tạo nên ánh sáng lấp lánh và bắt mắt. Tuy nhiên, 
      chiếc đồng hồ này có dây đeo bằng da màu đen này không chỉ đẹp mắt. 
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "45.9mm",
    thickness: "7.5mm",
    weight: "52g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },

  {
    id: "SHE-4055PG-7A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4055PG-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 4820000,
    price: "4.820.000₫",
    image: "assets/img/Sheen/SHE-4055PG-7A.png",
    importPrice: 4097000, // 85% của 4820000
    quantity: 200,
    visibility: "visible",
    description: `
      Vạch giờ Swarovski® Crystals lấp lánh
      Bộ phận quý giá này có thể nhận dạng được bằng nhãn 
      “Được trang trí bằng pha lê từ Swarovski®” có vai trò như chứng nhận hàng thật. 
      Nhãn này đánh dấu sản phẩm được chế tạo bằng pha lê Swarovski® chính hãng.
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "51.9mm",
    thickness: "15.8mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },

  {
    id: "SHE-4057PGL-7B",
    catalog: "SHEEN",
    name: "SHEEN SHE-4057PGL-7B",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 3980000,
    price: "3.980.000₫",
    image: "assets/img/Sheen/SHE-4057PGL-7B.png",
    importPrice: 3184000, // 80% của 3980000
    quantity: 150,
    visibility: "visible",
    description: `
      Dây đeo bằng da thật
      Vỏ mạ ion màu vàng hồng
      Pha lê Swarovski® lấp lánh trên gờ và vạch giờ
      Bộ phận quý giá này có thể nhận dạng được bằng nhãn “Được trang trí bằng 
      pha lê từ Swarovski®” có vai trò như chứng nhận hàng thật. 
      Nhãn này đánh dấu sản phẩm được chế tạo bằng pha lê Swarovski® chính hãng.
    `,
    movement: "Pin / Quartz",
    size: "44.4mm",
    thickness: "13.4mm",
    weight: "42g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },

  {
    id: "SHE-4532PG-1A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4532PG-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 5120000,
    price: "5.120.000₫",
    image: "assets/img/Sheen/SHE-4532PG-1A.png",
    importPrice: 3840000, // 75% của 5120000
    quantity: 220,
    visibility: "visible",
    description: `
      Vành bezel bằng Pha lê Swarovski® lấp lánh
      Bộ phận quý giá này có thể nhận dạng được bằng nhãn “Được trang trí bằng 
      pha lê từ Swarovski®” có vai trò như chứng nhận hàng thật. 
      Nhãn này đánh dấu sản phẩm được chế tạo bằng pha lê Swarovski® chính hãng.
      Thiết kế thể thao.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "51.7mm",
    thickness: "15.1mm",
    weight: "65g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },

  {
    id: "SHE-4538D-7A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4538D-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Bạc",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 5780000,
    price: "5.780.000₫",
    image: "assets/img/Sheen/SHE-4538D-7A.png",
    importPrice: 4913000, // 85% của 5780000
    quantity: 270,
    visibility: "visible",
    description: `
      Vỏ mỏng, Chốt gập 3 chỉ với một lần bấm
      Mặt kính saphia với lớp phủ không phản quang
      Vỏ mạ ion màu vàng hồng
      Tuổi thọ pin xấp xỉ: 2 năm 
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "42.8mm",
    thickness: "16.1mm",
    weight: "28g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },

  {
    id: "SHE-4539BGM-1A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4539BGM-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 6200000,
    price: "6.200.000₫",
    image: "assets/img/Sheen/SHE-4539BGM-1A.jpg",
    importPrice: 4960000, // 80% của 6200000
    quantity: 300,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Tạo phong cách trang nhã với tông màu đen và vàng nhạt tuyệt đẹp. 
      Bạn sẽ thích thú với dây đeo dạng lưới. Dây đeo tạo cảm giác mềm mại 
      trên da và mang lại sự thoải mái, an toàn trên cổ tay. 
      Khả năng chống nước tối đa ở độ sâu 50 mét 
      giúp bạn không phải lo lắng khi rửa hoặc tiếp xúc với nước.
    `,
    movement: "Pin / Quartz",
    size: "39.9mm",
    thickness: "15.8mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },

  {
    id: "SHE-4540D-7A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4540D-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Bạc",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 4980000,
    price: "4.980.000₫",
    image: "assets/img/Sheen/SHE-4540D-7A.jpg",
    importPrice: 3735000, // 75% của 4980000
    quantity: 190,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Thể hiện bản thân bằng sự sang trọng thanh lịch của chiếc đồng hồ 
      có vạch chỉ giờ bằng pha lê ở các vị trí 3, 6 và 9 giờ. 
      Hình dạng tia nắng của mặt số và hình dáng sắc nét của dây đeo 
      được hoàn thiện kiểu sọc xước kết hợp với nhau 
      trong một thiết kế đầy phong cách nhưng đơn giản và sang trọng.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "43.4mm",
    thickness: "15.1mm",
    weight: "45g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "100M",
  },

  {
    id: "SHE-4558G-9A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4558G-9A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 6780000,
    price: "6.780.000₫",
    image: "assets/img/Sheen/SHE-4558G-9A.jpg",
    importPrice: 5763000, // 85% của 6780000
    quantity: 250,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Mang đến chút ánh sáng cho đời với mẫu đồng hồ kim loại lấy cảm hứng 
      từ tia nắng. Họa tiết hình học sáng bóng lấp lánh theo nhiều 
      phong cách khác nhau là tất cả những gì bạn cần ở món phụ kiện thời trang lộng lẫy. 
      Tính năng chống nước ở độ sâu lên đến 50 mét giúp bạn 
      sử dụng hàng ngày mà không phải lo lắng, ngay cả trong những ngày mưa. 
    `,
    movement: "Solar (Năng lượng ánh sáng)",
    size: "45.9mm",
    thickness: "13.4mm",
    weight: "110g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "200M",
  },

  {
    id: "SHE-4562M-2A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4562M-2A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Xanh dương",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 5340000,
    price: "5.340.000₫",
    image: "assets/img/Sheen/SHE-4562M-2A.jpg",
    importPrice: 4272000, // 80% của 5340000
    quantity: 230,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Đồng hồ kim thời trang có mặt số với màu sắc hiện đại và 
      dây đeo bằng kim loại.Tinh thể sapphire chống trầy xước mang lại 
      độ trong suốt cao để bạn có thể đọc dễ dàng và khả năng chống nước 
      ở độ sâu lên đến 50 mét giúp bạn không phải lo lắng khi rửa hoặc tiếp xúc với nước. 
    `,
    movement: "Pin / Quartz",
    size: "44.4mm",
    thickness: "15.8mm",
    weight: "65g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },

  {
    id: "SHE-4562PGL-4A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4562PGL-4A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Hồng",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 5450000,
    price: "5.450.000₫",
    image: "assets/img/Sheen/SHE-4562PGL-4A.jpg",
    importPrice: 4087500, // 75% của 5450000
    quantity: 200,
    soldQuantity: 0,
    visibility: "visible",
    description: `
      Đồng hồ kim thời trang có mặt số với màu sắc hiện đại và 
      dây đeo bằng kim loại.Tinh thể sapphire chống trầy xước mang lại 
      độ trong suốt cao để bạn có thể đọc dễ dàng và khả năng chống nước ở độ sâu 
      lên đến 50 mét giúp bạn không phải lo lắng khi rửa hoặc tiếp xúc với nước.
    `,
    movement: "Tough Solar (Chạy bằng năng lượng mặt trời)",
    size: "51.7mm",
    thickness: "7.5mm",
    weight: "72g",
    origin: "Nhật Bản",
    shape: "Mặt tròn",
    waterRes: "50M",
  },
];

// ---------- PAGINATION SETTINGS ----------
const PER_PAGE = 20; // số sản phẩm mỗi trang (bạn yêu cầu là 20)
let currentPage = 1; // trang hiện tại
let currentList = getLocalProducts(); // let currentList = getLocalProducts(); // danh sách hiện tại để render (sau lọc sẽ thay đổi)
let localproducts = getLocalProducts();
// Helper: render 1 sản phẩm (tùy theo cấu trúc HTML của bạn)
function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card"; // đảm bảo CSS cho class này tồn tại
  card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3 class="desc">${p.desc} ${p.name}</h3> 
      <p class="price">${p.price}</p>
    `;
  card.addEventListener("click", () => {
    openProductPopup(p);
  });
  return card;
}
// Render products với phân trang
function renderProducts(list, page = 1) {
  if (!list) list = getLocalProducts();
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  // 🔹 Lọc trước khi chia trang
  const visibleList = list.filter((p) => p.visibility === "visible");

  currentList = visibleList;
  currentPage = page;

  grid.innerHTML = "";

  const total = visibleList.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  // clamp page
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const pageItems = visibleList.slice(start, end);

  pageItems.forEach((p) => {
    grid.appendChild(createProductCard(p));
  });

  renderPagination(totalPages, page);
}

// Hiển thị chi tiết sản phẩm trong pop-up
function openProductPopup(product) {
  const popup = document.getElementById("product-popup");
  const detail = document.getElementById("popup-details");

  detail.innerHTML = `
    <div class="product-info">
      <div class="left">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="right">
        <p class="desc">${product.desc}</p>
        <h2>${product.name}</h2>
        <p><strong>Màu sắc:</strong> ${product.color}</p>
        <p><strong>Chất liệu dây:</strong> ${product.strap}</p>
        <p><strong>Loại kính:</strong> ${product.glass}</p>
        <p><strong>Giới tính:</strong> ${product.gender}</p>
        <p class="price">${product.price}</p>
        <div class="actions">
          <button id="add-to-cart">🛒 Thêm vào giỏ hàng</button>
          <button id="buy-now">⚡ Mua ngay</button>
        </div>
      </div>
    </div>

    <div class="description">
      <h3>Mô tả sản phẩm</h3>
      <p>${product.description}</p>

      <h3>Thông số kỹ thuật</h3>
      <p><strong>Máy:</strong> ${product.movement}</p>
      <p><strong>Độ dày:</strong> ${product.thickness}</p>
      <p><strong>Kích thước:</strong> ${product.size}</p>
      <p><strong>Trọng lượng:</strong> ${product.weight}</p>
      <p><strong>Xuất xứ:</strong> ${product.origin}</p>
      <p><strong>Hình dạng mặt:</strong> ${product.shape}</p>
      <p><strong>Mức độ chống nước:</strong> ${product.waterRes}</p>
    </div>
  `;

  popup.style.display = "flex";
  document.body.style.overflow = "hidden"; // khóa cuộn nền

  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (exists) exists.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });

  document.getElementById("buy-now").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("  ")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (exists) exists.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderallcart();
    document.getElementById("chitietsanpham-banner-index").style.display =
      "none";
    document.getElementById("product-popup").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("GioHang").style.display = "block";
  });
}

// Đóng pop-up
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("product-popup").style.display = "none";
  document.body.style.overflow = "auto";
});

// Render controls phân trang
function renderPagination(totalPages, current) {
  const container = document.getElementById("pagination");
  if (!container) return;
  container.innerHTML = "";

  // Previous button
  const prev = document.createElement("button");
  prev.textContent = "‹";
  prev.disabled = current <= 1;
  prev.addEventListener("click", () => {
    if (current > 1) {
      renderProducts(currentList, current - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  container.appendChild(prev);

  // Show page numbers (logic hiển thị ngắn gọn: cố gắng hiển thị 1..n, rút gọn khi nhiều)
  const maxButtons = 7; // số nút trang tối đa hiển thị
  let start = Math.max(1, current - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxButtons + 1);
  }

  if (start > 1) {
    const b = document.createElement("button");
    b.textContent = "1";
    b.addEventListener("click", () => {
      renderProducts(currentList, 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    container.appendChild(b);
    if (start > 2) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      dots.style.padding = "8px";
      container.appendChild(dots);
    }
  }

  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === current) btn.classList.add("active");
    btn.addEventListener("click", () => {
      renderProducts(currentList, i);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    container.appendChild(btn);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      dots.style.padding = "8px";
      container.appendChild(dots);
    }
    const lastBtn = document.createElement("button");
    lastBtn.textContent = totalPages;
    lastBtn.addEventListener("click", () => {
      renderProducts(currentList, totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    container.appendChild(lastBtn);
  }

  // Next button
  const next = document.createElement("button");
  next.textContent = "›";
  next.disabled = current >= totalPages;
  next.addEventListener("click", () => {
    if (current < totalPages) {
      renderProducts(currentList, current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  container.appendChild(next);
}

// ---------- Hook with filters/search ----------
// Nếu bạn đã có các hàm filterProducts() hoặc search, hãy gọi renderProducts(filteredList, 1)
// ví dụ (nếu có):
// function filterProducts(...) {
//   const filtered = products.filter(...);
//   renderProducts(filtered, 1); // reset về trang 1
// }

// ---------- Init: hiển thị trang đầu ----------

function applyAllFilters() {
  // 1. Lấy tất cả giá trị bộ lọc
  const priceValue = document.getElementById("priceFilter").value;
  const colorValue = document.getElementById("colorFilter").value.toLowerCase();
  const glassValue = document.getElementById("glassFilter").value.toLowerCase();
  const strapValue = document.getElementById("strapFilter").value.toLowerCase();
  const genderValue = document
    .getElementById("genderFilter")
    .value.toLowerCase();
  const searchText = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase(); // Lấy giá trị tìm kiếm

  // 2. Lọc trên MẢNG GỐC (products)
  const filtered = localproducts.filter(function (p) {
    // TIÊU CHÍ 1: TÌM KIẾM THEO TÊN
    let matchSearch = true;
    if (searchText) {
      // Tên sản phẩm có chứa từ khóa tìm kiếm
      matchSearch = p.name.toLowerCase().includes(searchText);
    }

    // TIÊU CHÍ 2: LỌC THEO GIÁ
    let matchPrice = true;
    if (priceValue) {
      if (priceValue === "duoi3") matchPrice = p.priceValue < 3000000;
      else if (priceValue === "tren10") matchPrice = p.priceValue > 10000000;
      else {
        const parts = priceValue.split("-");
        const min = Number(parts[0]) * 1000000;
        const max = Number(parts[1]) * 1000000;
        matchPrice = p.priceValue >= min && p.priceValue <= max;
      }
    }

    // TIÊU CHÍ 3, 4, 5, 6: LỌC THEO THUỘC TÍNH KHÁC
    let matchColor = !colorValue || p.color.toLowerCase() === colorValue;
    let matchGlass = !glassValue || p.glass.toLowerCase() === glassValue;
    let matchStrap = !strapValue || p.strap.toLowerCase() === strapValue;
    let matchGender = !genderValue || p.gender.toLowerCase() === genderValue;

    // Phải thỏa mãn TẤT CẢ các tiêu chí
    return (
      matchSearch &&
      matchPrice &&
      matchColor &&
      matchGlass &&
      matchStrap &&
      matchGender
    );
  });

  // 3. Render kết quả (Reset về trang 1)
  renderProducts(filtered, 1);
}

// *** THAY THẾ: Sửa hàm filterProducts() cũ để gọi hàm mới ***
function filterProducts() {
  applyAllFilters();
}

// *** THAY THẾ: Thêm hàm searchProducts() để gọi hàm mới (vì nó được gọi trong index.html) ***
function searchProducts() {
  applyAllFilters();
}

// =================== LỌC THEO DANH MỤC ===================
function renderProductsByCatalog(catalogName) {
  const filtered = localproducts.filter((p) => p.catalog === catalogName);
  renderProducts(filtered, 1); // render trang đầu tiên
  // Làm nổi mục đang chọn
  document.querySelectorAll("#catalog-list li").forEach((li) => {
    li.classList.toggle("active", li.dataset.catalog === catalogName);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Kết nối sự kiện cho danh mục ở footer
  attachCatalogEvents();

  // Kiểm tra xem URL có ?category=... không
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("category");

  if (cat) {
    renderProductsByCatalog(cat); // Lọc tự động theo danh mục khi có query
  } else {
    renderProducts(localproducts, 1); // Hiển thị tất cả nếu không chọn danh mục
  }
});

// Hàm lọc sản phẩm theo danh mục
function filterByCategory(category) {
  const filtered = localproducts.filter((p) => p.category === category);
  renderProducts(filtered);
}

// Làm nổi danh mục đã chọn
function highlightActiveCategory(category) {
  document.querySelectorAll("#catalog-list li").forEach((li) => {
    li.classList.toggle("active", li.dataset.catalog === category);
  });
}

function attachCatalogEvents() {
  const items = document.querySelectorAll("#catalog-list li");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const catalog = item.dataset.catalog; // lấy loại từ footer
      renderProductsByCatalog(catalog);
      item.classList.add("active");

      // Ẩn phần chi tiết sản phẩm (nếu đang mở)
      const detail = document.getElementById("product-detail");
      if (detail) detail.style.display = "none";
      // Hiện lại danh sách
      const list = document.getElementById("product-list-wrapper");
      if (list) list.style.display = "block";

      // Cuộn lên vùng sản phẩm
      list.scrollIntoView({ behavior: "smooth" });

      // Cập nhật URL (để có thể share)
      history.replaceState(
        null,
        "",
        `?category=${encodeURIComponent(catalog)}#sanpham`
      );
    });
  });
}

// Nghe thay đổi localStorage từ tab khác
window.addEventListener("storage", (event) => {
  if (event.key === "productsLocal") {
    window.dispatchEvent(new Event("productsUpdated"));
  }
});
window.addEventListener("productsUpdated", () => {
  localproducts = getLocalProducts();
  renderProducts();
});
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
