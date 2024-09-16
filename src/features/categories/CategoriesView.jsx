import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./categoriesSlice";
import { useEffect } from "react";

const CategoriesView = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );
  const data = categories;

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div>
      <div className="container py-3 bg-body-tertiary">
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "error" && <p className="text-center">{error}</p>}
        {data?.map((category) => (
          <div key={category._id} className="text-center position-relative">
            <Link to={`/productListing/clothing`}>
              <img src={category.categoryImg} className="img-fluid my-3" />
              <div className="position-absolute top-50 start-50 translate-middle-x w-100 text-bg-light">
                {category.categoryName}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesView;
