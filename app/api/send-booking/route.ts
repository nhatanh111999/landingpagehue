import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, phone, email, selectedPackage } = body

    if (!fullName) {
      return NextResponse.json({ success: false, message: 'Thiếu họ tên' }, { status: 400 })
    }

    // Lấy trực tiếp từ file .env.local
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    const message = `
<b>🔔 CÓ KHÁCH ĐẶT LỊCH CHỤP ẢNH MỚI!</b> 📸

👤 <b>Họ tên:</b> ${fullName}
📞 <b>Số điện thoại / Zalo:</b> ${phone || 'Không cung cấp'}
📧 <b>Email:</b> ${email || 'Không cung cấp'}
🎁 <b>Gói trải nghiệm:</b> ${selectedPackage}
⏱ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN')}
    `.trim()

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    const telegramData = await telegramResponse.json()

    if (!telegramData.ok) {
      console.error('CHI TIẾT LỖI TỪ TELEGRAM:', telegramData)
      throw new Error(`Không thể gửi tin nhắn đến Telegram: ${telegramData.description}`)
    }

    return NextResponse.json({ success: true, message: 'Đã gửi thành công' })
  } catch (error) {
    console.error('Lỗi server:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}