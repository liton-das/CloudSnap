import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import Home from "./pages/Home";
// ImageUploadUI - React + Tailwind CSS
// NOTE: This file contains only presentational UI (no state, no event handlers).
// You can plug in your upload logic, handlers and props where indicated.

const App = ()=> {
  return (
    <>
      <ToastContainer/>
      <Home/>
    </>
  );
}
export default App
