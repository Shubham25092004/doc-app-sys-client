import axiosInstance from "./axiosInstance";

// USER → create appointment
export const saveAppointment = (data) => {
  return axiosInstance.post("/appointment/createAppoint", data);
};

// USER → see own appointments
export const getAppointmentsByUser = () => {
  return axiosInstance.get("/appointment/getAppointmentsByUser");
};

// USER → update appointment ✅ ADD THIS
export const updateAppointment = (id, data) => {
  return axiosInstance.put(`/appointment/updateAppoint/${id}`, data);
};

// DOCTOR → update appointment status
export const updateAppointmentStatus = (id, status) => {
  return axiosInstance.patch(
    `/appointment/statusUpdateByDoctor/${id}`,
    { status }
  );
};

// DOCTOR → see assigned appointments
export const showAppointmentsOfDoctor = () => {
  return axiosInstance.get("/appointment/showAppointmentsOfDoctor");
};

// USER → delete appointment
export const deleteAppointment = (id) => {
  return axiosInstance.delete(`/appointment/deleteAppoint/${id}`);
};

