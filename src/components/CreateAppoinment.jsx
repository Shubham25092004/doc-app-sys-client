import React, { useEffect, useState } from "react";
import { getDoctorList } from "../api/userAPI";
import { saveAppointment } from "../api/appointmentAPI";

const CreateAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await getDoctorList();
      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateTime || !doctorId) {
      alert("Please select date & doctor");
      return;
    }

    const res = await saveAppointment({ dateTime, doctorId });

    if (res.data.success) {
      alert("Appointment created successfully");
      setDateTime("");
      setDoctorId("");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="card shadow p-4">
          <h4 className="mb-3 text-center">Create Appointment</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="datetime-local"
              className="form-control mb-3"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />

            <select
              className="form-select mb-3"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-primary w-100">
              Create Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
