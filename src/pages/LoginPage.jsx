import { useState } from "react";
import { loginUser } from "../api/userAPI";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      // ✅ MATCHES YOUR BACKEND
      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);

        alert(res.data.msg); // "Logged Successfully"
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h4>Login</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleLogin}>
                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button className="btn btn-success w-100">
                  Login
                </button>
              </form>
            </div>

            <div className="card-footer text-center">
              New user? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
