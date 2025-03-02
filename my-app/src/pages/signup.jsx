import React, { useState } from "react";
import img from "../assets/images/login-art.png";
import fb from "../assets/images/Facebook.png";
import google from "../assets/images/Google.png";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; 
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";

export default function Cap() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault(); 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Created:", userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Email is already registered. Logging in instead...");
        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User logged in successfully!");
          navigate("/dashboard");
        } catch (loginError) {
          console.error("Login failed:", loginError.message);
          alert("Email is already in use. Try logging in instead.");
        }
      } else {
        console.error("Sign-Up Error:", error.message);
        alert(error.message);
      }
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Welcome Back 👋</h1>
        <p className="p">
          Today is a new day. It's your day. You shape it. <br /> Sign in to start managing your projects.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="label-input">
          <label htmlFor="email" style={{display:"block"}}>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="label-input">
          <label htmlFor="password" style={{display:"block"}}>Password</label>
          <input
            type="password"
            id="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <div id="forgot">
          <a href="#" style={{ color: "#edb046" }}>Forgot password?</a>
        </div>

        <button className="sign-up" onClick={handleSignUp}>Sign Up</button>

        <div className="option">
          <div className="line"></div>
          <div>Or</div>
          <div className="line-1"></div>
        </div>

        <button className="google">
          <img src={google} style={{ height: "20px", paddingRight: "6px" }} alt="" />
          Sign in with Google
        </button>

        <button>
          <img src={fb} style={{ height: "20px", paddingRight: "8px" }} alt="" />
          Sign in with Facebook
        </button>

        <p className="sign-link">Don't have an account? <a href="#" style={{ color: "#edb046"}}>Sign up</a></p>
      </div>

      <div>
        <img src={img} alt="" style={{ height: "560px", marginTop: "20px", marginLeft: "130px", }} />
      </div>
    </div>
  );
}
