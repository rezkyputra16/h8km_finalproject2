import Header from "../../components/Header";
import SectionHeader from "../../components/SectionHeader";
import RekapPenjualanTable from "../../components/RekapPenjualanTable";

const RekapPenjualan = () => {
    return (
        <>
            <Header />
            <SectionHeader title="Sales Recap - Admin" />
            <RekapPenjualanTable
                headers={["", "Products", "Price", "Sold", "Total"]}
            />
        </>
    );
};

export default RekapPenjualan;