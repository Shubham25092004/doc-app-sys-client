import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage"
// import Appointments from "./components/Appoinments";
// import CreateAppointment from "./components/CreateAppoinment";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
         <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/appointments" element={<Appointments />} />
          <Route path="/create-appointment" element={<CreateAppointment />} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;