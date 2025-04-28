import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCar } from "@fortawesome/free-solid-svg-icons";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { useToast } from "@/components/ui/use-toast";

import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";

import { loginUser } from "@/store/auth-slice";
import { IoCarSport } from "react-icons/io5";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6">
      <div className="flex w-full h-auto py-8 overflow-hidden shadow-xl md:w-2/3 lg:h-auto 2xl:h-5/6 lg:py-0 bg-gradient-to-r from-teal-900 via-teal-700 to-teal-600 rounded-xl">
        {/* LEFT */}
        <div className="flex flex-col justify-center w-full h-full p-10 lg:w-1/2 2xl:px-20">
          <div className="flex items-center w-full gap-2 mb-6">
            <div className="p-2 text-white bg-black rounded">
              <IoCarSport />
            </div>
            <span className="text-2xl font-semibold text-gray-100">
              NJ CAR Company
            </span>
          </div>

          <p className="text-base font-semibold text-blue-200">
            Log in to your account
          </p>
          <span className="mt-2 text-2xl font-semibold text-white">
            Welcome
          </span>

          <div className="flex flex-col w-full gap-5 py-8">
            <CommonForm
              formControls={loginFormControls}
              buttonText="Sign In"
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />

            <p className="text-sm font-semibold text-right cursor-pointer text-blue">
              Forgot Password?
            </p>
          </div>

          <p className="text-sm text-center text-white">
            Don’t have an account?
            <Link
              to="/auth/register"
              className="text-[#065ad8] font-semibold ml-2"
            >
              Register
            </Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-col items-center justify-center hidden w-1/2 h-full p-14 bg-blue lg:flex">
          <div className="relative flex items-center justify-center w-full p-0 pt-8">
            <img
              src="/assets/Car1.jpeg"
              alt="Bg Image"
              className="object-cover w-48 h-48 rounded-full 2xl:w-64 2xl:h-64"
            />

            <div className="absolute right-0 flex items-center gap-1 px-2 py-4 text-white rounded-full top-10">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share Thoughts</span>
            </div>

            <div className="absolute flex items-center gap-1 px-5 py-2 pl-4 text-white rounded-full left-10 top-6">
              <FontAwesomeIcon icon={faCar} />
              <span className="text-xs font-medium">Cars</span>
            </div>

            <img
              src="/assets/vechileparts.jpeg"
              alt="Bg Image"
              className="absolute left-0 object-cover w-48 h-48 rounded-full 2xl:w-64 2xl:h-64 top-24"
            />
          </div>

          <div className="mt-24 mb-4 text-center">
            <p className="text-base text-white">You dream, we deliver.</p>
            <span className="text-sm text-white/80">
              Buy cars and accessories with us.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
