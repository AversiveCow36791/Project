import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Account Signup</h1>
      <span style={{color:"red"}}>{error && <div>{error}</div>}</span>
      Username:
      <input value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} className="mb-1 ms-1" /> <br/>
      Password:
      <input value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} className="ms-2" /> <br/>
      <button onClick={signup} className="btn btn-warning mt-1"> Signup </button>
    </div>
  );
}
