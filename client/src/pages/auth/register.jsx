import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection, ImPointDown } from "react-icons/im";
import { IoCarSport } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";

import { registerUser } from "@/store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  console.log(formData);
  return (
    <div className="flex items-center justify-center w-full h-screen p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div className="flex w-full h-full py-8 overflow-hidden shadow-xl md:h-auto md:w-2/3 2xl:h-5/6 lg:py-0 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-600 rounded-xl">
        {/* LEFT */}
        <div className="flex-col items-center justify-center hidden w-1/2 h-full lg:flex bg-blue">
          <div className="relative flex items-center justify-center w-full">
            <img
              src="/assets/vechileparts.jpeg"
              alt="Bgimage"
              className="object-cover w-48 h-48 rounded-full 2xl:w-64 2xl:h-64"
            />
            <div className="absolute right-0 flex items-center gap-1 px-2 py-4 space-x-1 text-white rounded-full top-10">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share Thoughts</span>
            </div>
            <div className="absolute flex items-center gap-1 px-5 py-2 pl-4 text-white rounded-full left-10 top-6">
              <FontAwesomeIcon icon={faCar} />

              <span className="text-xs font-medium">Cars</span>
            </div>

            {/* Second Image */}
            <img
              src="/assets/Car1.jpeg"
              alt="Bg Image"
              className="absolute object-cover w-48 h-48 rounded-full top-14 left-14 2xl:w-64 2xl:h-64 " // Adjust top/left values to position it properly
            />

            {/* Overlay content (buttons/icons) */}
            {/* <div className="absolute flex items-center gap-1 px-16 py-16 pt-16 text-white rounded-full pl-8s left-155 top-32">
              <FontAwesomeIcon icon="fa-regular fa-engine-warning" />

              <span className="text-xs font-medium">Cars</span>
            </div> */}
          </div>

          <div className="mt-16 text-center">
            <p className="text-base text-white">
              Connect with friends & share for fun
            </p>
            <span className="text-sm text-white/80">
              Share memories with friends and the world
            </span>
          </div>
        </div>

        {/* RIGHT (FORM) */}
        <div className="flex flex-col items-center justify-center w-full h-full p-10 lg:w-1/2 2xl:px-20">
          <div className="flex items-center w-full gap-2 mb-6">
            <div className="p-2 text-white bg-black rounded">
              <IoCarSport />
            </div>
            <span className="text-2xl font-semibold text-gray-100">
              NJ CAR Company
            </span>
          </div>

          <p className="text-base font-semibold text-blue-200">
            Register your account
          </p>
          <span className="mt-2 text-2xl font-semibold text-white">
            Welcome
          </span>

          <div className="flex flex-col w-full gap-5 py-8">
            <CommonForm
              formControls={registerFormControls}
              buttonText={"Sign Up"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />

            <p className="text-sm font-semibold text-right cursor-pointer text-blue">
              Forgot Password?
            </p>
          </div>
          <p className="text-sm text-center text-white">
            Already Have Account
            <Link
              to="/auth/login"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
