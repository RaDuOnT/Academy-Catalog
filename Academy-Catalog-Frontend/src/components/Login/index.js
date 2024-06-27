import LoginForm from "./LoginForm";
import "./index.css";
import HeaderBefore from "../common/HeaderBefore/HeaderBefore";
import FooterBefore from "../common/FooterBefore/FooterBefore";

function Login() {
  return (
    <div className="App">
      <HeaderBefore />
      <LoginForm Login={Login} />
      <FooterBefore />
    </div>
  );
}

export default Login;
