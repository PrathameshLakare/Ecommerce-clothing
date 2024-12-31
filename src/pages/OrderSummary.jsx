import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orderId } = location.state;
  const { order, status, error } = useSelector((state) => state.order);

  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  useEffect(() => {
    dispatch(fetchOrder(orderId));
    dispatch(clearCart());
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  }, []);

  if (status === "loading") {
    return (
      <div>
        <p className="text-center py-3">loading...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <p className="text-center py-3">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5 bg-light">
      <h2 className="text-center mb-4">Order Summary</h2>

      <div className="card mx-auto w-75  rounded-3">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <p className="fw-bold">Price ({order?.products.length} item)</p>
            <p className="fw-bold">&#8377; {order?.totalAmount}</p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <p>Delivery Charges</p>
            <p>&#8377; 499</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <p className="fw-bold">TOTAL AMOUNT</p>
            <p className="fw-bold">
              &#8377; {parseInt(order?.totalAmount || 0) + 499}
            </p>
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
