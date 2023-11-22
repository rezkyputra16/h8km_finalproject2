import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/ProductsSlice";
import { getProductDetail } from "../../api";
import Header from "../../components/Header";
import SectionHeader from "../../components/SectionHeader";
import styles from "./detail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = (e, data) => {
    e.preventDefault();
    const product = products.filter((item) => item.id === data.id)[0];
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
        if (quantity) {
          dispatch(
            addCart({ cartData: product, qty: quantity, isCart: false })
          );
          navigate("/cart");
          Swal.fire({
            title: "Added to Cart",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Quantity must a number",
            icon: "error",
          });
        }
      }
    }
  };

  useEffect(() => {
    getProductDetail(id).then((res) => setData(res.data));
  }, [id]);

  return (
    <>
      <Header />
      <SectionHeader title="Product Detail" />
      {data ? (
        <div className={styles.cardWraper}>
          <img src={data.image} alt="" />
          <div className={styles.card}>
            <h5>{data.title}</h5>
            <h6>Category : {data.category}</h6>
            <br />
            <p>Price : ${data.price}</p>
            <p>Rating : {data.rating.rate}</p>
            <p>Description : {data.description}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <Form.Control
                type="number"
                value={quantity}
                min={1}
                style={{ width: "75px", marginRight: "0.5rem" }}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button variant="success" onClick={(e) => handleAdd(e, data)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <InfinitySpin color="black" />
      )}
    </>
  );
};

export default ProductDetail;
