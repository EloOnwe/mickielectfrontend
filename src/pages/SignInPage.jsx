import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/signin.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isLoading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validateEmail(email)) {
        setErrorMessage("Invalid email");
        return;
      }

      if (!email) {
        setErrorMessage("Insert your email");
        return;
      }

      if (!password) {
        setErrorMessage("Insert your password");
        return;
      } else if (password.length < 6) {
        setErrorMessage("The password must be more than five characters");
        return;
      }
      setErrorMessage("");
      if (!email || !password) {
        setErrorMessage("fill the form");
        return;
      }

      const data = { email, password };

      const resp = await dispatch(loginUser(data));
      if (resp.meta.requestStatus === "fulfilled") {
        toast.success("login successful");
        navigate(-1);
      }
      if (resp.meta.requestStatus === "rejected") {
        toast.error(resp.payload.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password-icons">
            {showPassword ? (
              <FaRegEye onClick={handleShowPassword} />
            ) : (
              <FaEyeSlash onClick={handleShowPassword} />
            )}
          </div>
          <button type="submit">{isLoading ? "Logging in..." : "Login"}</button>
        </form>
        <p>
          Do not have an account?
          <Link to="/signup">
            <span>Create an account</span>
          </Link>
        </p>
        {errorMessage ? (
          <ErrorMessage message={errorMessage} className="errorMessageBox" />
        ) : null}
      </div>
    </div>
  );
};

export default SignInPage;
