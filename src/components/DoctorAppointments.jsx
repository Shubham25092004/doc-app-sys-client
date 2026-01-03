import React, { useEffect, useState } from "react";
import {
  showAppointmentsOfDoctor,
  updateAppointmentStatus,
} from "../api/appointmentAPI";


const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const fetchDoctorAppointments = async () => {
    try {
      setLoading(true);
      const res = await showAppointmentsOfDoctor();
      console.log("Doctor appointments:", res.data);
      if (res.data.success) {
        setAppointments(res.data.appointments);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await updateAppointmentStatus(id, status);
      if (res.data.success) {
        showToast("Status updated successfully");
        fetchDoctorAppointments();
      } else {
        showToast(res.data.msg || "Update failed");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating status");
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  if (loading) return <p>Loading appointments...</p>;
  if (appointments.length === 0) return <p>No appointments assigned</p>;

  return (
    <div className="container mt-4">
      <h4>Doctor Appointments</h4>

      <div className="row">
        {appointments.map((app) => (
          <div key={app.id} className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <p>
                <b>Date:</b>{" "}
                {new Date(app.dateTime).toLocaleString()}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`badge ${
                    app.status === "Pending"
                      ? "bg-warning text-dark"
                      : app.status === "Accepted"
                      ? "bg-success"
                      : app.status === "Completed"
                      ? "bg-primary"
                      : "bg-danger"
                  }`}
                >
                  {app.status}
                </span>
              </p>

              {app.status === "Pending" && (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      handleStatusUpdate(app.id, "Accepted")
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      handleStatusUpdate(app.id, "Reject")
                    }
                  >
                    Reject
                  </button>
                </div>
              )}

              {app.status === "Accepted" && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    handleStatusUpdate(app.id, "Completed")
                  }
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-body bg-success text-white">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
