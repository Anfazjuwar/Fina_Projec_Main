import React from "react";
import "./Footer.css";
// import { assets } from "../../assets/assets";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { IoCar } from "react-icons/io5";
import { shoppingViewMainHeaderMenuItems } from "@/config";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <IoCar size={40} />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            saepe, nam consequatur nulla tempora ipsa non laborum. Sint quis
            praesentium maiores, aut sunt recusandae aliquam, labore distinctio
            ullam nemo impedit.
          </p>

          <div className="flex gap-4">
            <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-600" />
            <Twitter className="w-6 h-6 cursor-pointer hover:text-sky-500" />
            <Linkedin className="w-6 h-6 cursor-pointer hover:text-blue-800" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            {" "}
            {shoppingViewMainHeaderMenuItems.map((menuItem) => (
              <Link
                onClick={() => handleNavigate(menuItem)}
                className="flex flex-col mt-4 text-sm font-medium cursor-pointer"
                key={menuItem.id}
              >
                {menuItem.label}
              </Link>
            ))}
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+44 75-027-6174</li>
            <li>njgamil@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Created by Anfaz .Copyright © 2025. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
