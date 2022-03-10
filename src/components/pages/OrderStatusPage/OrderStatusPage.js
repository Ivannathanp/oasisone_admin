import React, { useState } from "react";
import "../TopBar.css";
import "./OrderStatusPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

function OrderStatusPage({ tenant }) {
  const OrderData = [
    {
      id: 1,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      accepted: 1,
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
      totalprice: 130000,
    },
    {
      id: 2,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      accepted: 2,
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
      totalprice: 130000,
    },
    {
      id: 3,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      accepted: 3,
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
      totalprice: 195000,
    },
  ];

  const [acceptance, setAcceptance] = useState("");

  
  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

  function handleacceptincrement(i) {
    setAcceptance({acceptance: i + 1});

    console.log("acc", acceptance);
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Order Status Screen</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <div className="orderstatuscontainer">
        {OrderData.map((post, index) => {
          return (
            <>
              <div className="orderstatuscard">
                <div className="orderID">{post.order_ID}</div>
                <div className="orderdetail">
                  <div className="orderstatustime">{post.time} - </div>
                  <div className="tableID"> Table {post.table_ID}</div>
                </div>
                <div className="menucontainer">
                  {post.menu.map((posts, index) => {
                    return (
                      <div className="menudetails">
                        <div className="menuimagecontainer">
                          <img
                            src={require("../../icons/Gurame Asam Manis.png")}
                            className="menuimage"
                          />
                        </div>
                        <div
                          className={
                            index < post.menu.length - 1
                              ? "menutext"
                              : "nobordermenutext"
                          }
                        >
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
                    <div className="totalprice">
                      <NumberFormat
                        value={post.totalprice}
                        prefix="RP. "
                        decimalSeparator="."
                        thousandSeparator=","
                        displayType="text"
                      />
                    </div>
                  </div>
                  <div className="buttoncontainer" key={index}>
                    {/* {post.accepted == 1 ? (
                      <button
                        className="proceedstatusbutton"
                        type="button"
                        onClick={
                          (() => handleacceptincrement(post.accepted),
                          console.log(post.accepted))
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        Proceed
                      </button>
                    ) : post.accepted == 2 ? (
                      <button
                        type="button"
                        className="servestatusbutton"
                        onClick={() => handleacceptincrement(post.accepted)}
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        Serve
                      </button>
                    ) : post.accepted == 3 ? (
                      <button
                        className="completestatusbutton"
                        type="button"
                        //onClick={handleacceptincrement(post.accepted)}
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        Complete
                      </button>
                    ) : post.accepted == 4 ? (
                      <button
                        className="completedstatusbutton"
                        type="button"
                        //onClick={post.accepted}
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        Completed
                      </button>
                    ) : null} */}

<button
                        className={post.accepted == 1? "proceedstatusbutton" : post.accepted == 2? "servestatusbutton" : post.accepted == 3? "completestatusbutton" : post.accepted == 4? "completedstatusbutton" : null }
                        type="button"
                        onClick={()=>handleacceptincrement(post.accepted)}
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        {post.accepted == 1? "Proceed" : post.accepted == 2? "Serve" : post.accepted == 3? "Complete" : post.accepted == 4? "Completed" : null}
                        
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

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(OrderStatusPage);
