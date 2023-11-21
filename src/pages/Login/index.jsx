import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { auth } from "../../api";
import styles from "./style.module.css";
import Header from "../../components/Header";
import SectionHeader from "../../components/SectionHeader";

const Login = () => {
  const navigate = useNavigate();

  const authenticate = localStorage.getItem("auth");

  useEffect(() => {
    if (authenticate) {
      authenticate.roles === "user" ? navigate("/") : navigate("/admin");
    }
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin@bukapedia.com" && password === "admin123") {
      const auth = {
        token: "tokenadmin",
        roles: "admin",
      };
      localStorage.setItem("auth", JSON.stringify(auth));
      navigate("/admin");
      Swal.fire({
        title: "Login Success",
        icon: "success",
      });
    } else {
      auth({ username, password })
        .then((res) => {
          const auth = {
            token: res.data.token,
            roles: "user",
          };
          localStorage.setItem("auth", JSON.stringify(auth));
          navigate("/");
          Swal.fire({
            title: "Login Success",
            icon: "success",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Login Error",
            text: "Username/Password wrong or something wrong",
            icon: "error",
          });
        });
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login Bukapedia</h2>
      <Link to="/">Back to home</Link>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Type your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Type your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.buttonLogin}>
          Login
        </Button>
        <div className={styles.default}>
          <div>
            <h6>Default User:</h6>
            <div className={styles.value}>
              <span>username: johnd</span>
              <span>password: m38rmF$</span>
            </div>
          </div>
          <div>
            <h6>Default Admin:</h6>
            <div className={styles.value}>
              <span>username: admin@bukapedia.com</span>
              <span>password: admin123</span>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
