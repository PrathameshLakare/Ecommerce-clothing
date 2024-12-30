import { Link } from "react-router-dom";
import { fetchCartData } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { cart, cartValue } = useSelector((state) => state.cart);

  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  useEffect(() => {
    dispatch(fetchCartData());
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  }, []);

  const totalCartPrice = cart.reduce(
    (acc, curr) =>
      acc + parseInt(curr.productPrice) * parseInt(curr.productQuantity),
    0
  );

  return (
    <div className="container py-5 bg-light">
      <h2 className="text-center mb-4">Order Summary</h2>

      <div className="card mx-auto w-75  rounded-3">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <p className="fw-bold">Price ({cartValue} item)</p>
            <p className="fw-bold">&#8377; {totalCartPrice}</p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <p>Delivery Charges</p>
            <p>&#8377; 499</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <p className="fw-bold">TOTAL AMOUNT</p>
            <p className="fw-bold">&#8377; {totalCartPrice + 499}</p>
          </div>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="w-75 mx-auto">
          <div
            className="alert alert-success text-center py-3 my-4"
            role="alert"
          >
            <h5 className="alert-heading">Order Placed Successfully!</h5>
          </div>
        </div>
      )}

      <div className="text-center mt-5">
        <Link
          to="/"
          className="btn btn-primary btn-lg px-4 py-2 shadow-sm hover-shadow-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
