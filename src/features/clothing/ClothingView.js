import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchClothings, setSortByPrice } from "./clothingSlice";
import { postCartData, deleteCartItem, fetchCartData } from "../cart/cartSlice";
import {
  fetchWishlistData,
  postWishlistData,
  deleteWishlistItem,
} from "../wishllist/wishlistSlice";
import { setSelectedCategories } from "../categories/categoriesSlice";

const ClothingView = ({ searchValue }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const productCategory = useParams().category;

  useEffect(() => {
    dispatch(fetchClothings());
    dispatch(fetchWishlistData());
    dispatch(fetchCartData());
  }, []);

  const { clothing, sortByPrice, status, error } = useSelector(
    (state) => state.clothing
  );
  const { selectedCategories } = useSelector((state) => state.categories);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  console.log(selectedCategories);

  const data = clothing.filter((item) =>
    item.productName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const clickHandlerForCart = (id) => {
    const isInCart = cart.map((item) => item.productId).includes(id);

    if (isInCart) {
      dispatch(deleteCartItem(id));
      setToastMessage("Item removed from cart!");
      setShowToast(true);
    } else {
      const item = clothing.find((product) => product._id === id);

      if (item) {
        const cartItem = {
          productId: item._id,
          productName: item.productName,
          productCategories: item.productCategories,
          productImg: item.productImg,
          productPrice: item.productPrice,
          productRating: item.productRating,
          productQuantity: 1,
        };

        dispatch(postCartData(cartItem));
        setToastMessage("Item added to cart!");
        setShowToast(true);
      }
    }
  };

  const clickHandlerForWishlist = (id) => {
    const isInWishlist = wishlist.map((item) => item.productId).includes(id);

    if (isInWishlist) {
      dispatch(deleteWishlistItem(id));
      setToastMessage("Item removed from wishlist!");
      setShowToast(true);
    } else {
      const item = clothing.find((product) => product._id === id);

      if (item) {
        const wishlistItem = {
          productId: item._id,
          productName: item.productName,
          productCategories: item.productCategories,
          productImg: item.productImg,
          productPrice: item.productPrice,
          productRating: item.productRating,
        };
        dispatch(postWishlistData(wishlistItem));
        setToastMessage("Item added to wishlist!");
        setShowToast(true);
      }
    }
  };

  const filteredData = data?.filter((product) => {
    const matchedCategories = product.productCategories.map((category) =>
      selectedCategories.includes(category)
    );
    const matchesCategory =
      selectedCategories.length === 0 || matchedCategories.includes(true);

    const matchesProductCategory =
      !productCategory ||
      product.productCategories
        .map((category) => category.toLowerCase())
        .includes(productCategory.toLowerCase());

    const matchedRating = product.productRating >= rating;
    return matchesCategory && matchesProductCategory && matchedRating;
  });

  const handleSelectedCategory = (e) => {
    const { value, checked } = e.target;
    const currentCategories = selectedCategories;

    const updatedCategories = checked
      ? [...currentCategories, value]
      : currentCategories.filter((category) => category !== value);

    dispatch(setSelectedCategories(updatedCategories));
  };

  const sortedProducts = filteredData?.sort((a, b) => {
    if (sortByPrice === "none") return true;
    if (sortByPrice === "lowToHigh") {
      return a.productPrice - b.productPrice;
    }
    if (sortByPrice === "highToLow") {
      return b.productPrice - a.productPrice;
    }
  });

  const handleSortByPrice = (e) => {
    dispatch(setSortByPrice(e.target.value));
  };

  const clearFilters = (e) => {
    e.preventDefault();
    document.getElementById("filtersForm").reset();
    dispatch(setSelectedCategories([]));
    setRating(1);
    dispatch(setSortByPrice("none"));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <form id="filtersForm" className="mb-4">
              <div className="container">
                <div>
                  <label className="form-label">
                    <strong>Filters:</strong>
                  </label>
                  <p className="float-end">
                    <a
                      className="text-dark"
                      href=""
                      onClick={(e) => clearFilters(e)}
                    >
                      Clear
                    </a>
                  </p>
                </div>

                <div>
                  <p className="form-label">
                    <strong>Category</strong>
                  </p>
                  <label className="form-label">
                    <input
                      type={"checkbox"}
                      onClick={(e) => handleSelectedCategory(e)}
                      value="Clothing"
                    />{" "}
                    All Clothing
                  </label>
                  <br />
                  <label className="form-label">
                    <input
                      type={"checkbox"}
                      onClick={(e) => handleSelectedCategory(e)}
                      value="Men"
                    />{" "}
                    Men Clothing
                  </label>
                  <br />
                  <label className="form-label">
                    <input
                      type={"checkbox"}
                      onClick={(e) => handleSelectedCategory(e)}
                      value="Women"
                    />{" "}
                    Women Clothing
                  </label>
                  <br />
                  <label className="form-label">
                    <input
                      type={"checkbox"}
                      onClick={(e) => handleSelectedCategory(e)}
                      value="Kids"
                    />{" "}
                    Kids Clothing
                  </label>
                </div>

                <div>
                  <p className="form-label">
                    <strong>Rating</strong>
                  </p>
                  <div className="py-2 mx-2">
                    <div className="d-flex justify-content-between px-2 mt-2">
                      <div className="text-center">1</div>
                      <div className="text-center">2</div>
                      <div className="text-center">3</div>
                      <div className="text-center">4</div>
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="1"
                      max="4"
                      step="1"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <p className="form-label">
                    <strong>Sort By Price</strong>
                  </p>
                  <label>
                    <input
                      type={"radio"}
                      name="sortByPrice"
                      onChange={handleSortByPrice}
                      value="lowToHigh"
                    />{" "}
                    Low to High
                  </label>
                  <br />
                  <label>
                    <input
                      type={"radio"}
                      name="sortByPrice"
                      onChange={handleSortByPrice}
                      value="highToLow"
                    />{" "}
                    High to Low
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-9 ">
            <div className="bg-body-tertiary p-3">
              <div>
                <p>
                  <strong className="fs-3">Showing All Products</strong>{" "}
                  (Showing {sortedProducts.length} products)
                </p>
                {status === "loading" && (
                  <p className="text-center">Loading...</p>
                )}
                {status === "error" && <p className="text-center">{error}</p>}
                <div className="row">
                  {sortedProducts &&
                    sortedProducts.map((product) => (
                      <div key={product._id} className="col-md-6">
                        <div className="card m-2">
                          <div className="row">
                            <div className="col-md-12 col-sm-12 col-lg-6">
                              <Link
                                className=""
                                to={`/productListing/ProductDetails/${product._id}`}
                              >
                                <img
                                  src={product.productImg}
                                  className="img-fluid object-fit-fit w-100 h-100 card-img"
                                />
                              </Link>
                            </div>

                            <div className="col-md-12 col-sm-12 col-lg-6">
                              <div className="px-2 my-2 placeholder-glow">
                                <p className="fw-semibold">
                                  {product.productName}
                                </p>
                                <p>
                                  <strong>Price: </strong>
                                  &#8377; {product.productPrice}
                                </p>
                                <p>
                                  <strong>Rating: </strong>
                                  {product.productRating}
                                </p>
                                <button
                                  onClick={() =>
                                    clickHandlerForCart(product._id)
                                  }
                                  className="btn btn-primary w-100 my-2"
                                >
                                  {cart
                                    .map((item) => item.productId)
                                    .includes(product._id)
                                    ? "Remove from cart"
                                    : "Add to cart"}
                                </button>
                                <button
                                  onClick={() =>
                                    clickHandlerForWishlist(product._id)
                                  }
                                  className="btn btn-secondary w-100 my-2"
                                >
                                  {wishlist
                                    .map((item) => item.productId)
                                    .includes(product._id)
                                    ? "Remove from wishlist"
                                    : "Save to Wishlist"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 5 }}
        >
          <div
            className="toast show text-bg-primary text-white"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body fs-6">
              {toastMessage}
              <button
                type="button"
                className="btn-close float-end btn-close-white"
                onClick={() => setShowToast(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingView;
