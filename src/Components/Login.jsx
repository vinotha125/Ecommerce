import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.jsx";

const Login = ({ switchToRegister, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-red-600 text-white py-2 rounded-md">Login</button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <span className="text-red-600 cursor-pointer" onClick={switchToRegister}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
