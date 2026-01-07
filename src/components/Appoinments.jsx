import React, { useEffect, useState } from "react";
import {
  getAppointmentsByUser,
  deleteAppointment,
  updateAppointment,
} from "../api/appointmentAPI";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ msg: "", type: "" });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await getAppointmentsByUser();
      if (res.data.success) setAppointments(res.data.appointments);
    } catch (err) {
      showToast("Failed to fetch appointments", "danger");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await deleteAppointment(id);
      if (res.data.success) {
        showToast("Appointment deleted successfully");
        fetchAppointments();
      } else {
        showToast(res.data.msg || "Failed to delete", "danger");
      }
    } catch (err) {
      showToast("Server error", "danger");
    }
  };

  const handleUpdate = async () => {
    if (!editData.dateTime || !editData.doctorId) {
      showToast("All fields are required", "danger");
      return;
    }

    try {
      const res = await updateAppointment(editData.id, {
        dateTime: editData.dateTime,
        doctorId: editData.doctorId,
      });
      if (res.data.success) {
        showToast("Appointment updated successfully");
        setEditData(null);
        fetchAppointments();
      } else {
        showToast(res.data.msg || "Failed to update", "danger");
      }
    } catch (err) {
      showToast("Server error", "danger");
    }
  };

  const formatDateTimeLocal = (dt) => {
    const d = new Date(dt);
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  };

  if (loading) return <p>Loading appointments...</p>;
  if (!appointments.length) return <p>No appointments found.</p>;

  return (
    <div className="container mt-4">
      <h4>📅 My Appointments</h4>

      {/* EDIT FORM */}
      {editData && (
        <div className="card p-3 mb-4">
          <h5>Edit Appointment</h5>

          <input
            type="datetime-local"
            className="form-control mb-2"
            value={formatDateTimeLocal(editData.dateTime)}
            onChange={(e) =>
              setEditData({ ...editData, dateTime: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Doctor ID"
            value={editData.doctorId}
            onChange={(e) =>
              setEditData({ ...editData, doctorId: e.target.value })
            }
          />

          <button className="btn btn-success me-2" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn-secondary" onClick={() => setEditData(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* APPOINTMENT LIST */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{new Date(app.dateTime).toLocaleString()}</td>
              <td>
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
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() =>
                    setEditData({
                      id: app.id,
                      dateTime: app.dateTime,
                      doctorId: app.doctorId,
                    })
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(app.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast */}
      {toast.msg && (
        <div
          className={`toast show position-fixed bottom-0 end-0 m-3`}
          style={{ zIndex: 9999 }}
        >
          <div className={`toast-body bg-${toast.type === "danger" ? "danger" : "success"} text-white`}>
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
