import Row from "react-bootstrap/Row";
import ProductCard from "../ProductCard";

const ProductCards = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {data.map((item, itemIdx) => (
        <ProductCard data={item} key={itemIdx} />
      ))}
    </div>
  );
};

export default ProductCards;
