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
import "./CustomerPage.css";
import logo from "../../icons/Logo.png";
import NumberFormat from "react-number-format";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <div className="containerbutton">
      <button
        onClick={handleBackButtonClick}
        disabled={page === 0}
        className={page === 0 ? "leftdisabledbutton" : "leftdisplaybutton"}
      >
        {" "}
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / 8) - 1}
        className={
          page >= Math.ceil(count / 8) - 1
            ? "rightdisabledbutton"
            : "rightdisplaybutton"
        }
      >
        <FontAwesomeIcon icon={faAngleRight} />
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

function CustomerPage() {
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  const [formValues, setFormValues] = useState("");
  const [customeropen, setcustomeropen] = useState(false);
  const handlecustomeropen = () => setcustomeropen(true, console.log ('clicked'));
  const handlecustomerclose = () => setcustomeropen(false);

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

const CustomerData = [
  {
    id:1,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 1,
  },
  {
    id:2,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 1,
  },
  {
    id:3,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:4,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:5,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:6,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:7,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:8,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:9,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
  {
    id:10,
    name: "Chris",
    phone: "089998983929",
    lastcustomer: "28 October 2021, 10:21 AM",
    status: 2,
  },
]


  function handlePassinginfo(
    status,
    name,
    phone,
    instruction,
    table,
    customeritems,
    itemtotal,
    subtotal
  ) {
    //setRestaurantname(restaurant)
    //setTime(time)
    //setDate(date)
    setStatus(status)
    setName(name)
    setPhone(phone)
    setInstruction(instruction)
    setTable(table)
    setcustomeritems(customeritems)
    setItemtotal(itemtotal)
    setSubtotal(subtotal)
    console.log(customeritems)
    //setService(service)
    //setTax(tax)
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CustomerData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Customer</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={logo} className="image" />
          </div>
          <div className="text">Telaga Seafood</div>
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
            <div className="customerheadertitle">PHONENUMBER</div>
            <div className="customerheadertitle">LASTcustomer</div>
            <div className="customerheadertitle">STATUS</div>
          </div>

          <div className="customerrendercontainer">
    
            {(rowsPerPage > 0
              ? CustomerData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : CustomerData
            ).map((post, index) => (
              <div className={index != 7 ? "bordered" : "noborder"}>
                <div className="customerrendergrid">
                  <div className="customertext">{post.id}</div>
                  <div className="customertext">{post.name}</div>
                  <div className="customertext">{post.phone}
                   
                  </div>
                  <div className="customertext">{post.lastcustomer}
                   
                   </div>
                  <div className="status">
                    {" "}
                    {post.status == 1 ? (
                      <div className="atrestaurant">AT RESTAURANT</div>
                    ) : post.status == 2 ? (
                      <div className="notinrestaurant">NOT IN RESTAURANT</div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="footer">
            <TablePagination
              colSpan={3}
              count={CustomerData.length}
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

export default CustomerPage;
