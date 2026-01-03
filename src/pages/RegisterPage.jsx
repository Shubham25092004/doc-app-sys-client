import { useState } from "react";
import { registerUser } from "../api/userAPI";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              <h4>Register</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  name="contactNumber"
                  placeholder="Contact Number"
                  onChange={handleChange}
                />

                <textarea
                  className="form-control mb-3"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                ></textarea>

                <button className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>

            <div className="card-footer text-center">
              Already have an account? <Link to="/">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
