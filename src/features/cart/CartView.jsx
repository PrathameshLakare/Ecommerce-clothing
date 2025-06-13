import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartData,
  deleteCartItem,
  postCartData,
  updateCartData,
} from "./cartSlice";
import {
  fetchWishlistData,
  deleteWishlistItem,
  postWishlistData,
} from "../wishllist/wishlistSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CartView = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart, cartValue, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, [dispatch]);

  const isInCart = (id) => cart.map((item) => item.productId).includes(id);
  const isInWishlist = (id) =>
    wishlist.map((item) => item.productId).includes(id);

  const clickHandlerForCartBtn = (id) => {
    if (isInCart(id)) {
      dispatch(deleteCartItem(id));
      toast("Item removed from cart!", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      const item = wishlist.find((product) => product.productId === id);
      if (item) {
        const cartItem = {
          productId: item.productId,
          productName: item.productName,
          productCategories: item.productCategories,
          productImg: item.productImg,
          productPrice: item.productPrice,
          productRating: item.productRating,
          productQuantity: 1,
        };
        dispatch(postCartData(cartItem));
        toast("Item added to cart!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    }
  };

  const clickHandlerForWishlistBtn = (id) => {
    if (isInWishlist(id)) {
      dispatch(deleteWishlistItem(id));
      toast("Item removed from wishlist!", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      const item = cart.find((product) => product.productId === id);
      if (item) {
        const cartItem = {
          productId: item.productId,
          productName: item.productName,
          productCategories: item.productCategories,
          productImg: item.productImg,
          productPrice: item.productPrice,
          productRating: item.productRating,
        };
        dispatch(postWishlistData(cartItem));
        toast("Item added to wishlist!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    }
  };

  const clickHandlerForIncreasingQuantity = (id) => {
    const item = cart.find((product) => product.productId === id);
    if (item) {
      const updatedData = { productQuantity: item.productQuantity + 1 };
      dispatch(updateCartData({ id, updatedData }));
    }
  };

  const clickHandlerForDecreasingQuantity = (id) => {
    const item = cart.find((product) => product.productId === id);
    if (item && item.productQuantity > 1) {
      const updatedData = { productQuantity: item.productQuantity - 1 };
      dispatch(updateCartData({ id, updatedData }));
    }
  };

  const totalCartPrice = cart.reduce(
    (acc, curr) =>
      acc + parseInt(curr.productPrice) * parseInt(curr.productQuantity),
    0
  );

  const deliveryCharges = 499;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        My Cart ({cartValue})
      </h2>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "error" && (
        <p className="text-center text-red-500">{error}</p>
      )}
      {cart.length === 0 && status !== "loading" && (
        <p className="text-center">Your cart is empty.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {cart.map((product) => (
            <Card key={product._id} className="mb-4">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                <img
                  src={product.productImg}
                  alt={product.productName}
                  className="w-full h-40 md:w-40 md:h-40 object-cover rounded"
                />
                <div className="flex-1 flex flex-col">
                  <CardTitle className="text-xl mb-2">
                    {product.productName}
                  </CardTitle>
                  <p className="text-gray-700 font-medium mb-2">
                    Price: ₹{product.productPrice}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="mr-2">Quantity:</span>
                    <button
                      onClick={() =>
                        clickHandlerForDecreasingQuantity(product.productId)
                      }
                      className="px-2 py-1 border rounded-full"
                    >
                      -
                    </button>
                    <span className="mx-3">{product.productQuantity}</span>
                    <button
                      onClick={() =>
                        clickHandlerForIncreasingQuantity(product.productId)
                      }
                      className="px-2 py-1 border rounded-full"
                    >
                      +
                    </button>
                  </div>

                  {/* Buttons container */}
                  <div className="flex flex-col md:flex-col gap-3 mt-auto">
                    <Button
                      className="w-full py-2"
                      variant="default"
                      onClick={() => clickHandlerForCartBtn(product.productId)}
                    >
                      {cart.map((i) => i.productId).includes(product.productId)
                        ? "Remove"
                        : "Add to Cart"}
                    </Button>
                    <Button
                      className="w-full py-2"
                      variant="outline"
                      onClick={() =>
                        clickHandlerForWishlistBtn(product.productId)
                      }
                    >
                      {wishlist
                        .map((i) => i.productId)
                        .includes(product.productId)
                        ? "Remove"
                        : "Save to Wishlist"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">PRICE DETAILS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Price ({cartValue} items)</span>
                <span>₹ {totalCartPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>₹ {deliveryCharges}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Amount</span>
                <span>₹ {totalCartPrice + deliveryCharges}</span>
              </div>
              <Link
                to="/address"
                className="block mt-4 w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                PLACE ORDER
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartView;
