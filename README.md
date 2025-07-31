# 🌍 Rate Card Calculator

A modern, responsive pricing calculator built with **Next.js 14**, **Supabase**, **TailwindCSS**, **Shadcn/UI**, and **CurrencyAPI**. This application features two calculators (Custom Resource & SWAT Team), dynamic currency conversion, email sending via EmailJS, and PDF generation.

---

## 📦 Features

- ✅ **Custom Resource Calculator** – Calculate rates based on workload, duration, and seniority level
- ✅ **SWAT Team Calculator** – Fixed team-based pricing model with discount logic
- ✅ **Currency Switching** – Supports multiple currencies (USD, EUR, PKR, AED, GBP, INR, AUD, CAD)
- ✅ **Email Integration** – Sends results via EmailJS
- ✅ **PDF Generation** – Downloadable quote with calculator results
- ✅ **Responsive UI** – Optimized for desktop and mobile using TailwindCSS + Shadcn UI
- ✅ **Live Exchange Rates** – Pulled hourly from CurrencyAPI and saved to Supabase

---

## 🚀 Live Demo

🌐 [View Deployed App on Vercel](https://your-app-url.vercel.app)

---

## 🧠 Tech Stack

| Tech | Purpose |
|------|---------|
| **Next.js 14 (App Router)** | Core React framework |
| **TypeScript** | Type-safe coding |
| **Supabase** | Database + Auth + Cron scheduling |
| **TailwindCSS** | Utility-first CSS styling |
| **Shadcn/UI** | Component system for beautiful UI |
| **CurrencyAPI** | Real-time exchange rates |
| **EmailJS** | Email sending |
| **React-Toaster** | Notifications |

---

## 🧩 Project Structure

```
/app
  /api
  /hooks
  /components
    /modals
    /common
    Swatcalculator
    CustomResource
/lib
/public
/styles
.env.local
vercel.json
README.md
```

---

## ⚙️ Environment Variables

Set the following in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_email_service
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_key

NEXT_PUBLIC_CURRENCY_API_KEY=your_currency_api_key
```

---

## 🧪 Running Locally

```bash
git clone https://github.com/stackaxiom/rate-card-calculator.git
cd rate-card-calculator
npm install
cp .env.local.example .env.local
# Add your environment variables
npm run dev
```

Visit `http://localhost:3000`

---

## 📊 Business Logic

- **Workload %** is multiplied with hourly rate based on role seniority.
- **Duration Discounts**: Auto-applied based on project length (e.g. 5% for 3 months).
- **SWAT Team**: Team roles are fixed with flat pricing and monthly bundling.
- **Currency Conversion**: Rates are converted using real-time CurrencyAPI data saved to Supabase every hour via Vercel Cron job.

---

## 📩 Email & PDF

- Users can **send quote summaries via EmailJS**

---

## 📁 Deployment (Vercel)

- App is configured for Vercel with `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/currency",
      "schedule": "0 * * * *"
    }
  ]
}
```

---

## 🛠️ Tools Used

- ChatGPT / Copilot (AI-assisted logic or markdown formatting)
- VSCode + ESLint + Prettier

---

## 📹 Video Demo

Include a screen recording showing:

- Full walkthrough of both calculators
- Currency switching in action
- Email sent confirmation (toast)
- PDF download flow
- Mobile responsiveness demo

---

