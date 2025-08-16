Next Dashboard 🚀

یک اپلیکیشن Next.js با معماری ماژولار، توسعه‌پذیر و آماده برای اسکیل که شامل قابلیت‌های لاگین، ثبت‌نام، مدیریت کاربران و گزارش‌هاست.

📌 ویژگی‌ها

Authentication:

لاگین و ثبت‌نام

ذخیره‌سازی توکن‌ها و دیتا در LocalStorage, SessionStorage و Cookie

استفاده از CryptoJS برای رمزنگاری و افزایش امنیت دیتا

State Management:

مدیریت استیت با Redux Toolkit و redux-persist

هر المنت (input) دارای یک slice اختصاصی است که می‌تواند به صورت Persist یا Non-Persist استفاده شود

فایل Core برای مدیریت مرکزی dispatchها → جلوگیری از پراپس دریلیـنگ و بهینه‌سازی رندرها

API Layer:

لایه API با React Query (TanStack Query) پیاده‌سازی شده

پشتیبانی از:

کشینگ هوشمند

abort خودکار درخواست‌ها

generic types برای هر API instance

decoupled design → تغییر یا جایگزینی سرویس‌ها بدون وابستگی به UI

UI / Design System:

طراحی با Material UI (MUI) و Framer Motion

قابل گسترش برای هر input یا کامپوننت جدید مبتنی بر Design System

ساختار کاملاً decoupled بین UI, Service, API

📊 فیچرهای اصلی اپلیکیشن

لاگین و ثبت‌نام

صفحه کاربران:

لیست کاربران با pagination سمت بک‌اند

کشینگ دیتای کاربران با React Query

صفحه داینامیک برای هر کاربر

صفحه لاگ‌ها:

جدول با pagination

نمایش جزئیات و تعداد هر نوع لاگ

سایدبار و صفحات داینامیک

🛠 تکنولوژی‌ها و کتابخانه‌ها

Framework: Next.js 15 + Turbopack

State Management: Redux Toolkit + Redux Persist

Data Fetching: TanStack Query (React Query)

UI: Material UI, MUI DataGrid, Framer Motion

Security & Storage: CryptoJS, Cookie, LocalStorage, SessionStorage

TypeScript + ESLint + Prettier برای کیفیت کد

⚙️ شروع به کار

# نصب پکیج‌ها

npm install

# اجرای سرور توسعه

npm run dev

# بیلد برای پروداکشن

npm run build

# اجرای اپ در محیط پروداکشن

npm start

اپلیکیشن روی http://localhost:3000 در دسترس خواهد بود.

📐 معماری

این معماری شاید برای تسک فعلی کمی over-engineered به نظر بیاد،
اما با نگاه بلندمدت طراحی شده تا:

توسعه‌پذیری بالا داشته باشه

برای نیروی جدید readable و قابل درک باشه

از prop drilling جلوگیری بشه

پرفرمنس و کنترل رندرها دست دولوپر باشه

نتیجه؟
یک پروژه کاملاً SOLID، مقیاس‌پذیر و امن ✅
