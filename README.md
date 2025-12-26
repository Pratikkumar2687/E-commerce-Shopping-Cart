# E-commerce Shopping Cart System

A full-stack e-commerce shopping cart application built with Laravel 11, React (Inertia.js), and Tailwind CSS. Features user authentication, real-time cart management, automated low-stock notifications, and daily sales reporting.

## 📋 Table of Contents
- [Features](#✨-features)
- [Tech Stack](#🛠️-tech-stack)
- [Code Architecture](#🏗️-code-architecture)
- [Installation](#📦-installation)
- [Usage](#🚀-usage)
- [Testing](#🧪-testing)
- [Development Time](#⏱️-development-time)
- [License](#📄-license)
- [Author](#👨‍💻-author)

## ✨ Features

### Core Functionality
- **User Authentication:** Secure login/registration using Laravel Breeze  
- **Product Browsing:** View products with real-time stock availability  
- **Shopping Cart:** Add, update, and remove items with persistent storage  
- **Checkout System:** Complete orders with automatic stock deduction  
- **Order History:** Track all completed purchases  

### Advanced Features
- **Low Stock Alerts:** Automated email notifications when inventory falls below 5 units  
- **Daily Sales Reports:** Scheduled reports sent to admin every evening at 8 PM  
- **Queue Management:** Background job processing for emails  
- **Real-time Validation:** Stock checking and quantity validation  
- **Responsive UI:** Mobile-friendly design with Tailwind CSS  

## 🛠️ Tech Stack

**Backend:**
- Laravel 11
- MySQL Database
- Laravel Queue (Database driver)
- Laravel Scheduler (Cron jobs)
- Laravel Mail

**Frontend:**
- React 18
- Inertia.js
- Tailwind CSS
- Vite

**Authentication:**
- Laravel Breeze (React variant)

## 🏗️ Code Architecture

### Backend Structure
```
app/
├── Models/
│   ├── User.php
│   ├── Product.php
│   ├── CartItem.php
│   ├── Order.php
│   └── OrderItem.php
├── Http/Controllers/
│   ├── ProductController.php
│   └── CartController.php
├── Jobs/
│   ├── SendLowStockNotification.php
│   └── SendDailySalesReport.php
└── Mail/
    ├── LowStockAlert.php
    └── DailySalesReport.php
```

### Frontend Structure
```
resources/js/
├── Pages/
│   ├── Products/
│   │   └── Index.jsx
│   └── Cart/
│       └── Index.jsx
└── Layouts/
    └── AuthenticatedLayout.jsx
```

### Database Schema
**Key Relationships:**
- User → has many → CartItems  
- User → has many → Orders  
- Product → has many → CartItems  
- Order → has many → OrderItems  

**Important Fields:**
- `products.stock_quantity` — Real-time inventory tracking  
- `products.low_stock_notified` — Prevents duplicate notifications  
- `cart_items` — User-product relationship with unique constraint  
- `orders.total` — Calculated during checkout  

### Key Design Decisions
1. **Database-Backed Cart** — Persists across sessions, associated with authenticated users.  
2. **Queue System for Emails** — Low stock notifications dispatched asynchronously.  
3. **Scheduled Jobs** — Daily sales report at 8 PM via Laravel Scheduler.  
4. **Transaction Safety** — Checkout wrapped in DB transaction for atomicity.  
5. **Stock Management** — Real-time validation, automatic decrement, threshold ≤5 units.  
6. **Inertia.js for SPA Experience** — Server-side rendering with client-side navigation.  

## 📦 Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+

### Setup Steps
```bash
git clone https://github.com/yourusername/ecommerce-cart.git
cd ecommerce-cart
composer install
npm install
cp .env.example .env
php artisan key:generate
```

Configure `.env` with database and mail settings.  

Create database:
```sql
CREATE DATABASE ecommerce_cart;
```

Run migrations and seed data:
```bash
php artisan migrate:fresh --seed
```

Start development servers:
```bash
# Terminal 1
php artisan serve

# Terminal 2
php artisan queue:work

# Terminal 3
npm run dev

# Terminal 4 (optional)
php artisan schedule:work
```

## 🚀 Usage

- Navigate to `http://localhost:8000`  
- Login Credentials:  
  - **Admin:** admin@example.com / password  
  - **User:** user@example.com / password  

**Testing Features:**
1. Add products to cart  
2. Update/remove items  
3. Checkout and verify stock decrement  
4. Test low stock alerts in logs  
5. Test daily sales report via `php artisan schedule:run`  

Emails are logged in `storage/logs/laravel.log`.

## 🧪 Testing

Manual Testing Checklist:
- User registration/login  
- Browse products and add to cart  
- Update cart quantities  
- Checkout with stock validation  
- Trigger low stock notifications  
- Generate daily sales report  

Database inspection via `php artisan tinker`:
```php
\App\Models\CartItem::with('product')->get();
\App\Models\Order::with('items.product')->get();
\App\Models\Product::all();
\App\Models\CartItem::truncate(); # Clear cart if needed
```

## ⏱️ Development Time
**Approx. 2.5–3 hours**  
- Setup: 30 min  
- Backend: 1 hour  
- Jobs & Scheduling: 30 min  
- Frontend: 45 min  
- Testing/Debugging: 30 min  
- Documentation: 15 min  

## 📄 License
MIT License  

## 👨‍💻 Author
Portfolio/demonstration project showcasing full-stack Laravel + React development with queues and scheduling.  
*Note: For production use, implement payment, shipping, order tracking, and admin dashboard.*
