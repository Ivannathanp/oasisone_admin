import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TablePagination from "../../Pagination/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "../TopBar/TopBar.css";
import "./OrderPage.css";
import NumberFormat from "react-number-format";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import recommended from "../../icons/Recommend.png";
import { connect } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";
import { BorderColor } from "@material-ui/icons";

function OrderPage({ tenant }) {
  const localUrl = process.env.REACT_APP_ORDERURL;
  const [orderData, setOrderData] = useState([]);
  const [orderRetrieved, setOrderRetrieved] = useState(false);

  // Get Order Data
  useEffect(() => {
    let mounted = true;
    console.log("called");

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
              setOrderData([result.data]);
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

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add order", (data) => handleOrderAdded(data));
      socket.on("update order", (data) => handleOrderUpdated(data));
    }
  });

  function handleOrderAdded(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", orderData);

    if (orderRetrieved) {
      console.log("I am order retrieved!!!!!!!!!!!!!", user);

      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", orderData);
    }
  }

  function handleOrderUpdated(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", orderData);

    if (orderRetrieved) {
      console.log("I am order retrieved!!!!!!!!!!!!!", user);

      let newData = orderData.splice();

      newData.push(user);
      setOrderData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", orderData);
    }
  }

  const generatePdf = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "No",
      "Order ID",
      "Customer Name",
      "Customer Phonenumber",
      "Total",
      "Order Placed At",
      " Table No",
      "Order Instruction",
    ];
    const tableRows = [];
    orderData.map((item) => {
return item.map((post,index)=>{
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const ordertime = new Date(post.order_time);
  const OrderData = [
    index + 1,
    post.order_id,
    post.user_name,
    post.user_phonenumber,
    post.order_total,
    ordertime.toLocaleDateString("en-ID", dateOptions),
    post.order_table,
    post.order_instruction,
  ];
  // push each tickcet's info into a row
  tableRows.push(OrderData);
})
      
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date();
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.text(`${tenant.name} Order Report.`, 14, 15);
    // we define the name of our PDF file.
    doc.save(`${tenant.name}_orderreport.pdf`);
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const [orderOpen, setOrderOpen] = useState(false);

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

  const [index, setIndex] = useState(1);

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

  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  function TablePaginationActions(props) {
    const { count, page, onPageChange } = props;

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
      setIndex(index - 7);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);

      setIndex(index + 7);
    };

    return (
      <div className="containerbutton">
        <button
          onClick={handleBackButtonClick}
          disabled={page === 0}
          className={page === 0 ? "leftdisabledbutton" : "leftdisplaybutton"}
        >
          {" "}
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={page === 0 ? { color: "#BEBEBE" } : { color: "#949494" }}
          />
        </button>

        <button
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / 7) - 1}
          className={
            page >= Math.ceil(count / 7) - 1
              ? "rightdisabledbutton"
              : "rightdisplaybutton"
          }
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            style={
              page >= Math.ceil(count / 7) - 1
                ? { color: "#BEBEBE" }
                : { color: "#949494" }
            }
          />
        </button>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ordertime = new Date(orderTime);

  return (
    <div className="container">
      <div className="topbar">
        <div className="left" style={{color: tenant.profileColor}}>Orders</div>

        <TopBar />
      </div>

{orderRetrieved? ( <div className="ordercontainer">
        <div className="outerordertable">
          <div className="ordertable">
          <div className="orderheader">
            <div className="orderleft" style={{color: tenant.profileColor}}>All Orders</div>
            <div className="orderright">
              <button className="downloadbutton" style={{color: tenant.profileColor, borderColor: tenant.profileColor}} onClick={generatePdf}>
                Download as PDF
              </button>
            </div>
          </div>
          <div className="orderheadertitlegrid">
            <div className="orderheadertitle">NO</div>
            <div className="orderheadertitle">ORDER ID</div>
            <div className="orderheadertitle">TOTAL</div>
            <div className="orderheadertitle">STATUS</div>
            <div className="orderheadertitle">ORDER PLACED AT</div>
            <div className="orderheadertitle">TABLE NO</div>
            <div className="orderheadertitle">ACCEPT/REJECT</div>
            <div className="orderheadertitle">VIEW ORDER</div>
          </div>

          <div className="orderrendercontainer">
            <Modal open={orderOpen}>
              <Box className="ordermodalbox" >
                <div className="modalclose">
                  <button
                    className="modalclosebutton"
                    onClick={() => setOrderOpen(false)}
                  >
                    <FontAwesomeIcon
                      className="closebuttonicon"
                      style={{color: tenant.profileColor}}
                      icon={faCircleXmark}
                    />
                  </button>
                </div>

                <div className="innermodalbox">
                  <div className="ordermodaltitle" style={{color: tenant.profileColor}}>{tenant.name}</div>
                  <div className="ordermodalsubtitle">
                    <div className="ordermodaldate">
                      <div className="ordertime">
                        <CalendarTodayOutlinedIcon
                          fontSize="small"
                          className="timeicon"
                        />
                        {ordertime.toLocaleTimeString("en-US")}{" "}
                        <span className="space">/</span>{" "}
                        <span className="orderdate" style={{color: tenant.profileColor}}>
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
                          <div className="payment">PAYMENT</div>
                        ) : orderStatus == 5 ? (
                          <div className="complete">COMPLETE</div>
                        ) : orderStatus == 6 ? (
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
                        {orderStatus == 6 ? (
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
                              <img src={post.menuImage} className="menuimage" />
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
              (rowsPerPage > 0
                ? orderData.map((item)=> {
                  return item.slice( page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage)
                })
                : orderData
              ).map((item) => {
                console.log(item)
                return item.map((post,i)=>{
                  console.log(post)
                  return(
<div className={i != 7 ? "bordered" : "noborder"}>
                  <div className="orderrendergrid">
                    <div className="ordertext">{i + index}</div>
                    <div className="ordertext">{post.order_id}</div>
                    <div className="ordertext">
                      {" "}
                      <NumberFormat
                        value={post.order_total}
                        prefix="Rp. "
                        decimalSeparator="."
                        thousandSeparator=","
                        displayType="text"
                      />
                    </div>
                    <div className="status">
             
                      {post.order_status == 1 ? (
                        <div className="pending">PENDING</div>
                      ) : post.order_status == 2 ? (
                        <div className="orderplaced">ORDER PLACED</div>
                      ) : post.order_status == 3 ? (
                        <div className="served">SERVED</div>
                      ) : post.order_status == 4 ? (
                        <div className="payment">PAYMENT</div>
                      ): post.order_status == 5 ? (
                        <div className="complete">COMPLETE</div>
                      ) : post.order_status == 6 ? (
                        <div className="rejected">REJECTED</div>
                      ) : null}
                    </div>
                    <div className="ordertext">
                      {moment(post.order_time).fromNow()}
                    </div>
                    <div className="ordertablenumber">{post.order_table}</div>
                    <div className="acceptreject">
                      {post.order_status == 1 ? (
                        <div className="proceed">PROCEED</div>
                      ) : post.order_status == 2 ? (
                        <div className="proceed">PROCEED</div>
                      ) : post.order_status == 3 ? (
                        <div className="proceed">SERVE</div>
                      ) : post.order_status == 4 ? (
                        <div className=" proceed">COMPLETE</div>
                      ) : post.order_status == 5 ? (
                        <div className=" completed">COMPLETED</div>
                      ) : post.order_status == 6 ? (
                        <div className=" completedR">COMPLETED</div>
                      ) : null}
                    </div>
                    <div className="vieworder">
                      <button
                        className="vieworderbutton"
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
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                  )

                })

                
            })}
          </div>
          </div>
        </div>
        <div className="footer">
            <TablePagination
              colSpan={3}
              count={orderData[0].length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
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
          <ThreeDots color={tenant.profileColor} height={80} width={80} />
        </div>
      )}
     
     
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(OrderPage);
