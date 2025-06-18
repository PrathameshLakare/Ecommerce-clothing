# MyShoppingSite

An e-commerce website for clothing, where users can browse multiple products across
different categories. Features include a shopping cart, wishlist, and filters such as sorting by price, rating, and category.

---

## Demo Link

[Live Demo](https://ecommerce-clothing-zeta.vercel.app)

---

## Quick Start

```
git clone https://github.com/PrathameshLakare/Ecommerce-clothing.git
cd Ecommerce-clothing # Only if there is a project folder created by Git
npm install
npm run dev
```

## Technologies

- React JS
- Redux Toolkit
- React Router
- Node.js
- Express
- MongoDB
- JWT
- Tailwind CSS
- shadcn/ui

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://youtu.be/vKWcg12jUxg?si=mVglwZLIzHv949FG)

## Features

**Landing Page**

- The front page (home) displays multiple clothing categories.

**Product Listing Page**:

- Clicking on a category navigates to a listing page with:
  - Filters: by category, by rating
  - Sort: by price
  - All products are listed (no pagination)

**Product Details Page**

- Clicking on a product opens the product details page.

**Wishlist Page**

- Shows products added to the wishlist.
- You can remove items directly from this page.

**Cart Page**

- Displays all cart items with quantity controls.
- Shows an order summary.
- "Place Order" button navigates to the Address Page.

**Address Page**

- Displays saved addresses.
- Option to add a new address or update existing one.
- "Checkout" button places the order and navigates to the Order Summary Page.

**Address Form Page**

- Used to add or update address details.

**Order Summary Page**

- Shows details of the placed order.

## API Reference

- **Backend Repo**: [GitHub Link Here](https://github.com/PrathameshLakare/MajorProjectBackendEComerce.git)

### **GET /api/products**<br>

List all products<br>
Sample Response:<br>
`[{ _id, productImg, productName, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }, …]`

---

### **GET /api/products/:productId**<br>

Get details for one product<br>
Sample Response:<br>
`{ _id, productImg, productName, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }`

---

### **POST /api/products**<br>

Create a new product<br>
Sample Response:<br>
`{ _id, productImg, productName, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }`

---

### **GET /api/categories**<br>

List all categories<br>
Sample Response:<br>
`[{ _id, categoryName, categoryImg }, …]`

---

### **GET /api/categories/:categoryId**<br>

Get details for one category<br>
Sample Response:<br>
`{ _id, categoryName, categoryImg }`

---

### **POST /api/categories**<br>

Create a new category<br>
Sample Response:<br>
`{ _id, categoryName, categoryImg }`

---

### **GET /api/wishlist**<br>

List all wishlist items<br>
Sample Response:<br>
`[{ _id, productId, productImg, productName, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }, …]`

---

### **POST /api/wishlist**<br>

Add a product to the wishlist<br>
Sample Response:<br>
`{ _id, productId, productImg, productName, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }`

---

### **DELETE /api/wishlist/:id**<br>

Remove a product from the wishlist by productId<br>
Sample Response:<br>
`{ message, product: { _id, ... } }`

---

### **GET /api/cart**<br>

List all items in the cart<br>
Sample Response:<br>
`[{ _id, productId, productImg, productName, productQuantity, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }, …]`

---

### **POST /api/cart**<br>

Add a product to the cart<br>
Sample Response:<br>
`{ _id, productId, productImg, productName, productQuantity, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }`

---

### **PUT /api/updateCart/:id**<br>

Update quantity or details of a cart item by productId<br>
Sample Response:<br>
`{ _id, productId, productImg, productName, productQuantity, productPrice, productDetails, productCategories, productRating, createdAt, updatedAt }`

---

### **DELETE /api/cart/:id**<br>

Remove a product from the cart by productId<br>
Sample Response:<br>
`{ message, product: { _id, ... } }`

---

### **GET /api/user/address**<br>

List all user addresses<br>
Sample Response:<br>
`[{ _id, houseNumber, streetName, landmark, city, state, country, postalCode }, …]`

---

### **POST /api/user/address**<br>

Add a new address<br>
Sample Response:<br>
`{ _id, houseNumber, streetName, landmark, city, state, country, postalCode }`

---

### **POST /api/user/address/:id**<br>

Update an address by ID<br>
Sample Response:<br>
`{ _id, houseNumber, streetName, landmark, city, state, country, postalCode }`

---

### **DELETE /api/user/address/:id**<br>

Delete an address by ID<br>
Sample Response:<br>
`{ message, address: { _id, ... } }`

---

### **POST /api/order/placed**<br>

Place an order using cart data<br>
Sample Response:<br>
`{ _id, products: [{ productId, productImg, productName, productQuantity, productPrice, productDetails, productCategories, productRating }], totalAmount, shippingAddress, createdAt, updatedAt }`

---

### **GET /api/order/:id**<br>

Get order details by order ID<br>
Sample Response:<br>
`{ _id, products: [{ productId, productImg, productName, productQuantity, productPrice, productDetails, productCategories, productRating }], totalAmount, shippingAddress, createdAt, updatedAt }`

## Contact

For bugs or feature requests, please reach out to prathameshlakare001@gmail.com
