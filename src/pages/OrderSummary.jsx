import { Link } from "react-router-dom";
import { fetchCartData } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { cart, cartValue } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  const totalCartPrice = cart.reduce(
    (acc, curr) =>
      acc + parseInt(curr.productPrice) * parseInt(curr.productQuantity),
    0
  );

  return (
    <div className="container py-3 bg-body-tertiary ">
      <h2 className="text-center py-2">Order Summary</h2>
      <div className="card px-4 mx-auto my-4 w-50">
        <div className="card-body">
          <p>PRICE DETIALS</p>
          <hr />
          <p>
            Price ({cartValue} item)
            <span className="float-end">&#8377; {totalCartPrice}</span>
          </p>
          <p>
            Delivery Charges
            <span className="float-end">&#8377; 499</span>
          </p>
          <hr />
          <p>
            <strong>
              TOTAL AMOUNT
              <span className="float-end">&#8377; {totalCartPrice + 499}</span>
            </strong>
          </p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
