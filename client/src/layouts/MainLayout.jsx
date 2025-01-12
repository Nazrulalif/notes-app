import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";

const MainLayout = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/api/get-user");
      if (res.data && res.data.user) {
        setUserInfo(res.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onSearch = async (query) => {
    try {
      if (!query.trim()) {
        setIsSearch(false);
        setSearchResults(null);
        return;
      }

      const res = await axiosInstance.get("/api/search-note/", {
        params: { query },
      });

      if (res.data && res.data.note) {
        setIsSearch(true);
        setSearchResults(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar userInfo={userInfo} onSearch={onSearch} />
      <Outlet context={{ searchResults, isSearch }} />
    </>
  );
};

export default MainLayout;
