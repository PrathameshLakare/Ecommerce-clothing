import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAddress } from "./addressSlice";
import { Link, useNavigate } from "react-router-dom";
import { placedOrder } from "../order/orderSlice";

const AddressView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState("");

  const { address, status, error } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  const checkOutHandler = async () => {
    if (selectedAddress) {
      const result = await dispatch(
        placedOrder({ shippingAddress: selectedAddress })
      );

      if (result.payload.order._id) {
        navigate("/orderSummary", {
          state: { orderId: result.payload.order._id },
        });
      }
    }
  };

  return (
    <div className="container py-3">
      <h2>Choose Address</h2>
      <ul className="list-group">
        {status === "loading" && (
          <li className="text-container list-group-item">Loading...</li>
        )}
        {status === "error" && (
          <li className="text-container list-group-item">{error}</li>
        )}
        {address.length > 0 ? (
          address.map((add) => (
            <li key={add._id} className="list-group-item">
              <div className="form-check ">
                <input
                  className="form-check-input my-2"
                  type="radio"
                  name="addressRadioBtn"
                  onChange={() => setSelectedAddress(add._id)}
                  value={add._id}
                  id={`address ${add._id}`}
                />

                <label
                  className="form-check-label m-1"
                  htmlFor={`address ${add._id}`}
                >
                  {add.houseNumber}, {add.streetName}, {add.landmark},{" "}
                  {add.city}-{add.postalCode}, {add.state}, {add.country}
                </label>
                <div className="float-end">
                  <Link
                    to={"/postAddress"}
                    state={{ address: add }}
                    className="btn btn-secondary mx-1"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => dispatch(deleteAddress(add._id))}
                    className="btn btn-danger mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">
            <p>No address yet add some</p>
          </li>
        )}
      </ul>
      {selectedAddress && (
        <Link className="btn btn-success my-3 me-3" onClick={checkOutHandler}>
          Checkout
        </Link>
      )}
      <Link className="btn btn-secondary my-3" to={"/postAddress"}>
        Add New Address
      </Link>
    </div>
  );
};

export default AddressView;
