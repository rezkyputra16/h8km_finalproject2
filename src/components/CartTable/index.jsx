import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  addCart,
  addCheckout,
  removeCartItem,
} from "../../redux/ProductsSlice";
import Swal from "sweetalert2";
import styles from "./table.module.css";

const CartTable = ({ headers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.products.cart);
  let isOverStockFound = false;
  let totalPrice = 0;
  const handleChange = (data, value) => {
    dispatch(
      addCart({
        cartData: data,
        qty: value,
        isCart: true,
      })
    );
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "Are you sure want to checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Checkout!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isOverStockFound) {
          Swal.fire({
            title: "Not enough stock!",
            icon: "error",
          });
        } else {
          dispatch(addCheckout());
          navigate("/");
          Swal.fire({
            title: "Checkout success!",
            icon: "success",
          });
        }
      }
    });
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  if (cart.length >= 1) {
    return (
      <div>
        <div className={styles.cartContainer}>
          {cart?.map((data) => {
            totalPrice += data.cartQuantity * data.price;
            isOverStockFound = data.isOverStock || isOverStockFound;
            return (
              <div key={data.id} className={styles.cart}>
                <div className={styles.image}>
                  <img src={data.image} alt={data.image} />
                </div>
                <div className={styles.cartBody}>
                  <p>
                    {data.title}
                    <span>${data.price.toFixed(2)}</span>
                  </p>
                  <div className={styles.cartInput}>
                    <div>
                      <input
                        type="number"
                        value={data.cartQuantity}
                        min={1}
                        onChange={(e) => handleChange(data, e.target.value)}
                      />
                      {data.isOverStock && (
                        <p style={{ color: "red" }}>Not enough stock!</p>
                      )}
                    </div>
                    <span>${(data.cartQuantity * data.price).toFixed(2)}</span>
                    <button onClick={() => handleRemoveItem(data.id)}>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h4>TOTAL</h4>
          <h4 style={{ color: "green" }}>${totalPrice.toFixed(2)}</h4>
          <Button variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    );
  } else {
    return <h3>Anda belum memilih item!</h3>;
  }
};

export default CartTable;
