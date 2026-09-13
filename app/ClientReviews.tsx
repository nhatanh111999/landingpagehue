'use client'

import React, { useState, useEffect } from 'react'

const reviews = [
  {
    id: 1,
    quote: "Khoác lên mình bộ Nhật Bình và bước đi giữa Đại Nội, mình thực sự xúc động như được sống lại trong không gian hoàng triều xưa. Tone màu trầm hiện đại của tiệm xuất sắc tuyệt vời!",
    author: "— CHỊ MINH ANH (HÀ NỘI)"
  },
  {
    id: 2,
    quote: "Không gian studio ấm cúng và chỉn chu đến từng chi tiết. Nhìn thành quả những khung hình mang đậm chất Huế trầm mặc, mình thấy hoàn toàn xứng đáng.",
    author: "— ANH HOÀNG NAM (TP. HỒ CHÍ MINH)"
  },
  {
    id: 3,
    quote: "Ekip hỗ trợ cực kỳ có tâm, hướng dẫn tạo dáng rất tự nhiên giúp mình không bị ngượng ngùng. Nhận ảnh xong ai cũng khen góc chụp có hồn và rất thơ.",
    author: "— BẠN KHÁNH LINH (ĐÀ NẴNG)"
  }
]

export default function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    // Thời gian chuyển đổi qua lại giữa các review (ví dụ: 5 giây)
    const interval = setInterval(() => {
      setFade(false) // Bắt đầu hiệu ứng mờ dần
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
        setFade(true) // Hiện lại nội dung mới
      }, 500) // Khớp với thời gian transition bên dưới
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-[#121212] text-neutral-200 flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        {/* Tiêu đề nhỏ phía trên */}
        <p className="text-amber-600/90 text-xs sm:text-sm tracking-[0.25em] uppercase mb-8 font-medium">
          GÓC NHÌN KHÁCH HÀNG
        </p>

        {/* Nội dung trích dẫn với hiệu ứng mờ dần mượt mà */}
        <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <blockquote className="font-serif italic text-lg sm:text-2xl md:text-3xl leading-relaxed text-neutral-100 mb-8">
            &ldquo;{reviews[currentIndex].quote}&rdquo;
          </blockquote>

          {/* Tác giả */}
          <p className="text-xs sm:text-sm tracking-[0.2em] text-amber-600/80 font-semibold">
            {reviews[currentIndex].author}
          </p>
        </div>

        {/* Chấm tròn chuyển đổi thủ công (tùy chọn để người dùng dễ theo dõi) */}
        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setFade(false)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setFade(true)
                }, 300)
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-amber-600' : 'w-2 bg-neutral-700'
              }`}
              aria-label={`Chuyển đến đánh giá ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}