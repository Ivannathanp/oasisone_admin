import React, { useState } from "react";
import "../TopBar.css";
import "./TablesPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Customer from "../../icons/Customer.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faCalendar,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import NumberFormat from "react-number-format";
import recommended from "../../icons/Recommend.png";

function TablesPage() {
  const TableData = [
    {
      id: 1,
      table_ID: 1,
      name: "T1",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 2,
      table_ID: 2,
      name: "T2",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 3,
      table_ID: 3,
      name: "T3",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 4,
      table_ID: 4,
      name: "T4",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 5,
      table_ID: 5,
      name: "T5",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 6,
      table_ID: 6,
      name: "T6",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 7,
      table_ID: 7,
      name: "T7",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 8,
      table_ID: 8,
      name: "T8",
      time_start: "11:00",
      time_end: "11:30",
      customer: 0,
    },
    {
      id: 9,
      table_ID: 9,
      name: "T9",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 10,
      table_ID: 10,
      name: "T10",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 11,
      table_ID: 11,
      name: "T11",
      time_start: "11:00",
      time_end: "11:30",
      customer: 0,
    },
    {
      id: 12,
      table_ID: 12,
      name: "T12",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 13,
      table_ID: 13,
      name: "T13",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
    {
      id: 14,
      table_ID: 14,
      name: "T14",
      time_start: "11:00",
      time_end: "11:30",
      customer: 4,
    },
    {
      id: 15,
      table_ID: 15,
      name: "T15",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
    },
  ];
  const [tableOrderOpen, setTableOrderOpen] = useState(false);
  const handleTableOrderOpen = () =>
    setTableOrderOpen(true, console.log("clicked"));
  const handleTableOrderClose = () => setTableOrderOpen(false);

  const [tableOpen, setTableOpen] = useState(false);
  const handleTableOpen = () => setTableOpen(true, console.log("clicked"));
  const handleTableClose = () => setTableOpen(false);

  const [tableWaiterOpen, setTableWaiterOpen] = useState(true);
  const handleTableWaiterOpen = () =>
    setTableWaiterOpen(true, console.log("clicked"));
  const handleTableWaiterClose = () => setTableWaiterOpen(false);

  const [restaurantname, setRestaurantname] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instruction, setInstruction] = useState("");
  const [table, setTable] = useState("");
  const [orderitems, setOrderitems] = useState([]);
  const [itemtotal, setItemtotal] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [service, setService] = useState("");
  const [tax, setTax] = useState("");

  function handlePassinginfo(
    status,
    name,
    phone,
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
    setName(name);
    setPhone(phone);
    setInstruction(instruction);
    setTable(table);
    setOrderitems(orderitems);
    setItemtotal(itemtotal);
    setSubtotal(subtotal);
    setService(service);
    setTax(tax);
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Tables</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={logo} className="image" />
          </div>
          <div className="text">Telaga Seafood</div>
        </div>
      </div>

      <Modal open={tableOrderOpen}>
        <Box className="ordermodalbox">
          <div className="innermodalbox">
            <div className="ordermodalclose">
              <button
                className="ordermodalclosebutton"
                onClick={handleTableOrderClose}
              >
                <FontAwesomeIcon
                  className="closebuttonicon"
                  icon={faCircleXmark}
                />
              </button>
            </div>
            <div className="ordermodaltitle">Telaga Seafood</div>
            <div className="ordermodalsubtitle">
              <div className="ordermodaldate">
                <div className="ordertime">
                  <FontAwesomeIcon className="timeicon" icon={faCalendar} />
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
                    <div className="processing">PROCESSING</div>
                  ) : status == 3 ? (
                    <div className="ready">READY</div>
                  ) : status == 4 ? (
                    <div className="rejected">REJECTED</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="ordermodalitems">
              <div className="ordermodalform">
                <div className="ordermodalinputlabel">Name</div>
                <input
                  type="text"
                  value={name}
                  className="ordermodalinputfile"
                />
                <div className="ordermodalinputlabel">Phone Number</div>
                <input
                  type="text"
                  value={phone}
                  className="ordermodalinputfile"
                />
                <div className="ordermodalinputlabel">Special Instructions</div>
                <input
                  type="text"
                  value={instruction}
                  className="ordermodalinputfile"
                />
                <div className="ordermodalinputlabel">Table</div>
                <input
                  type="text"
                  value={table}
                  className="ordermodalinputfile"
                />
              </div>

              <div className="ordermenuitemcontainer">
                <div className="ordermenutitle">Order Items</div>
                <div className="ordermenuitem">
                  {orderitems.map((post, index) => (
                    <div className="ordermenucontainer">
                      <div className="ordermenuimagecontainer">
                        <img
                          src={
                            require("../../icons/Gurame Asam Manis.png").default
                          }
                          className="menuimage"
                        />
                      </div>
                      <div className="orderdetailsmenutext">
                        <div className="orderdetailsmenutitle">{post.name}</div>
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

      <div className="tablescontainer">
        <div className="tablecontainergrid">
          {TableData.map((post) => {
            if (post.customer === 0) {
              return (
                <button className="tabledetails" onClick={handleTableOrderOpen}>
                  <div className="tablenumberempty">{post.name}</div>
                  <div className="center">
                    <div className="tablecustomer">Empty</div>
                  </div>
                </button>
              );
            } else {
              return (
                <button
                  className="tabledetailsactive"
                  onClick={handleTableOrderOpen}
                >
                  <div className="tablenumberactive">{post.name}</div>
                  <div className="center">
                    <div className="imagecenter">
                      <img src={Customer} className="customerimage" />
                    </div>
                    <div className="tablecustomeractive">
                      {post.customer} Customer
                    </div>
                  </div>
                  <div className="time">
                    <div className="tabletimestart">{post.time_start}</div>
                    <div className="tabletimeend">{post.time_end}</div>
                  </div>
                </button>
              );
            }
          })}
        </div>

        <Modal open={tableOpen}>
          <Box className="tablemodalbox">
            <div className="tablemodaltitle">Duplicate Table</div>
            <div className="">Select the table</div>
            <div className="tableselectorcontainer">
              <div className="tableselector1"></div>
              <div className=""> {">"} </div>
              <div className="tableselector2"></div>
            </div>
            <div className="modalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
                  onClick={handleTableClose}
                >
                  cancel
                </button>
              </div>
              <div>
                <button
                  className="modalconfirmbutton"
                  onClick={(handleTableClose, console.log("pressed"))}
                >
                  confirm
                </button>
              </div>
            </div>
          </Box>
        </Modal>

        <div className="tablebuttoncontainer">
          <div className="buttonoutercontainer">
            <button className="tablebutton">+ Add New Table</button>
          </div>
          <div className="buttonoutercontainer">
            <button className="tablebutton" onClick={handleTableOpen}>
              Duplicate Table
            </button>
          </div>
          <div className="buttonoutercontainer">
            <button className="tablebutton">Remove Table</button>
          </div>
          <div className="buttonoutercontainer">
            <button className="tablebutton">Save Table</button>
          </div>
        </div>
      </div>

      <Modal open={tableWaiterOpen}>
        <Box className="tablemodalbox">
          <div className="ordermodalclose">
            <button
              className="ordermodalclosebutton"
              onClick={handleTableOrderClose}
            >
              <FontAwesomeIcon
                className="closebuttonicon"
                icon={faCircleXmark}
              />
            </button>
          </div>
          <div className="tablemodaltitle">Waiter Table</div>
          <div className="sideattributes">
            <div className="leftsidetexts">
              <div className="modaltexts">Name</div>
              <div className="modaltexts">Phone Number</div>
            </div>
            <div className="rightsidetexts">
              <div className="boldmodaltexts">Chris</div>
              <div className="boldmodaltexts">089638303065</div>
            </div>
          </div>
          <div className="tableselectorcontainer">
            <div className="modaltexts">Special Instructions (optional)</div>
            <div className="tableselector2"></div>
          </div>

          <div>
            <button className="modalcancelbutton" onClick={handleTableClose}>
              cancel
            </button>
          </div>
          <div>
            <button
              className="modalconfirmbutton"
              onClick={(handleTableClose, console.log("pressed"))}
            >
              confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TablesPage;
