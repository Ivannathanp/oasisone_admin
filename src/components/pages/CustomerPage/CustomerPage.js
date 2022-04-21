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
import { connect } from "react-redux";



function CustomerPage({tenant}) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;

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

const mapStateToProps = ({session}) => ({
  tenant: session.user
})

export default connect(mapStateToProps)(CustomerPage);
