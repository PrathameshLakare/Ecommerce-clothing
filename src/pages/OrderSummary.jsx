import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { Button } from "@/components/ui/button";

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
        <p className="text-center py-3 text-muted text-lg">Loading...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <p className="text-center py-3 text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-center text-2xl font-semibold mb-6">Order Summary</h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <div className="flex justify-between mb-4 text-base">
          <p className="font-medium">Price ({order?.products.length} item)</p>
          <p className="font-medium">&#8377; {order?.totalAmount}</p>
        </div>
        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <p>Delivery Charges</p>
          <p>&#8377; 499</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-semibold">
          <p>Total Amount</p>
          <p>&#8377; {parseInt(order?.totalAmount || 0) + 499}</p>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="mt-6">
          <div className="rounded-xl border border-green-300 bg-green-100 p-4 text-center">
            <h5 className="text-green-700 font-medium">
              Order Placed Successfully!
            </h5>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/">
          <Button className="text-base px-6 py-2 rounded-xl shadow-md">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
