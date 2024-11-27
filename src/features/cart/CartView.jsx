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
      }
    }
  };

  const clickHandlerForWishlistBtn = (id) => {
    if (isInWishlist(id)) {
      dispatch(deleteWishlistItem(id));
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
    <div className="container py-3 bg-body-tertiary">
      <h2 className="text-center my-2">My Cart({cartValue})</h2>
      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "error" && <p className="text-center">{error}</p>}
      {cart.length === 0 && <p className="text-center">Your cart is empty.</p>}
      <div className="row">
        <div className="col-md-6">
          {cart.map((product) => (
            <div key={product._id} className="card m-3">
              <div className="row">
                <div className="col-5">
                  <img
                    src={product.productImg}
                    alt={`${product.productName} Img`}
                    className="img img-fluid w-100 rounded-start h-100"
                  />
                </div>
                <div className="col-7">
                  <div className="p-2">
                    <p className="fs-3 fw-semibold">{product.productName}</p>
                    <p>
                      <strong>Price: &#8377;{product.productPrice}</strong>
                    </p>
                    <div className="row">
                      <div className="col-lg-4 mt-1">Quantity:</div>
                      <div className="col-lg-8 mt-1">
                        <button
                          className="btn btn-outline-dark rounded-circle m-1 btn-sm text-center"
                          onClick={() =>
                            clickHandlerForDecreasingQuantity(product.productId)
                          }
                        >
                          -
                        </button>
                        <span className="py-1 px-3 rounded w-25 h-100 text-bg-light border border-dark">
                          {product.productQuantity}
                        </span>
                        <button
                          className="btn btn-outline-dark rounded-circle m-1 btn-sm text-center"
                          onClick={() =>
                            clickHandlerForIncreasingQuantity(product.productId)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => clickHandlerForCartBtn(product.productId)}
                      className="btn btn-primary w-100 my-2"
                    >
                      {isInCart(product.productId)
                        ? "Remove from cart"
                        : "Add to cart"}
                    </button>
                    <button
                      onClick={() =>
                        clickHandlerForWishlistBtn(product.productId)
                      }
                      className="btn btn-secondary w-100 my-2"
                    >
                      {isInWishlist(product.productId)
                        ? "Remove from wishlist"
                        : "Save to Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <div className="sticky-md-top p-3">
            <div className="card px-4">
              <div className="card-body">
                <p>PRICE DETAILS</p>
                <hr />
                <p>
                  Price ({cartValue} items)
                  <span className="float-end">&#8377; {totalCartPrice}</span>
                </p>
                <p>
                  Delivery Charges
                  <span className="float-end">&#8377; {deliveryCharges}</span>
                </p>
                <hr />
                <p>
                  <strong>
                    TOTAL AMOUNT
                    <span className="float-end">
                      &#8377; {totalCartPrice + deliveryCharges}
                    </span>
                  </strong>
                </p>
                <hr />
                <Link to="/address" className="btn btn-primary w-100">
                  PLACE ORDER
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
