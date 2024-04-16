import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };

  const save = async () => {
    await client.updateUser(profile);
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div className="form-container form-control border-0 row ms-1">
          <div className="col-6">
          <div className="row my-2">
          <input value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/>
          </div>
          <div className="row mb-2">
          <input value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/>
          </div>
          <div className="row mb-2">
          <input value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/>
          </div>
          <div className="row mb-2">
          <input value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/>
          </div>
          <div className="row mb-2">
          <input value={profile.dob} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/>
          </div>
          <div className="row mb-2">
          <input value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/>
          </div>
          <div className="row mb-2">
          <select onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          </div>
            <button onClick={save} className="btn btn-primary w-100 mb-2"> Save </button>
            <button onClick={signout} className="btn btn-danger w-100 mb-2"> Signout </button>

            {profile.role === "ADMIN" && (
              <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100">
                Users
              </Link>
            )}
          </div> 
        </div>
      )}
    </div>
  );
}
