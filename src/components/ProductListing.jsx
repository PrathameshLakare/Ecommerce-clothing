import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductListing({
  products,
  cart,
  wishlist,
  handleSort,
  error,
  clickCart,
  clickWish,
  status,
  sortByPrice,
}) {
  return (
    <main className="md:w-3/4 bg-white rounded-lg p-4">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xl font-semibold text-gray-900">
          Showing {products.length} Products
        </p>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort:</label>
          <Select value={sortByPrice} onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {status === "loading" && (
        <p className="text-center text-gray-500">Loading...</p>
      )}
      {status === "error" && (
        <p className="text-center text-red-500">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="group p-0">
            <Link to={`/productListing/ProductDetails/${product._id}`}>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.productImg}
                  alt={product.productName}
                  className="w-full aspect-square object-cover bg-gray-200 group-hover:opacity-75 transition"
                />
                <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.productRating} ★
                </span>
              </div>
            </Link>
            <CardContent className="p-4">
              <Link to={`/productListing/ProductDetails/${product._id}`}>
                <h3 className="text-md font-medium text-gray-800 truncate">
                  {product.productName}
                </h3>
              </Link>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                ₹{product.productPrice}
              </p>
              <div className="mt-4 space-y-2">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() => clickCart(product._id)}
                >
                  {cart.map((i) => i.productId).includes(product._id)
                    ? "Remove"
                    : "Add to Cart"}
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => clickWish(product._id)}
                >
                  {wishlist.map((i) => i.productId).includes(product._id)
                    ? "Remove"
                    : "Save to Wishlist"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
