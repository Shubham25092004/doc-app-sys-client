import axiosInstance from "./axiosInstance";

// Create appointment
export const saveAppointment = (data) => {
  return axiosInstance.post("/appointment/createAppoint", data);
};


export const getAppointmentsByUser = () => {
  return axiosInstance.get("/appointment/getAppointmentsByUser");
};

// Doctor: update appointment status
export const updateAppointmentStatus = (id, status) => {
  return axiosInstance.patch(
    `/appointment/statusUpdateByDoctor/${id}`,
    { status }
  );
};

// Doctor: see assigned appointments
export const showAppointmentsOfDoctor = () => {
  return axiosInstance.get("/appointment/showAppointmentsOfDoctor");
};

// Delete appointment by ID
export const deleteAppointment = (id) => {
  return axiosInstance.delete(`/appointment/deleteAppoint/${id}`);
};