import React from "react";
import "../TopBar.css";
import "./QrPage.css";
import logo from "../../icons/Logo.png";
import qrcode from "../../icons/qrcode.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

function QrPage() {
  const RestaurantData = [
    {
      id: 1,
      name: "Telaga Seafood",
      table: [
        {
          id: 1,
          name: 1,
          available: true,
        },
        {
          id: 2,
          name: 2,
          available: true,
        },
        {
          id: 3,
          name: 3,
          available: false,
        },
        {
          id: 4,
          name: 4,
          available: true,
        },
        {
          id: 5,
          name: 5,
          available: false,
        },
        {
          id: 6,
          name: 6,
          available: true,
        },
        {
          id: 7,
          name: 7,
          available: false,
        },
        {
          id: 8,
          name: 8,
          available: true,
        },
        {
          id: 9,
          name: 9,
          available: true,
        },
        {
          id: 10,
          name: 10,
          available: true,
        },
        {
          id: 11,
          name: 11,
          available: true,
        },
        {
          id: 12,
          name: 12,
          available: true,
        },
        {
          id: 13,
          name: 13,
          available: false,
        },
        {
          id: 14,
          name: 14,
          available: true,
        },
        {
          id: 15,
          name: 15,
          available: false,
        },
        {
          id: 16,
          name: 16,
          available: true,
        },
        {
          id: 17,
          name: 17,
          available: false,
        },
        {
          id: 18,
          name: 18,
          available: true,
        },
        {
          id: 19,
          name: 19,
          available: true,
        },
        {
          id: 20,
          name: 20,
          available: true,
        },
        {
          id: 21,
          name: 21,
          available: true,
        },
        {
          id: 22,
          name: 22,
          available: true,
        },
        {
          id: 23,
          name: 23,
          available: false,
        },
        {
          id: 24,
          name: 24,
          available: true,
        },
        {
          id: 25,
          name: 25,
          available: false,
        },
        {
          id: 26,
          name: 26,
          available: true,
        },
        {
          id: 27,
          name: 27,
          available: false,
        },
        {
          id: 28,
          name: 28,
          available: true,
        },
        {
          id: 29,
          name: 29,
          available: true,
        },
        {
          id: 30,
          name: 30,
          available: true,
        },
      ],
      promo: [
        {
          id: 1,
          uri: "../../icons/Banner1.jpg",
        },
        {
          id: 2,
          uri: "../../icons/Banner1.jpg",
        },
      ],
    },
  ];

  const OrderData = [
    {
      id: 1,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 2,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 3,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 4,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 5,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
  ];

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Print QR Codes</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={logo} className="image" />
          </div>
          <div className="text">Telaga Seafood</div>
        </div>
      </div>

      <div className="printqrsection">
        <div className="qrgrid">
          <div className="qrimage">
            <img src={qrcode} className="qr"/>
          </div>
          <div className="qrsettings">
            <div className="generateqr">
              <button className="generateqrbutton">Generate New QR Code</button>
            </div>
            <div className="border"></div>
            <div className="printqr">
              <button className="printqrbutton">Print QR Code</button>
            </div>
            <div className="downloadqr">
              <button className="downloadqrbutton">Download as PNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrPage;
