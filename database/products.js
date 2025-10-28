const products = [
  // BABY-G
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
    importPrice: 4224500, // 85% của 4970000
    quantity: 320,
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
  },
  {
    id: "ECB-900DB-1B",
    catalog: "EDIFICE",
    name: "EDIFICE ECB-900DB-1B",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 9250000,
    price: "9.250.000₫",
    image: "assets/img/Edifice/ECB-900DB-1B.png",
    importPrice: 6937500, // 75% của 9250000
    quantity: 290,
  },
  // G-SHOCK
  {
    id: "GST-B600D-1A",
    catalog: "G-SHOCK",
    name: "G-SHOCK GST-B600D-1A",
    gender: "Nam",
    desc: "Đồng hồ Nam chính hãng CASIO",
    color: "Đen",
    glass: "Khoáng",
    strap: "Kim loại",
    priceValue: 8250000,
    price: "8.250.000₫",
    image: "assets/img/G-Shock/GST-B600D-1A.jpg",
    importPrice: 6600000, // 80% của 8250000
    quantity: 0,
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
  },
  // SHEEN
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
  },
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
      <p class="price">${p.price}</p>
    `;
    // Thêm đoạn này để chuyển sang trang chi tiết
    card.addEventListener("click", () => {
      window.location.href = `chitietsanpham.html?id=${encodeURIComponent(p.id)}`;
    });
    grid.appendChild(card);
  });
}

// Hiển thị tối đa 100 sản phẩm
renderProducts(products, 100);

// BỘ LỌC
document.querySelector("aside button").addEventListener("click", () => {
  const selects = document.querySelectorAll(".filter-group select");

  // Lấy giá trị các bộ lọc
  const priceRange = selects[0].value;
  const color = selects[1].value;
  const glass = selects[2].value;
  const strap = selects[3].value;
  const gender = selects[4].value;

  // Mặc định giá trị tối thiểu và tối đa
  let minPrice = 0;
  let maxPrice = Infinity;

  // Xử lý theo từng lựa chọn khoảng giá
  switch (priceRange) {
    case "Dưới 3.000.000₫":
      maxPrice = 3000000;
      break;
    case "3.000.000₫ - 5.000.000₫":
      minPrice = 3000000;
      maxPrice = 5000000;
      break;
    case "5.000.000₫ - 7.000.000₫":
      minPrice = 5000000;
      maxPrice = 7000000;
      break;
    case "7.000.000₫ - 10.000.000₫":
      minPrice = 7000000;
      maxPrice = 10000000;
      break;
    case "Trên 10.000.000₫":
      minPrice = 10000000;
      maxPrice = Infinity;
      break;
  }

  // Lọc sản phẩm
  const filtered = products.filter((p) => {
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
    renderProducts(filtered, 100);
  }
});
// Chọn danh sách các li trong "Danh mục sản phẩm"
const catalogItems = document.querySelectorAll("#catalog-list li");

// Gắn sự kiện click cho từng loại
function attachCatalogEvents() {
  const catalogItems = document.querySelectorAll("#catalog-list li");
  if (catalogItems.length === 0) return; // chưa có footer thì thoát

  catalogItems.forEach((item) => {
    item.addEventListener("click", () => {
      catalogItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const selectedCatalog = item.dataset.catalog;
      const filtered = products.filter((p) => p.catalog === selectedCatalog);

      if (filtered.length === 0) {
        grid.innerHTML = "<p>Không có sản phẩm nào thuộc loại này.</p>";
      } else {
        renderProducts(filtered, 100);
      }

      // Cuộn lên đầu trang khi hiển thị sản phẩm mới
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

catalogItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Bỏ active ở các loại khác
    catalogItems.forEach((i) => i.classList.remove("active"));
    // Thêm active cho loại được click
    item.classList.add("active");

    const selectedCatalog = item.dataset.catalog;
    const filtered = products.filter((p) => p.catalog === selectedCatalog);
    if (filtered.length === 0) {
      grid.innerHTML = "<p>Không có sản phẩm nào thuộc loại này.</p>";
    } else {
      renderProducts(filtered, 100);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
