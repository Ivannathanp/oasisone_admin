import React, { useState, useEffect, useContext } from "react";
import "../TopBar/TopBar.css";
import "./OrderStatusPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
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
=======
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import removecat from "../../icons/RemoveCat.svg";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@material-ui/core";
import recommended from "../../icons/Recommend.png";
import { CustomizedRadios } from "./Radio/RadioButton";
import { ModeComment } from "@material-ui/icons";
import moment from "moment";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

function OrderStatusPage({ tenant }) {
  const localUrl = process.env.REACT_APP_ORDERURL;
  const [orderData, setOrderData] = useState([]);
  const [orderRetrieved, setOrderRetrieved] = useState(false);
  const [acceptance, setAcceptance] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [menuRetrieved, setMenuRetrieved] = useState(false);

  // Get Order Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = localUrl + "/retrieve/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setOrderData([result.data]);
              setOrderRetrieved(() => true);
            } else {
              setOrderRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tenant, orderRetrieved]);

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add order", (data) => handleOrderAdded(data));
      socket.on("update order", (data) => handleOrderUpdated(data));
    }
  });

  function handleOrderAdded(user) {
    if (orderRetrieved) {
      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
    }
  }

  function handleOrderUpdated(user) {
    if (orderRetrieved) {
      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
    }
  }

  function handleacceptincrement(i, v, j) {
    orderData.map((item) => {
      return item.map((post, index) => {
        if (post.order_id == i) {
          post.order_status = v + 1;

          const url = localUrl + "/edit/" + tenant.tenant_id + "/" + i;
          fetch(url, {
            method: "POST",
            body: JSON.stringify({
              order_status: post.order_status,
              order_table: j,
            }),
            headers: { "content-type": "application/JSON" },
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.status === "SUCCESS") {
                socket.emit("update order", result.data);
              }
            });
        }
        setAcceptance({ post });
      });
    });
  }

  const [rejectOrder, setRejectOrder] = useState(false);
  const [rejectID, setRejectID] = useState();
  const [rejectReason, setRejectReason] = useState(false);
  const [rejectReasonText, setRejectReasonText] = useState();

  const [removeitemnotif, setRemoveItemNotif] = useState(false);

  async function handleRejectOrder(id) {
    setRemoveItemNotif(true);
    setTimeout(() => {
      setRemoveItemNotif(false);
    }, 5000);
    setRejectReason(false);

    const url = localUrl + "/reject/" + tenant.tenant_id + "/" + id;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        order_status: "6",
        reject_reason: rejectReasonText,
      }),
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          socket.emit("update order", result.data);
        }
      });

    setRejectOrder(false);
    setRejectID();
    setRejectReasonText();
  }

  function rejectOrdermodal() {
    return (
      <Modal open={rejectOrder}>
        <Box className={rejectReason ? "rejectorderbox" : "removecatmodalbox"}>
          <div className="removecatinnerbox">
            <div className="removecatheading">
              <img src={removecat} className="removecatimage" />
              <div className="removecatmodaltitle">Reject Order</div>
            </div>
            <div className="removecatmodaltext">
              {rejectReason
                ? "Reason why this order is rejected?"
                : "Are you sure to reject this order?"}
              {rejectReason ? (
                <div className="radiogroupcontainer">
                  <CustomizedRadios setStatus={setRejectReasonText} />
                </div>
              ) : null}
            </div>

            <div className="removecatmodalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
                  onClick={() => {
                    setRejectOrder(false);
                    setRejectReason(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="modalconfirmbutton"
                  onClick={() => {
                    rejectReason
                      ? handleRejectOrder(rejectID)
                      : setRejectReason(true);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    );
  }
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

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

<<<<<<< HEAD
        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
=======
        <TopBar />
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
      </div>
      {orderRetrieved ? (
        <div className="orderstatusoutercontainer">
          <div className="orderstatuscontainer">
            {rejectOrdermodal()}
            <div className={removeitemnotif ? "notification" : "hidden"}>
              <div className="notificationtextcontainer">
                <div className="notificationtext">Order Removed</div>
              </div>

<<<<<<< HEAD
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
=======
              <div className="notificationclose">
                <button
                  className="notifclosebutton"
                  onClick={() => setRemoveItemNotif(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>

            {orderRetrieved == true &&
              orderData.map((item) => {
                return item.map((post, index) => {
                  if (post.order_status != 5 && post.order_status != 6) {
                    return (
                      <>
                        <div className="orderstatuscard">
                          {post.order_status != 1 ? null : (
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="closeordericon"
                              onClick={() => {
                                setRejectOrder(true);
                                setRejectID(post.order_id);
                              }}
                            />
                          )}

                          <div className="orderID">{post.order_id}</div>
                          <div className="orderdetail">
                            <div className="orderstatustime">
                              {moment(post.order_time).fromNow()}-{" "}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                            </div>
                            <div className="tableID">
                              {" "}
                              Table {post.order_table}
                            </div>
                          </div>
                          <div className="menucontainer">
                            {post.order_menu.map((posts, index) => {
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
                                      index < posts.length - 1
                                        ? "menutext"
                                        : "nobordermenutext"
                                    }
                                  >
                                    <div className="menutitle">
                                      {posts.name}
                                    </div>
                                    <div className="recommended">
                                      {posts.isRecommended === true ? (
                                        <img src={recommended} />
                                      ) : (
                                        "null"
                                      )}
                                    </div>
                                    <div className="menutext2">
                                      <div className="menuprice">
                                        <NumberFormat
                                          value={posts.price}
                                          prefix="Rp. "
                                          decimalSeparator="."
                                          thousandSeparator=","
                                          displayType="text"
                                        />
                                      </div>
                                      <div className="menuquant">
                                        Qty:{" "}
                                        <span className="quant">
                                          {" "}
                                          {posts.orderQty}{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="totalcontainer">
                            <div className="total">
                              <div className="totalquant">
                                x{post.order_item} items
                              </div>
                              <div className="totalprice">
                                <NumberFormat
                                  value={post.order_total}
                                  prefix="Rp. "
                                  decimalSeparator="."
                                  thousandSeparator=","
                                  displayType="text"
                                />
                              </div>
                            </div>
                            <div className="buttoncontainer" key={index}>
                              {post.order_status == 1 ? (
                                <button
                                  className="proceedstatusbutton"
                                  type="button"
                                  onClick={() => {
                                    handleacceptincrement(
                                      post.order_id,
                                      post.order_status,
                                      post.order_table
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="icon"
                                  />
                                  Proceed
                                </button>
                              ) : post.order_status == 2 ? (
                                <button
                                  type="button"
                                  className="servestatusbutton"
                                  onClick={() => {
                                    handleacceptincrement(
                                      post.order_id,
                                      post.order_status,
                                      post.order_table
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="icon"
                                  />
                                  Serve
                                </button>
                              ) : post.order_status == 3 ? (
                                <button
                                  className="completestatusbutton"
                                  type="button"
                                  onClick={() => {
                                    handleacceptincrement(
                                      post.order_id,
                                      post.order_status,
                                      post.order_table
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="icon"
                                  />
                                  Payment
                                </button>
                              ) : post.order_status == 4 ? (
                                <button
                                  className="completedstatusbutton"
                                  type="button"
                                  onClick={() => {
                                    handleacceptincrement(
                                      post.order_id,
                                      post.order_status,
                                      post.order_table
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="icon"
                                  />
                                  Complete
                                </button>
                              ) : post.order_status == 5 ? (
                                <button
                                  className="completedstatusbutton"
                                  type="button"
                                  onClick={() => {
                                    handleacceptincrement(
                                      post.order_id,
                                      post.order_status,
                                      post.order_table
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="icon"
                                  />
                                  Completed
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    );
<<<<<<< HEAD
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
=======
                  }
                });
              })}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeDots color="#f10c0c" height={80} width={80} />
        </div>
      )}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(OrderStatusPage);
