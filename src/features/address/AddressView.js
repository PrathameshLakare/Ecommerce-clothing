import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAddress } from "./addressSlice";
import { Link } from "react-router-dom";

const AddressView = () => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState("");

  const { address, status, error } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  const handlerForDeleteAddress = (id) => {
    dispatch(deleteAddress(id));
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
                  value={selectedAddress}
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
                    onClick={() => handlerForDeleteAddress(add._id)}
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
        <Link className="btn btn-success my-3 me-3" to={"/orderSummary"}>
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
