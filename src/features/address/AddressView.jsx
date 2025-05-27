import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAddress } from "./addressSlice";
import { Link, useNavigate } from "react-router-dom";
import { placedOrder } from "../order/orderSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const AddressView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState("");

  const { address, status, error } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const checkOutHandler = async () => {
    if (selectedAddress) {
      const result = await dispatch(
        placedOrder({ shippingAddress: selectedAddress })
      );

      if (result.payload?.order?._id) {
        navigate("/orderSummary", {
          state: { orderId: result.payload.order._id },
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Choose Address</h2>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "error" && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {address.length > 0 ? (
        <RadioGroup
          className="space-y-4"
          onValueChange={(value) => setSelectedAddress(value)}
        >
          {address.map((add) => (
            <Card key={add._id} className="p-4">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 flex-wrap">
                  <RadioGroupItem
                    value={add._id}
                    id={`address-${add._id}`}
                    className="mt-1 shrink-0"
                  />
                  <Label
                    htmlFor={`address-${add._id}`}
                    className="font-medium mt-1 break-words"
                  >
                    {add.houseNumber}, {add.streetName}, {add.landmark},{" "}
                    {add.city}-{add.postalCode}, {add.state}, {add.country}
                  </Label>
                </div>
              </CardHeader>
              <CardContent className="flex justify-end gap-2 flex-wrap">
                <Link to="/postAddress" state={{ address: add }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mb-2 sm:mb-0"
                  >
                    Update
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch(deleteAddress(add._id))}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      ) : (
        <Card className="mt-4 p-4 text-center text-gray-600">
          <p>No address yet. Add one below.</p>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
        {selectedAddress && (
          <Button className="w-full sm:w-auto" onClick={checkOutHandler}>
            Checkout
          </Button>
        )}
        <Link to="/postAddress">
          <Button variant="outline" className="w-full sm:w-auto">
            Add New Address
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddressView;
