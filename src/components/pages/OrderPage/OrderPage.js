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
<<<<<<< HEAD



function OrderPage({ tenant }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
=======
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

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

<<<<<<< HEAD
  const [restaurantname, setRestaurantname] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [customername, setCustomerName] = useState("");
  const [customerphone, setCustomerPhone] = useState("");
  const [instruction, setInstruction] = useState("");
  const [table, setTable] = useState("");
  const [orderitems, setOrderitems] = useState([]);
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


  function handlePassinginfo(
    status,
    customername,
    customerphone,
    instruction,
    table,
    orderitems,
    itemtotal,
    subtotal,
    service,
    tax
  ) {
    //setRestaurantname(restaurant)
    //setTime(time)
    //setDate(date)
    setStatus(status);
    setCustomerName(customername);
    setCustomerPhone(customerphone);
    setInstruction(instruction);
    setTable(table);
    setOrderitems(orderitems);
    setItemtotal(itemtotal);
    setSubtotal(subtotal);
    setService(service);
    setTax(tax);
=======
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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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

<<<<<<< HEAD
  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

  const OrderData = [
    {
      id: 1,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 220000,
      status: 1,
      orderplaced: 30,
      accepted: 1,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
        {
          id: 3,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 4,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 4,
    },
    {
      id: 2,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 3,
      orderplaced: 30,
      accepted: 4,
      customername: "John",
      customerphone: "0899872679",
      instruction: "no sambal",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 3,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 2,
      orderplaced: 30,
      accepted: 2,
      customername: "Angel",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 4,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 1,
      orderplaced: 30,
      accepted: 1,
      customername: "Jesslyn",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 5,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 2,
      orderplaced: 30,
      accepted: 2,
      customername: "Lina",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 6,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 4,
      orderplaced: 30,
      accepted: 3,
      customername: "Ivan",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 7,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 5,
      orderplaced: 30,
      accepted: 4,
      customername: "Farah",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 8,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 1,
      orderplaced: 30,
      accepted: 1,
      customername: "Pia",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 9,
      order_ID: "ODR - 1629840586",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 1,
      orderplaced: 30,
      accepted: 1,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 10,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 4,
      orderplaced: 30,
      accepted: 3,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 11,
      order_ID: "ODR - 1629841588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 3,
      orderplaced: 30,
      accepted: 4,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 12,
      order_ID: "ODR - 1619840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 2,
      orderplaced: 30,
      accepted: 2,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 13,
      order_ID: "ODR - 1629840558",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 1,
      orderplaced: 30,
      accepted: 1,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 14,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 3,
      orderplaced: 30,
      accepted: 4,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 15,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 2,
      orderplaced: 30,
      accepted: 2,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
    {
      id: 16,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
      totalprice: 110000,
      status: 1,
      orderplaced: 30,
      accepted: 1,
      customername: "Chris",
      customerphone: "0899872679",
      instruction: "no onions",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      totalitems: 2,
    },
  ];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - OrderData.length) : 0;
=======
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ordertime = new Date(orderTime);

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Orders</div>

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

{orderRetrieved? ( <div className="ordercontainer">
        <div className="outerordertable">
          <div className="ordertable">
          <div className="orderheader">
            <div className="orderleft">All Orders</div>
            <div className="orderright">
              <button className="downloadbutton" onClick={generatePdf}>
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
              <Box className="ordermodalbox">
                <div className="modalclose">
                  <button
                    className="modalclosebutton"
<<<<<<< HEAD
                    onClick={handleOrderclose}
=======
                    onClick={() => setOrderOpen(false)}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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
<<<<<<< HEAD
                        ) : status == 2 ? (
                          <div className="ready">READY TO SERVE</div>
                        ) : status == 3 ? (
                          <div className="rejected">REJECTED</div>
                        ) : status == 4 ? (
                          <div className="payment">PAYMENT</div>
                        ) : status == 5 ? (
                          <div className="complete">COMPLETE</div>
=======
                        ) : orderStatus == 3 ? (
                          <div className="served">SERVED</div>
                        ) : orderStatus == 4 ? (
                          <div className="complete">COMPLETE</div>
                        ) : orderStatus == 5 ? (
                          <div className="modalrejectedstatus">REJECTED</div>
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="ordermodalitems">
                    <div className="ordermodalform">
<<<<<<< HEAD
                      <form onSubmit={handleSubmit}>
=======
                      <form>
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                        <div className="ordermodalinputlabel">
                          Name <span style={{ color: "#E52C32" }}>*</span>
                        </div>
                        <input
                          type="text"
<<<<<<< HEAD
                          value={customername}
=======
                          value={userName}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                          className="ordermodalinputfile"
                          disabled={true}
                        />
                        <div className="ordermodalinputlabel">
                          Phone Number
                          <span style={{ color: "#E52C32" }}>*</span>
                        </div>
                        <input
                          type="text"
<<<<<<< HEAD
                          value={customerphone}
=======
                          value={userPhonenumber}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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
<<<<<<< HEAD
                              <img src={post.uri} className="menuimage" />
=======
                              <img src={post.menuImage} className="menuimage" />
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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

<<<<<<< HEAD
            {(rowsPerPage > 0
              ? OrderData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : OrderData
            ).map((post, i) => (
              <div className={i != 7 ? "bordered" : "noborder"}>
                <div className="orderrendergrid">
                  <div className="ordertext">{i + index}</div>
                  <div className="ordertext">{post.order_ID}</div>
                  <div className="ordertext">
                    {" "}
                    <NumberFormat
                      value={post.totalprice}
                      prefix="RP. "
                      decimalSeparator="."
                      thousandSeparator=","
                      displayType="text"
                    />
                  </div>
                  <div className="status">
                    {" "}
                    {post.status == 1 ? (
                      <div className="orderplaced">ORDER PLACED</div>
                    ) : post.status == 2 ? (
                      <div className="ready">READY TO SERVE</div>
                    ) : post.status == 3 ? (
                      <div className="rejected">REJECTED</div>
                    ) : post.status == 4 ? (
                      <div className="payment">PAYMENT</div>
                    ) : post.status == 5 ? (
                      <div className="complete">COMPLETE</div>
                    ) : null}
                  </div>
                  <div className="ordertext">
                    {post.orderplaced} minutes ago
                  </div>
                  <div className="ordertablenumber">{post.table_ID}</div>
                  <div className="acceptreject">
                    {post.accepted == 1 ? (
                      <div className="proceed">PROCEED</div>
                    ) : post.accepted == 2 ? (
                      <div className="serve">SERVE</div>
                    ) : post.accepted == 3 ? (
                      <div className="serve">COMPLETE</div>
                    ) : post.accepted == 4 ? (
                      post.status == 3 ? (
                        <div className="completedR">COMPLETED</div>
                      ) : (
                        <div className="completed">COMPLETED</div>
                      )
                    ) : null}
                  </div>
                  <div className="vieworder">
                    <button
                      className="vieworderbutton"
                      onClick={() => {
                        handleOrderopen();
                        handlePassinginfo(
                          post.status,
                          post.customername,
                          post.customerphone,

                          post.instruction,
                          post.table_ID,
                          post.menu,
                          post.totalitems,
                          post.totalprice,
                          post.servicecharge,
                          post.tax
                        );
                      }}
                    >
                      View Order
                    </button>
=======
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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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
          <ThreeDots color="#f10c0c" height={80} width={80} />
        </div>
<<<<<<< HEAD
      </div>
=======
      )}
     
     
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(OrderPage);
