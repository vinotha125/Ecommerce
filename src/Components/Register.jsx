import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.jsx";

const Register = ({ switchToLogin, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
        <button className="w-full bg-red-600 text-white py-2 rounded-md">Sign Up</button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <span className="text-red-600 cursor-pointer" onClick={switchToLogin}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
