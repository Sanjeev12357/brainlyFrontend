import  { useState } from "react";
import Input from "../components/ui/Input";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate(); 
  async function signup() {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${backendUrl}/api/v1/signup`, {
        username,
        password,
      });
      toast.success("You have signed up successfully!");
       // Redirect to the sign-in page after successful signup
        navigate("/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signup-container">
      {/* Toast container for showing notifications */}
      <ToastContainer position="top-center" />

      {/* Left side with image and text */}
      <div className="signup-left">
        <img
          src="https://ik.imagekit.io/dxafcpoiy/Screenshot%202025-05-16%20221139.png?updatedAt=1747413823435"
          alt="Second Brain"
          className="signup-image"
        />
        <h2 className="info-title">Build Your Second Brain</h2>
        <p className="info-text">
          Organize your knowledge, ideas, and tasks in one place.
          Enhance your thinking and productivity with a second brain.
        </p>
      </div>

      {/* Right side with form */}
      <div className="signup-card">
        <h2 className="signup-title">Create Your Account</h2>

        <div className="signup-input">
          <Input
            label="Name"
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signup-input">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          onClick={signup}
          className="signup-button"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="signup-footer">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
