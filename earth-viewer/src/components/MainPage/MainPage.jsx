import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../Login/Login";
import { Header } from "../Header/Header";
import { RegisterForm } from "../Register/RegisterForm";
import { Home } from "../Home/Home";
import ImageCarousel from "../Slider/ImageCarousel";
import "../../App.css";
import { CarouselAntd } from "../Slider/CarouselAntd";
import { djangoApi } from "../../api/djangoApi";
import Cookies from "js-cookie";
import { setName } from "../../store/userSlice";
import { setView } from "../../store/viewSlice";
export const MainPage = () => {
  const view = useSelector((state) => state.view.name);
  const dispatch = useDispatch();
  const fetchUserSession = async () => {
    try {
      let session_id = Cookies.get("session_id");
      if (!session_id) {
        session_id = null;
      }
      const response = await djangoApi.post(
        "/get_user/",
        { session_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.user) {
        dispatch(setName(response.data.user));
        dispatch(setView("home"));
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUserSession();
    dispatch(setView("home"));
  }, []);
  return (
    <>
      <Header />

      {view === "home" && (
        <div className="gradient-body">
          <Home />
        </div>
      )}

      {view === "login" && <LoginForm />}
      {view === "register" && <RegisterForm />}
      {view === "carousel" && <CarouselAntd />}
    </>
  );
};
