import React, { useState } from "react";
import { applyDoctorAPI } from "../api/doctorAPI";

const ApplyDoctor = () => {
  const [specialist, setSpecialist] = useState("");
  const [fees, setFees] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info"); // "success" or "danger"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!specialist || !fees) {
      setMsg("All fields are required");
      setMsgType("danger");
      return;
    }

    try {
      setLoading(true);
      const res = await applyDoctorAPI({ Specialist: specialist, fees });
      if (res.data.success) {
        setMsg("✅ Doctor application submitted successfully");
        setMsgType("success");
        setSpecialist("");
        setFees("");
      } else {
        setMsg(res.data.msg || "Failed to submit");
        setMsgType("danger");
      }
    } catch (err) {
      setMsg(err.response?.data?.msg || "Server error");
      setMsgType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container col-md-6 mt-4">
      <div className="card p-4 shadow">
        <h4>🩺 Apply for Doctor</h4>

        {msg && (
          <div className={`alert alert-${msgType} mt-2`} role="alert">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyDoctor;
