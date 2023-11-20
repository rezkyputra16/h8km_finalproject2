import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { addCart } from "../../redux/ProductsSlice";

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
    <Col>
      <Card
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "32rem", 
          border: "1px solid #242424"
        }}
        className="m-2 mt-4"
      >
        <Card.Img
          variant="top"
          src={data.image}
          alt="thumbnail"
          style={{
            width: "80%",
            height: "12rem",
            padding: "1rem",
            margin: "0 auto",
          }}
        />
        <Card.Body style={{ flex: "none" }}>
          <Card.Title>{data.title}</Card.Title>
          <div style={{ marginTop: "1rem", display: "flex" }}>
            <Button 
              variant="info"
              as={Link} 
              to={`/product-detail/${data.id}`}
              style={{width: "20rem", margin: "20px 10px 0 0"}}>
              Detail
            </Button>
            <Button
              as={Link}
              variant="success"
              onClick={(e) => handleAdd(e, data)}
              style={{width: "20rem", margin: "20px 10px 0 0"}}
            >
            Add
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
