import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TablePagination from "../../Pagination/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faCalendar,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "../TopBar.css";
import "./OrderPage.css";
import logo from "../../icons/Logo.png";
import NumberFormat from "react-number-format";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import recommended from "../../icons/Recommend.png";
import { connect } from "react-redux";
import { jsPDF } from 'jspdf'

function OrderPage({ tenant }) {

  const generatePdf = () => {
 
    const doc = new jsPDF('p', 'pt');
 
    // doc.text(20, 20, 'This is the first page title.')
 
    // doc.setFont('helvetica')
    // doc.setFontType('normal')
    // doc.text(20, 60, 'This is the content area.')
    // doc.addPage() // this code creates new page in pdf document
    // doc.setFont('helvetica')
    // doc.setFontType('normal')
    // doc.text(20, 100, 'This is the second page.')
 
 
    // doc.save('sample-file.pdf')
    doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");
  }
 

  const localUrl = process.env.tenantUrl;

  const [page, setPage] = useState(0);
  const rowsPerPage = 7;

  const [formValues, setFormValues] = useState("");
  const [orderopen, setOrderopen] = useState(false);
  const handleOrderopen = () => setOrderopen(true, console.log("clicked"));
  const handleOrderclose = () => setOrderopen(false);

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
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Orders</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <div className="ordercontainer">
        <div className="ordertable">
          <div className="orderheader">
            <div className="orderleft">All Orders</div>
            <div className="orderright">
              <button className="downloadbutton" onClick={generatePdf}>Download as PDF</button>
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
            <Modal open={orderopen}>
              <Box className="ordermodalbox">
                <div className="modalclose">
                  <button
                    className="modalclosebutton"
                    onClick={handleOrderclose}
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
                        <FontAwesomeIcon
                          className="timeicon"
                          icon={faCalendar}
                        />
                        11:23:39 am <span className="space">/</span>{" "}
                        <span className="orderdate">Aug 25 2021</span>
                      </div>
                    </div>

                    <div className="ordermodalstatus">
                      <div className="statustext">STATUS</div>
                      <div className="statuscoloredtext">
                        {status == 1 ? (
                          <div className="orderplaced">ORDER PLACED</div>
                        ) : status == 2 ? (
                          <div className="ready">SERVED</div>
                        ) : status == 3 ? (
                          <div className="rejected">REJECTED</div>
                        ) : status == 4 ? (
                          <div className="payment">PAYMENT</div>
                        ) : status == 5 ? (
                          <div className="complete">COMPLETE</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="ordermodalitems">
                    <div className="ordermodalform">
                      <form onSubmit={handleSubmit}>
                        <div className="ordermodalinputlabel">
                          Name <span style={{ color: "#E52C32" }}>*</span>
                        </div>
                        <input
                          type="text"
                          value={customername}
                          className="ordermodalinputfile"
                          onChange={handleChange}
                        />
                        <div className="ordermodalinputlabel">
                          Phone Number
                          <span style={{ color: "#E52C32" }}>*</span>
                        </div>
                        <input
                          type="text"
                          value={customerphone}
                          className="ordermodalinputfile"
                          onChange={handleChange}
                        />
                        <div className="ordermodalinputlabel">
                          Special Instructions
                        </div>
                        <input
                          type="text"
                          value={instruction}
                          className="ordermodalinputfile"
                          onChange={handleChange}
                        />
                        <div className="ordermodalinputlabel">Table</div>
                        <input
                          type="text"
                          value={table}
                          className="ordermodalinputfile"
                          onChange={handleChange}
                        />
                        {status == 3 ? (
                          <>
                            {" "}
                            <div className="ordermodalinputlabel">
                              Reasons for rejecting
                            </div>
                            <div className="rejectreasontext">
                              Consumer asks to be cancelled
                            </div>
                          </>
                        ) : (
                          null
                        )}
                      </form>
                    </div>

                    <div className="ordermenuitemcontainer">
                      <div className="ordermenutitle">Order Items</div>
                      <div className="ordermenuitem">
                        {orderitems.map((post, index) => (
                          <div className="ordermenucontainer">
                            <div className="ordermenuimagecontainer">
                              <img src={post.uri} className="menuimage" />
                            </div>
                            <div className="orderdetailsmenutext">
                              <div className="orderdetailsmenutitle">
                                {post.name}
                              </div>
                              <div className="recommended">
                                {post.recommended === true ? (
                                  <img src={recommended} />
                                ) : null}
                              </div>
                              <div className="orderdetailmenuprice">
                                <NumberFormat
                                  value={post.price}
                                  prefix="RP. "
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
                          <div className="righttext">{itemtotal}</div>
                        </div>

                        <div className="ordertotalitems">
                          <div className="lefttext">Subtotal:</div>
                          <div className="righttext">
                            <NumberFormat
                              value={subtotal}
                              prefix="RP. "
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
                              value={2000}
                              prefix="RP. "
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
                              value={1000}
                              prefix="RP. "
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
                      <div className="ready">Served</div>
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
                    {post.status == 1 ? (
                      <div className="proceed">PROCEED</div>
                    ) : post.status == 2 ? (
                      <div className="serve">SERVE</div>
                    ) : post.status == 3 ? (
                      <div className="completedR">COMPLETED</div>
                    ) : post.status == 4 ? (
                      <div className=" serve">COMPLETE</div>
                    ) : post.status == 5 ? (
                      <div className=" completed">COMPLETED</div>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="footer">
            <TablePagination
              colSpan={3}
              count={OrderData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(OrderPage);
