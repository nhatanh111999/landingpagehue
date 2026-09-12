'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, MapPin, Phone, ChevronRight, Star, CheckCircle, Sun, Moon } from 'lucide-react'

// Dữ liệu bộ sưu tập cổ phục
const collections = [
  {
    id: 1,
    name: 'Áo Nhật Bình Cung Đình',
    category: 'Cung Đình',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
    desc: 'Trang phục lễ phục hoàng gia trang nhã, thêu hoa văn tinh xảo kết hợp cùng sắc hồng sen và vàng nghệ.',
    details: 'Bao gồm: Áo Nhật Bình, vấn đội đầu, trâm cài ngọc, quạt lụa cầm tay.'
  },
  {
    id: 2,
    name: 'Áo Tấc Truyền Thống',
    category: 'Cung Đình',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    desc: 'Lễ phục trang nghiêm với thiết kế năm thân rộng, mang đậm hồn cốt xứ Huế bên tường vàng rêu phong.',
    details: 'Bao gồm: Áo tấc nam/nữ, khăn đóng truyền thống, guốc mộc.'
  },
  {
    id: 3,
    name: 'Ngũ Thân Tay Chèo & Nón Lá',
    category: 'Dân Gian & Lãng Mạn',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    desc: 'Nét đẹp thanh lịch, mộc mạc của người con xứ Huế bên dòng sông Hương thơ mộng.',
    details: 'Bao gồm: Ngũ thân tay chèo, nón lá bài thơ, ô giấy dầu nghệ thuật.'
  },
  {
    id: 4,
    name: 'Áo Đối Khâm Kiêu Sa',
    category: 'Dân Gian & Lãng Mạn',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800',
    desc: 'Phong cách phối màu hoài cổ, tôn lên vẻ đẹp kiêu sa, đài cát của thiếu nữ Cố Đô.',
    details: 'Bao gồm: Áo đối khâm, khăn mỏ quạ/vấn lụa, phụ kiện kiềng bạc.'
  }
]

// Dữ liệu địa điểm chụp ảnh
const locations = [
  {
    name: 'Đại Nội Huế (Hoàng Thành)',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
    feature: 'Uy nghi, cổ kính với sắc đỏ son của cung điện, tường vàng rêu phong và các bậc thềm đá.',
    concept: 'Áo Nhật Bình, Áo Tấc, cổ phục cung đình trang trọng.'
  },
  {
    name: 'Lăng Khải Định / Lăng Minh Mạng',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    feature: 'Kiến trúc giao thoa Đông - Tây tinh xảo, những cột trụ chạm khắc rồng phượng và không gian trầm mặc.',
    concept: 'Cổ phục vương triều, phong cách điện ảnh trầm buồn, sang trọng.'
  },
  {
    name: 'Chùa Thiên Mụ & Sông Hương',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800',
    feature: 'Nét đẹp thanh bình bên dòng sông lịch sử, hàng thông già rợp bóng và tháp Phước Duyên.',
    concept: 'Áo dài trắng, áo ngũ thân tay chèo kết hợp nón lá hoặc ô giấy dầu nhẹ nhàng, nên thơ.'
  },
  {
    name: 'Cung An Định',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800',
    feature: 'Sự pha trộn độc đáo giữa kiến trúc cung đình Việt Nam và phong cách tân cổ điển Pháp, mang vẻ đẹp kiêu kỳ, quý phái.',
    concept: 'Trang phục quý tộc thời Minh Mạng - Khải Định, phong cách lãng mạn hoài cổ.'
  }
]

// Gói chụp hình
const packages = [
  {
    title: 'Gói Phổ Cổ (Studio)',
    price: '990.000đ',
    desc: 'Phù hợp cho khách hàng muốn trải nghiệm nhanh, không gian studio tối giản chuyên nghiệp.',
    features: ['1 Bộ Cổ phục tự chọn (Nhật Bình/Tấc/Ngũ Thân)', 'Makeup & làm tóc chuẩn quý tộc', 'Tặng 10 ảnh chỉnh sửa độc quyền', 'Giao toàn bộ file gốc không giới hạn']
  },
  {
    title: 'Gói Ngoại Cảnh Cố Đô',
    price: '1.890.000đ',
    desc: 'Trải nghiệm trọn vẹn tại các di tích lịch sử Đại Nội, Lăng tẩm hoặc Chùa Thiên Mụ.',
    features: ['2 Bộ Cổ phục cao cấp tùy chọn', 'Makeup & làm tóc đi theo suốt buổi chụp', 'Trợ lý chỉnh trang y phục tận tâm', 'Tặng 20 ảnh chỉnh sửa tỉ mỉ + Toàn bộ file gốc'],
    popular: true
  }
]

// Quy trình 4 bước
const processSteps = [
  { step: '01', title: 'Tư Vấn & Chọn Cổ Phục', desc: 'Lựa chọn trang phục và concept phù hợp với vóc dáng và ý thích.' },
  { step: '02', title: 'Makeup & Tạo Hình', desc: 'Hóa thân trọn vẹn với phong cách trang điểm hoài cổ, tinh tế.' },
  { step: '03', title: 'Trải Nghiệm Buổi Chụp', desc: 'Thả hồn vào không gian di sản cùng ekip hướng dẫn tạo dáng tận tâm.' },
  { step: '04', title: 'Nhận Thành Quả', desc: 'Nhận ảnh gốc nhanh chóng và bộ ảnh blend màu độc quyền đậm chất điện ảnh.' }
]

export default function CoPhucHueLanding() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [selectedItem, setSelectedItem] = useState<typeof collections[0] | null>(null)

  const filteredCollections = activeCategory === 'Tất cả' 
    ? collections 
    : collections.filter(item => item.category === activeCategory)

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 overflow-x-hidden ${
      isDarkMode 
        ? 'bg-[#121110] text-[#EBE7DF] selection:bg-[#7A2222] selection:text-white' 
        : 'bg-[#FCFBF9] text-[#221F1E] selection:bg-[#B86B33] selection:text-white'
    }`}>
      
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#121110]/90 border-[#C5A059]/15' 
          : 'bg-[#FCFBF9]/90 border-[#E8E2D5]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className={`w-5 h-5 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`} />
            <span className={`font-serif text-lg tracking-widest font-bold ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>
              CHUNG CHENG STUDIO
            </span>
          </div>

          <nav className={`hidden md:flex items-center gap-8 text-sm font-normal ${isDarkMode ? 'text-[#EBE7DF]/80' : 'text-[#221F1E]/80'}`}>
            <a href="#story" className="hover:text-[#B86B33] transition-colors">Câu Chuyện</a>
            <a href="#locations" className="hover:text-[#B86B33] transition-colors">Địa Điểm</a>
            <a href="#collections" className="hover:text-[#B86B33] transition-colors">Bộ Sưu Tập</a>
            <a href="#packages" className="hover:text-[#B86B33] transition-colors">Bảng Giá</a>
            <a href="#process" className="hover:text-[#B86B33] transition-colors">Trải Nghiệm</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-full border transition-all ${
                isDarkMode 
                  ? 'border-[#C5A059]/30 bg-[#1D1B19] text-[#C5A059] hover:bg-[#C5A059]/20' 
                  : 'border-[#E8E2D5] bg-white text-[#B86B33] hover:bg-[#E8E2D5]/50'
              }`}
              title="Chuyển đổi giao diện Sáng / Tối"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a href="#contact" className={`px-6 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all shadow-sm ${
              isDarkMode 
                ? 'bg-[#7A2222] hover:bg-[#631B1B] text-white shadow-[#7A2222]/20' 
                : 'bg-[#B86B33] hover:bg-[#A05A28] text-white shadow-[#B86B33]/20'
            }`}>
              Đặt Lịch
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=1920" 
            alt="Huế Cổ Phục Background" 
            className={`w-full h-full object-cover scale-105 transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#121110] via-[#121110]/70' : 'from-[#FCFBF9] via-[#FCFBF9]/70'} to-transparent`} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className={`inline-block tracking-[0.2em] text-xs uppercase mb-4 border-b pb-1 font-medium ${isDarkMode ? 'text-[#C5A059] border-[#C5A059]/30' : 'text-[#B86B33] border-[#B86B33]/30'}`}>
              Tiệm chụp ảnh cổ phục hiện đại
            </span>
            <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>
              Vết Xưa Vọng Cố Đô <br />
              <span className={`italic font-normal ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Dấu Ấn Vương Triều</span>
            </h1>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal leading-relaxed ${isDarkMode ? 'text-[#EBE7DF]/80' : 'text-[#221F1E]/80'}`}>
              Tái hiện nét đẹp trang phục cung đình và dân gian Huế. Mang trong mình hơi thở lịch sử qua từng thước ảnh điện ảnh nhẹ nhàng, tinh tế.
            </p>
            <a href="#contact" className={`inline-block px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-all shadow-md ${
              isDarkMode 
                ? 'bg-[#7A2222] hover:bg-[#631B1B] text-white shadow-[#7A2222]/30' 
                : 'bg-[#B86B33] hover:bg-[#A05A28] text-white shadow-[#B86B33]/30'
            }`}>
              Đặt Lịch Trải Nghiệm Ngay
            </a>
          </motion.div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section id="story" className={`py-28 max-w-4xl mx-auto px-6 text-center border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <span className={`tracking-[0.25em] text-xs uppercase block mb-3 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Sứ Mệnh Văn Hóa</span>
        <h2 className={`font-serif text-3xl sm:text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Lưu Giữ Hồn Cốt Xứ Huế</h2>
        <p className={`text-base sm:text-lg font-normal leading-relaxed mb-10 ${isDarkMode ? 'text-[#EBE7DF]/85' : 'text-[#221F1E]/85'}`}>
          Mỗi bộ cổ phục tại tiệm (từ Áo Nhật Bình đài cát, Áo Tấc trang nghiêm đến Ngũ Thân mộc mạc) đều được phục dựng chuẩn mực theo nguyên mẫu lịch sử. Chúng tôi kết hợp ánh sáng hoài cổ cùng tông màu trầm hiện đại để lưu giữ trọn vẹn nét đẹp thanh xuân của bạn bên di sản Cố đô.
        </p>
        <blockquote className={`font-serif italic text-xl sm:text-2xl border-y py-6 ${isDarkMode ? 'text-[#C5A059] border-[#C5A059]/25' : 'text-[#B86B33] border-[#E8E2D5]'}`}>
          &ldquo;Gìn giữ mảnh vải xưa, gói trọn ngàn năm tình đất Huế.&rdquo;
        </blockquote>
      </section>

      {/* KHÔNG GIAN CỐ ĐÔ - ĐỊA ĐIỂM CHỤP ẢNH */}
      <section id="locations" className={`py-28 max-w-7xl mx-auto px-6 border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className={`tracking-[0.2em] text-xs uppercase block mb-2 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>ĐỊA ĐIỂM GỢI Ý</span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Thước Phim Đậm Chất Thơ Tại Xứ Huế</h2>
          <p className={`text-sm sm:text-base font-normal ${isDarkMode ? 'text-[#EBE7DF]/80' : 'text-[#221F1E]/80'}`}>
            Mỗi góc phố, lăng tẩm tại Huế đều mang một hoài niệm riêng, hoàn hảo để lưu giữ dấu ấn cổ phục.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, idx) => (
            <div 
              key={idx} 
              className={`group overflow-hidden rounded-[16px] backdrop-blur-md shadow-sm border transition-all ${
                isDarkMode 
                  ? 'border-[#C5A059]/20 bg-[#1D1B19]/50 hover:border-[#C5A059]' 
                  : 'border-[#E8E2D5] bg-white hover:border-[#B86B33]'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#121110] via-transparent' : 'from-black/50 via-transparent'} to-transparent`} />
              </div>
              <div className="p-8">
                <h3 className={`font-serif text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>{loc.name}</h3>
                <p className={`text-sm font-normal mb-4 leading-relaxed ${isDarkMode ? 'text-[#EBE7DF]/85' : 'text-[#221F1E]/85'}`}>
                  <strong className={`font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Đặc trưng:</strong> {loc.feature}
                </p>
                <div className={`text-xs font-medium tracking-wide p-3.5 rounded-xl border ${
                  isDarkMode ? 'bg-[#121110] border-[#C5A059]/20 text-[#C5A059]' : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#B86B33]'
                }`}>
                  ✨ Phù hợp concept: {loc.concept}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS (GALLERY) */}
      <section id="collections" className={`py-28 max-w-7xl mx-auto px-6 border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className={`tracking-[0.2em] text-xs uppercase block mb-2 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Lookbook</span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Bộ Sưu Tập Cổ Phục</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Tất cả', 'Cung Đình', 'Dân Gian & Lãng Mạn'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs tracking-wider transition-all border ${
                  activeCategory === cat 
                    ? isDarkMode 
                      ? 'border-[#C5A059] bg-[#7A2222] text-white font-medium shadow-sm' 
                      : 'border-[#B86B33] bg-[#B86B33] text-white font-medium shadow-sm'
                    : isDarkMode 
                      ? 'border-[#C5A059]/25 bg-[#1D1B19]/60 text-[#EBE7DF]/80 hover:border-[#C5A059]' 
                      : 'border-[#E8E2D5] bg-white text-[#221F1E]/80 hover:border-[#B86B33]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCollections.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className={`group relative h-96 overflow-hidden cursor-pointer rounded-[16px] backdrop-blur-md shadow-md transition-all border ${
                isDarkMode 
                  ? 'border-[#C5A059]/20 bg-[#1D1B19]/50 hover:border-[#C5A059]' 
                  : 'border-[#E8E2D5] bg-white hover:border-[#B86B33]'
              }`}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#121110] via-[#121110]/40' : 'from-black/60 via-black/20'} to-transparent`} />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className={`text-xs tracking-widest uppercase font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#ffd700]'}`}>
                  {item.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1 mb-2">{item.name}</h3>
                <p className="text-white/85 text-sm font-normal line-clamp-2">{item.desc}</p>
                <span className={`inline-flex items-center gap-1 text-xs mt-4 tracking-wider uppercase font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#ffd700]'}`}>
                  Xem chi tiết phụ kiện <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PACKAGES & PRICING */}
      <section id="packages" className={`py-28 max-w-7xl mx-auto px-6 border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className={`tracking-[0.2em] text-xs uppercase block mb-2 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Bảng Giá Minh Bạch</span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Gói Trải Nghiệm Chụp Hình</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-[16px] backdrop-blur-md border relative flex flex-col justify-between shadow-sm transition-colors ${
                isDarkMode 
                  ? `bg-[#1D1B19]/60 ${pkg.popular ? 'border-[#C5A059]' : 'border-[#C5A059]/20'}` 
                  : `bg-white ${pkg.popular ? 'border-[#B86B33]' : 'border-[#E8E2D5]'}`
              }`}
            >
              {pkg.popular && (
                <span className={`absolute -top-3 right-8 text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-full shadow-sm text-white ${
                  isDarkMode ? 'bg-[#7A2222]' : 'bg-[#B86B33]'
                }`}>
                  Được Chọn Nhiều Nhất
                </span>
              )}
              <div>
                <h3 className={`font-serif text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>{pkg.title}</h3>
                <div className={`text-3xl font-bold mb-4 font-serif ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>{pkg.price}</div>
                <p className={`text-sm font-normal mb-6 ${isDarkMode ? 'text-[#EBE7DF]/80' : 'text-[#221F1E]/75'}`}>{pkg.desc}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-[#EBE7DF]/90' : 'text-[#221F1E]/90'}`}>
                      <CheckCircle className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className={`block text-center py-3.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all border ${
                isDarkMode 
                  ? 'bg-[#121110] hover:bg-[#7A2222] hover:text-white text-[#EBE7DF] border-[#C5A059]/30' 
                  : 'bg-[#FCFBF9] hover:bg-[#B86B33] hover:text-white text-[#221F1E] border-[#E8E2D5]'
              }`}>
                Đăng Ký Gói Này
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* THE EXPERIENCE / PROCESS */}
      <section id="process" className={`py-28 max-w-7xl mx-auto px-6 border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className={`tracking-[0.2em] text-xs uppercase block mb-2 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Quy Trình 4 Bước</span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Trải Nghiệm Đẳng Cấp</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((p, idx) => (
            <div key={idx} className={`p-6 rounded-[16px] backdrop-blur-md shadow-sm border ${
              isDarkMode ? 'bg-[#1D1B19]/50 border-[#C5A059]/15' : 'bg-white border-[#E8E2D5]'
            }`}>
              <span className={`font-serif text-4xl font-bold block mb-4 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>{p.step}</span>
              <h3 className={`font-serif text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>{p.title}</h3>
              <p className={`text-sm font-normal ${isDarkMode ? 'text-[#EBE7DF]/80' : 'text-[#221F1E]/75'}`}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`py-28 max-w-3xl mx-auto px-6 text-center border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <span className={`tracking-[0.2em] text-xs uppercase block mb-3 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Góc Nhìn Khách Hàng</span>
        <blockquote className={`font-serif text-xl sm:text-2xl italic leading-relaxed mb-6 ${isDarkMode ? 'text-[#EBE7DF]' : 'text-[#221F1E]'}`}>
          &ldquo;Khoác lên mình bộ Nhật Bình và bước đi giữa Đại Nội, mình thực sự xúc động như được sống lại trong không gian hoàng triều xưa. Tone màu trầm hiện đại của tiệm xuất sắc tuyệt vời!&rdquo;
        </blockquote>
        <div className={`text-xs uppercase tracking-widest font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>— Chị Minh Anh (Hà Nội)</div>
      </section>

      {/* CONTACT & FOOTER */}
      <section id="contact" className={`py-28 max-w-3xl mx-auto px-6 border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <div className={`rounded-3xl backdrop-blur-md p-8 sm:p-12 shadow-md border ${
          isDarkMode ? 'bg-[#1D1B19]/80 border-[#C5A059]/25' : 'bg-white border-[#E8E2D5]'
        }`}>
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className={`tracking-[0.2em] text-xs uppercase block mb-2 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Đăng Ký Tư Vấn</span>
            <h2 className={`font-serif text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Lưu Giữ Kỷ Niệm Cố Đô</h2>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Đã gửi thông tin đăng ký thành công!'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                required 
                placeholder="Họ và tên" 
                className={`border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF] focus:border-[#C5A059]' 
                    : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E] focus:border-[#B86B33]'
                }`} 
              />
              <input 
                type="tel" 
                required 
                placeholder="Số điện thoại / Zalo" 
                className={`border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF] focus:border-[#C5A059]' 
                    : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E] focus:border-[#B86B33]'
                }`} 
              />
            </div>
            <select className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
              isDarkMode 
                ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF]/70 focus:border-[#C5A059]' 
                : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E]/70 focus:border-[#B86B33]'
            }`}>
              <option>Chọn gói trải nghiệm phù hợp</option>
              <option>Gói Phổ Cổ (Studio) - 990.000đ</option>
              <option>Gói Ngoại Cảnh Cố Đô - 1.890.000đ</option>
            </select>
            <button type="submit" className={`w-full font-medium py-4 rounded-full text-xs tracking-widest uppercase transition-all shadow-md text-white ${
              isDarkMode ? 'bg-[#7A2222] hover:bg-[#631B1B] shadow-[#7A2222]/30' : 'bg-[#B86B33] hover:bg-[#A05A28] shadow-[#B86B33]/30'
            }`}>
              Gửi Yêu Cầu Đặt Lịch
            </button>
          </form>
        </div>
      </section>

      {/* MODAL CHI TIẾT BỘ SƯU TẬP */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`rounded-3xl border max-w-lg w-full p-8 relative shadow-xl ${
                isDarkMode ? 'bg-[#1D1B19] border-[#C5A059]/40 text-[#EBE7DF]' : 'bg-white border-[#B86B33]/40 text-[#221F1E]'
              }`}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 opacity-70 hover:opacity-100 text-lg"
              >
                ✕
              </button>
              <span className={`text-xs uppercase tracking-wider font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>{selectedItem.category}</span>
              <h3 className="font-serif text-2xl font-bold mt-1 mb-3">{selectedItem.name}</h3>
              <p className="text-sm mb-4 leading-relaxed opacity-85">{selectedItem.desc}</p>
              <div className={`rounded-2xl p-4 border text-xs tracking-wider mb-6 font-medium ${
                isDarkMode ? 'bg-[#121110] border-[#C5A059]/25 text-[#C5A059]' : 'bg-[#FCFBF9] border-[#B86B33]/25 text-[#B86B33]'
              }`}>
                ✨ {selectedItem.details}
              </div>
              <a 
                href="#contact" 
                onClick={() => setSelectedItem(null)}
                className={`block text-center py-3.5 rounded-full text-xs tracking-widest uppercase font-medium shadow-sm text-white ${
                  isDarkMode ? 'bg-[#7A2222] hover:bg-[#631B1B] shadow-[#7A2222]/20' : 'bg-[#B86B33] hover:bg-[#A05A28] shadow-[#B86B33]/20'
                }`}
              >
                Chọn Concept Này
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className={`border-t py-12 text-center text-xs tracking-wider ${
        isDarkMode ? 'border-[#C5A059]/15 text-[#EBE7DF]/60' : 'border-[#E8E2D5] text-[#221F1E]/60'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Camera className={`w-4 h-4 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`} />
            <span className="font-serif font-semibold">Vết Xưa Cố Đô Studio</span>
          </div>
          <p>© 2026 Tiệm Chụp Ảnh Cổ Phục Huế. All rights reserved.</p>
          <div className="flex items-center gap-4 opacity-80">
            <a href="#" className="hover:text-[#B86B33]">Instagram</a>
            <a href="#" className="hover:text-[#B86B33]">TikTok</a>
            <a href="#" className="hover:text-[#B86B33]">Zalo</a>
          </div>
        </div>
      </footer>

    </div>
  )
}