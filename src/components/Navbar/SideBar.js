import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./SideBar.css";
import Dashboard from "../icons/Dashboard.png";
import Cart from "../icons/Order Stat.png";
import Chart from "../icons/Order.png";
import Banner from "../icons/PromoBan.png";
import Inventory from "../icons/Inven.png";
import Tables from "../icons/Table.png";
import Qr from "../icons/Qr.png";
import People from "../icons/Customer.png";
import Settings from "../icons/VectorSettings.png";
import Logout from "../icons/Logout.png";
//auth & redux
import { connect } from "react-redux";
import {logoutUser} from "../Auth/actions/userActions";

function SideBar({logoutUser}) {
  let history = useHistory();

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            Telaga Seafood <i className="fab fa-typo3"></i>
          </div>
          <ul className="side-menu">
            <li className="side-item">
              <Link to="/dashboard" className="side-links">
                <img src={Dashboard} className="icons2" /> Dashboard
              </Link>
            </li>
            <li className="side-item">
              <Link to="/orders" className="side-links">
                <img src={Cart} className="icons" />
                Orders
              </Link>
            </li>
            <li className="side-item">
              <Link to="/orderstatus" className="side-links">
                <img src={Chart} className="icons" />
                Order Status Screen
              </Link>
            </li>
            <li className="side-item">
              <Link to="/promo" className="side-links">
                <img src={Banner} className="icons" />
                Promo Banner
              </Link>
            </li>
            <li className="side-item">
              <Link to="/inventory" className="side-links">
                <img src={Inventory} className="icons" />
                Inventory
              </Link>
            </li>
            <li className="side-item">
              <Link to="/tables" className="side-links">
                <img src={Tables} className="icons2" />
                Tables
              </Link>
            </li>
            <li className="side-item">
              <Link to="/qr" className="side-links">
                <img src={Qr} className="icons" />
                Print QR Codes
              </Link>
            </li>
            <li className="side-item">
              <Link to="/customer" className="side-links">
                <img src={People} className="icons2" />
                Customer
              </Link>
            </li>
            <li className="side-item">
              <Link to="/settings" className="side-links">
                <img src={Settings} className="icons" />
                Settings
              </Link>
            </li>
            <li className="side-item">
              <Link to="#" className="side-links" onClick={() => logoutUser(history)}>
                <img src={Logout} className="icons" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}




export default connect(null, {logoutUser})(SideBar);
