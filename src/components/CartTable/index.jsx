import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  addCart,
  addCheckout,
  removeCartItem,
} from "../../redux/ProductsSlice";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";

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
      <Table className="m-4" style={{ width: "95%" }}>
        <thead className="table-dark">
          <tr>
            {headers.map((header, headerIdx) => {
              return (
                <th key={headerIdx} className="text-center">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {cart?.map((data) => {
            totalPrice += data.cartQuantity * data.price;
            isOverStockFound = data.isOverStock || isOverStockFound;
            return (
              <tr key={data.id}>
                <td>
                  <img
                    src={data.image}
                    alt={data.image}
                    style={{ width: "100px", height: "auto", paddingTop: "20px" }}
                  /> 
                </td>
                <td>
                  <h5 style={{display: "flex", justifyContent: "center", alignItems: "center", height: "20vh"}}>{data.title}</h5>
                </td>
                <td style={{paddingTop: "50px"}}>${data.price.toFixed(2)}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={data.cartQuantity}
                    min={1}
                    style={{marginTop: "40px"}}
                    onChange={(e) => handleChange(data, e.target.value)}
                  />
                  {data.isOverStock && <p style={{color: "red"}}>Not enough stock!</p>}
                </td>
                <td className="text-end" style={{paddingTop: "50px"}}>
                  ${(data.cartQuantity * data.price).toFixed(2)}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(data.id)}
                    style={{marginTop: "40px"}}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            );
          })}

          <tr className="table-light">
            <td colSpan={5} className="text-start">
              <h4>TOTAL</h4>
            </td>
            <td className="text-end">
              <h4 style={{color: "green"}}>${totalPrice.toFixed(2)}</h4>
            </td>
          </tr>
          <tr>
            <td style={{ border: "none" }} colSpan={6} className="text-center">
              <Button variant="primary" onClick={handleCheckout} style={{width: "500px", marginTop: "20px"}}>
                Checkout
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  } else {
    return <h3>Anda belum memilih item!</h3>;
  }
};

export default CartTable;
