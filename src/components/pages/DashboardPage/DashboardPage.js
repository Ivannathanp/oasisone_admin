import React, { useState, useEffect } from "react";
import "../TopBar/TopBar.css";
import "./DashboardPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import recommended from "../../icons/Recommend.png";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

function DashboardPage({ tenant }) {
  let history = useHistory();

  const tableUrl = process.env.REACT_APP_TABLEURL;
  const [tableData, setTableData] = useState([]);
  const [tableRetrieved, setTableRetrieved] = useState(false);
  const [availableTable, setAvailableTable] = useState(0);
  const [filledTable, setFilledTable] = useState(0);

  const [socket, setSocket] = useState(null);


  // socket connection
 

  // Get Table Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = tableUrl + "/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTableData(() => result.data);
              setTableRetrieved(() => true);
            } else {
              setTableRetrieved(() => false);
            }
          });
      }
    }
    {
      tableRetrieved == true &&
        tableData.map((post) => {
          console.log("table", tableData.length);
          let available = 0;
          let filled = 0;
          for (let i = 0; i < tableData.length; i++) {
            if (post.table.status === "EMPTY") available++;

            if (post.table.status === "FILLED") {
              filled++;
            }
          }
          setAvailableTable(available);
          setFilledTable(filled);
        });
    }

    return () => {
      mounted = false;
    };
  }, [tenant, tableRetrieved]);

  const promoUrl = process.env.REACT_APP_PROMOURL;
  const [promoData, setPromoData] = useState([]);
  const [promoRetrieved, setPromoRetrieved] = useState(false);

  // Get Promo Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = promoUrl + "/retrieve/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              console.log(result);
              setPromoData(() => result.data);
              setPromoRetrieved(() => true);
            } else {
              setPromoRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tenant, promoRetrieved]);

  const orderUrl = process.env.REACT_APP_ORDERURL;
  const [orderData, setOrderData] = useState([]);
  const [orderRetrieved, setOrderRetrieved] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [soldOutMenu, setSoldOutMenu] = useState(0);

  // Get Order Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = orderUrl + "/retrieve/" + tenant.tenant_id;
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

  const [orderStatus, setOrderStatus] = useState("");
  const [orderTable, setOrderTable] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [orderMenu, setOrderMenu] = useState([]);
  const [orderItem, setOrderItem] = useState("");
  const [orderTotal, setOrderTotal] = useState("");
  const [orderServiceCharge, setOrderServiceCharge] = useState("");
  const [orderTaxCharge, setOrderTaxCharge] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhonenumber, setUserPhonenumber] = useState("");
  const [orderInstruction, setOrderInstruction] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  function handlePassinginfo(
    orderStatus,
    orderTable,
    orderTime,
    orderMenu,
    orderItem,
    orderTotal,
    orderServiceCharge,
    orderTaxCharge,
    userName,
    userPhonenumber,
    orderInstruction,
    rejectReason
  ) {
    setOrderStatus(orderStatus);
    setOrderTable(orderTable);
    setOrderTime(orderTime);
    setOrderMenu(orderMenu);
    setOrderItem(orderItem);
    setOrderTotal(orderTotal);
    setOrderServiceCharge(orderServiceCharge);
    setOrderTaxCharge(orderTaxCharge);
    setUserName(userName);
    setUserPhonenumber(userPhonenumber);
    setOrderInstruction(orderInstruction);
    setRejectReason(rejectReason);
  }

  const ordertime = new Date(orderTime);
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const inventorylUrl = process.env.REACT_APP_MENUURL;
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryRetrieved, setInventoryRetrieved] = useState(false);

  // Get Inventory Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = inventorylUrl + "/all/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setInventoryData(() => result.data);
              setInventoryRetrieved(() => true);
            } else {
              setInventoryRetrieved(() => false);
            }
          });
      }
    }
    {
      inventoryRetrieved == true &&
        inventoryData[0].menu.map((post) => {
          let counter = 0;
          for (let i = 0; i < inventoryData[0].menu.length; i++) {
            if (inventoryData[0].menu[i].quantity == 0) counter++;
          }

          console.log("count", counter);
          setSoldOutMenu(counter);
        });
    }
    return () => {
      mounted = false;
    };
  }, [tenant, inventoryRetrieved]);

  function redirectinventory() {
    history.push("/inventory");
  }

  function redirectorder() {
    history.push("/orderstatus");
  }

  function redirectpromo() {
    history.push("/promo");
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Dashboard</div>

        <TopBar/>
        </div>

{tableRetrieved? ( <div className="dashboardsection">
        <div className="tables">
          Tables
          <div className="tablecol">
            <div className="tablecolumn1">
              <div className="heading">Table Available List</div>
              <div className="scrollable">
                <div className="dashboardtablecontainer">
                  <div className="tablegrid">
                    {tableRetrieved == true &&
                      tableData.map((post) => {
                        if (post.table.status === "EMPTY") {
                          return (
                            <>
                              <div className="tablenumber">
                                {post.table.index}
                              </div>
                            </>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="tablecolumn2">
              <div className="tablerow">
                <div className="number">{filledTable}</div>
                <div className="tablerowtext">
                  <div className="up">Table</div>
                  <div className="down">Occupied</div>
                </div>
              </div>
              <div className="tablerow">
                <div className="number2">{availableTable}</div>
                <div className="tablerowtext">
                  <div className="up">Table</div>
                  <div className="down">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="inventory">
          Inventory
          <div className="dashboardinventorycol">
            <div className="invcolumn1">
              <div className="tablerow">
                <div className="number">{soldOutMenu}</div>
                <div className="tablerowtext">
                  <div className="up">Menu</div>
                  <div className="down">Sold Out</div>
                </div>
              </div>
              <div className="buttoncontainer">
                <button className="button" onClick={redirectinventory}>
                  View Detail
                </button>
              </div>
            </div>
            <div className="invcolumn2">
              <div className="headerrow">
                <div className="text1">No.</div>
                <div className="text2">Name</div>
                <div className="text3">Available Stock</div>
              </div>
              <div className="list">
                {inventoryRetrieved == true &&
                  inventoryData[0].menu.map((post, index) => {
                    return (
                      <div className="inventorylistgrid">
                        <div className="inventoryindex">
                          <div className="index">{index + 1} </div>
                        </div>
                        <div className="inventoryname">{post.name}</div>
                        <div className="inventorystock">{post.quantity}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="orderscreen">
          Order Screen
          <div className="dashboardordercontainer">
            <div className="ordergrid">
              <Modal open={orderOpen}>
                <Box className="ordermodalbox">
                  <div className="modalclose">
                    <button
                      className="modalclosebutton"
                      onClick={() => setOrderOpen(false)}
                    >
                      <FontAwesomeIcon
                        className="closebuttonicon"
                        icon={faCircleXmark}
                      />
                    </button>
                  </div>

                  <div className="innermodalbox">
                    <div className="ordermodaltitle">{tenant.name}</div>
                    <div className="ordermodalsubtitle">
                      <div className="ordermodaldate">
                        <div className="ordertime">
                          <CalendarTodayOutlinedIcon
                            fontSize="small"
                            className="timeicon"
                          />
                          {ordertime.toLocaleTimeString("en-US")}{" "}
                          <span className="space">/</span>{" "}
                          <span className="orderdate">
                            {" "}
                            {ordertime.toLocaleDateString("en-ID", dateOptions)}
                          </span>
                        </div>
                      </div>

                      <div className="ordermodalstatus">
                        <div className="statustext">STATUS</div>
                        <div className="statuscoloredtext">
                          {orderStatus == 1 ? (
                            <div className="pending">PENDING</div>
                          ) : orderStatus == 2 ? (
                            <div className="orderplaced">ORDER PLACED</div>
                          ) : orderStatus == 3 ? (
                            <div className="served">SERVED</div>
                          ) : orderStatus == 4 ? (
                            <div className="complete">COMPLETE</div>
                          ) : orderStatus == 5 ? (
                            <div className="modalrejectedstatus">REJECTED</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="ordermodalitems">
                      <div className="ordermodalform">
                        <form>
                          <div className="ordermodalinputlabel">
                            Name <span style={{ color: "#E52C32" }}>*</span>
                          </div>
                          <input
                            type="text"
                            value={userName}
                            className="ordermodalinputfile"
                            disabled={true}
                          />
                          <div className="ordermodalinputlabel">
                            Phone Number
                            <span style={{ color: "#E52C32" }}>*</span>
                          </div>
                          <input
                            type="text"
                            value={userPhonenumber}
                            className="ordermodalinputfile"
                            disabled={true}
                          />
                          <div className="ordermodalinputlabel">
                            Special Instructions
                          </div>
                          <input
                            type="text"
                            value={orderInstruction}
                            className="ordermodalinputfile"
                            disabled={true}
                          />
                          <div className="ordermodalinputlabel">Table</div>
                          <input
                            type="text"
                            value={orderTable}
                            className="ordermodalinputfile"
                            disabled={true}
                          />
                          {orderStatus == 5 ? (
                            <>
                              {" "}
                              <div className="ordermodalinputlabel">
                                Reasons for rejecting
                              </div>
                              <div className="rejectreasontext">
                                {rejectReason}
                              </div>
                            </>
                          ) : null}
                        </form>
                      </div>

                      <div className="ordermenuitemcontainer">
                        <div className="ordermenutitle">Order Items</div>
                        <div className="ordermenuitem">
                          {orderMenu.map((post, index) => (
                            <div className="ordermenucontainer">
                              <div className="ordermenuimagecontainer">
                                {/* <img src={post.uri} className="menuimage" /> */}
                              </div>
                              <div className="orderdetailsmenutext">
                                <div className="orderdetailsmenutitle">
                                  {post.name}
                                </div>
                                <div className="recommended">
                                  {post.isRecommended === true ? (
                                    <img src={recommended} />
                                  ) : (
                                    "null"
                                  )}
                                </div>
                                <div className="orderdetailmenuprice">
                                  <NumberFormat
                                    value={post.price}
                                    prefix="Rp. "
                                    decimalSeparator="."
                                    thousandSeparator=","
                                    displayType="text"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="ordertotalsummary">
                          <div className="ordertotalitems">
                            <div className="lefttext">Items:</div>
                            <div className="righttext">{orderItem}</div>
                          </div>

                          <div className="ordertotalitems">
                            <div className="lefttext">Subtotal:</div>
                            <div className="righttext">
                              <NumberFormat
                                value={orderTotal}
                                prefix="Rp. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </div>
                          </div>

                          <div className="ordertotalitems">
                            <div className="lefttext">Service Charge:</div>
                            <div className="righttext">
                              <NumberFormat
                                value={orderServiceCharge}
                                prefix="Rp. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </div>
                          </div>

                          <div className="ordertotalitems-n">
                            <div className="lefttext">Tax(%):</div>
                            <div className="righttext">
                              <NumberFormat
                                value={orderTaxCharge}
                                prefix="Rp. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>

              {orderRetrieved == true &&
                orderData.map((post) => {
                  if (post.order_status != 4 && post.order_status != 5) {
                    return (
                      <>
                        <div className="orderdetails">
                          <div className="orderID">{post.order_id}</div>
                          <div className="orderdetail">
                            <div className="orderdetailtime">
                              {" "}
                              {moment(post.order_time).fromNow()}-{" "}
                            </div>
                            <div className="tableID">
                              {" "}
                              Table {post.order_table}
                            </div>
                          </div>
                          <div className="orderbuttoncontainer">
                            <button
                              className="orderbutton"
                              // onClick={redirectorder}
                              onClick={() => {
                                setOrderOpen(true);
                                handlePassinginfo(
                                  post.order_status,
                                  post.order_table,
                                  post.order_time,
                                  post.order_menu,
                                  post.order_item,
                                  post.order_total,
                                  post.order_servicecharge,
                                  post.order_taxcharge,
                                  post.user_name,
                                  post.user_phonenumber,
                                  post.order_instruction,
                                  post.reject_reason
                                );
                              }}
                            >
                              View Detail
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
            </div>
          </div>
        </div>
        <div className="promo">
          Promo Banner
          <div className="dashboardpromocontainer">
            {promoRetrieved == true &&
              promoData.promotions.map((post, index) => {
                return (
                  <div className="promodetails">
                    <button
                      key={index}
                      className="promodetailbutton"
                      type="button"
                      onClick={redirectpromo}
                    >
                      <img src={post.promoImage} className="picture" />
                    </button>
                  </div>
                );
              })}
          </div>
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
  )
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(DashboardPage);
