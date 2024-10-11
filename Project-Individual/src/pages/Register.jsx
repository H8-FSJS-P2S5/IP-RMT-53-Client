import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { request } from "../util/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        method: "post",
        url: "/register",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          email,
          password
        }
      });
      console.log(response.data.data);
      
      nav("/login");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  return (
    <>
      <div className="container" style={{ paddingTop: "10%" }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            {/* Tambahkan card wrapper dan efek bayangan */}
            <div className="card shadow p-4">
              <h2 className="text-center">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="input-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="input-email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="input-password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="input-password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <button type="submit" className="btn btn-primary px-3">
                    Sign Up
                  </button>
                 </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
