import "../styles/allproducts.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../redux/features/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.product);

  const handleDelete = async (productId) => {
    try {
      const response = await dispatch(deleteProduct(productId));
      if (response.meta.requestStatus === "fulfilled") {
        toast.success(" Deleted");
      } else {
        toast.error("Unable to delete");
      }
    } catch (error) {
      console.error("delete error", error);
    }
  };

  return (
    <div className="products-container">
      <MdArrowBack className="arrowBack" onClick={() => navigate("/admin")} />
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error loading products: {error}</p>
      ) : products?.length > 0 ? (
        <table className="product-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {products.map((product) => {
            return (
              <tbody key={product._id}>
                <tr>
                  <td>{product.name}</td>
                  <td>
                    <Link to={`/updateProducts/${product._id}`}>
                      <MdEditSquare size={23} />
                    </Link>
                  </td>
                  <td>
                    <Link onClick={() => handleDelete(product._id)}>
                      <AiFillDelete size={23} />
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default AllProducts;
