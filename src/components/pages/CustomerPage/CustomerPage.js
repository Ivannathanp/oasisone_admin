import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TablePagination from "../../Pagination/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "../TopBar/TopBar.css";
import "./CustomerPage.css";
import logo from "../../icons/Logo.png";
import NumberFormat from "react-number-format";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
<<<<<<< HEAD



function CustomerPage({tenant}) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
=======
import TopBar from "../TopBar/TopBar";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

function CustomerPage({ tenant }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const [index, setIndex] = useState(1);
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

  const localUrl = process.env.REACT_APP_ORDERURL;
  const [orderData, setOrderData] = useState([]);
  const [orderRetrieved, setOrderRetrieved] = useState(false);

<<<<<<< HEAD
  const [restaurantname, setRestaurantname] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instruction, setInstruction] = useState("");
  const [table, setTable] = useState("");
  const [customeritems, setcustomeritems] = useState([]);
  const [itemtotal, setItemtotal] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [service, setService] = useState("");
  const [tax, setTax] = useState("");
  const [index, setIndex] = useState(1);


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
          <FontAwesomeIcon icon={faAngleLeft} style={page === 0? {color: "#BEBEBE"} : {color: "#949494"}}/>
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
          <FontAwesomeIcon icon={faAngleRight} style={page >= Math.ceil(count / 7) - 1? {color: "#BEBEBE"} : {color: "#949494"}}/>
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

const CustomerData = [
  {
    id:1,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 1,
  },
  {
    id:2,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 1,
  },
  {
    id:3,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:4,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:5,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:6,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:7,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:8,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:9,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:10,
    customername: "Chris",
    customerphone: "089998983929",
    lastorder: "28 October 2021, 10:21 AM",
    status: 2,
  },
]
=======
  // Get Order Data
  useEffect(() => {
    let mounted = true;
    console.log("called");

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = localUrl + "/retrieve/" + tenant.tenant_id;
        console.log(url);
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

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

  const generatePdf = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "No",
      "Customer Name",
      "Customer Phonenumber",
      "Last Order Placed",
    ];
    const tableRows = [];
    orderData.map((post, index) => {
      const dateOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const ordertime = new Date(post.order_time);
      const OrderData = [
        index + 1,

        post.user_name,
        post.user_phonenumber,

        ordertime.toLocaleDateString("en-ID", dateOptions),
      ];
      // push each tickcet's info into a row
      tableRows.push(OrderData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date();
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.text(`${tenant.name} Customer Report.`, 14, 15);
    // we define the name of our PDF file.
    doc.save(`${tenant.name}_customerreport.pdf`);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Customer</div>

<<<<<<< HEAD
        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <div className="customercontainer">
        <div className="customertable">
          <div className="customerheader">
            <div className="customerleft">All Customer</div>
            <div className="customerright">
              <button className="downloadbutton">Download as PDF</button>
            </div>
          </div>
          <div className="customerheadertitlegrid">
            <div className="customerheadertitle">NO</div>
            <div className="customerheadertitle">NAME</div>
            <div className="customerheadertitle">PHONE NUMBER</div>
            <div className="customerheadertitle">LAST ORDER</div>
            <div className="customerheadertitle">STATUS</div>
          </div>

          <div className="customerrendercontainer">
    
            {(rowsPerPage > 0
              ? CustomerData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : CustomerData
            ).map((post, i) => (
              <div className={i != 7 ? "bordered" : "noborder"}>
                <div className="customerrendergrid">
                  <div className="customertext">{i + index}</div>
                  <div className="customertext">{post.customername}</div>
                  <div className="customertext">{post.customerphone}
                   
                  </div>
                  <div className="customertext">{post.lastorder}
                   
                   </div>
                  <div className="status">
                    {" "}
                    {post.status == 1 ? (
                      <div className="atrestaurant">At restaurant</div>
                    ) : post.status == 2 ? (
                      <div className="notinrestaurant">Not in here</div>
                    ) : null}
                  </div>
=======
        <TopBar />
      </div>

      {orderRetrieved ? (
        <div className="customercontainer">
          <div className="outercustomertable">
            <div className="customertable">
              <div className="customerheader">
                <div className="customerleft">All Customer</div>
                <div className="customerright">
                  <button className="downloadbutton" onClick={generatePdf}>
                    Download as PDF{" "}
                  </button>
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                </div>
              </div>
              <div className="customerheadertitlegrid">
                <div className="customerheadertitle">NO</div>
                <div className="customerheadertitle">NAME</div>
                <div className="customerheadertitle">PHONE NUMBER</div>
                <div className="customerheadertitle">LAST ORDER</div>
              </div>

              <div className="customerrendercontainer">
                {(rowsPerPage > 0
                  ? orderData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : orderData
                ).map((post, i) => {
                  const orderDate = new Date(post.order_time);
                  console.log(
                    "slice",
                    orderData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  );
                  return (
                    <div className={i != 7 ? "bordered" : "noborder"}>
                      <div className="customerrendergrid">
                        <div className="customertext">{i + index}</div>
                        <div className="customertext">{post.user_name}</div>
                        <div className="customertext">
                          {post.user_phonenumber}
                        </div>
                        <div className="customertext">
                          {orderDate.toLocaleDateString("en-ID", dateOptions)} |{" "}
                          {moment(post.order_time).fromNow()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="footer">
            <TablePagination
              colSpan={3}
              count={orderData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
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

<<<<<<< HEAD
const mapStateToProps = ({session}) => ({
  tenant: session.user
})
=======
const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

export default connect(mapStateToProps)(CustomerPage);
