import React, { useState } from "react";
import "../TopBar.css";
import "./OrderStatusPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NumberFormat from "react-number-format";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons"
function OrderStatusPage() {
  const OrderData = [
    {
      id: 1,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          price: 65000,
          quantity: 1,
          uri: "../../icons/Gurame Asam Manis.png",
        },
        {
          id: 2,
          name: "Udang Bakar",
          price: 65000,
          quantity: 1,
          uri: "../../icons/Udang Bakar.png",
        },
      ],
      totalquant: 2,
      totalprice: 130000
    },
    {
      id: 2,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          price: 65000,
          quantity: 1,
          uri: "../../icons/Gurame Asam Manis.png",
        },
        {
          id: 2,
          name: "Udang Bakar",
          price: 65000,
          quantity: 1,
          uri: "../../icons/Udang Bakar.png",
        },
      ],
      totalquant: 2,
      totalprice: 130000
    },
    {
      id: 3,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          price: 65000,
          quantity: 1,
          uri: "../../icons/Gurame Asam Manis.png",
        },
        {
          id: 2,
          name: "Udang Bakar",
          price: 65000,
          quantity: 1,
          uri: "../../icons/Udang Bakar.png",
        },
        {
          id: 3,
          name: "Udang Saos Padang",
          price: 65000,
          quantity: 1,
          uri: "../../icons/Udang Asam Manis.png",
        },
      ],
      totalquant: 3,
      totalprice: 195000
    },
  ];

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Order Status Screen</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={logo} className="image" />
          </div>
          <div className="text">Telaga Seafood</div>
        </div>
      </div>

      <div className="orderstatuscontainer">
        {OrderData.map((post) => {
          return (
            <>
              <div className="orderstatuscard">
                <div className="orderID">{post.order_ID}</div>
                <div className="orderdetail">
                  <div className="time">{post.time} - </div>
                  <div className="tableID"> Table {post.table_ID}</div>
                </div>
                <div className="menucontainer">
                  {post.menu.map((posts,index) => {
                    console.log(`${posts.uri}`);

                    return (
                      <div className="menudetails">
                        <div className="menuimagecontainer">
                          <img
                            src={
                              require("../../icons/Gurame Asam Manis.png")
                                .default
                            }
                            className="menuimage"
                          />
                        </div>
                        <div className={index < post.menu.length - 1? "menutext" : "nobordermenutext"}>
                          <div className="menutitle">{posts.name}</div>
                          <div className="menutext2">
                            <div className="menuprice">
                              <NumberFormat
                                value={posts.price}
                                prefix="RP. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </div>
                            <div className="menuquant">
                              Qty:{" "}
                              <span className="quant"> {posts.quantity} </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="totalcontainer">
          
                   
                        <div className="total">
                          <div className="totalquant">x{post.totalquant} items</div>
                          <div className="totalprice"><NumberFormat
                                value={post.totalprice}
                                prefix="RP. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              /></div>
                        </div>
                        <div className="buttoncontainer">
                          <button
                            className="orderstatusbutton"
                            onClick={console.log("hey")}
                          >
                            <FontAwesomeIcon icon={faCheck} className="icon"/>
                            Complete
                          </button>
                        </div>
                     
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default OrderStatusPage;
