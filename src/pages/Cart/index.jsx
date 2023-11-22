import CartTable from "../../components/CartTable";
import Header from "../../components/Header";
import SectionHeader from "../../components/SectionHeader";

const Cart = () => {
  return (
    <div>
      <Header />
      {/* <SectionHeader title="CART" /> */}
      <CartTable headers={["", "Products", "Price", "Quantity", "Total", ""]} />
    </div>
  );
};

export default Cart;
