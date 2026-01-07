import React, { useEffect, useState } from "react";
import { getDoctorsAPI } from "../api/doctorAPI";
import { getLoggedUser } from "../api/userAPI";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
    fetchDoctors();
  }, []);

  // 🔹 Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await getLoggedUser();
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  // 🔹 Fetch doctors (USER)
  const fetchDoctors = async () => {
    try {
      const res = await getDoctorsAPI();
      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.error("Doctor fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h5 className="text-center mt-4">Loading doctors...</h5>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">👨‍⚕️ Available Doctors</h3>

      <div className="row">
        {doctors.length === 0 ? (
          <p className="text-center">No doctors available</p>
        ) : (
          doctors.map((doc) => (
            <div className="col-md-4" key={doc.id}>
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-capitalize">
                    {doc.Specialist || "General"}
                  </h5>

                  <p>
                    <b>Fees:</b> ₹{doc.fees}
                  </p>

                  <p>
                    <b>Available:</b> {doc.available}
                  </p>

                  {/* 🔹 Show button only for USER role */}
                  {user?.role === "user" && (
                    <button className="btn btn-primary w-100">
                      Book Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;
