import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postAddress, updateAddress } from "./addressSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      dispatch(
        postAddress({
          houseNumber,
          streetName,
          landmark,
          city,
          state,
          country,
          postalCode,
        })
      );
    }
    navigate("/address");
  };

  return (
    <div className="max-w-md mx-auto my-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {existingAddress ? "Update Address" : "Add Address"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={clickHandlerForAddress} className="space-y-4">
            <div>
              <Label className={"mb-2"} htmlFor="houseNumber">
                House Number
              </Label>
              <Input
                id="houseNumber"
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="Enter your house number"
                required
              />
            </div>
            <div>
              <Label className={"mb-2"} htmlFor="streetName">
                Street Name
              </Label>
              <Input
                id="streetName"
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                placeholder="Enter your street name"
                required
              />
            </div>
            <div>
              <Label className={"mb-2"} htmlFor="landmark">
                Landmark
              </Label>
              <Input
                id="landmark"
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Enter nearby landmark"
                required
              />
            </div>
            <div>
              <Label className={"mb-2"} htmlFor="city">
                City
              </Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                required
              />
            </div>
            <div>
              <Label className={"mb-2"} htmlFor="postalCode">
                Postal Code / Pin Code
              </Label>
              <Input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter postal or pin code"
                required
              />
            </div>
            <div>
              <Label className={"mb-2"} htmlFor="state">
                State
              </Label>
              <Input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter your state"
                required
              />
            </div>
            <div>
              <Label className={"mb-2"} htmlFor="country">
                Country
              </Label>
              <Input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
                required
              />
            </div>
            <div className="text-center">
              <Button type="submit" className="w-full">
                {existingAddress ? "Update Address" : "Save Address"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostAddress;
