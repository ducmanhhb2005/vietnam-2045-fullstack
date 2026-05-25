# VIỆT NAM 2045 - BẠN SẼ LÀ AI?

Full-stack demo project theo yêu cầu đội thi **CỜ ĐẢNG**: website nhập vai + quiz tuyên truyền Nghị quyết theo phong cách trẻ, trực quan, giống layout mockup đã gửi.

## Tech stack

- Frontend: ReactJS + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database/ORM: Prisma ORM + SQLite local database
- API: REST JSON

## Tính năng đã có

- Landing page mở đầu “Việt Nam 2045 - Bạn sẽ là ai?”
- Chọn 1 trong 4 vai trò nhân vật
- 4 tình huống nhập vai có phản hồi sau từng lựa chọn
- Mini quiz 5 câu
- Tính điểm và trả kết quả cá nhân hóa
- Trang kết quả có huy hiệu, điểm phẩm chất, chia sẻ/copy kết quả và tải ảnh kết quả dạng canvas
- API analytics đơn giản để xem số lượt chơi và phân bố kết quả
- Seed dữ liệu đầy đủ bằng Prisma

## Cấu trúc thư mục

```txt
vietnam-2045-fullstack/
├─ client/                 # React + Tailwind frontend
│  ├─ src/
│  │  ├─ components/
│  │  ├─ lib/api.js
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ index.css
│  └─ package.json
├─ server/                 # Express + Prisma backend
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ seed.js
│  ├─ src/
│  │  ├─ index.js
│  │  ├─ prisma.js
│  │  ├─ scoring.js
│  │  └─ routes.js
│  ├─ .env
│  └─ package.json
└─ package.json            # script chạy cả project
```

## Cách chạy nhanh

Yêu cầu: Node.js 18+.

```bash
cd vietnam-2045-fullstack
npm install
npm run setup
npm run dev
```

Sau đó mở:

- Frontend: http://localhost:5173
- Backend health check: http://localhost:4000/api/health

## Chạy thủ công từng phần

Backend:

```bash
cd server
npm install
npm run db:push
npm run db:seed
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

## Cấu hình API frontend

Mặc định frontend gọi backend tại:

```txt
http://localhost:4000/api
```

Nếu deploy backend ở domain khác, tạo file `client/.env`:

```txt
VITE_API_URL=https://your-backend-domain.com/api
```

## API chính

```http
GET  /api/health
GET  /api/bootstrap
POST /api/journey/complete
GET  /api/analytics
```

Ví dụ body tính kết quả:

```json
{
  "roleSlug": "student-digital",
  "choices": [
    { "scenarioId": 1, "choiceId": 1 },
    { "scenarioId": 2, "choiceId": 3 }
  ],
  "answers": [
    { "questionId": 1, "optionId": 1 }
  ]
}
```

## Ghi chú triển khai

- Database mặc định là SQLite nằm tại `server/prisma/dev.db` sau khi chạy `npm run db:push`.
- Nội dung nhân vật, tình huống, quiz và kết quả nằm trong `server/prisma/seed.js`.
- Muốn sửa nội dung, sửa seed rồi chạy lại:

```bash
npm run db:seed --prefix server
```

- Giao diện dùng gradient, glassmorphism, card nhân vật, thanh tiến trình và result badge theo phong cách mockup.
