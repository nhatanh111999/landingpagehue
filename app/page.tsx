'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, MapPin, Phone, ChevronRight, Star, CheckCircle, Sun, Moon, Maximize2, ChevronLeft, ChevronDown, AlertCircle } from 'lucide-react'
import ClientReviews from './ClientReviews'
import Image from 'next/image'

// Dữ liệu bộ sưu tập cổ phục (Lookbook)
const collections = [
  {
    id: 1,
    name: 'Áo Nhật Bình Cung Đình',
    category: 'Cung Đình',
    image: '/images/aonhatbinh.jpg',
    desc: 'Trang phục lễ phục hoàng gia trang nhã, thêu hoa văn tinh xảo kết hợp cùng sắc hồng sen và vàng nghệ.',
    details: 'Bao gồm: Áo Nhật Bình, vấn đội đầu, trâm cài ngọc, quạt lụa cầm tay.'
  },
  {
    id: 2,
    name: 'Áo Tấc Truyền Thống',
    category: 'Cung Đình',
    image: '/images/aotac.jpg',
    desc: 'Lễ phục trang nghiêm với thiết kế năm thân rộng, mang đậm hồn cốt xứ Huế bên tường vàng rêu phong.',
    details: 'Bao gồm: Áo tấc nam/nữ, khăn đóng truyền thống, guốc mộc.'
  },
  {
    id: 3,
    name: 'Ngũ Thân Tay Chèo',
    category: 'Dân Gian & Lãng Mạn',
    image: '/images/aonguthan.jpg',
    desc: 'Nét đẹp thanh lịch, mộc mạc của người con xứ Huế bên dòng sông Hương thơ mộng.',
    details: 'Bao gồm: Ngũ thân tay chèo, nón lá bài thơ, ô giấy dầu nghệ thuật.'
  },
  {
    "id": 8,
    "name": "Hệ Thống Phụ Kiện Miễn Phí",
    "category": "Phụ kiện",
    "image": "/images/phukien.jpg",
    "desc": "Hoàn thiện trọn vẹn khung hình với quạt xếp, nón lá, guốc mộc, trâm cài hoa, khăn vấn và chuỗi ngọc được chuẩn bị sẵn.",
    "details": "Bao gồm: Quạt xếp, nón lá, guốc mộc, trâm cài hoa, khăn vấn và chuỗi ngọc."
  }
]

// Dữ liệu mẫu ảnh thực tế
const samplePhotos = [
  
  {
    id: 1,
    title: 'Chút Hương Xưa Giữa Lòng Cố Đô',
    model: 'Khách hàng: Minh Thư',
    concept: 'Áo ngũ thân tay chẽn màu cam rực rỡ kết hợp bối cảnh kiến trúc cung đình Đại Nội Huế',
    image: '/images/codo/chuthuongcodo4.jpg',
    relatedImages: [
      '/images/codo/chuthuongcodo4.jpg',
      '/images/codo/chuthuongcodo1.jpg',
      '/images/codo/chuthuongcodo3.jpg',
      '/images/codo/chuthuongcodo.jpg',
      '/images/codo/chuthuongcodo5.jpg',
      '/images/codo/chuthuongcodo6.jpg',
    ]
  },
  {
    id: 2,
    title: 'Giữ Chút Gì Rất Huế Đi Em',
    model: 'Khách hàng: Thanh Hà',
    concept: 'Áo ngũ thân tím nhạt phối cổ xanh nổi bật cùng chuỗi hạt ngọc và phụ kiện nón ba ba',
    image: '/images/giuchuthue/chuthue4.jpg',
    relatedImages: [
      '/images/giuchuthue/chuthue4.jpg',
      '/images/giuchuthue/chuthue.jpg',
      '/images/giuchuthue/chuthue1.jpg',
      '/images/giuchuthue/chuthue2.jpg',
      '/images/giuchuthue/chuthue3.jpg',
      '/images/giuchuthue/chuthue5.jpg',
      '/images/giuchuthue/chuthue6.jpg',
      '/images/giuchuthue/chuthue7.jpg',
    ]
  },
  {
    id:3,
    title: 'Kiều Sa Dưới Tường Thành Rêu Phong',
    model: 'Khách hàng: Phương Linh',
    concept: 'Áo Nhật Bình hồng pastel phối khăn vành xanh & quạt gỗ. Tone màu ảnh hoài niệm, sang trọng và chuẩn chất Cố đô.',
    image: '/images/kieusa/kieusa.jpg',
    relatedImages: [
      '/images/kieusa/kieusa.jpg',
      '/images/kieusa/kieusa1.jpg',
      '/images/kieusa/kieusa2.jpg',
      '/images/kieusa/kieusa3.jpg',
      '/images/kieusa/kieusa4.jpg',
    ]
  },
  {
    id: 4,
    title: 'Hồn Nước Cũ Nơi Phố Thị Trầm Mặc',
    model: 'Khách hàng: Quỳnh Chi',
    concept: 'Áo Nhật Bình trắng ngà phối khăn vành hồng kết hợp không gian rêu phong',
    image: '/images/honnuoccu/honnuoccu.jpg',
    relatedImages: [
      '/images/honnuoccu/honnuoccu.jpg',
      '/images/honnuoccu/honnuoccu2.jpg',
      '/images/honnuoccu/honnuoccu1.jpg',
      '/images/honnuoccu/honnuoccu3.jpg',
    ]
  },
  {
    id: 5,
    title: 'Lưu Giữ Thanh Xuân Giữa Lòng Đất Cố Đô',
    model: 'Khách hàng: Mai Anh',
    concept: 'Thanh xuân Cố Đô x Trầm mặc & Nàng thơ với trang phục áo ngũ thân xanh tươi trẻ kết hợp nón lá đội đầu',
    image: '/images/thanhxuan/thanhxuan4.jpg',
    relatedImages: [
      '/images/thanhxuan/thanhxuan4.jpg',
      '/images/thanhxuan/thanhxuan.jpg',
      '/images/thanhxuan/thanhxuan1.jpg',
      '/images/thanhxuan/thanhxuan2.jpg',
      '/images/thanhxuan/thanhxuan3.jpg',
      '/images/thanhxuan/thanhxuan5.jpg',
      '/images/thanhxuan/thanhxuan6.jpg',
      '/images/thanhxuan/thanhxuan7.jpg',
    ]
  },
]

// Dữ liệu địa điểm chụp ảnh
const locations = [
  {
    name: 'Đại Nội Huế (Hoàng Thành)',
    image: '/images/dainoi.jfif',
    feature: 'Uy nghi, cổ kính với sắc đỏ son của cung điện, tường vàng rêu phong và các bậc thềm đá.',
    concept: 'Áo Nhật Bình, Áo Tấc, cổ phục cung đình trang trọng.'
  },
  {
    name: 'Lăng Khải Định / Lăng Minh Mạng',
    image: '/images/langkhaidinh.jpg',
    feature: 'Kiến trúc giao thoa Đông - Tây tinh xảo, những cột trụ chạm khắc rồng phượng và không gian trầm mặc.',
    concept: 'Cổ phục vương triều, phong cách điện ảnh trầm buồn, sang trọng.'
  },
  {
    name: 'Chùa Thiên Mụ & Sông Hương',
    image: '/images/chuthienmu.jpg',
    feature: 'Nét đẹp thanh bình bên dòng sông lịch sử, hàng thông già rợp bóng và tháp Phước Duyên.',
    concept: 'Áo dài trắng, áo ngũ thân tay chèo kết hợp nón lá hoặc ô giấy dầu nhẹ nhàng, nên thơ.'
  },
  {
    name: 'Cung An Định',
    image: '/images/cungandinh.jpg',
    feature: 'Sự pha trộn độc đáo giữa kiến trúc cung đình Việt Nam và phong cách tân cổ điển Pháp, mang vẻ đẹp kiêu kỳ, quý phái.',
    concept: 'Trang phục quý tộc thời Minh Mạng - Khải Định, phong cách lãng mạn hoài cổ.'
  }
]

// Gói chụp hình
const packages = [
  {
    title: 'Gói Phổ Cổ (Studio)',
    price: '399.000đ',
    desc: 'Phù hợp cho khách hàng muốn trải nghiệm nhanh, không gian studio tối giản chuyên nghiệp.',
    features: ['1 Bộ Cổ phục tự chọn (Nhật Bình/Tấc/Ngũ Thân)', 'Makeup & làm tóc chuẩn quý tộc', 'Tặng 10 ảnh chỉnh sửa độc quyền', 'Giao toàn bộ file gốc không giới hạn']
  },
  {
    title: 'Gói Ngoại Cảnh Cố Đô',
    price: '599.000đ',
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
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [selectedItem, setSelectedItem] = useState<typeof collections[0] | null>(null)
  
  const [selectedPhoto, setSelectedPhoto] = useState<typeof samplePhotos[0] | null>(null)
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null)
  

  // State form và state lỗi để hiển thị trực tiếp
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('Chọn gói')

  const [note, setNote] = useState('');
  
  const [errors, setErrors] = useState<{
    fullName?: string;
    contact?: string;
  }>({})

  const filteredCollections = activeCategory === 'Tất cả' 
    ? collections 
    : collections.filter(item => item.category === activeCategory)

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedPhoto !== null && zoomedImageIndex !== null) {
      const total = selectedPhoto.relatedImages.length
      setZoomedImageIndex((zoomedImageIndex - 1 + total) % total)
    }
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedPhoto !== null && zoomedImageIndex !== null) {
      const total = selectedPhoto.relatedImages.length
      setZoomedImageIndex((zoomedImageIndex + 1) % total)
    }
  }

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    let newErrors: { fullName?: string; contact?: string } = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn.'
    }

    if (!phone.trim() && !email.trim()) {
      newErrors.contact = 'Vui lòng nhập Số điện thoại hoặc Địa chỉ Email để chúng tôi liên hệ.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Hiển thị trạng thái đang gửi (tùy chọn)
        const response = await fetch('/api/send-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            phone,
            email,
            selectedPackage,
            note
          })
        })

        const data = await response.json()

        if (data.success) {
          alert('Gửi yêu cầu đặt lịch thành công! Chúng tôi sẽ liên hệ lại sớm nhất.')
          setFullName('')
          setPhone('')
          setEmail('')
          setSelectedPackage('Chọn gói')
          setNote('')
        } else {
          alert('Có lỗi xảy ra, vui lòng thử lại sau.')
        }
      } catch (err) {
        console.error(err)
        alert('Lỗi kết nối đến máy chủ.')
      }
    }
  }

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
          <a href="#" className="flex items-center gap-2 cursor-pointer group">
            <Camera className={`w-5 h-5 transition-transform group-hover:scale-110 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`} />
            <span className={`font-serif text-lg tracking-widest font-bold transition-colors ${isDarkMode ? 'text-[#C5A059] hover:text-white' : 'text-[#B86B33] hover:text-black'}`}>
              ChungCheng
            </span>
          </a>

          <nav className={`hidden md:flex items-center gap-8 text-sm font-normal ${isDarkMode ? 'text-[#EBE7DF]/80' : 'text-[#221F1E]/80'}`}>
            <a href="#story" className="hover:text-[#B86B33] transition-colors">Câu Chuyện</a>
            <a href="#locations" className="hover:text-[#B86B33] transition-colors">Địa Điểm</a>
            <a href="#collections" className="hover:text-[#B86B33] transition-colors">Bộ Sưu Tập</a>
            <a href="#gallery" className="hover:text-[#B86B33] transition-colors">Mẫu Ảnh</a>
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
            src="/images/dai-noi-kinh-thanh-hue.jpg" 
            alt="Huế Cổ Phục Background" 
            // Đã tinh chỉnh độ mờ linh hoạt: Light mode hiện rõ hơn (opacity-35), Dark mode (opacity-25)
            className={`w-full h-full object-cover scale-105 transition-opacity duration-500 ${isDarkMode ? 'opacity-25' : 'opacity-35'}`}
          />
          {/* Lớp phủ gradient được điều chỉnh riêng cho Light Mode và Dark Mode để hiển thị rõ ảnh nền */}
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDarkMode 
              ? 'from-[#121110] via-[#121110]/70 to-transparent' 
              : 'from-[#FCFBF9] via-[#FCFBF9]/60 to-transparent'
          }`} />
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
          Mỗi bộ cổ phục tại tiệm (từ Áo dài truyền thống, Áo Nhật Bình, Áo tấc trang nghiêm đến Ngũ Thân mộc mạc) đều được phục dựng chuẩn mực theo nguyên mẫu lịch sử. Chúng tôi kết hợp ánh sáng hoài cổ cùng tông màu trầm hiện đại để lưu giữ trọn vẹn nét đẹp thanh xuân của bạn bên di sản Cố đô.
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
            {['Tất cả', 'Cung Đình', 'Dân Gian & Lãng Mạn', 'Phụ kiện'].map((cat) => (
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

      {/* THƯ VIỆN MẪU ẢNH THỰC TẾ */}
      <section id="gallery" className={`py-28 max-w-7xl mx-auto px-6 border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className={`tracking-[0.2em] text-xs uppercase block mb-2 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Khoảnh Khắc Cố Đô</span>
          <h2 className={`font-serif text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Mẫu Ảnh Thực Tế Từ Khách Hàng</h2>
          <p className={`text-sm sm:text-base font-normal ${isDarkMode ? 'text-[#EBE7DF]/80' : 'text-[#221F1E]/80'}`}>
            Bấm vào từng bộ ảnh bên dưới để mở rộng danh sách toàn bộ các góc chụp thực tế.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {samplePhotos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group overflow-hidden rounded-[20px] backdrop-blur-md shadow-md border cursor-pointer transition-all ${
                isDarkMode 
                  ? 'border-[#C5A059]/25 bg-[#1D1B19]/70 hover:border-[#C5A059]' 
                  : 'border-[#E8E2D5] bg-white hover:border-[#B86B33]'
              }`}
            >
              <div className="relative h-[380px] sm:h-[440px] overflow-hidden">
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className={`text-xs tracking-widest uppercase font-semibold block mb-2 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#ffd700]'}`}>
                    {photo.model}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">{photo.title}</h3>
                  <p className="text-white/80 text-sm font-normal mb-4">
                    Concept: {photo.concept}
                  </p>
                  <span className={`inline-flex items-center gap-2 text-xs tracking-wider uppercase font-medium px-4 py-2 rounded-full border ${
                    isDarkMode ? 'border-[#C5A059]/40 text-[#C5A059] bg-black/40' : 'border-white/40 text-white bg-black/40'
                  }`}>
                    Xem trọn bộ ảnh ({photo.relatedImages.length} góc chụp) <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
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

              {/* Sửa lại nút bấm để gán đúng giá trị title + price khớp với option trong thẻ select */}
              <button 
                type="button"
                onClick={() => {
                  setSelectedPackage(`${pkg.title} - ${pkg.price}`);
                  document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full text-center py-3.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all border cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#121110] hover:bg-[#7A2222] hover:text-white text-[#EBE7DF] border-[#C5A059]/30' 
                    : 'bg-[#FCFBF9] hover:bg-[#B86B33] hover:text-white text-[#221F1E] border-[#E8E2D5]'
                }`}
              >
                Đăng ký gói này
              </button>
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
      <ClientReviews/>

      {/* CONTACT & FORM */}
      <section id="contact" className={`py-28 max-w-3xl mx-auto px-6 border-t ${isDarkMode ? 'border-[#C5A059]/15' : 'border-[#E8E2D5]'}`}>
        <div className={`rounded-3xl backdrop-blur-md p-8 sm:p-12 shadow-md border ${
          isDarkMode ? 'bg-[#1D1B19]/80 border-[#C5A059]/25' : 'bg-white border-[#E8E2D5]'
        }`}>
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className={`tracking-[0.2em] text-xs uppercase block mb-2 font-medium ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>Đăng Ký Tư Vấn</span>
            <h2 className={`font-serif text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#221F1E]'}`}>Lưu Giữ Kỷ Niệm Cố Đô</h2>
          </div>

          <form onSubmit={handleSubmitContact} className="space-y-5" noValidate>
            
            {/* Ô Họ và tên */}
            <div>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  if (errors.fullName) setErrors({...errors, fullName: undefined})
                }}
                placeholder="Họ và tên *" 
                className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
                  errors.fullName 
                    ? 'border-red-500 bg-red-500/5' 
                    : isDarkMode 
                      ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF] focus:border-[#C5A059]' 
                      : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E] focus:border-[#B86B33]'
                }`} 
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Ô SĐT và Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (errors.contact) setErrors({...errors, contact: undefined})
                }}
                placeholder="Số điện thoại / Zalo" 
                className={`border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
                  errors.contact 
                    ? 'border-red-500 bg-red-500/5' 
                    : isDarkMode 
                      ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF] focus:border-[#C5A059]' 
                      : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E] focus:border-[#B86B33]'
                }`} 
              />
              <input 
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.contact) setErrors({...errors, contact: undefined})
                }}
                placeholder="Địa chỉ Email" 
                className={`border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors ${
                  errors.contact 
                    ? 'border-red-500 bg-red-500/5' 
                    : isDarkMode 
                      ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF] focus:border-[#C5A059]' 
                      : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E] focus:border-[#B86B33]'
                }`} 
              />
            </div>
            {/* Ô Ghi chú (Textarea) */}
            <div>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Yêu cầu hoặc ghi chú thêm (Ví dụ: Thời gian muốn chụp, số lượng người...)" 
                rows={3}
                className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors resize-none ${
                  isDarkMode 
                    ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF] focus:border-[#C5A059]' 
                    : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E] focus:border-[#B86B33]'
                }`} 
              />
            </div>

            {errors.contact ? (
              <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.contact}
              </p>
            ) : (
              <p className={`text-[11px] mt-1 ml-1 ${isDarkMode ? 'text-[#EBE7DF]/50' : 'text-[#221F1E]/50'}`}>
                * Bạn có thể nhập Số điện thoại hoặc Email (hoặc cả hai) để chúng tôi dễ dàng liên hệ.
              </p>
            )}
            
            {/* Dropdown chọn gói (Đã sửa lỗi mũi tên đè lên nhau bằng cách thêm relative và appearance-none chuẩn) */}
            <div className="relative pt-1">
              <select 
                id="booking-form"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className={`w-full appearance-none border rounded-xl px-4 py-3.5 pr-10 text-sm focus:outline-none transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#121110] border-[#C5A059]/20 text-[#EBE7DF]/80 focus:border-[#C5A059]' 
                    : 'bg-[#FCFBF9] border-[#E8E2D5] text-[#221F1E]/80 focus:border-[#B86B33]'
                }`}
              >
                <option>Chọn gói</option>
                <option>Gói Phổ Cổ (Studio) - 399.000đ</option>
                <option>Gói Ngoại Cảnh Cố Đô - 599.000đ</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none mt-0.5">
                <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`} />
              </div>
            </div>

            <button type="submit" className={`w-full font-medium py-4 rounded-full text-xs tracking-widest uppercase transition-all shadow-md text-white mt-2 ${
              isDarkMode ? 'bg-[#7A2222] hover:bg-[#631B1B] shadow-[#7A2222]/30' : 'bg-[#B86B33] hover:bg-[#A05A28] shadow-[#B86B33]/30'
            }`}>
              Gửi Yêu Cầu Đặt Lịch
            </button>
          </form>
        </div>
      </section>

      {/* MODAL CHI TIẾT BỘ SƯU TẬP (LOOKBOOK) */}
      <AnimatePresence>
        {selectedItem && (
          <div 
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              // Đã đổi thành max-w-4xl để popup lớn và thoáng hơn trên web
              className={`rounded-3xl border max-w-4xl w-full overflow-hidden relative shadow-2xl cursor-default ${
                isDarkMode ? 'bg-[#1D1B19] border-[#C5A059]/40 text-[#EBE7DF]' : 'bg-white border-[#B86B33]/40 text-[#221F1E]'
              }`}
            >
              {/* Chiều cao ảnh lớn, rõ nét */}
              <div className="relative h-80 sm:h-[420px] w-full overflow-hidden">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Nút đóng góc trên ảnh */}
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 font-serif text-xs tracking-wider uppercase px-3.5 py-2 rounded-full border bg-black/60 backdrop-blur-md text-white border-white/30 hover:bg-black transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>✕</span> <span>Đóng</span>
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className={`text-xs uppercase tracking-widest font-semibold block mb-1 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#ffd700]'}`}>
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                    {selectedItem.name}
                  </h3>
                </div>
              </div>

              {/* Phần nội dung chi tiết bên dưới ảnh */}
              <div className="p-6 sm:p-8">
                <p className="text-sm sm:text-base mb-6 leading-relaxed opacity-90">{selectedItem.desc}</p>
                
                <div className={`rounded-2xl p-4 border text-xs sm:text-sm tracking-wider mb-8 font-medium ${
                  isDarkMode ? 'bg-[#121110] border-[#C5A059]/25 text-[#C5A059]' : 'bg-[#FCFBF9] border-[#B86B33]/25 text-[#B86B33]'
                }`}>
                  ✨ {selectedItem.details}
                </div>

                <a 
                  href="#contact" 
                  onClick={() => {
                    setSelectedItem(null);
                    setNote(`${selectedItem.name} : ${selectedItem.desc}`);
                  }}
                  className={`block text-center py-4 rounded-full text-xs sm:text-sm tracking-widest uppercase font-medium shadow-md text-white ${
                    isDarkMode ? 'bg-[#7A2222] hover:bg-[#631B1B] shadow-[#7A2222]/20' : 'bg-[#B86B33] hover:bg-[#A05A28] shadow-[#B86B33]/20'
                  }`}
                >
                  Chọn Concept Này
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* MODAL ALBUM ẢNH THỰC TẾ */}
      <AnimatePresence>
        {selectedPhoto && zoomedImageIndex === null && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm cursor-pointer"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-3xl border max-w-4xl w-full p-5 sm:p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-default ${
                isDarkMode ? 'bg-[#1D1B19] border-[#C5A059]/40 text-[#EBE7DF]' : 'bg-white border-[#B86B33]/40 text-[#221F1E]'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className={`text-xs uppercase tracking-widest font-semibold block mb-1 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#B86B33]'}`}>
                    {selectedPhoto.model}
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold">{selectedPhoto.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className={`shrink-0 font-serif text-xs tracking-wider uppercase px-3.5 py-2 rounded-full border transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#C5A059]/40 bg-[#121110] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#121110]' 
                      : 'border-[#B86B33]/40 bg-[#FCFBF9] text-[#B86B33] hover:bg-[#B86B33] hover:text-white'
                  }`}
                >
                  <span>✕</span> <span>Đóng</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm opacity-80 mb-6">Concept: {selectedPhoto.concept} (Click vào bất kỳ ảnh nào bên dưới để phóng to và bấm nút chuyển qua lại)</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {selectedPhoto.relatedImages.map((imgUrl, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setZoomedImageIndex(idx)}
                    className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-white/10"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Góc chụp ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/60 text-white text-xs px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" /> Phóng to chi tiết
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <a 
                  href="#contact" 
                  onClick={() => {
                    setSelectedPhoto(null);
                    setNote(`${selectedPhoto.concept}`);
                  }}
                  
                  className={`block text-center py-4 rounded-full text-xs tracking-widest uppercase font-medium shadow-sm text-white ${
                    isDarkMode ? 'bg-[#7A2222] hover:bg-[#631B1B] shadow-[#7A2222]/20' : 'bg-[#B86B33] hover:bg-[#A05A28] shadow-[#B86B33]/20'
                  }`}
                >
                  Đặt Lịch Chụp Concept Này
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX: PHÓNG TO ẢNH RIÊNG LẺ */}
      <AnimatePresence>
        {selectedPhoto && zoomedImageIndex !== null && (
          <div 
            onClick={() => setZoomedImageIndex(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-pointer"
          >
            <div className="relative max-w-5xl w-full flex flex-col items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
              
              <div className="w-full flex items-center justify-between mb-4 px-2">
                <span className="text-white/80 text-xs tracking-widest font-serif">
                  Ảnh {zoomedImageIndex + 1} / {selectedPhoto.relatedImages.length}
                </span>

                <button 
                  onClick={() => setZoomedImageIndex(null)}
                  className={`font-serif text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#C5A059]/40 bg-[#1D1B19] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#121110]' 
                      : 'border-white/40 bg-white text-[#221F1E] hover:bg-black hover:text-white'
                  }`}
                >
                  <span>✕</span> <span>Đóng</span>
                </button>
              </div>

              <div className="relative w-full flex items-center justify-center">
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20 backdrop-blur-sm cursor-pointer"
                  title="Ảnh trước"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <img 
                  src={selectedPhoto.relatedImages[zoomedImageIndex]} 
                  alt="Phóng to chi tiết" 
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />

                <button 
                  onClick={handleNextImage}
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20 backdrop-blur-sm cursor-pointer"
                  title="Ảnh tiếp theo"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

            </div>
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
            <span className="font-serif font-semibold">Chung cheng Studio</span>
          </div>
          <p>© 2026 Tiệm Chụp Ảnh Cổ Phục Huế. All rights reserved.</p>
          <div className="flex items-center gap-4 opacity-80">
            <a href="#" className="hover:text-[#B86B33]">Instagram</a>
            <a href="#" className="hover:text-[#B86B33]" title="TikTok">TikTok</a>
            <a href="#" className="hover:text-[#B86B33]">Zalo</a>
          </div>
        </div>
      </footer>

    </div>
  )
}