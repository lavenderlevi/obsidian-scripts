// ===== CƠ SỞ DỮ LIỆU 25 BỘ CỔ VẬT (200 RELICS) KHOA HỌC LƯỢNG TỬ =====
// Được biên soạn chuẩn xác cho hệ thống Quantum-AI RPG 2.0
// Tỉ lệ: 25 Bộ x 8 Cổ Vật = Đúng 200 Cổ Vật duy nhất.

const RELIC_SETS = [
  {
    "id": "set_1",
    "name": "Mạng Tinh Thể Bravais",
    "icon": "💎",
    "bonus4": "+10% Vàng nhận từ Concept notes",
    "bonus8": "Danh hiệu: [Bậc Thầy Ô Mạng Bravais] & +1 SP vĩnh viễn",
    "relicIds": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ]
  },
  {
    "id": "set_2",
    "name": "Sai Hỏng Điểm & Biên Hạt",
    "icon": "🧩",
    "bonus4": "+15% Vàng nhận từ Equation notes",
    "bonus8": "Danh hiệu: [Kẻ Khắc Chế Khuyết Tật] & +1 SP vĩnh viễn",
    "relicIds": [
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ]
  },
  {
    "id": "set_3",
    "name": "Cơ Chế Lệch Mạng & Cương Hóa",
    "icon": "⚔️",
    "bonus4": "+15% Vàng nhận từ Problem notes",
    "bonus8": "Danh hiệu: [Đại Sư Cương Hóa Kim Loại] & +2 AP vĩnh viễn",
    "relicIds": [
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24
    ]
  },
  {
    "id": "set_4",
    "name": "Khuếch Tán & Định Luật Fick",
    "icon": "🌡️",
    "bonus4": "+10% Vàng từ mọi nguồn",
    "bonus8": "Danh hiệu: [Nhà Giả Kim Khuếch Tán] & +1 SP vĩnh viễn",
    "relicIds": [
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32
    ]
  },
  {
    "id": "set_5",
    "name": "Ứng Suất & Biến Dạng Cơ Học",
    "icon": "🛡️",
    "bonus4": "+1 AP tự do vào VIT",
    "bonus8": "Danh hiệu: [Thiết Giáp Bất Hoại] & +2 AP vĩnh viễn",
    "relicIds": [
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40
    ]
  },
  {
    "id": "set_6",
    "name": "Liên Kết Nguyên Tử & Năng Lượng",
    "icon": "⚛️",
    "bonus4": "+1 AP tự do vào INT",
    "bonus8": "Danh hiệu: [Kiến Trúc Sư Liên Kết] & +1 SP vĩnh viễn",
    "relicIds": [
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48
    ]
  },
  {
    "id": "set_7",
    "name": "Nhiễu Xạ Sóng & Mạng Đảo",
    "icon": "📡",
    "bonus4": "+5% Tỉ lệ rớt Rương Lượng Tử",
    "bonus8": "Danh hiệu: [Tiên Tri Nhiễu Xạ Bragg] & +1 SP vĩnh viễn",
    "relicIds": [
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56
    ]
  },
  {
    "id": "set_8",
    "name": "Vật Lý Chất Rắn Kittel",
    "icon": "🧊",
    "bonus4": "+10% Vàng từ mọi nguồn",
    "bonus8": "Danh hiệu: [Đại Hiền Giả Chất Rắn Kittel] & +2 AP vĩnh viễn",
    "relicIds": [
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      64
    ]
  },
  {
    "id": "set_9",
    "name": "Hàm Sóng & Xác Suất Lượng Tử",
    "icon": "🌊",
    "bonus4": "+1 AP tự do vào INT",
    "bonus8": "Danh hiệu: [Pháp Sư Hàm Sóng Griffiths] & +1 SP vĩnh viễn",
    "relicIds": [
      65,
      66,
      67,
      68,
      69,
      70,
      71,
      72
    ]
  },
  {
    "id": "set_10",
    "name": "Toán Tử & Nguyên Lý Bất Định",
    "icon": "🌌",
    "bonus4": "+10% Vàng nhận từ Equation notes",
    "bonus8": "Danh hiệu: [Kẻ Phá Vỡ Giới Hạn Bất Định] & +2 AP vĩnh viễn",
    "relicIds": [
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80
    ]
  },
  {
    "id": "set_11",
    "name": "Thế Năng & Xuyên Hầm Lượng Tử",
    "icon": "🌀",
    "bonus4": "+5% Tỉ lệ rớt Rương Lượng Tử",
    "bonus8": "Danh hiệu: [Bậc Thầy Xuyên Hầm Hư Không] & +1 SP vĩnh viễn",
    "relicIds": [
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88
    ]
  },
  {
    "id": "set_12",
    "name": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "icon": "💻",
    "bonus4": "+15% Vàng nhận từ Concept notes",
    "bonus8": "Danh hiệu: [Kiến Trúc Sư Phiếm Hàm Kohn-Sham] & +2 AP vĩnh viễn",
    "relicIds": [
      89,
      90,
      91,
      92,
      93,
      94,
      95,
      96
    ]
  },
  {
    "id": "set_13",
    "name": "Siêu Tính Toán Quantum ESPRESSO",
    "icon": "⚡",
    "bonus4": "+20% Vàng nhận từ Problem notes",
    "bonus8": "Danh hiệu: [Kỹ Sư Trưởng Quantum ESPRESSO] & +1 SP vĩnh viễn",
    "relicIds": [
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104
    ]
  },
  {
    "id": "set_14",
    "name": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "icon": "📊",
    "bonus4": "+1 AP tự do vào DEX",
    "bonus8": "Danh hiệu: [Bậc Thầy Khe Năng Lượng Bandgap] & +2 AP vĩnh viễn",
    "relicIds": [
      105,
      106,
      107,
      108,
      109,
      110,
      111,
      112
    ]
  },
  {
    "id": "set_15",
    "name": "Động Lực Học Phân Tử (MD)",
    "icon": "🧪",
    "bonus4": "+1 AP tự do vào VIT",
    "bonus8": "Danh hiệu: [Chỉ Huy Quỹ Đạo Nguyên Tử MD] & +1 SP vĩnh viễn",
    "relicIds": [
      113,
      114,
      115,
      116,
      117,
      118,
      119,
      120
    ]
  },
  {
    "id": "set_16",
    "name": "Informatics & Data Science Vật Liệu",
    "icon": "📈",
    "bonus4": "+20% Vàng nhận từ Concept notes",
    "bonus8": "Danh hiệu: [Nhà Khai Phá Dữ Liệu Vật Liệu] & +2 AP vĩnh viễn",
    "relicIds": [
      121,
      122,
      123,
      124,
      125,
      126,
      127,
      128
    ]
  },
  {
    "id": "set_17",
    "name": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "icon": "🔮",
    "bonus4": "+15% Vàng nhận từ Problem notes",
    "bonus8": "Danh hiệu: [Kiến Trúc Sư Đồ Thị Lượng Tử] & +1 SP vĩnh viễn",
    "relicIds": [
      129,
      130,
      131,
      132,
      133,
      134,
      135,
      136
    ]
  },
  {
    "id": "set_18",
    "name": "Thế Năng Học Máy (MLIP)",
    "icon": "🧠",
    "bonus4": "+1 AP tự do vào DEX",
    "bonus8": "Danh hiệu: [Bậc Thầy Thế Năng Học Máy] & +2 AP vĩnh viễn",
    "relicIds": [
      137,
      138,
      139,
      140,
      141,
      142,
      143,
      144
    ]
  },
  {
    "id": "set_19",
    "name": "Thiết Kế Vật Liệu Nghịch Đảo",
    "icon": "🪐",
    "bonus4": "+10% Tỉ lệ rớt Rương Lượng Tử",
    "bonus8": "Danh hiệu: [Hiền Giả Sáng Tạo Tinh Thể] & +2 SP vĩnh viễn",
    "relicIds": [
      145,
      146,
      147,
      148,
      149,
      150,
      151,
      152
    ]
  },
  {
    "id": "set_20",
    "name": "Tinh Thể Bán Dẫn & Quang Điện",
    "icon": "💡",
    "bonus4": "+15% Vàng nhận từ Equation notes",
    "bonus8": "Danh hiệu: [Chúa Tể Bán Dẫn & Quang Tử] & +2 AP vĩnh viễn",
    "relicIds": [
      153,
      154,
      155,
      156,
      157,
      158,
      159,
      160
    ]
  },
  {
    "id": "set_21",
    "name": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "icon": "⚡",
    "bonus4": "+20% Vàng từ mọi nguồn",
    "bonus8": "Danh hiệu: [Thần Khí Siêu Dẫn Meissner] & +2 SP vĩnh viễn",
    "relicIds": [
      161,
      162,
      163,
      164,
      165,
      166,
      167,
      168
    ]
  },
  {
    "id": "set_22",
    "name": "Nhiệt Động Lực Học & Entropy",
    "icon": "🔥",
    "bonus4": "+1 AP tự do vào INT",
    "bonus8": "Danh hiệu: [Chúa Tể Entropy Vũ Trụ] & +2 AP vĩnh viễn",
    "relicIds": [
      169,
      170,
      171,
      172,
      173,
      174,
      175,
      176
    ]
  },
  {
    "id": "set_23",
    "name": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "icon": "🗺️",
    "bonus4": "+15% Vàng nhận từ Problem notes",
    "bonus8": "Danh hiệu: [Nhà Bản Đồ Học Giản Đồ Pha] & +2 AP vĩnh viễn",
    "relicIds": [
      177,
      178,
      179,
      180,
      181,
      182,
      183,
      184
    ]
  },
  {
    "id": "set_24",
    "name": "Vật Liệu Tô-Pô & Spintronics",
    "icon": "🌀",
    "bonus4": "+1 AP tự do vào DEX",
    "bonus8": "Danh hiệu: [Đại Sư Tô-Pô Lượng Tử] & +3 AP vĩnh viễn",
    "relicIds": [
      185,
      186,
      187,
      188,
      189,
      190,
      191,
      192
    ]
  },
  {
    "id": "set_25",
    "name": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "icon": "👑",
    "bonus4": "+25% Vàng & +10% Tỉ lệ rớt Rương",
    "bonus8": "Danh hiệu: [CHÚA TỂ ĐIỂM KỲ DỊ VẬT CHẤT VŨ TRỤ] & +3 SP & +5 AP vĩnh viễn",
    "relicIds": [
      193,
      194,
      195,
      196,
      197,
      198,
      199,
      200
    ]
  }
];

const RELICS_DATABASE = [
  {
    "id": 1,
    "name": "Mảnh Vỡ Mạng FCC (Lập Phương Diện Tâm)",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "common",
    "lore": "Ô mạng có mật độ xếp chặt nguyên tử 0.74."
  },
  {
    "id": 2,
    "name": "Mảnh Vỡ Mạng BCC (Lập Phương Thể Tâm)",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "common",
    "lore": "Cấu trúc tinh thể điển hình của Sắt ở nhiệt độ phòng."
  },
  {
    "id": 3,
    "name": "Khối Tinh Thể Lục Giác Xếp Chặt HCP",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "common",
    "lore": "Hệ lục giác với tỉ lệ c/a lý tưởng 1.633."
  },
  {
    "id": 4,
    "name": "Bộ Ba Chỉ Số Miller [111]",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "rare",
    "lore": "Véc-tơ phương tinh thể định hướng mật độ nguyên tử cao nhất."
  },
  {
    "id": 5,
    "name": "Mặt Tinh Thể Đậm Đặc (110)",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "rare",
    "lore": "Mặt phẳng trượt ưu tiên trong mạng lập phương thể tâm."
  },
  {
    "id": 6,
    "name": "Mạng Tứ Giác Nguyên Thủy Tetragonal",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "rare",
    "lore": "Biến dạng kéo dài một trục của mạng lập phương."
  },
  {
    "id": 7,
    "name": "Lăng Kính Đơn Nghiêng Monoclinic",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "epic",
    "lore": "Hệ tinh thể có một góc nghiêng bất đối xứng."
  },
  {
    "id": 8,
    "name": "Vương Miện 14 Ô Mạng Bravais Hoàn Hảo",
    "set_id": "set_1",
    "setName": "Mạng Tinh Thể Bravais",
    "setIcon": "💎",
    "rarity": "legendary",
    "lore": "Toàn bộ cấu trúc tuần hoàn không gian 3 chiều của vật chất."
  },
  {
    "id": 9,
    "name": "Lỗ Trống Tinh Thể (Vacancy Shard)",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "common",
    "lore": "Khoảng trống do nguyên tử rời khỏi vị trí nút mạng."
  },
  {
    "id": 10,
    "name": "Nguyên Tử Xen Kẽ (Self-Interstitial)",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "common",
    "lore": "Nguyên tử chen vào khe hẹp tạo biến dạng cục bộ."
  },
  {
    "id": 11,
    "name": "Cặp Sai Hỏng Schottky",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "rare",
    "lore": "Cặp khuyết tật cation và anion bảo toàn điện tích tinh thể."
  },
  {
    "id": 12,
    "name": "Cặp Sai Hỏng Frenkel",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "rare",
    "lore": "Cation rời nút mạng di chuyển vào vị trí xen kẽ."
  },
  {
    "id": 13,
    "name": "Biên Hạt Góc Lớn (High-Angle Boundary)",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "rare",
    "lore": "Vùng ranh giới giữa hai hạt tinh thể định hướng khác nhau."
  },
  {
    "id": 14,
    "name": "Biên Hạt Góc Nhỏ (Low-Angle Boundary)",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "epic",
    "lore": "Dãy lệch mạng biên sắp xếp song song tuần hoàn."
  },
  {
    "id": 15,
    "name": "Mặt Cặp Song Tinh (Twin Boundary)",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "epic",
    "lore": "Biên giới đối xứng gương hoàn hảo giữa hai miền tinh thể."
  },
  {
    "id": 16,
    "name": "Gương Thấu Thị Cấu Trúc Khuyết Tật",
    "set_id": "set_2",
    "setName": "Sai Hỏng Điểm & Biên Hạt",
    "setIcon": "🧩",
    "rarity": "legendary",
    "lore": "Bảo vật phơi bày mọi sai hỏng ẩn sâu trong mạng tinh thể."
  },
  {
    "id": 17,
    "name": "Đoạn Lệch Mạng Biên (Edge Dislocation)",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "common",
    "lore": "Nửa mặt phẳng nguyên tử thừa chèn vào mạng tinh thể."
  },
  {
    "id": 18,
    "name": "Đoạn Lệch Mạng Xoắn (Screw Dislocation)",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "common",
    "lore": "Mặt phẳng xoắn ốc bậc thang bao quanh trục lệch mạng."
  },
  {
    "id": 19,
    "name": "Véc-tơ Burgers Nguyên Thủy",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "rare",
    "lore": "Véc-tơ xác định độ lớn và hướng biến dạng của lệch mạng."
  },
  {
    "id": 20,
    "name": "Mặt Trượt Tinh Thể Tối Ưu",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "rare",
    "lore": "Mặt phẳng có mật độ xếp chặt nhất mà lệch mạng di chuyển."
  },
  {
    "id": 21,
    "name": "Nút Thắt Lệch Mạng Frank-Read",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "rare",
    "lore": "Nguồn phát sinh hàng loạt vòng lệch mạng dưới ứng suất."
  },
  {
    "id": 22,
    "name": "Đám Mây Cottrell Khóa Lệch Mạng",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "epic",
    "lore": "Các nguyên tử xen kẽ tụ tập ghim chặt đường lệch mạng."
  },
  {
    "id": 23,
    "name": "Hạt Pha Thứ Hai Cản Trở Trượt",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "epic",
    "lore": "Cơ chế Orowan uốn cong lệch mạng qua các hạt phân tán."
  },
  {
    "id": 24,
    "name": "Bảo Kiếm Tôi Cứng Hall-Petch",
    "set_id": "set_3",
    "setName": "Cơ Chế Lệch Mạng & Cương Hóa",
    "setIcon": "⚔️",
    "rarity": "legendary",
    "lore": "Sức mạnh cơ tính tăng vọt nhờ tinh luyện kích thước hạt siêu mịn."
  },
  {
    "id": 25,
    "name": "Dòng Khuếch Tán Ổn Định Fick I",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "common",
    "lore": "Dòng vật chất tỉ lệ thuận với gradient nồng độ."
  },
  {
    "id": 26,
    "name": "Gradient Nồng Độ Nguyên Tử",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "common",
    "lore": "Độ chênh lệch mật độ dẫn động dòng di chuyển nguyên tử."
  },
  {
    "id": 27,
    "name": "Hệ Số Khuếch Tán Nhiệt Động D0",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "rare",
    "lore": "Hằng số tần số dao động nguyên tử vượt rào thế."
  },
  {
    "id": 28,
    "name": "Hàm Sai Số Gauss erf(z)",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "rare",
    "lore": "Nghiệm toán học chuẩn xác cho bài toán khuếch tán bán vô hạn."
  },
  {
    "id": 29,
    "name": "Năng Lượng Hoạt Hóa Khuếch Tán Q",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "rare",
    "lore": "Năng lượng rào cản cần vượt qua để nhảy sang ô bên cạnh."
  },
  {
    "id": 30,
    "name": "Cơ Chế Khuếch Tán Bề Mặt Siêu Tốc",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "epic",
    "lore": "Tốc độ di chuyển vượt trội trên bề mặt so với lòng khối."
  },
  {
    "id": 31,
    "name": "Khuếch Tán Dọc Biên Hạt",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "epic",
    "lore": "Đường cao tốc năng lượng cao cho các nguyên tử tạp chất."
  },
  {
    "id": 32,
    "name": "Ngọn Lửa Arrhenius Thần Thánh",
    "set_id": "set_4",
    "setName": "Khuếch Tán & Định Luật Fick",
    "setIcon": "🌡️",
    "rarity": "legendary",
    "lore": "Định luật nhiệt động điều khiển mọi tốc độ phản ứng trong vũ trụ."
  },
  {
    "id": 33,
    "name": "Đường Cong Ứng Suất - Biến Dạng",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "common",
    "lore": "Bản đồ thể hiện hành vi đàn hồi và dẻo của vật liệu."
  },
  {
    "id": 34,
    "name": "Giới Hạn Tỉ Lệ Đàn Hồi Hooke",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "common",
    "lore": "Vùng biến dạng có thể hồi phục hoàn toàn khi dỡ tải."
  },
  {
    "id": 35,
    "name": "Mô-đun Đàn Hồi Young E",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "rare",
    "lore": "Độ cứng vững chống lại biến dạng đàn hồi của liên kết."
  },
  {
    "id": 36,
    "name": "Hệ Số Co Ngang Poisson",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "rare",
    "lore": "Tỉ số giữa biến dạng ngang và biến dạng dọc trục kéo."
  },
  {
    "id": 37,
    "name": "Giới Hạn Chảy Quy Ước 0.2%",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "rare",
    "lore": "Điểm đánh dấu sự bắt đầu của biến dạng dẻo vĩnh cửu."
  },
  {
    "id": 38,
    "name": "Độ Bền Kéo Cực Đại UTS",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "epic",
    "lore": "Ứng suất lớn nhất vật liệu chịu được trước khi thắt cổ chai."
  },
  {
    "id": 39,
    "name": "Độ Dai Phá Hủy Tích Hợp",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "epic",
    "lore": "Khả năng hấp thụ năng lượng va đập trước khi nứt gãy."
  },
  {
    "id": 40,
    "name": "Khiên Hợp Kim Siêu Bền Cơ Tính",
    "set_id": "set_5",
    "setName": "Ứng Suất & Biến Dạng Cơ Học",
    "setIcon": "🛡️",
    "rarity": "legendary",
    "lore": "Tấm khiên hấp thụ xung lực và triệt tiêu mọi ứng suất kéo."
  },
  {
    "id": 41,
    "name": "Lực Hút Tĩnh Điện Coulomb",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "common",
    "lore": "Tương tác cơ bản giữa các ion trái dấu tích điện."
  },
  {
    "id": 42,
    "name": "Lực Đẩy Lượng Tử Pauli",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "common",
    "lore": "Nguyên lý loại trừ ngăn các đám mây điện tử chồng lấn."
  },
  {
    "id": 43,
    "name": "Liên Kết Cộng Hóa Trị Định Hướng",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "rare",
    "lore": "Cặp điện tử dùng chung tạo nên góc liên kết cứng vững."
  },
  {
    "id": 44,
    "name": "Đám Mây Điện Tử Tự Do Kim Loại",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "rare",
    "lore": "Biển electron linh động tạo tính dẫn điện và dẫn nhiệt."
  },
  {
    "id": 45,
    "name": "Cầu Nối Liên Kết Hydro",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "rare",
    "lore": "Tương tác lưỡng cực mạnh định hình cấu trúc DNA và nước."
  },
  {
    "id": 46,
    "name": "Lực Phân Tán Van der Waals Yếu",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "epic",
    "lore": "Tương tác cảm ứng giữa các phân tử trung hòa điện."
  },
  {
    "id": 47,
    "name": "Giếng Thế Năng Lennard-Jones (12-6)",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "epic",
    "lore": "Hàm thế kinh điển mô tả cân bằng hút-đẩy giữa hai nguyên tử."
  },
  {
    "id": 48,
    "name": "Trái Tim Năng Lượng Liên Kết Tinh Thể",
    "set_id": "set_6",
    "setName": "Liên Kết Nguyên Tử & Năng Lượng",
    "setIcon": "⚛️",
    "rarity": "legendary",
    "lore": "Nguồn năng lượng bền vững gắn kết muôn loài vật chất."
  },
  {
    "id": 49,
    "name": "Chùm Tia X Bước Sóng Angstrom",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "common",
    "lore": "Bức xạ điện từ có bước sóng tương đương khoảng cách nguyên tử."
  },
  {
    "id": 50,
    "name": "Góc Nhiễu Xạ Theta Phản Xạ",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "common",
    "lore": "Góc tới thỏa mãn điều kiện giao thoa tăng cường."
  },
  {
    "id": 51,
    "name": "Định Luật Bragg 2d*sin(theta)",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "rare",
    "lore": "Phương trình vàng mở cánh cửa giải mã cấu trúc tinh thể."
  },
  {
    "id": 52,
    "name": "Véc-tơ Mạng Đảo G (Reciprocal Vector)",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "rare",
    "lore": "Cơ sở không gian Fourier chuyển hóa mạng thực sang mạng đảo."
  },
  {
    "id": 53,
    "name": "Cầu Phản Xạ Ewald Tưởng Tượng",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "rare",
    "lore": "Hình học hình cầu xác định mọi phản xạ nhiễu xạ khả dĩ."
  },
  {
    "id": 54,
    "name": "Vùng Brillouin Thứ Nhất Đối Xứng",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "epic",
    "lore": "Ô Wigner-Seitz trong không gian mạng đảo chứa trọn cấu trúc dải."
  },
  {
    "id": 55,
    "name": "Hệ Số Cấu Trúc Cường Độ F(hkl)",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "epic",
    "lore": "Biên độ tán xạ tổng hợp từ mọi nguyên tử trong ô cơ sở."
  },
  {
    "id": 56,
    "name": "Mắt Thần Nhiễu Xạ Tinh Thể Kittel",
    "set_id": "set_7",
    "setName": "Nhiễu Xạ Sóng & Mạng Đảo",
    "setIcon": "📡",
    "rarity": "legendary",
    "lore": "Nhìn thấu mọi vân nhiễu xạ và giải mã tọa độ từng nguyên tử."
  },
  {
    "id": 57,
    "name": "Chuỗi Nguyên Tử Một Chiều Tuần Hoàn",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "common",
    "lore": "Mô hình đồ chơi kinh điển giải mã sóng đàn hồi trong mạng."
  },
  {
    "id": 58,
    "name": "Nhánh Âm Học Quần Thể Phonon",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "common",
    "lore": "Dao động tập thể của các nguyên tử cùng pha bước sóng dài."
  },
  {
    "id": 59,
    "name": "Nhánh Quang Học Tần Số Cao",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "rare",
    "lore": "Dao động ngược pha giữa hai nguyên tử khác loại trong ô cơ sở."
  },
  {
    "id": 60,
    "name": "Nhiệt Dung Tinh Thể Mũ Ba Debye",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "rare",
    "lore": "Định luật T^3 giải thích nhiệt dung chất rắn ở nhiệt độ cực thấp."
  },
  {
    "id": 61,
    "name": "Khí Phonon Dẫn Nhiệt Mạng",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "rare",
    "lore": "Sự va chạm và tán xạ phonon điều khiển độ dẫn nhiệt phi kim."
  },
  {
    "id": 62,
    "name": "Định Lý Bloch Cho Sóng Điện Tử",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "epic",
    "lore": "Hàm sóng điện tử trong thế tuần hoàn mang dạng sóng phẳng điều chế."
  },
  {
    "id": 63,
    "name": "Mô Hình Điện Tử Gần Tự Do",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "epic",
    "lore": "Sự mở ra của khe năng lượng tại biên vùng Brillouin."
  },
  {
    "id": 64,
    "name": "Vương Miện Chất Rắn Kittel Cổ Đại",
    "set_id": "set_8",
    "setName": "Vật Lý Chất Rắn Kittel",
    "setIcon": "🧊",
    "rarity": "legendary",
    "lore": "Huy hiệu tối thượng của người nắm vững vật lý chất rắn cổ điển."
  },
  {
    "id": 65,
    "name": "Hàm Sóng Phức Psi(x,t)",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "common",
    "lore": "Thực thể chứa đựng toàn bộ thông tin lượng tử của hệ hạt."
  },
  {
    "id": 66,
    "name": "Mật Độ Xác Suất Born |Psi|^2",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "common",
    "lore": "Bình phương độ lớn hàm sóng biểu thị xác suất tìm thấy hạt."
  },
  {
    "id": 67,
    "name": "Tích Phân Chuẩn Hóa Không Gian",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "rare",
    "lore": "Điều kiện tổng xác suất tìm thấy hạt trong toàn vũ trụ bằng 1."
  },
  {
    "id": 68,
    "name": "Dòng Xác Suất Lượng Tử Bảo Toàn",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "rare",
    "lore": "Phương trình liên tục đảm bảo xác suất không tự nhiên sinh ra."
  },
  {
    "id": 69,
    "name": "Gói Sóng Lượng Tử Gaussia",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "rare",
    "lore": "Trạng thái tối ưu hóa đạt độ bất định tối thiểu theo thời gian."
  },
  {
    "id": 70,
    "name": "Sự Sụp Đổ Hàm Sóng Đo Đạc",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "epic",
    "lore": "Hiện tượng trạng thái nhảy tức thời về trạng thái riêng khi quan sát."
  },
  {
    "id": 71,
    "name": "Pha Lượng Tử Toàn Cục Aharonov",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "epic",
    "lore": "Ý nghĩa vật lý của thế vector điện từ lên pha của hàm sóng."
  },
  {
    "id": 72,
    "name": "Chén Thánh Xác Suất Lượng Tử",
    "set_id": "set_9",
    "setName": "Hàm Sóng & Xác Suất Lượng Tử",
    "setIcon": "🌊",
    "rarity": "legendary",
    "lore": "Thần vật hòa quyện tính chất sóng và hạt của vạn vật vi mô."
  },
  {
    "id": 73,
    "name": "Toán Tử Tọa Độ Tuyến Tính X",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "common",
    "lore": "Toán tử Hermite tác động bằng phép nhân tọa độ thực."
  },
  {
    "id": 74,
    "name": "Toán Tử Động Lượng -i*hbar*d/dx",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "common",
    "lore": "Toán tử vi phân sinh ra phép tịnh tiến trong không gian."
  },
  {
    "id": 75,
    "name": "Giao Hoán Tử [X, P] = i*hbar",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "rare",
    "lore": "Hệ thức giao hoán cơ bản phân định cơ học cổ điển và lượng tử."
  },
  {
    "id": 76,
    "name": "Hệ Thức Bất Định Heisenberg",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "rare",
    "lore": "Không thể đo đồng thời chính xác cả vị trí lẫn xung lượng."
  },
  {
    "id": 77,
    "name": "Toán Tử Hamilton Năng Lượng H",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "rare",
    "lore": "Toán tử điều khiển sự tiến triển thời gian của toàn hệ thống."
  },
  {
    "id": 78,
    "name": "Trạng Thái Riêng Trực Giao",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "epic",
    "lore": "Hệ cơ sở đầy đủ của không gian Hilbert biểu diễn trạng thái."
  },
  {
    "id": 79,
    "name": "Định Lý Ehrenfest Cổ Điển",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "epic",
    "lore": "Giá trị kỳ vọng lượng tử tuân theo định luật chuyển động Newton."
  },
  {
    "id": 80,
    "name": "Bản Khắc Bất Định Bất Diệt",
    "set_id": "set_10",
    "setName": "Toán Tử & Nguyên Lý Bất Định",
    "setIcon": "🌌",
    "rarity": "legendary",
    "lore": "Bảo vật khắc sâu hằng số Planck rút gọn hbar chi phối vũ trụ."
  },
  {
    "id": 81,
    "name": "Giếng Thế Vuông Vô Hạn Một Chiều",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "common",
    "lore": "Mô hình lượng tử hóa năng lượng cơ bản nhất từng được giải."
  },
  {
    "id": 82,
    "name": "Năng Lượng Điểm Không E1",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "common",
    "lore": "Mức năng lượng đáy không bao giờ triệt tiêu do nguyên lý bất định."
  },
  {
    "id": 83,
    "name": "Rào Thế Chữ Nhật Hữu Hạn",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "rare",
    "lore": "Hạt có năng lượng nhỏ hơn rào thế vẫn có xác suất lọt qua."
  },
  {
    "id": 84,
    "name": "Hệ Số Truyền Qua Xuyên Hầm T",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "rare",
    "lore": "Xác suất hạt lượng tử xuyên thủng bức tường thế năng cổ điển."
  },
  {
    "id": 85,
    "name": "Dao Động Tử Điều Hòa Lượng Tử",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "rare",
    "lore": "Hệ thế năng parabol với các mức năng lượng cách đều hbar*omega."
  },
  {
    "id": 86,
    "name": "Toán Tử Tăng Giảm Bậc Thang",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "epic",
    "lore": "Toán tử sinh và hủy lượng tử hóa phonon và photon vi mô."
  },
  {
    "id": 87,
    "name": "Kính Hiển Vi Quét Xuyên Hầm STM",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "epic",
    "lore": "Thiết bị chụp ảnh từng nguyên tử nhờ dòng điện xuyên hầm."
  },
  {
    "id": 88,
    "name": "Cổng Dịch Chuyển Xuyên Rào Lượng Tử",
    "set_id": "set_11",
    "setName": "Thế Năng & Xuyên Hầm Lượng Tử",
    "setIcon": "🌀",
    "rarity": "legendary",
    "lore": "Vượt qua mọi bức tường ngăn cách vật lý cổ điển."
  },
  {
    "id": 89,
    "name": "Mật Độ Điện Tử Không Gian n(r)",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "common",
    "lore": "Đại lượng trung tâm thay thế hàm sóng 3N chiều phức tạp."
  },
  {
    "id": 90,
    "name": "Định Lý Hohenberg-Kohn Thứ Nhất",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "common",
    "lore": "Mật độ trạng thái đáy xác định duy nhất thế ngoài của hệ."
  },
  {
    "id": 91,
    "name": "Định Lý Hohenberg-Kohn Thứ Hai",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "rare",
    "lore": "Phiếm hàm năng lượng đạt cực tiểu tại mật độ điện tử chuẩn xác."
  },
  {
    "id": 92,
    "name": "Hệ Hạt Ảo Độc Lập Kohn-Sham",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "rare",
    "lore": "Chuyển bài toán tương tác mạnh về các phương trình một điện tử."
  },
  {
    "id": 93,
    "name": "Thế Trao Đổi Tương Quan Vxc",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "rare",
    "lore": "Trọng tâm chứa đựng toàn bộ hiệu ứng lượng tử nhiều hạt."
  },
  {
    "id": 94,
    "name": "Xấp Xỉ Mật Độ Cục Bộ LDA",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "epic",
    "lore": "Mô hình tính toán dựa trên khí điện tử đồng nhất vi mô."
  },
  {
    "id": 95,
    "name": "Xấp Xỉ Gradient Tổng Quát GGA-PBE",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "epic",
    "lore": "Bổ sung biến thiên không gian mật độ tăng vọt độ chính xác."
  },
  {
    "id": 96,
    "name": "Vương Miện Phiếm Hàm Nobel Kohn",
    "set_id": "set_12",
    "setName": "Lý Thuyết Phiếm Hàm Mật Độ (DFT)",
    "setIcon": "💻",
    "rarity": "legendary",
    "lore": "Cuộc cách mạng tính toán lượng tử đưa hóa học và vật liệu lên đỉnh cao."
  },
  {
    "id": 97,
    "name": "Cơ Sở Sóng Phẳng Plane-Wave",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "common",
    "lore": "Hệ hàm cơ sở tuần hoàn lý tưởng cho mô phỏng tinh thể rắn."
  },
  {
    "id": 98,
    "name": "Năng Lượng Cắt Cực Đại Ecutwfc",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "common",
    "lore": "Ngưỡng giới hạn số lượng sóng phẳng hội tụ năng lượng SCF."
  },
  {
    "id": 99,
    "name": "Thế Giả Siêu Mềm Ultrasoft USPP",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "rare",
    "lore": "Thế giả làm mịn hàm sóng vùng lõi giảm chi phí tính toán."
  },
  {
    "id": 100,
    "name": "Phương Pháp Sóng Tăng Cường PAW",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "rare",
    "lore": "Tái tạo chính xác hàm sóng toàn nguyên tử tiệm cận độ chính xác cao."
  },
  {
    "id": 101,
    "name": "Vòng Lặp Tự Nhất Quán SCF",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "rare",
    "lore": "Thuật toán lặp mật độ điện tử cho đến khi năng lượng hội tụ."
  },
  {
    "id": 102,
    "name": "Tối Ưu Hóa Hình Học Relaxation",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "epic",
    "lore": "Tìm kiếm cấu trúc nguyên tử có lực tác dụng tiệm cận zero."
  },
  {
    "id": 103,
    "name": "Tính Toán Ma Trận Động Lực Phonon PHonon",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "epic",
    "lore": "Mô phỏng phổ dao động tinh thể và kiểm tra độ bền nhiệt động."
  },
  {
    "id": 104,
    "name": "Lò Rèn Lượng Tử Quantum ESPRESSO",
    "set_id": "set_13",
    "setName": "Siêu Tính Toán Quantum ESPRESSO",
    "setIcon": "⚡",
    "rarity": "fabled",
    "lore": "Cỗ máy tính toán First-Principles mô phỏng vật liệu từ nguyên lý ban đầu."
  },
  {
    "id": 105,
    "name": "Đỉnh Dải Hóa Trị VBM",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "common",
    "lore": "Mức năng lượng cao nhất bị chiếm bởi các điện tử liên kết."
  },
  {
    "id": 106,
    "name": "Đáy Dải Dẫn CBM",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "common",
    "lore": "Mức năng lượng thấp nhất còn trống sẵn sàng dẫn điện."
  },
  {
    "id": 107,
    "name": "Khe Năng Lượng Trực Tiếp Direct Gap",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "rare",
    "lore": "Đỉnh dải hóa trị và đáy dải dẫn thẳng hàng tại cùng véc-tơ k."
  },
  {
    "id": 108,
    "name": "Khe Năng Lượng Gián Tiếp Indirect Gap",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "rare",
    "lore": "Quá trình chuyển pha quang học cần sự trợ giúp của phonon."
  },
  {
    "id": 109,
    "name": "Mật Độ Trạng Thái Toàn Phần TDOS",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "rare",
    "lore": "Số lượng trạng thái điện tử trên một đơn vị năng lượng."
  },
  {
    "id": 110,
    "name": "Mật Độ Phân Chiếu Cục Bộ PDOS",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "epic",
    "lore": "Đóng góp orbital nguyên tử s, p, d vào dải năng lượng."
  },
  {
    "id": 111,
    "name": "Mức Năng Lượng Fermi Nửa Đầy",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "epic",
    "lore": "Biên giới phân định vật liệu kim loại, bán dẫn và cách điện."
  },
  {
    "id": 112,
    "name": "Lăng Kính Phân Giải Dải Năng Lượng",
    "set_id": "set_14",
    "setName": "Cấu Trúc Dải & Mật Độ Trạng Thái",
    "setIcon": "📊",
    "rarity": "legendary",
    "lore": "Hiển thị toàn cảnh dải năng lượng dọc các đường đối xứng cao."
  },
  {
    "id": 113,
    "name": "Bước Thời Gian Tích Phân Femtogiây",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "common",
    "lore": "Khoảng thời gian 1-2 fs giải phương trình chuyển động Newton."
  },
  {
    "id": 114,
    "name": "Thuật Toán Vận Tốc Verlet",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "common",
    "lore": "Thuật toán bảo toàn năng lượng và đảo ngược thời gian tối ưu."
  },
  {
    "id": 115,
    "name": "Trường Lực Liên Kết Cổ Điển ReaxFF",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "rare",
    "lore": "Mô phỏng sự phá vỡ và hình thành liên kết hóa học liên tục."
  },
  {
    "id": 116,
    "name": "Bộ Điều Nhiệt Nosé-Hoover NVT",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "rare",
    "lore": "Duy trì nhiệt độ hệ thống dao động quanh giá trị cài đặt."
  },
  {
    "id": 117,
    "name": "Bộ Điều Áp Parrinello-Rahman NPT",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "rare",
    "lore": "Cho phép thể tích và hình dạng ô cơ sở biến đổi tự do."
  },
  {
    "id": 118,
    "name": "Hàm Phân Bố Xuyên Tâm RDF g(r)",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "epic",
    "lore": "Đo lường trật tự tầm gần trong chất lỏng và vô định hình."
  },
  {
    "id": 119,
    "name": "Độ Dịch Chuyển Trung Bình Bình Phương MSD",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "epic",
    "lore": "Xác định hệ số khuếch tán từ độ lệch vị trí nguyên tử theo thời gian."
  },
  {
    "id": 120,
    "name": "Con Lắc Thời Gian Phân Tử Siêu Tốc",
    "set_id": "set_15",
    "setName": "Động Lực Học Phân Tử (MD)",
    "setIcon": "🧪",
    "rarity": "legendary",
    "lore": "Tua nhanh quỹ đạo hàng triệu nguyên tử khám phá cơ chế vi mô."
  },
  {
    "id": 121,
    "name": "Bảng Dữ Liệu Thuộc Tính Vật Liệu",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "common",
    "lore": "Tập hợp hàng ngàn cấu trúc tinh thể đã được chuẩn hóa."
  },
  {
    "id": 122,
    "name": "Descriptor Thành Phần Nguyên Tố Magpie",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "common",
    "lore": "Vector hóa tính chất nguyên tử như bán kính, độ âm điện."
  },
  {
    "id": 123,
    "name": "Phân Tích Thành Phần Chính PCA",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "rare",
    "lore": "Giảm chiều dữ liệu và trực quan hóa cụm vật liệu tương đồng."
  },
  {
    "id": 124,
    "name": "Thuật Toán Rừng Ngẫu Nhiên Random Forest",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "rare",
    "lore": "Dự đoán năng lượng hình thành và độ cứng vật liệu siêu tốc."
  },
  {
    "id": 125,
    "name": "Độ Tương Đồng Tanimoto Cấu Trúc",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "rare",
    "lore": "So sánh mức độ giống nhau giữa hai khung mạng tinh thể."
  },
  {
    "id": 126,
    "name": "Khai Phá Dữ Liệu Materials Project",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "epic",
    "lore": "API tự động tải hàng vạn cấu trúc tinh thể DFT về máy."
  },
  {
    "id": 127,
    "name": "Mô Hình Hồi Quy Gradient Boosting XGBoost",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "epic",
    "lore": "Mô hình học máy độ chính xác cao cho dữ liệu bảng STEM."
  },
  {
    "id": 128,
    "name": "Ngọc Tỉ Dữ Liệu Khoa Học Vật Liệu",
    "set_id": "set_16",
    "setName": "Informatics & Data Science Vật Liệu",
    "setIcon": "📈",
    "rarity": "legendary",
    "lore": "Khơi thông tri thức ẩn sâu trong hàng triệu bài báo và thí nghiệm."
  },
  {
    "id": 129,
    "name": "Đỉnh Đồ Thị Đại Diện Cho Nguyên Tử",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "common",
    "lore": "Mỗi nút mạng mang vector đặc trưng của nguyên tố hóa học."
  },
  {
    "id": 130,
    "name": "Cạnh Đồ Thị Biểu Diễn Liên Kết",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "common",
    "lore": "Khoảng cách và góc tương tác giữa các cặp nguyên tử lân cận."
  },
  {
    "id": 131,
    "name": "Cơ Chế Truyền Tin Nhắn Message Passing",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "rare",
    "lore": "Cập nhật trạng thái nguyên tử từ môi trường hóa học xung quanh."
  },
  {
    "id": 132,
    "name": "Bất Biến Tịnh Tiến Và Quay Không Gian",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "rare",
    "lore": "Mạng nơ-ron bảo toàn dự đoán khi xoay hoặc dời tinh thể."
  },
  {
    "id": 133,
    "name": "Lớp Tích Chập Tinh Thể Crystal Conv",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "rare",
    "lore": "Bộ lọc học sâu trích xuất đặc trưng mạng tuần hoàn."
  },
  {
    "id": 134,
    "name": "Gộp Đồ Thị Toàn Cục Global Pooling",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "epic",
    "lore": "Tổng hợp thông tin toàn bộ tinh thể dự đoán tính chất vật liệu."
  },
  {
    "id": 135,
    "name": "Mô Hình Mạng Đồ Thị ALIGNN Góc Liên Kết",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "epic",
    "lore": "Tích hợp đồ thị cạnh bổ sung thông tin góc liên kết 3 hạt."
  },
  {
    "id": 136,
    "name": "Mạng Lưới Thần Kinh Tinh Thể Vô Cực",
    "set_id": "set_17",
    "setName": "Mạng Nơ-ron Đồ Thị (CGCNN)",
    "setIcon": "🔮",
    "rarity": "fabled",
    "lore": "Học sâu hiểu thấu mọi quy luật sắp xếp nguyên tử trong vũ trụ."
  },
  {
    "id": 137,
    "name": "Tập Dữ Liệu Huấn Luyện Lực DFT",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "common",
    "lore": "Hàng ngàn cấu trúc với năng lượng và lực tác dụng nguyên tử."
  },
  {
    "id": 138,
    "name": "Hàm Đối Xứng Behler-Parrinello",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "common",
    "lore": "Biểu diễn môi trường nguyên tử dưới dạng bất biến đối xứng."
  },
  {
    "id": 139,
    "name": "Thế Năng Mạng Nơ-ron NNP Độ Chính Xác Cao",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "rare",
    "lore": "Mô phỏng lực tác dụng nhanh hơn DFT hàng triệu lần."
  },
  {
    "id": 140,
    "name": "Học Chủ Động Active Learning Tự Động",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "rare",
    "lore": "Tự động phát hiện cấu trúc lạ gửi sang DFT tính bổ sung."
  },
  {
    "id": 141,
    "name": "Thế Năng MACE Đồ Thị Đẳng Biến",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "epic",
    "lore": "Đột phá kiến trúc học máy đạt độ chính xác tương đương lượng tử."
  },
  {
    "id": 142,
    "name": "Thế Năng Đa Nguyên Tố Phổ Quát M3GNet",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "epic",
    "lore": "Mô hình nền tảng bao phủ toàn bộ bảng tuần hoàn hóa học."
  },
  {
    "id": 143,
    "name": "Mô Phỏng Chuyển Pha Lượng Tử Triệu Hạt",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "epic",
    "lore": "Khảo sát ranh giới hạt và nứt gãy với quy mô chưa từng có."
  },
  {
    "id": 144,
    "name": "Lõi Não Nhân Tạo Thế Năng Lượng Tử",
    "set_id": "set_18",
    "setName": "Thế Năng Học Máy (MLIP)",
    "setIcon": "🧠",
    "rarity": "fabled",
    "lore": "Trí tuệ nhân tạo tái tạo hoàn hảo phương trình Schrödinger."
  },
  {
    "id": 145,
    "name": "Không Gian Tiềm Ẩn Cấu Trúc Latent Space",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "common",
    "lore": "Biểu diễn liên tục của không gian tinh thể rời rạc."
  },
  {
    "id": 146,
    "name": "Mạng Tự Mã Hóa Biến Phân VAE Tinh Thể",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "common",
    "lore": "Mã hóa và giải mã cấu trúc tuần hoàn từ vector tiềm ẩn."
  },
  {
    "id": 147,
    "name": "Mô Hình Khuếch Tán Sinh CDVAE",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "rare",
    "lore": "Sinh cấu trúc tinh thể mới bằng cách khử nhiễu tọa độ nguyên tử."
  },
  {
    "id": 148,
    "name": "Thiết Kế Theo Mục Tiêu Tính Chất Target",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "rare",
    "lore": "Định sẵn độ cứng và độ dẫn điện, AI tự vẽ cấu trúc tối ưu."
  },
  {
    "id": 149,
    "name": "Bộ Lọc Kiểm Tra Độ Bền Nhiệt Động Convex Hull",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "epic",
    "lore": "Đảm bảo vật liệu mới sinh ra nằm trên đường vỏ lồi năng lượng."
  },
  {
    "id": 150,
    "name": "Sàng Lọc Ảo Hàng Vạn Hợp Chất Mới",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "epic",
    "lore": "Tự động hóa từ sinh cấu trúc đến kiểm tra tính chất bằng DFT."
  },
  {
    "id": 151,
    "name": "Tổng Hợp Tinh Thể Nhân Tạo Chưa Từng Có",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "epic",
    "lore": "Hiện thực hóa vật liệu AI thiết kế trong phòng thí nghiệm."
  },
  {
    "id": 152,
    "name": "Bản Thiết Kế Vật Liệu Nghịch Đảo Thần Thánh",
    "set_id": "set_19",
    "setName": "Thiết Kế Vật Liệu Nghịch Đảo",
    "setIcon": "🪐",
    "rarity": "fabled",
    "lore": "Quyền năng sáng tạo vật liệu mới theo ý muốn của nhà khoa học."
  },
  {
    "id": 153,
    "name": "Tinh Thể Silic Đơn Tinh Siêu Tinh Khiết",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "common",
    "lore": "Nền tảng của toàn bộ nền văn minh vi mạch điện tử nhân loại."
  },
  {
    "id": 154,
    "name": "Pha Tạp Nguyên Tử Nhóm III Loại P",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "common",
    "lore": "Tạo ra các lỗ trống mang điện tích dương dẫn điện."
  },
  {
    "id": 155,
    "name": "Pha Tạp Nguyên Tử Nhóm V Loại N",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "rare",
    "lore": "Cung cấp thêm điện tử tự do vào đáy dải dẫn."
  },
  {
    "id": 156,
    "name": "Vùng Suy Giảm Điện Trường Tiếp Giáp P-N",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "rare",
    "lore": "Hàng rào thế năng ngăn cách và dẫn hướng hạt tải điện."
  },
  {
    "id": 157,
    "name": "Hiệu Ứng Quang Điện Trong Lượng Tử",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "rare",
    "lore": "Hấp thụ photon ánh sáng giải phóng cặp điện tử - lỗ trống."
  },
  {
    "id": 158,
    "name": "Cấu Trúc Dị Thể Giếng Lượng Tử Quantum Well",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "epic",
    "lore": "Giam cầm điện tử trong không gian 2 chiều phát xạ laser sắc nét."
  },
  {
    "id": 159,
    "name": "Chấm Lượng Tử Bán Dẫn Quantum Dot",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "epic",
    "lore": "Hạt nano bán dẫn 0 chiều có màu sắc phát quang biến đổi theo kích thước."
  },
  {
    "id": 160,
    "name": "Vi Mạch Lượng Tử Quang Điện Tối Cực",
    "set_id": "set_20",
    "setName": "Tinh Thể Bán Dẫn & Quang Điện",
    "setIcon": "💡",
    "rarity": "fabled",
    "lore": "Bộ vi xử lý tích hợp quang học lượng tử tốc độ ánh sáng."
  },
  {
    "id": 161,
    "name": "Nhiệt Độ Chuyển Pha Siêu Dẫn Tc",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "common",
    "lore": "Nhiệt độ tới hạn mà điện trở chất dẫn điện đột ngột biến mất."
  },
  {
    "id": 162,
    "name": "Cặp Điện Tử Cooper Tương Tác Phonon",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "common",
    "lore": "Hai electron hút nhau qua trung gian dao động mạng tinh thể."
  },
  {
    "id": 163,
    "name": "Ngưng Tụ Lượng Tử Bose-Einstein",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "rare",
    "lore": "Tất cả các cặp Cooper rơi vào cùng một trạng thái lượng tử duy nhất."
  },
  {
    "id": 164,
    "name": "Hiệu Ứng Đẩy Từ Trường Meissner",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "rare",
    "lore": "Vật siêu dẫn đẩy hoàn toàn từ trường ra khỏi lòng nó."
  },
  {
    "id": 165,
    "name": "Dòng Điện Vĩnh Cửu Không Suy Giảm",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "rare",
    "lore": "Dòng điện chạy tuần hoàn trong vòng siêu dẫn hàng triệu năm."
  },
  {
    "id": 166,
    "name": "Tiếp Giáp Lượng Tử Josephson",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "epic",
    "lore": "Xuyên hầm các cặp Cooper tạo nên cảm biến từ trường SQUID siêu nhạy."
  },
  {
    "id": 167,
    "name": "Vật Liệu Siêu Dẫn Nhiệt Độ Cao Cuprate",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "epic",
    "lore": "Cấu trúc tinh thể perovskite nhiều lớp thách thức lý thuyết BCS."
  },
  {
    "id": 168,
    "name": "Vòng Tròn Siêu Dẫn Không Suy Hao Vĩnh Cửu",
    "set_id": "set_21",
    "setName": "Hiện Tượng Siêu Dẫn & Cặp Cooper",
    "setIcon": "⚡",
    "rarity": "fabled",
    "lore": "Truyền tải năng lượng vô hạn không tỏa nhiệt qua không gian."
  },
  {
    "id": 169,
    "name": "Phương Trình Trạng Thái Khí Lý Tưởng",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "common",
    "lore": "Liên hệ áp suất, thể tích và nhiệt độ chất khí."
  },
  {
    "id": 170,
    "name": "Định Luật Thứ Nhất Bảo Toàn Năng Lượng",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "common",
    "lore": "Độ biến thiên nội năng bằng nhiệt lượng cộng công nhận vào."
  },
  {
    "id": 171,
    "name": "Phương Trình Entropy Boltzmann S = k*ln(W)",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "rare",
    "lore": "Đo lường độ hỗn loạn và số trạng thái vi mô khả dĩ."
  },
  {
    "id": 172,
    "name": "Năng Lượng Tự Do Gibbs G = H - T*S",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "rare",
    "lore": "Tiêu chuẩn vàng xác định chiều hướng tự diễn biến của phản ứng."
  },
  {
    "id": 173,
    "name": "Năng Lượng Tự Do Helmholtz F = U - T*S",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "rare",
    "lore": "Hàm nhiệt động lý tưởng cho các quá trình đẳng tích đẳng nhiệt."
  },
  {
    "id": 174,
    "name": "Hóa Năng Tiềm Tàng Mu Của Hạt",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "epic",
    "lore": "Động lực thúc đẩy sự chuyển dịch vật chất giữa các pha."
  },
  {
    "id": 175,
    "name": "Định Luật Thứ Ba Entropy Không Độ Tuyệt Đối",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "epic",
    "lore": "Entropy của tinh thể hoàn hảo triệt tiêu tại 0 Kelvin."
  },
  {
    "id": 176,
    "name": "Bình Thủy Tinh Giữ Nhiệt Entropy Đảo Chiều",
    "set_id": "set_22",
    "setName": "Nhiệt Động Lực Học & Entropy",
    "setIcon": "🔥",
    "rarity": "fabled",
    "lore": "Bảo vật thách thức mũi tên thời gian và cân bằng vũ trụ."
  },
  {
    "id": 177,
    "name": "Quy Tắc Pha Gibbs F = C - P + 2",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "common",
    "lore": "Xác định số bậc tự do của hệ dị thể ở trạng thái cân bằng."
  },
  {
    "id": 178,
    "name": "Đường Lỏng Liquidus Giới Hạn",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "common",
    "lore": "Đường nhiệt độ mà trên đó toàn bộ hợp kim tồn tại ở thể lỏng."
  },
  {
    "id": 179,
    "name": "Đường Rắn Solidus Giới Hạn",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "common",
    "lore": "Đường nhiệt độ mà dưới đó toàn bộ hợp kim đã đông đặc hoàn toàn."
  },
  {
    "id": 180,
    "name": "Điểm Cùng Tinh Eutectic Điển Hình",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "rare",
    "lore": "Pha lỏng đồng thời kết tinh thành hai pha rắn mịn song song."
  },
  {
    "id": 181,
    "name": "Quy Tắc Đòn Bẩy Tính Tỉ Lệ Pha",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "rare",
    "lore": "Công thức hình học xác định tỉ lệ phần trăm các pha tại điểm cân bằng."
  },
  {
    "id": 182,
    "name": "Pha Trung Gian Hợp Chất Liên Kim Intermetallic",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "epic",
    "lore": "Cấu trúc tinh thể phức tạp với tỉ lệ hóa học xác định."
  },
  {
    "id": 183,
    "name": "Giản Đồ Pha Sắt - Cacbon Thần Thánh",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "epic",
    "lore": "Bản đồ chỉ dẫn toàn bộ công nghệ luyện kim và chế tạo thép thế giới."
  },
  {
    "id": 184,
    "name": "La Bàn Định Hướng Cân Bằng Pha Vũ Trụ",
    "set_id": "set_23",
    "setName": "Giản Đồ Pha & Cân Bằng Cấu Trúc",
    "setIcon": "🗺️",
    "rarity": "fabled",
    "lore": "Dẫn lối qua mọi vùng chuyển hóa vật chất trong không gian pha."
  },
  {
    "id": 185,
    "name": "Góc Pha Tô-Pô Berry Không Gian",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "common",
    "lore": "Pha hình học tích lũy khi hàm sóng di chuyển một vòng khép kín."
  },
  {
    "id": 186,
    "name": "Độ Cong Berry Khúc Xạ Điện Tử",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "common",
    "lore": "Tác dụng như một từ trường hiệu dụng trong không gian mạng đảo."
  },
  {
    "id": 187,
    "name": "Chỉ Số Tô-Pô Bất Biến Chern Z2",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "rare",
    "lore": "Đại lượng số nguyên phân loại các trạng thái lượng tử tô-pô."
  },
  {
    "id": 188,
    "name": "Chất Cách Điện Tô-Pô Lòng Khối Biên Dẫn",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "rare",
    "lore": "Cách điện bên trong nhưng dẫn điện hoàn hảo không tiêu hao ở bề mặt."
  },
  {
    "id": 189,
    "name": "Khóa Spin - Xung Lượng Bề Mặt",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "epic",
    "lore": "Chiều chuyển động của electron bị khóa chặt với hướng quay spin."
  },
  {
    "id": 190,
    "name": "Bán Kim Loại Weyl Điểm Kỳ Dị",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "epic",
    "lore": "Các điểm tiếp xúc dải năng lượng không suy biến đóng vai trò từ đơn cực."
  },
  {
    "id": 191,
    "name": "Hạt Fermion Majorana Phản Hạt Của Chính Nó",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "epic",
    "lore": "Trạng thái biên lượng tử nền tảng cho máy tính lượng tử tô-pô chống nhiễu."
  },
  {
    "id": 192,
    "name": "Vòng Xoáy Tô-Pô Bất Biến Vĩnh Cửu",
    "set_id": "set_24",
    "setName": "Vật Liệu Tô-Pô & Spintronics",
    "setIcon": "🌀",
    "rarity": "mythic",
    "lore": "Trạng thái bảo toàn hình học miễn nhiễm với mọi tán xạ và sai hỏng tạp chất."
  },
  {
    "id": 193,
    "name": "Tia Sáng Đầu Tiên Sau Vụ Nổ Big Bang",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "epic",
    "lore": "Bức xạ tàn dư khởi nguyên ngưng tụ thành các hạt cơ bản đầu tiên."
  },
  {
    "id": 194,
    "name": "Viên Đá Cân Bằng Lực Thống Nhất Lớn GUT",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "epic",
    "lore": "Hợp nhất lực điện từ, lực tương tác mạnh và lực tương tác yếu."
  },
  {
    "id": 195,
    "name": "Hạt Higgs Ban Tặng Khối Lượng Cho Vạn Vật",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "legendary",
    "lore": "Trường hạt lượng tử mang lại khối lượng cho thế giới vật chất."
  },
  {
    "id": 196,
    "name": "Màng Không - Thời Gian 11 Chiều Lý Thuyết M",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "legendary",
    "lore": "Không gian dao động của các dây năng lượng siêu vi mô."
  },
  {
    "id": 197,
    "name": "Lỗ Đen Lượng Tử Nén Mật Độ Vô Cực",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "fabled",
    "lore": "Vật thể nén toàn bộ thông tin vật chất vào chân trời sự kiện."
  },
  {
    "id": 198,
    "name": "Lõi Máy Tính Lượng Tử Toàn Tri Omniscient",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "fabled",
    "lore": "Hệ thống tính toán mô phỏng đồng thời mọi trạng thái khả dĩ."
  },
  {
    "id": 199,
    "name": "Hạt Bụi Nguyên Sơ Kiến Tạo Đa Vũ Trụ",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "mythic",
    "lore": "Mảnh vật chất mang mã nguồn cấu tạo của hàng tỷ thiên hà."
  },
  {
    "id": 200,
    "name": "Trái Tim Điểm Kỳ Dị Lượng Tử Vĩnh Cửu",
    "set_id": "set_25",
    "setName": "Điểm Kỳ Dị Lượng Tử Tối Thượng",
    "setIcon": "👑",
    "rarity": "mythic",
    "lore": "Cổ vật thần thoại tối thượng dung hợp trọn vẹn trí tuệ nhân tạo và vật chất vũ trụ."
  }
];

window.RPG_RELICS_DATA = {
    SETS: RELIC_SETS,
    RELICS: RELICS_DATABASE
};
