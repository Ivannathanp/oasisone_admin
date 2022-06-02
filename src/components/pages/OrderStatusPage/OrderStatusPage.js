import React, { useState, useEffect, useContext } from "react";
import "../TopBar/TopBar.css";
import "./OrderStatusPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NumberFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

        <TopBar />
      </div>
      {orderRetrieved ? (
        <div className="orderstatusoutercontainer">
          <div className="orderstatuscontainer">
            {rejectOrdermodal()}
            <div className={removeitemnotif ? "notification" : "hidden"}>
              <div className="notificationtextcontainer">
                <div className="notificationtext">Order Removed</div>
              </div>

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
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(OrderStatusPage);
