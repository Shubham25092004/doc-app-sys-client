import axiosInstance from "./axiosInstance";

export const getDoctorsAPI = () => {
  return axiosInstance.get("/doc/getDoctors");
};

export const applyDoctorAPI = (data) => {
  return axiosInstance.post("/doc/apply", data);
};


export const updateDoctor = (data) => {
  return axiosInstance.patch("/doctor/updateDoctor", data);
};

/**
 * Get all doctors (ADMIN)
 */
export const getAllDoctors = () => {
  return axiosInstance.get("/doctor/getAllDoctors");
};

/**
 * Accept / Reject doctor (ADMIN)
 */
export const updateDoctorStatus = (doctorId, status) => {
  return axiosInstance.patch(`/doctor/docStatus/${doctorId}`, { status });
};

/**
 * Delete doctor (ADMIN)
 */
export const deleteDoctor = (doctorId) => {
  return axiosInstance.delete(`/doctor/deleteDoctor/${doctorId}`);
};
