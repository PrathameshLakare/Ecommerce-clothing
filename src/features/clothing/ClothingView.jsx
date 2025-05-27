import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchClothings, setSortByPrice } from "./clothingSlice";
import { postCartData, deleteCartItem, fetchCartData } from "../cart/cartSlice";
import {
  fetchWishlistData,
  postWishlistData,
  deleteWishlistItem,
} from "../wishllist/wishlistSlice";
import ProductListing from "@/components/ProductListing";
import { toast } from "sonner";

export default function ClothingView({ searchValue }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { category: productCategory } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchClothings());
    dispatch(fetchWishlistData());
    dispatch(fetchCartData());

    if (productCategory) {
      setSelectedCategories((prev) => [...prev, productCategory]);
    }
  }, [dispatch, productCategory]);

  const { clothing, sortByPrice, status, error } = useSelector(
    (s) => s.clothing
  );
  const { wishlist } = useSelector((s) => s.wishlist);
  const { cart } = useSelector((s) => s.cart);

  const data = clothing.filter((item) =>
    item.productName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredData = data.filter((product) => {
    const inCategory =
      selectedCategories.length === 0 ||
      product.productCategories
        .map((c) => selectedCategories.includes(c.toLowerCase()))
        .includes(true);
    return inCategory && product.productRating >= rating;
  });

  const sortedProducts = filteredData.sort((a, b) => {
    if (sortByPrice === "lowToHigh") return a.productPrice - b.productPrice;
    if (sortByPrice === "highToLow") return b.productPrice - a.productPrice;
    return 0;
  });

  const clearFilters = (e) => {
    e.preventDefault();
    setSelectedCategories([productCategory]);
    setRating(1);
    dispatch(setSortByPrice("none"));
  };

  const toggleCategory = (e) => {
    const { value, checked } = e.target;
    const val = value.toLowerCase();
    setSelectedCategories((prev) =>
      checked ? [...prev, val] : prev.filter((c) => c !== val)
    );
  };

  const handleSort = (value) => dispatch(setSortByPrice(value));

  const clickCart = (id) => {
    const inCart = cart.map((i) => i.productId).includes(id);
    if (inCart) {
      dispatch(deleteCartItem(id));
      toast("Removed from cart", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      const p = clothing.find((p) => p._id === id);
      dispatch(
        postCartData({
          productId: p._id,
          productName: p.productName,
          productCategories: p.productCategories,
          productImg: p.productImg,
          productPrice: p.productPrice,
          productRating: p.productRating,
          productQuantity: 1,
        })
      );
      toast("Added to cart", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  const clickWish = (id) => {
    const inWish = wishlist.map((i) => i.productId).includes(id);
    if (inWish) {
      dispatch(deleteWishlistItem(id));
      toast("Removed from wishlist", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      const p = clothing.find((p) => p._id === id);
      dispatch(
        postWishlistData({
          productId: p._id,
          productName: p.productName,
          productCategories: p.productCategories,
          productImg: p.productImg,
          productPrice: p.productPrice,
          productRating: p.productRating,
        })
      );
      toast("Added to wishlist", {
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 max-w-md bg-white p-4 md:p-6 rounded-lg shadow">
          <form id="filtersForm" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-indigo-600 hover:underline text-sm"
                type="button"
              >
                Clear
              </button>
            </div>

            <hr className="border-gray-300" />

            {/* Categories */}
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Category</h4>
              <div className="space-y-2">
                {["Clothing", "Men", "Women", "Kids"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                      className="mr-2 accent-indigo-600"
                      checked={selectedCategories.includes(cat.toLowerCase())}
                    />
                    {cat} Clothing
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Rating */}
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Rating</h4>
              <div className="flex justify-between text-sm text-gray-500 mb-2 px-1">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </form>
        </aside>

        {/* Product Listing */}
        <ProductListing
          products={sortedProducts}
          cart={cart}
          wishlist={wishlist}
          handleSort={handleSort}
          error={error}
          clickCart={clickCart}
          clickWish={clickWish}
          status={status}
          sortByPrice={sortByPrice}
        />
      </div>
    </div>
  );
}
