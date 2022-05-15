import React, { useState, useEffect } from "react";
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
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
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

  const [menuData, setMenuData] = useState([]);
  const [menuRetrieved, setMenuRetrieved] = useState(false);

  // Get Order Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = localUrl + "/retrieve/" + tenant.tenant_id;
        console.log(url);

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              // console.log(result)
              setOrderData(() => result.data);
              setOrderRetrieved(() => true);
            } else {
              // console.log(result);
              setOrderRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tenant, orderRetrieved]);

  const [acceptance, setAcceptance] = useState([]);

  function handleacceptincrement(i, v, j) {
    orderData.map((post) => {
      if (post.order_id == i) {
        post.order_status = v + 1;
        console.log(post.order_status);
        const url = localUrl + "/edit/" + i;
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
              console.log(result);
            } else {
              console.log(result);
            }
          });
      }
      setAcceptance({ post });
    });

    console.log("acc", acceptance);
  }

  const [rejectOrder, setRejectOrder] = useState(false);
  const [rejectID, setRejectID] = useState();
  const [rejectReason, setRejectReason] = useState(false);
  const [rejectReasonText, setRejectReasonText] = useState();

  const [removeitemnotif, setRemoveItemNotif] = useState(false);

  async function handleRejectOrder(id) {
    console.log(id);
    const url = localUrl + "/reject/" + id;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        order_status: "5",
        reject_reason: rejectReasonText,
      }),
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          console.log(result);
        } else {
          console.log(result);
        }
      });

    setRejectOrder(false);
    setRejectID();
    setRejectReasonText();
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handlerejected() {
    setRejectOrder(false);
    setRemoveItemNotif(true);
    setTimeout(() => {
      setRemoveItemNotif(false);
    }, 5000);
    setRejectReason(false);
  }

  console.log(rejectReasonText, "reason");

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

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Order Status Screen</div>

       <TopBar/>
      </div>
{orderRetrieved? ( <div className="orderstatusoutercontainer">
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
            orderData.map((post, index) => {
              if (post.order_status != 4 && post.order_status != 5) {
                return (
                  <>
                    <div className="orderstatuscard">
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="closeordericon"
                        onClick={() => {
                          setRejectOrder(true);
                          setRejectID(post.order_id);
                        }}
                      />
                      <div className="orderID">{post.order_id}</div>
                      <div className="orderdetail">
                        <div className="orderstatustime">
                          {moment(post.order_time).fromNow()}-{" "}
                        </div>
                        <div className="tableID"> Table {post.order_table}</div>
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
                                <div className="menutitle">{posts.name}</div>
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
                                  post.order_table,
                                );
                                console.log(post.order_status);
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
                                  post.order_table,
                                );
                                console.log(post.order_status);
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
                                  post.order_table,
                                );
                                console.log(post.order_status);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="icon"
                              />
                              Complete
                            </button>
                          ) : post.order_status == 4 ? (
                            <button
                              className="completedstatusbutton"
                              type="button"
                              onClick={() => {
                                handleacceptincrement(
                                  post.order_id,
                                  post.order_status,
                                  post.order_table,
                                );
                                console.log(post.order_status);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="icon"
                              />
                              Completed
                            </button>
                          ) : null}

                          {/* <button
                className={post.order_status == 1? "proceedstatusbutton" : post.order_status == 2? "servestatusbutton" : post.order_status == 3? "completestatusbutton" : post.order_status == 4? "completedstatusbutton" : null }
                type="button"
                onClick={()=>handleacceptincrement(post.order_status)}
              >
                <FontAwesomeIcon icon={faCheck} className="icon" />
                {post.order_status == 1? "Proceed" : post.order_status == 2? "Serve" : post.order_status == 3? "Complete" : post.order_status == 4? "Completed" : null}
                
              </button> */}
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
        </div>
      </div>):(
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