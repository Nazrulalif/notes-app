import React from "react";
import Home from "./pages/home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={route} />;
};

export default App;
