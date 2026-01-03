import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAppointmentsByUser,
  deleteAppointment,
} from "../api/appointmentAPI";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await getAppointmentsByUser();
      if (res.data.success) {
        setAppointments(res.data.appointments);
      }
    } catch (err) {
      console.error(err);
      showToastMessage("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to CreateAppointment page for editing
  const handleEdit = (id) => {
    navigate(`/create-appointment/${id}`);
  };

  // Delete appointment
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteAppointment(id);
      if (res.data.success) {
        showToastMessage("Appointment deleted successfully");
        fetchAppointments(); // refresh list
      } else {
        showToastMessage(res.data.msg || "Failed to delete appointment");
      }
    } catch (err) {
      console.error(err);
      showToastMessage("Error deleting appointment");
    }
  };

  // Show toast
  const showToastMessage = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) return <p>Loading appointments...</p>;
  if (appointments.length === 0) return <p>No appointments found</p>;

  return (
    <div className="container mt-4">
      <h4>My Appointments</h4>
      <div className="row">
        {appointments.map((app) => (
          <div key={app.id} className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <p>
                <b>Date:</b> {new Date(app.dateTime).toLocaleString()}
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
                      : app.status === "Reject"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {app.status}
                </span>
              </p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEdit(app.id)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(app.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notification */}
      {showToast && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-body bg-success text-white">{toastMsg}</div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
