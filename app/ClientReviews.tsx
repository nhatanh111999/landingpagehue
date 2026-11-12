'use client'

import React, { useState, useEffect } from 'react'
import type { Review } from './content/default-content'

export default function ClientReviews({ reviews }: { reviews: Review[] }) {
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
  }, [reviews.length])

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