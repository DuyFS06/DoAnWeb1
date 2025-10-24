

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
    reviews: 150,
    image: "assets/img/Baby-G/BA-110AH-6A.jpg"
  },
  {
    id:"BG-169U-3",
    catalog: "BABY-G",
    name: "BABY-G BG-169U-3",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Xanh lá",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 2620000,
    price: "2.620.000₫", 
    reviews: 85,
    image: "assets/img/Baby-G/BG-169U-3.jpg"
  },
  {
    id:"BGA-280TD-7A",
    catalog: "BABY-G",
    name: "BABY-G BGA-280TD-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Trắng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3520000,
    price: "3.520.000₫",
    reviews: 60,
    image: "assets/img/Baby-G/BGA-280TD-7A.jpg"
  },
  {
    id:"BGA-290-1A",
    catalog: "BABY-G",
    name: "BABY-G BGA-290-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 3150000,
    price: "3.150.000₫",
    review: 75,
    image: "assets/img/Baby-G/BGA-290-1A.png"
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
    reviews: 132,
    image: "assets/img/Baby-G/BGA-310C-1A.jpg"
  },
  {
    id: "BGD-560BC-3",
    catalog: "BABY-G",
    name: "BABY-G BGD-560BC-3",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Trắng",
    glass: "Nhựa",
    strap: "Kim loại",
    priceValue: 3850000,
    price: "3.850.000₫",
    reviews: 88,
    image: "assets/img/Baby-G/BGD-560BC-3.png"
  },
  {
    id: "BGD-570XG-8",
    catalog: "BABY-G",
    name: "BABY-G BGD-570XG-8",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Bạc",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 4970000,
    price: "4.970.000₫",
    reviews: 174,
    image: "assets/img/Baby-G/BGD-570XG-8.png"
  },
  {
    id: "LOV-20A-7A-b",
    catalog: "BABY-G",
    name: "BABY-G LOV-20A-7A-b",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Hồng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 5520000,
    price: "5.520.000₫",
    reviews: 201,
    image: "assets/img/Baby-G/LOV-20A-7A-b.png"
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
    reviews: 143,
    image: "assets/img/Baby-G/MSG-S200D-7A.png"
  },
  {
    id: "MSG-S500CD-7A",
    catalog: "BABY-G",
    name: "BABY-G MSG-S500CD-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 6980000,
    price: "6.980.000₫",
    reviews: 120,
    image: "assets/img/Baby-G/MSG-S500CD-7A.png"
  },

  //EDIFICE
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
    reviews: 132,
    image: "assets/img/Edifice/EFV-650D-2BV.jpg"
  },
  {
    id: "EQS-940NL-1AV",
    catalog: "EDIFICE",
    name: "EDIFICE EQS-940NL-1AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 5120000,
    price: "5.120.000₫",
    reviews: 210,
    image: "assets/img/Edifice/EQS-940NL-1AV.jpg"
  },
  {
    id: "EFV-C120L-8A",
    catalog: "EDIFICE",
    name: "EDIFICE EFV-C120L-8A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Trắng",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 2980000,
    price: "2.980.000₫",
    reviews: 165,
    image: "assets/img/Edifice/EFV-C120L-8A.jpg"
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
    reviews: 94,
    image: "assets/img/Edifice/EFV-550L-2AV.png"
  },
  {
    id: "EFV-140L-1AV",
    catalog: "EDIFICE",
    name: "EDIFICE EFV-140L-1AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 4220000,
    price: "4.220.000₫",
    reviews: 178,
    image: "assets/img/Edifice/EFV-140L-1AV.png"
  },
  {
    id: "EFR-552GL-7AV",
    catalog: "EDIFICE",
    name: "EDIFICE EFR-552GL-7AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Vàng",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 5180000,
    price: "5.180.000₫",
    reviews: 152,
    image: "assets/img/Edifice/EFR-552GL-7AV.png"
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
    reviews: 199,
    image: "assets/img/Edifice/EFB-730D-2BV.jpg"
  },
  {
    id: "EFB-710D-7AV",
    catalog: "EDIFICE",
    name: "EDIFICE EFB-710D-7AV",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Trắng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 6120000,
    price: "6.120.000₫",
    reviews: 187,
    image: "assets/img/Edifice/EFB-710D-7AV.jpg"
  },
  {
    id: "ECB-2200HTR-1A",
    catalog: "EDIFICE",
    name: "EDIFICE ECB-2200HTR-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 7150000,
    price: "7.150.000₫",
    reviews: 243,
    image: "assets/img/Edifice/ECB-2200HTR-1A.jpg"
  },
  {
    id: "ECB-900DB-1B",
    catalog: "EDIFICE",
    name: "EDIFICE ECB-900DB-1B",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 9250000,
    price: "9.250.000₫",
    reviews: 320,
    image: "assets/img/Edifice/ECB-900DB-1B.png"
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
    reviews: 210,
    image: "assets/img/G-Shock/GST-B600D-1A.jpg"
  },
  {
    id: "GMW-B5000SS-2",
    catalog: "G-SHOCK",
    name: "G-SHOCK GMW-B5000SS-2",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Xanh",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 12900000,
    price: "12.900.000₫",
    reviews: 185,
    image: "assets/img/G-Shock/GMW-B5000SS-2.jpg"
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
    reviews: 155,
    image: "assets/img/G-Shock/GMA-S120SA-7A2.jpg"
  },
  {
    id: "GMA-P2125W-6A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GMA-P2125W-6A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Hồng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 4150000,
    price: "4.150.000₫",
    reviews: 130,
    image: "assets/img/G-Shock/GMA-P2125W-6A.jpg"
  },
  {
    id: "GMA-P2100PC-4A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GMA-P2100PC-4A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Hồng",
    glass: "Sapphire",
    strap: "Nhựa",
    priceValue: 4350000,
    price: "4.350.000₫",
    reviews: 180,
    image: "assets/img/G-Shock/GMA-P2100PC-4A.jpg"
  },
  {
    id: "GM-S2110B-8A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GM-S2110B-8A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Bạc",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 6980000,
    price: "6.980.000₫",
    reviews: 165,
    image: "assets/img/G-Shock/GM-S2110B-8A.jpg"
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
    reviews: 240,
    image: "assets/img/G-Shock/GM-B2100SD-1A.jpg"
  },
  {
    id: "GM-2110D-2B",
    catalog: "G-SHOCK",
    name: "G-SHOCK GM-2110D-2B",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Xanh",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 7850000,
    price: "7.850.000₫",
    reviews: 175,
    image: "assets/img/G-Shock/GM-2110D-2B.jpg"
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
    reviews: 260,
    image: "assets/img/G-Shock/GA-700BBR-1A.jpg"
  },
  {
    id: "G-SHOCK-GM-2110D-2B",
    catalog: "G-SHOCK",
    name: "G-SHOCK GM-2110D-2B",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Xanh",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 8250000,
    price: "8.250.000₫",
    reviews: 195,
    image: "assets/img/G-Shock/GM-2110D-2B.jpg"
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
    reviews: 145,
    image: "assets/img/Pro-Trek/PRG-340L-5.jpg"
  },
  {
    id: "PRJ-B001B-1",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRJ-B001B-1",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Nhựa",
    priceValue: 10300000,
    price: "10.300.000₫",
    reviews: 189,
    image: "assets/img/Pro-Trek/PRJ-B001B-1.jpg"
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
    reviews: 172,
    image: "assets/img/Pro-Trek/PRT-B50-4.png"
  },
  {
    id: "PRT-B70-2",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRT-B70-2",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Xanh",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 8100000,
    price: "8.100.000₫",
    reviews: 210,
    image: "assets/img/Pro-Trek/PRT-B70-2.png"
  },
  {
    id: "PRW-30Y-1B",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-30Y-1B",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Nhựa",
    priceValue: 9500000,
    price: "9.500.000₫",
    reviews: 220,
    image: "assets/img/Pro-Trek/PRW-30Y-1B.png"
  },
  {
    id: "PRW-35-7",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-35-7",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Trắng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 8700000,
    price: "8.700.000₫",
    reviews: 165,
    image: "assets/img/Pro-Trek/PRW-35-7.jpg"
  },
  {
    id: "PRW-50Y-1A",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-50Y-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Sapphire",
    strap: "Nhựa",
    priceValue: 11200000,
    price: "11.200.000₫",
    reviews: 235,
    image: "assets/img/Pro-Trek/PRW-50Y-1A.png"
  },
  {
    id: "PRW-3500SYT-1",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-3500SYT-1",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Bạc",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 14500000,
    price: "14.500.000₫",
    reviews: 190,
    image: "assets/img/Pro-Trek/PRW-3500SYT-1.jpg"
  },
  {
    id: "PRW-6000SC-7",
    catalog: "PRO-TREK",
    name: "PRO-TREK PRW-6000SC-7",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Trắng",
    glass: "Khoáng",
    strap: "Nhựa",
    priceValue: 12500000,
    price: "12.500.000₫",
    reviews: 260,
    image: "assets/img/Pro-Trek/PRW-6000SC-7.jpg"
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
    reviews: 178,
    image: "assets/img/Pro-Trek/PRW-S3100-1.jpg"
  },
  
//SHEEN
  {
    id: "SHE-3517L-1A",
    catalog: "SHEEN",
    name: "SHEEN SHE-3517L-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Da",
    priceValue: 3450000,
    price: "3.450.000₫",
    reviews: 120,
    image: "assets/img/Sheen/SHE-3517L-1A.jpg"
  },

  {
    id: "SHE-4055PG-7A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4055PG-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Vàng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 4820000,
    price: "4.820.000₫",
    reviews: 160,
    image: "assets/img/Sheen/SHE-4055PG-7A.png"
  },

  {
    id: "SHE-4057PGL-7B",
    catalog: "SHEEN",
    name: "SHEEN SHE-4057PGL-7B",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Trắng",
    glass: "Sapphire",
    strap: "Da",
    priceValue: 3980000,
    price: "3.980.000₫",
    reviews: 142,
    image: "assets/img/Sheen/SHE-4057PGL-7B.png"
  },

  {
    id: "SHE-4532PG-1A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4532PG-1A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 5120000,
    price: "5.120.000₫",
    reviews: 189,
    image: "assets/img/Sheen/SHE-4532PG-1A.png"
  },

  {
    id: "SHE-4538D-7A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4538D-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Trắng",
    glass: "Sapphire",
    strap: "Kim loại",
    priceValue: 5780000,
    price: "5.780.000₫",
    reviews: 215,
    image: "assets/img/Sheen/SHE-4538D-7A.png"
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
    reviews: 230,
    image: "assets/img/Sheen/SHE-4539BGM-1A.jpg"
  },

  {
    id: "SHE-4540D-7A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4540D-7A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Bạc",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 4980000,
    price: "4.980.000₫",
    reviews: 175,
    image: "assets/img/Sheen/SHE-4540D-7A.jpg"
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
    reviews: 201,
    image: "assets/img/Sheen/SHE-4558G-9A.jpg"
  },

  {
    id: "SHE-4562M-2A",
    catalog: "SHEEN",
    name: "SHEEN SHE-4562M-2A",
    gender: "Nữ",
    desc: "Đồng hồ Nữ chính hãng CASIO",
    color: "Xanh",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 5340000,
    price: "5.340.000₫",
    reviews: 160,
    image: "assets/img/Sheen/SHE-4562M-2A.jpg"
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
    reviews: 188,
    image: "assets/img/Sheen/SHE-4562PGL-4A.jpg"
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
      <h3 class="desc">${p.desc} ${p.name}</h3> 
      <div class=(${p.reviews} đánh giá)</div>
      <p class="price">${p.price}</p>
    `;
    grid.appendChild(card);
  });
}



// Hiển thị tối đa 100 sản phẩm 
renderProducts(products, 100);

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
    const matchGender = gender === "Tất cả" || p.gender === gender;

    return matchPrice && matchColor && matchGlass && matchStrap && matchGender;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>";
  } else {
    renderProducts(filtered, 20);
  }
});

