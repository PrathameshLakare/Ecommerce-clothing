import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./categoriesSlice";
import { useEffect } from "react";

const CategoriesView = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="">
      {/* Banner Section */}
      <div className="relative w-full max-h-[600px] overflow-hidden mb-12 shadow-lg">
        <img
          src="https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Banner"
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to Our Store
          </h1>
          <p className="mt-3 text-lg sm:text-xl">
            Discover the best categories and products here!
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "error" && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {status !== "loading" && status !== "error" && (
          <div className="bg-gray-100 rounded-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-16">
                <h2 className="text-2xl font-bold text-gray-900">
                  Collections
                </h2>

                <div className="mt-6 grid gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categories?.map((category) => (
                    <Link
                      key={category._id}
                      to={`/productListing/${category.categoryName.toLowerCase()}`}
                      className="group relative"
                    >
                      <div className="w-full overflow-hidden rounded-lg bg-white">
                        <img
                          src={category.categoryImg}
                          alt={category.categoryName}
                          className="w-full h-64 object-cover transition duration-300 ease-in-out group-hover:brightness-75"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        {category.categoryName}
                      </h3>
                      <p className="text-base font-semibold text-gray-900">
                        Explore the collection
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesView;
