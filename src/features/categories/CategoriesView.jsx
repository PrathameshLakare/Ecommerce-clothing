import { Link, useParams } from "react-router-dom";
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
    <div className="container">
      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "error" && <p className="text-center">{error}</p>}
      <div className="banner-container mb-4 shadow-sm position-relative">
        <img
          src="https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Banner"
          className="img-fluid w-100 object-fit-cover"
          style={{ maxHeight: "600px" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-white text-center w-100">
          <h1>Welcome to Our Store</h1>
          <p>Discover the best categories and products here!</p>
        </div>
      </div>

      <div className="container py-4">
        <h2 className="text-center mb-4">Shop by Category</h2>

        <div className="row g-4">
          {categories?.map((category) => (
            <div key={category._id} className="col-sm-6 col-md-4 col-lg-3">
              <Link
                to={`/productListing/${category.categoryName.toLowerCase()}`}
                className="text-decoration-none"
              >
                <div className="card text-center">
                  <img
                    src={category.categoryImg}
                    className="card-img-top img-fluid"
                    alt={category.categoryName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{category.categoryName}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesView;
