import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postAddress, updateAddress } from "./addressSlice";
import { useLocation, useNavigate } from "react-router-dom";

const PostAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const existingAddress = location.state?.address || null;

  useEffect(() => {
    if (existingAddress) {
      setHouseNumber(existingAddress.houseNumber);
      setStreetName(existingAddress.streetName);
      setLandmark(existingAddress.landmark);
      setCity(existingAddress.city);
      setState(existingAddress.state);
      setCountry(existingAddress.country);
      setPostalCode(existingAddress.postalCode);
    }
  }, [existingAddress]);

  const clickHandlerForAddress = (e) => {
    e.preventDefault();
    if (existingAddress) {
      dispatch(
        updateAddress({
          id: existingAddress._id,
          updatedAddress: {
            houseNumber,
            streetName,
            landmark,
            city,
            state,
            country,
            postalCode,
          },
        })
      );
    } else {
      const newAddress = {
        houseNumber,
        streetName,
        landmark,
        city,
        state,
        country,
        postalCode,
      };
      dispatch(postAddress(newAddress));
    }
    navigate("/address");
  };

  return (
    <div className="container py-3">
      <h3 className="text-center">Address</h3>

      <div className="col-md-4">
        <form onSubmit={clickHandlerForAddress}>
          <label className="form-label" htmlFor="houseNumber">
            House Number:
          </label>
          <input
            className="form-control"
            id="houseNumber"
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="Enter your house number"
            required
          />
          <br />

          <label className="form-label" htmlFor="streetName">
            Street Name:
          </label>
          <input
            className="form-control"
            id="streetName"
            type="text"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            placeholder="Enter your street name"
            required
          />
          <br />

          <label className="form-label" htmlFor="landmark">
            Landmark:
          </label>
          <input
            className="form-control"
            id="landmark"
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Enter nearby landmark"
            required
          />
          <br />

          <label className="form-label" htmlFor="city">
            City:
          </label>
          <input
            className="form-control"
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            required
          />
          <br />

          <label className="form-label" htmlFor="postalCode">
            Postal Code / Pin Code:
          </label>
          <input
            className="form-control"
            id="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal or pin code"
            required
          />
          <br />

          <label className="form-label" htmlFor="state">
            State:
          </label>
          <input
            className="form-control"
            id="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter your state"
            required
          />
          <br />

          <label className="form-label" htmlFor="country">
            Country:
          </label>
          <input
            className="form-control"
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
            required
          />
          <br />
          <button type="submit" className="btn btn-success mb-2">
            {existingAddress ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAddress;
