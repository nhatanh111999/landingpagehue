export type Collection = {
  id: number
  name: string
  category: string
  image: string
  desc: string
  details: string
}

export type SamplePhoto = {
  id: number
  title: string
  model: string
  concept: string
  image: string
  relatedImages: string[]
}

export type Location = {
  name: string
  image: string
  feature: string
  concept: string
}

export type TourPackage = {
  title: string
  price: string
  desc: string
  features: string[]
  popular?: boolean
}

export type ProcessStep = {
  step: string
  title: string
  desc: string
}

export type Review = {
  id: number
  quote: string
  author: string
}

export type SiteContent = {
  hero: {
    eyebrow: string
    title: string
    accentTitle: string
    description: string
    backgroundImage: string
  }
  story: {
    eyebrow: string
    title: string
    description: string
    quote: string
  }
  collections: Collection[]
  samplePhotos: SamplePhoto[]
  locations: Location[]
  packages: TourPackage[]
  processSteps: ProcessStep[]
  reviews: Review[]
}

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: 'Tiệm chụp ảnh cổ phục hiện đại',
    title: 'Vết Xưa Vọng Cố Đô',
    accentTitle: 'Dấu Ấn Vương Triều',
    description: 'Tái hiện nét đẹp trang phục cung đình và dân gian Huế. Mang trong mình hơi thở lịch sử qua từng thước ảnh điện ảnh nhẹ nhàng, tinh tế.',
    backgroundImage: '/images/dai-noi-kinh-thanh-hue.jpg',
  },
  story: {
    eyebrow: 'Sứ Mệnh Văn Hóa',
    title: 'Lưu Giữ Hồn Cốt Xứ Huế',
    description: 'Mỗi bộ cổ phục tại tiệm (từ Áo dài truyền thống, Áo Nhật Bình, Áo tấc trang nghiêm đến Ngũ Thân mộc mạc) đều được phục dựng chuẩn mực theo nguyên mẫu lịch sử. Chúng tôi kết hợp ánh sáng hoài cổ cùng tông màu trầm hiện đại để lưu giữ trọn vẹn nét đẹp thanh xuân của bạn bên di sản Cố đô.',
    quote: 'Gìn giữ mảnh vải xưa, gói trọn ngàn năm tình đất Huế.',
  },
  collections: [
    { id: 1, name: 'Áo Nhật Bình Cung Đình', category: 'Cung Đình', image: '/images/aonhatbinh.jpg', desc: 'Trang phục lễ phục hoàng gia trang nhã, thêu hoa văn tinh xảo kết hợp cùng sắc hồng sen và vàng nghệ.', details: 'Bao gồm: Áo Nhật Bình, vấn đội đầu, trâm cài ngọc, quạt lụa cầm tay.' },
    { id: 2, name: 'Áo Tấc Truyền Thống', category: 'Cung Đình', image: '/images/aotac.jpg', desc: 'Lễ phục trang nghiêm với thiết kế năm thân rộng, mang đậm hồn cốt xứ Huế bên tường vàng rêu phong.', details: 'Bao gồm: Áo tấc nam/nữ, khăn đóng truyền thống, guốc mộc.' },
    { id: 3, name: 'Ngũ Thân Tay Chèo', category: 'Dân Gian & Lãng Mạn', image: '/images/aonguthan.jpg', desc: 'Nét đẹp thanh lịch, mộc mạc của người con xứ Huế bên dòng sông Hương thơ mộng.', details: 'Bao gồm: Ngũ thân tay chèo, nón lá bài thơ, ô giấy dầu nghệ thuật.' },
    { id: 8, name: 'Hệ Thống Phụ Kiện Miễn Phí', category: 'Phụ kiện', image: '/images/phukien.jpg', desc: 'Hoàn thiện trọn vẹn khung hình với quạt xếp, nón lá, guốc mộc, trâm cài hoa, khăn vấn và chuỗi ngọc được chuẩn bị sẵn.', details: 'Bao gồm: Quạt xếp, nón lá, guốc mộc, trâm cài hoa, khăn vấn và chuỗi ngọc.' },
  ],
  samplePhotos: [
    { id: 1, title: 'Chút Hương Xưa Giữa Lòng Cố Đô', model: 'Khách hàng: Minh Thư', concept: 'Áo ngũ thân tay chẽn màu cam rực rỡ kết hợp bối cảnh kiến trúc cung đình Đại Nội Huế', image: '/images/codo/chuthuongcodo4.jpg', relatedImages: ['/images/codo/chuthuongcodo4.jpg', '/images/codo/chuthuongcodo1.jpg', '/images/codo/chuthuongcodo3.jpg', '/images/codo/chuthuongcodo.jpg', '/images/codo/chuthuongcodo5.jpg', '/images/codo/chuthuongcodo6.jpg'] },
    { id: 2, title: 'Giữ Chút Gì Rất Huế Đi Em', model: 'Khách hàng: Thanh Hà', concept: 'Áo ngũ thân tím nhạt phối cổ xanh nổi bật cùng chuỗi hạt ngọc và phụ kiện nón ba ba', image: '/images/giuchuthue/chuthue4.jpg', relatedImages: ['/images/giuchuthue/chuthue4.jpg', '/images/giuchuthue/chuthue.jpg', '/images/giuchuthue/chuthue1.jpg', '/images/giuchuthue/chuthue2.jpg', '/images/giuchuthue/chuthue3.jpg', '/images/giuchuthue/chuthue5.jpg', '/images/giuchuthue/chuthue6.jpg', '/images/giuchuthue/chuthue7.jpg'] },
    { id: 3, title: 'Kiều Sa Dưới Tường Thành Rêu Phong', model: 'Khách hàng: Phương Linh', concept: 'Áo Nhật Bình hồng pastel phối khăn vành xanh & quạt gỗ. Tone màu ảnh hoài niệm, sang trọng và chuẩn chất Cố đô.', image: '/images/kieusa/kieusa.jpg', relatedImages: ['/images/kieusa/kieusa.jpg', '/images/kieusa/kieusa1.jpg', '/images/kieusa/kieusa2.jpg', '/images/kieusa/kieusa3.jpg', '/images/kieusa/kieusa4.jpg'] },
    { id: 4, title: 'Hồn Nước Cũ Nơi Phố Thị Trầm Mặc', model: 'Khách hàng: Quỳnh Chi', concept: 'Áo Nhật Bình trắng ngà phối khăn vành hồng kết hợp không gian rêu phong', image: '/images/honnuoccu/honnuoccu.jpg', relatedImages: ['/images/honnuoccu/honnuoccu.jpg', '/images/honnuoccu/honnuoccu2.jpg', '/images/honnuoccu/honnuoccu1.jpg', '/images/honnuoccu/honnuoccu3.jpg'] },
    { id: 5, title: 'Lưu Giữ Thanh Xuân Giữa Lòng Đất Cố Đô', model: 'Khách hàng: Mai Anh', concept: 'Thanh xuân Cố Đô x Trầm mặc & Nàng thơ với trang phục áo ngũ thân xanh tươi trẻ kết hợp nón lá đội đầu', image: '/images/thanhxuan/thanhxuan4.jpg', relatedImages: ['/images/thanhxuan/thanhxuan4.jpg', '/images/thanhxuan/thanhxuan.jpg', '/images/thanhxuan/thanhxuan1.jpg', '/images/thanhxuan/thanhxuan2.jpg', '/images/thanhxuan/thanhxuan3.jpg', '/images/thanhxuan/thanhxuan5.jpg', '/images/thanhxuan/thanhxuan6.jpg', '/images/thanhxuan/thanhxuan7.jpg'] },
  ],
  locations: [
    { name: 'Đại Nội Huế (Hoàng Thành)', image: '/images/dainoi.jfif', feature: 'Uy nghi, cổ kính với sắc đỏ son của cung điện, tường vàng rêu phong và các bậc thềm đá.', concept: 'Áo Nhật Bình, Áo Tấc, cổ phục cung đình trang trọng.' },
    { name: 'Lăng Khải Định / Lăng Minh Mạng', image: '/images/langkhaidinh.jpg', feature: 'Kiến trúc giao thoa Đông - Tây tinh xảo, những cột trụ chạm khắc rồng phượng và không gian trầm mặc.', concept: 'Cổ phục vương triều, phong cách điện ảnh trầm buồn, sang trọng.' },
    { name: 'Chùa Thiên Mụ & Sông Hương', image: '/images/chuthienmu.jpg', feature: 'Nét đẹp thanh bình bên dòng sông lịch sử, hàng thông già rợp bóng và tháp Phước Duyên.', concept: 'Áo dài trắng, áo ngũ thân tay chèo kết hợp nón lá hoặc ô giấy dầu nhẹ nhàng, nên thơ.' },
    { name: 'Cung An Định', image: '/images/cungandinh.jpg', feature: 'Sự pha trộn độc đáo giữa kiến trúc cung đình Việt Nam và phong cách tân cổ điển Pháp, mang vẻ đẹp kiêu kỳ, quý phái.', concept: 'Trang phục quý tộc thời Minh Mạng - Khải Định, phong cách lãng mạn hoài cổ.' },
  ],
  packages: [
    { title: 'Gói Phổ Cổ (Studio)', price: '399.000đ', desc: 'Phù hợp cho khách hàng muốn trải nghiệm nhanh, không gian studio tối giản chuyên nghiệp.', features: ['1 Bộ Cổ phục tự chọn (Nhật Bình/Tấc/Ngũ Thân)', 'Makeup & làm tóc chuẩn quý tộc', 'Tặng 10 ảnh chỉnh sửa độc quyền', 'Giao toàn bộ file gốc không giới hạn'] },
    { title: 'Gói Ngoại Cảnh Cố Đô', price: '599.000đ', desc: 'Trải nghiệm trọn vẹn tại các di tích lịch sử Đại Nội, Lăng tẩm hoặc Chùa Thiên Mụ.', features: ['2 Bộ Cổ phục cao cấp tùy chọn', 'Makeup & làm tóc đi theo suốt buổi chụp', 'Trợ lý chỉnh trang y phục tận tâm', 'Tặng 20 ảnh chỉnh sửa tỉ mỉ + Toàn bộ file gốc'], popular: true },
  ],
  processSteps: [
    { step: '01', title: 'Tư Vấn & Chọn Cổ Phục', desc: 'Lựa chọn trang phục và concept phù hợp với vóc dáng và ý thích.' },
    { step: '02', title: 'Makeup & Tạo Hình', desc: 'Hóa thân trọn vẹn với phong cách trang điểm hoài cổ, tinh tế.' },
    { step: '03', title: 'Trải Nghiệm Buổi Chụp', desc: 'Thả hồn vào không gian di sản cùng ekip hướng dẫn tạo dáng tận tâm.' },
    { step: '04', title: 'Nhận Thành Quả', desc: 'Nhận ảnh gốc nhanh chóng và bộ ảnh blend màu độc quyền đậm chất điện ảnh.' },
  ],
  reviews: [
    { id: 1, quote: 'Khoác lên mình bộ Nhật Bình và bước đi giữa Đại Nội, mình thực sự xúc động như được sống lại trong không gian hoàng triều xưa. Tone màu trầm hiện đại của tiệm xuất sắc tuyệt vời!', author: '— CHỊ MINH ANH (HÀ NỘI)' },
    { id: 2, quote: 'Không gian studio ấm cúng và chỉn chu đến từng chi tiết. Nhìn thành quả những khung hình mang đậm chất Huế trầm mặc, mình thấy hoàn toàn xứng đáng.', author: '— ANH HOÀNG NAM (TP. HỒ CHÍ MINH)' },
    { id: 3, quote: 'Ekip hỗ trợ cực kỳ có tâm, hướng dẫn tạo dáng rất tự nhiên giúp mình không bị ngượng ngùng. Nhận ảnh xong ai cũng khen góc chụp có hồn và rất thơ.', author: '— BẠN KHÁNH LINH (ĐÀ NẴNG)' },
  ],
}
