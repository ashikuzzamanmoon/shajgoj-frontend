# Shajgoj Frontend

This is a frontend clone of the Shajgoj website, built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com/). The project showcases the features of a modern e-commerce website, including product browsing, searching, filtering, a shopping cart, and more.

#### Live link: [https://shajgoj.vercel.app](https://shajgoj.vercel.app/)

## Features

- Homepage: A beautifully designed homepage with an engaging hero slider, promotional banners, and various product categories.

- Product Categories: Browse products by different categories.

- Product Details: A dedicated page for each product with images, detailed descriptions, prices, and other relevant information.

- Search and Filtering: Advanced search and filtering options to find products by brand, category, and price.

- Shopping Cart: Users can add products to their cart, change quantities, and remove items.

- Wishlist: A feature to add favorite products to a wishlist for future purchase.

- Checkout: A simple and user-friendly checkout process.

- Responsive Design: Fully responsive for mobile, tablet, and desktop devices.

## Tech Stack

The following technologies were used to build this project:

- Frontend:

  - [Next.js](https://nextjs.org/) (React Framework)

  - [React](https://react.dev/)

  - [TypeScript](https://www.typescriptlang.org/)

- Styling:

  - [Tailwind CSS](https://tailwindcss.com/)

- UI Components:

  - [Headless UI](https://headlessui.com/)

  - [Lucide React](https://lucide.dev/) (Icons)

- Slider/Carousel:

  - [Embla Carousel](https://www.embla-carousel.com/)

- Notifications:

  - [React Hot Toast](https://react-hot-toast.com/)

## Getting Started

To run this project on your local machine, follow these steps:

### Prerequisites:

- [Node.js](https://nodejs.org/en) (v18.18.0 or newer)
- [npm](https://www.npmjs.com/)/[yarn](https://yarnpkg.com/)/[pnpm](https://pnpm.io/)/[bun](https://bun.sh/)

### Installation:

1. Clone this repository:

```bash
git clone https://github.com/ashikuzzamanmoon/shajgoj-frontend.git
```

2. Navigate to the project directory:

```bash
cd shajgoj-frontend
```

3. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Now, you can view the project by visiting [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

The main folders and files of the project are listed below:

- `/app`: Contains all the routes, pages, and layouts, built using the Next.js App Router.

- `/components`: Includes all the UI components used in the project.

- `/context`: Manages the global state for CartContext and WishlistContext.

- `/data`: Contains JSON files like products.json and brands.json, which are used as demo data.

- `/public`: Includes static assets like images, icons, etc.

- `/types`: Contains all TypeScript type definitions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
