import CartTable from "../../components/CartTable";
import Header from "../../components/Header";
import SectionHeader from "../../components/SectionHeader";

const Cart = () => {
  return (
    <div style={{margin: "50px", minHeight: "100vh"}}>
      <Header />
      <SectionHeader title="CART" />
      <CartTable headers={["", "Products", "Price", "Quantity", "Total", ""]} />
    </div>
  );
};

export default Cart;
