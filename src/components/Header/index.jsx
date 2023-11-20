import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth");
        navigate("/login");
        Swal.fire({
          title: "Logout Success",
          icon: "success",
        });
      }
    });
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ margin: "20px", display: "flex" }}
      >
        Bukapedia
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Nav.Link
                as={Link}
                to={auth ? (auth.roles === "user" ? "/" : "/admin") : "/"}
              >
                Home
              </Nav.Link>
            </li>
            {auth ? (
              auth.roles === "user" ? (
                <li className="nav-item">
                  <Nav.Link as={Link} to="/cart">
                    Cart
                  </Nav.Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Nav.Link as={Link} to="/rekap-penjualan">
                    Sales Recap
                  </Nav.Link>
                </li>
              )
            ) : (
              <li className="nav-item">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </li>
            )}
            {auth && (
              <li className="nav-item">
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </li>
            )}
          </ul>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
