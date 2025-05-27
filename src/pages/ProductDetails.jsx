import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchClothings } from "../features/clothing/clothingSlice";
import {
  postCartData,
  fetchCartData,
  deleteCartItem,
} from "../features/cart/cartSlice";
import {
  postWishlistData,
  fetchWishlistData,
  deleteWishlistItem,
} from "../features/wishllist/wishlistSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { clothing, status } = useSelector((state) => state.clothing);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchClothings());
    dispatch(fetchCartData());
    dispatch(fetchWishlistData());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = clothing?.find((p) => p._id === productId);

  const clickHandlerForCart = (id) => {
    const inCart = cart.some((item) => item.productId === id);
    if (inCart) {
      dispatch(deleteCartItem(id));
      toast("Item removed from cart!", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      const item = clothing.find((p) => p._id === id);
      if (item) {
        dispatch(
          postCartData({
            productId: item._id,
            productName: item.productName,
            productCategories: item.productCategories,
            productImg: item.productImg,
            productPrice: item.productPrice,
            productRating: item.productRating,
            productQuantity: 1,
          })
        );

        toast("Item added to cart!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    }
  };

  const clickHandlerForWishlist = (id) => {
    const inWishlist = wishlist.some((item) => item.productId === id);
    if (inWishlist) {
      dispatch(deleteWishlistItem(id));

      toast("Item removed from wishlist!", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      const item = clothing.find((p) => p._id === id);
      if (item) {
        dispatch(
          postWishlistData({
            productId: item._id,
            productName: item.productName,
            productCategories: item.productCategories,
            productImg: item.productImg,
            productPrice: item.productPrice,
            productRating: item.productRating,
          })
        );
        toast("Item added to wishlist!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    }
  };

  return (
    <div className="max-w-5xl md:my-15 mx-auto px-4 py-6">
      {status === "loading" && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {product && (
        <Card className="flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/2 h-64 md:h-auto p-3">
            <img
              src={product.productImg}
              alt={product.productName}
              className="w-full h-full object-cover rounded"
            />
          </div>

          <CardContent className="flex-1 p-6 flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-2">
                {product.productName}
              </CardTitle>
            </CardHeader>

            <div className="space-y-2 text-gray-700 flex-1">
              <p>
                <strong>Price:</strong> ₹{product.productPrice}
              </p>
              <p>
                <strong>Rating:</strong> {product.productRating} ★
              </p>
              <p>
                <strong>Categories:</strong>{" "}
                {product.productCategories.join(", ")}
              </p>
              <p>
                <strong>Details:</strong> {product.productDetails}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                variant="default"
                onClick={() => clickHandlerForCart(product._id)}
              >
                {cart.some((i) => i.productId === product._id)
                  ? "Remove from cart"
                  : "Add to cart"}
              </Button>
              <Button
                variant="outline"
                onClick={() => clickHandlerForWishlist(product._id)}
              >
                {wishlist.some((i) => i.productId === product._id)
                  ? "Remove from wishlist"
                  : "Save to Wishlist"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 text-center">
        <Link to="/productListing/clothing">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
