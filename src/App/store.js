import { configureStore } from "@reduxjs/toolkit";
import clothingSlice from "../features/clothing/clothingSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import cartSlice from "../features/cart/cartSlice";
import wishlistSlice from "../features/wishllist/wishlistSlice";
import addressSlice from "../features/address/addressSlice";

export default configureStore({
  reducer: {
    clothing: clothingSlice,
    categories: categoriesSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    address: addressSlice,
  },
});
