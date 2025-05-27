import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlistData,
  deleteWishlistItem,
  postWishlistData,
} from "./wishlistSlice";
import { fetchCartData, deleteCartItem, postCartData } from "../cart/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WishlistView = () => {
  const dispatch = useDispatch();
  const { wishlist, status, error } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, [dispatch]);

  const clickCart = (id) => {
    const item = wishlist.find((p) => p.productId === id);
    if (cart.map((i) => i.productId).includes(id)) {
      dispatch(deleteCartItem(id));
      toast("Removed from cart", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      if (item) {
        dispatch(postCartData({ ...item, productQuantity: 1 }));
        toast("Added to cart", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    }
  };

  const clickWish = (id) => {
    if (wishlist.map((i) => i.productId).includes(id)) {
      dispatch(deleteWishlistItem(id));
      toast("Removed from wishlist", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      const item = cart.find((i) => i.productId === id);
      if (item) dispatch(postWishlistData(item));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        My Wishlist
      </h1>

      {status === "loading" && (
        <p className="text-center text-gray-500">Loading...</p>
      )}
      {status === "error" && (
        <p className="text-center text-red-500">{error}</p>
      )}
      {!wishlist.length && status !== "loading" && (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <Card key={product.productId} className="group p-0">
            <Link to={`/productListing/ProductDetails/${product.productId}`}>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.productImg}
                  alt={product.productName}
                  className="w-full aspect-[4/3] object-cover bg-gray-200 group-hover:opacity-75 transition"
                />
                <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.productRating} ★
                </span>
              </div>
            </Link>

            <CardContent className="p-4">
              <Link to={`/productListing/ProductDetails/${product.productId}`}>
                <h3 className="text-md font-medium text-gray-800 truncate">
                  {product.productName}
                </h3>
              </Link>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                ₹{product.productPrice}
              </p>
              <div className="mt-4 space-y-2">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() => clickCart(product.productId)}
                >
                  {cart.map((i) => i.productId).includes(product.productId)
                    ? "Remove"
                    : "Add to Cart"}
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => clickWish(product.productId)}
                >
                  {wishlist.map((i) => i.productId).includes(product.productId)
                    ? "Remove"
                    : "Save to Wishlist"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistView;
