# Copa E-Commerce Website

Welcome to the Copa E-Commerce Website repository! This project is an e-commerce platform built with modern web technologies to deliver a seamless shopping experience.

## 🛠️ Technologies Used

- **TypeScript** (95.2%): Provides type safety and scalability for the application.
- **CSS** (3%): Handles styling and layout for a visually appealing user interface.
- **Other** (1.8%): Includes configuration files, assets, and other essential components.

## 🚀 Features

- **User-Friendly Interface**: Intuitive design for a smooth shopping experience.
- **Secure Transactions**: Ensures customer data and payment information are handled securely.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Product Management**: Add, update, and delete products easily.
- **Order Tracking**: Track orders from purchase to delivery.

## 📂 Project Structure

The repository is organized as follows:

```
copa-ecommerce-website/  
├── .gitignore  
├── package.json  
├── pnpm-workspace.yaml (or an equivalent for your package manager)  
├── README.md  
├── apps/  
│   ├── web/ (Next.js 15 frontend)  
│   │   ├── public/  
│   │   │   ├── assets/  
│   │   │   │   ├── images/  
│   │   │   │   │   ├── products/  
│   │   │   │   │   ├── banners/  
│   │   │   │   │   ├── icons/  
│   │   │   │   │   └── logos/  
│   │   │   │   ├── fonts/  
│   │   │   │   └── favicons/  
│   │   │   └── robots.txt  
│   │   ├── src/  
│   │   │   ├── app/ (App Router)  
│   │   │   │   ├── (home)/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── shop/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── product/  
│   │   │   │   │   └── [id]/  
│   │   │   │   │       └── page.tsx  
│   │   │   │   ├── cart/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── checkout/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── account/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── admin/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── auth/  
│   │   │   │   │   ├── login/  
│   │   │   │   │   │   └── page.tsx  
│   │   │   │   │   ├── register/  
│   │   │   │   │   │   └── page.tsx  
│   │   │   │   │   └── logout/  
│   │   │   │   │       └── page.tsx  
│   │   │   │   ├── about/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── contact/  
│   │   │   │   │   └── page.tsx  
│   │   │   │   ├── layout.tsx  
│   │   │   │   └── page.tsx  
│   │   │   ├── components/  
│   │   │   │   ├── ui/ (shadcn/ui components)  
│   │   │   │   ├── product/  
│   │   │   │   ├── cart/  
│   │   │   │   ├── navigation/  
│   │   │   │   └── auth/  
│   │   │   ├── styles/  
│   │   │   │   ├── globals.css  
│   │   │   │   ├── theme/  
│   │   │   │   ├── components/  
│   │   │   │   │   ├── buttons.css  
│   │   │   │   │   ├── cards.css  
│   │   │   │   │   ├── forms.css  
│   │   │   │   │   └── navigation.css  
│   │   │   │   └── pages/  
│   │   │   │       ├── home.css  
│   │   │   │       ├── product.css  
│   │   │   │       └── checkout.css  
│   │   │   ├── lib/  
│   │   │   │   ├── api/  
│   │   │   │   ├── auth.ts  
│   │   │   │   └── utils.ts  
│   │   │   ├── types/  
│   │   │   ├── contexts/  
│   │   │   └── hooks/  
│   │   ├── next.config.js  
│   │   ├── tsconfig.json  
│   │   └── tailwind.config.js (or another CSS framework)  
│   └── server/ (NestJS backend)  
│       ├── src/  
│       │   ├── main.ts  
│       │   ├── app.module.ts  
│       │   ├── prisma/  
│       │   │   └── prisma.service.ts  
│       │   ├── auth/  
│       │   │   ├── auth.module.ts  
│       │   │   ├── auth.controller.ts  
│       │   │   ├── auth.service.ts  
│       │   │   ├── strategies/  
│       │   │   │   ├── jwt.strategy.ts  
│       │   │   │   └── refresh.strategy.ts  
│       │   │   ├── guards/  
│       │   │   │   └── jwt-auth.guard.ts  
│       │   │   └── dto/  
│       │   ├── user/  
│       │   ├── product/  
│       │   ├── cart/  
│       │   ├── order/  
│       │   ├── payment/  
│       │   └── shared/  
│       ├── test/  
│       ├── prisma/  
│       │   ├── schema.prisma  
│       │   └── migrations/  
│       ├── .env  
│       ├── tsconfig.json  
│       └── nest-cli.json  
├── libs/ (shared libraries)  
│   └── shared-types/ (TypeScript types shared between frontend and backend)  
├── docker-compose.yml (for PostgreSQL)  
└── .env (global environment variables)
```

## 🧑‍💻 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js (or install [Yarn](https://yarnpkg.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sisovin/copa-ecommerce-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd copa-ecommerce-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## 🌟 Contributing

We welcome contributions! To contribute:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push your branch (`git push origin feature-name`).
5. Create a pull request.

## 🐞 Issues

If you encounter any bugs or have feature requests, please [open an issue](https://github.com/sisovin/copa-ecommerce-website/issues).

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
