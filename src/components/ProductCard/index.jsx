import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { addCart } from "../../redux/ProductsSlice";
import styles from "./product.module.css";
const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAdd = (e, data) => {
    e.preventDefault();
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) {
      navigate("/login");
    } else {
      if (auth.roles === "admin") {
        Swal.fire({
          title: "You are an admin!",
          icon: "error",
        });
      } else {
        dispatch(
          addCart({
            cartData: data,
            qty: 1,
            isCart: false,
          })
        );
        Swal.fire({
          title: "Added to Cart",
          icon: "success",
        });
      }
    }
  };

  return (
    <div className={styles.card}>
      <img src={data.image} alt="" />
      <h6>{data.title}</h6>
      <NavLink className={styles.link} to={`/product-detail/${data.id}`}>
        Detail
      </NavLink>
      <NavLink className={styles.link} onClick={(e) => handleAdd(e, data)}>
        Add
      </NavLink>
    </div>
  );
};

export default ProductCard;
