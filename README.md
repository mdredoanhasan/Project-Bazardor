# 🛒 বাজার দর (Bazardor)

**Live Demo:** [https://project-bazardor.vercel.app](https://project-bazardor.vercel.app/)

Bazardor is a Bangla market price tracking web app. It shows the daily prices of everyday essentials like rice, lentils, vegetables, fish, eggs and oil, and tells you which prices went up or down compared to yesterday, all in one glance.

---

## ✨ Features

- 📈 **Price increase section**: shows the products whose price went up today, with the percentage change.
- 📉 **Price decrease section**: shows the products whose price came down today.
- 🔁 **Live price marquee**: a scrolling ticker with every product's price and trend (▲ up, ▼ down, — unchanged).
- 🗂️ **Category pages**: browse products by category (rice, lentils, oil, vegetables, fish and more).
- 🏪 **Product details**: market-wise prices with minimum, maximum and average price for each product, plus a summary card.
- 🔐 **Authentication**: sign up and sign in with email and password.
- 👤 **User profile**: view account information and update your name.
- 🔢 **Bangla UI**: Bangla text and Bangla digits throughout the app.
- 📱 **Responsive design**: works on mobile, tablet and desktop.

---

## 🛠️ Technologies Used

| Category | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Server Components) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [HeroUI](https://www.heroui.com/) |
| Authentication | [Better Auth](https://www.better-auth.com/) |
| Database | MongoDB |
| Icons | React Icons |
| Marquee | react-marquee-text |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
src/
└── app/
    ├── category/[categoryId]/   # Category page
    ├── product/[slug]/          # Product details page
    ├── sign-in/                 # Sign in page
    ├── sign-up/                 # Sign up page
    ├── profile/                 # User profile page
    ├── component/               # Navbar, Footer, Marquee, price cards, types
    └── lib/                     # Auth setup and data fetching helpers
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_MONGODB_URL=your-mongodb-connection-string
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment

The project is deployed on Vercel. To deploy your own copy:

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add the same environment variables in **Settings → Environment Variables**, and set `BETTER_AUTH_URL` to your Vercel URL.
4. Deploy.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
