import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
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

function SideBar({ logoutUser, tenant }) {
  let history = useHistory();

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            {tenant.name} <i className="fab fa-typo3"></i>
          </div>
          <ul className="side-menu">
            <li className="side-item">
              <NavLink to="/dashboard" activeClassName='is-active' className="side-links">
                <img src={Dashboard} className="icons2" /> Dashboard
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/orders" activeClassName='is-active' className="side-links">
                <img src={Cart} className="icons" />
                Orders
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/orderstatus" activeClassName='is-active' className="side-links">
                <img src={Chart} className="icons" />
                Order Status Screen
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/promo" activeClassName='is-active' className="side-links">
                <img src={Banner} className="icons" />
                Promo Banner
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/inventory" activeClassName='is-active' className="side-links">
                <img src={Inventory} className="icons" />
                Inventory
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/tables" activeClassName='is-active' className="side-links">
                <img src={Tables} className="icons2" />
                Tables
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/qr" activeClassName='is-active' className="side-links">
                <img src={Qr} className="icons" />
                Print QR Codes
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/customer" activeClassName='is-active' className="side-links">
                <img src={People} className="icons2" />
                Customer
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="/settings" activeClassName='is-active' className="side-links">
                <img src={Settings} className="icons" />
                Settings
              </NavLink>
            </li>
            <li className="side-item">
              <NavLink to="#" className="side-links" onClick={() => logoutUser(history)}>
                <img src={Logout} className="icons" />
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps, {logoutUser})(SideBar);
