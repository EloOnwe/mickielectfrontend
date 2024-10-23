import React, { useState } from "react";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import { createUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { isLoading } = useSelector((state) => state.user);

  const goToSignin = () => {
    navigate("/signin");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = () => {
    setErrorMessage("");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowconfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBlur = () => {
    const { username, email, password, cpassword } = formData;

    if (!username) {
      setErrorMessage("Please provide your Username");
      return;
    } else if (username.length < 3) {
      setErrorMessage("Username must be greater than 2 characters");
      return;
    }

    if (!email) {
      setErrorMessage("Please provide your email");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid Email");
      return;
    }

    if (!password) {
      setErrorMessage("Please provide your password");
      return;
    } else if (password.length < 6) {
      setErrorMessage("Password must be greater than or equal to 6 characters");
      return;
    }

    if (!cpassword) {
      setErrorMessage("Please confirm your password");
      return;
    }

    if (password !== cpassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, cpassword } = formData;
    if (!username) {
      setErrorMessage("Please provide your Username");
      return;
    } else if (username.length < 3) {
      setErrorMessage("Username must be greater than 2 characters");
      return;
    }

    if (!email) {
      setErrorMessage("Please provide your email");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid Email");
      return;
    }

    if (!password) {
      setErrorMessage("Please provide your password");
      return;
    } else if (password.length < 6) {
      setErrorMessage("Password must be greater than or equal to 6 characters");
      return;
    }

    if (!cpassword) {
      setErrorMessage("Please confirm your password");
      return;
    }

    if (password !== cpassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password !== cpassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!username || !email || !password) {
      setErrorMessage("Fill all the fields");
      return;
    } else if (username && email && password) {
      try {
        const data = { username, email, password };
        const resp = await dispatch(createUser(data));
        if (resp.meta.requestStatus === "fulfilled") {
          toast.success(resp.payload.message);
          return;
        }
        if (resp.payload.status === 400) {
          toast.error(resp.payload.message);
        }
      } catch (error) {
        console.error("Registration error:", error.response);
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  if (isLoading) {
    <div className="signup-container">
      <h1>It is loading my love</h1>
    </div>;
  }

  return (
    <div className="signup-container">
      <div className="signup">
        <h3>Sign up</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <div className="eye open1">
              {showPassword ? (
                <FaRegEye onClick={handleShowPassword} />
              ) : (
                <FaEyeSlash onClick={handleShowPassword} />
              )}
            </div>

            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="cpassword"
              id="cpassword"
              value={formData.cpassword}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div className="eye open">
              {showConfirmPassword ? (
                <FaRegEye onClick={handleShowconfirmPassword} />
              ) : (
                <FaEyeSlash onClick={handleShowconfirmPassword} />
              )}
            </div>
          </div>
          <button type="submit">
            {isLoading ? "Submitting..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/signin">
            <span>Sign in</span>
          </Link>
        </p>
      </div>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default SignUp;
