import React, { useState, useEffect, useContext } from "react";
import "../TopBar/TopBar.css";
import "./TablesPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Customer from "../../icons/Customer.png";
import Waitercall from "../../icons/waitercall.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faCalendar,
  faXmark,
  faRightLong,
  faListSquares,
} from "@fortawesome/free-solid-svg-icons";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import NumberFormat from "react-number-format";
import recommended from "../../icons/Recommend.png";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { useOutlineSelectStyles } from "./select/index";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

function TablesPage({ tenant }) {

  const localUrl = process.env.REACT_APP_TABLEURL;
  const [tableData, setTableData] = useState([]);
  const [tableRetrieved, setTableRetrieved] = useState(false);

  // socket connection
  const socket = useContext(SocketContext);

  // Get Table Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = localUrl + "/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTableData([result.data]);
              setTableRetrieved(() => true);
            } else {
              setTableRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tenant, tableRetrieved]);

console.log("table data: ", tableData)

useEffect(() => {
    if (socket) {
      socket.on('add table', (data)=>handleTableAdded(data));
      socket.on('add order', (data)=>handleOrderAdded(data));
      socket.on('delete table', (data)=>handleDeleteTable(data));
      socket.on('remove table', (data)=>handleRemoveTable(data));
      socket.on('duplicate table', (data)=>handleDuplicateTable(data));
      socket.on('add waiter call', (data) => handlCallTable(data));
      socket.on('remove waiter call', (data) => handlCallTable(data));
      console.log("I am table socket",        socket.on('delete table', (data)=>handleDeleteTable(data)));
    }
  });

  function handleTableAdded(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", tableData);

    if (tableRetrieved) {
      console.log("I am table retrieved!!!!!!!!!!!!!", user)
    
      let newData = tableData.splice();
 
      newData.push(user);
      setTableData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", tableData)
     
    }
  }

  function handleOrderAdded(){
    if (tableRetrieved) {

    
  
      const url = localUrl + "/" + tenant.tenant_id;

      fetch(url, {
        method: "GET",
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            setTableData([result.data]);
            setTableRetrieved(() => true);
          } else {
            setTableRetrieved(() => false);
          }
        });
  
    
      console.log("NEW Table DATA IS!!!!!!!!!: ");
  
     
      }
    
  }

  function handleDeleteTable(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", tableData);

    if (tableRetrieved) {
     console.log("I am table retrieved!!!!!!!!!!!!!", user)
    
     let newData = tableData.splice();
 
     newData.push(user);
     setTableData(newData);
     console.log("NEW DATA IS!!!!!!!!!: ", newData);
     console.log("...user is", tableData)
  }
  }

  function handleRemoveTable(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", tableData);

    if (tableRetrieved) {
     console.log("I am table retrieved!!!!!!!!!!!!!", user)
    
     let newData = tableData.splice();
 
     newData.push(user);
     setTableData(newData);
     console.log("NEW DATA IS!!!!!!!!!: ", newData);
     console.log("...user is", tableData)
  }
  }

  function handleDuplicateTable(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", tableData);

    if (tableRetrieved) {
     console.log("I am table retrieved!!!!!!!!!!!!!", user)
    
     let newData = tableData.splice();
 
     newData.push(user);
     setTableData(newData);
     console.log("NEW DATA IS!!!!!!!!!: ", newData);
     console.log("...user is", tableData)
  }
  }

  function handlCallTable(user) {
    const url = localUrl + "/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTableData([result.data]);
              setTableRetrieved(() => true);
            } else {
              setTableRetrieved(() => false);
            }
          });
  }

  const orderUrl = process.env.REACT_APP_ORDERURL;
  const [tableOrderData, setTableOrderData] = useState([]);
  const [tableOrderRetrieved, setTableOrderRetrieved] = useState(false);

  const waiterUrl = process.env.REACT_APP_WAITERURL;
  const [waiterData, setWaiterData] = useState([]);
  const [waiterDataRetrieved, setWaiterDataRetrieved] = useState(false);

  const [tableOrderOpen, setTableOrderOpen] = useState(false);
  const [tableNoOrderOpen, setTableNoOrderOpen] = useState(false);
  const [duplicatetableOpen, setDuplicateTableOpen] = useState(false);
  const [tableWaiterOpen, setTableWaiterOpen] = useState(false);
  const [removetableOpen, setRemoveTableOpen] = useState(false);

  const [tableid, setTableID] = useState("");
  const [customername, setCustomerName] = useState("");
  const [customerphone, setCustomerPhone] = useState("");
  const [waiterinstruction, setWaiterInstruction] = useState("");

  //select drop down
  const outlineSelectClasses = useOutlineSelectStyles();

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: outlineSelectClasses.paper,
      list: outlineSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon
        className={props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

  const [startval, setStartVal] = useState();
  const [endval, setEndVal] = useState();
const [tableIndex, setTableIndex] = useState();
  const [removeval, setRemoveVal] = useState();

  const [edittable, setEditTable] = useState(false);

  async function handlePassinginfo(i) {
    const url = orderUrl + "/table/retrieve/" + tenant.tenant_id;
    const payload = JSON.stringify({
      order_id: i,
    });
    await fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          setTableOrderData(() => result.data);

          setTableOrderRetrieved(() => true);
        } else {
          setTableOrderRetrieved(() => false);
        }
      });
  }

  console.log(tableOrderData);

  async function handlepasswaiterinfo(table) {

    const url = waiterUrl + "/retrieve/" + tenant.tenant_id;
    console.log(url);
    const payload = JSON.stringify({
      order_table: table,
    });
    console.log(payload);
    await fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          setWaiterData([result.data]);
         
          setWaiterDataRetrieved(() => true);
        } else {
          setWaiterDataRetrieved(() => false);
        }
      });
  }

  console.log(waiterData);

  async function handleCloseWaiter(table) {
    setTableIndex();

    const url = waiterUrl + "/remove/" + tenant.tenant_id;
    const payload = JSON.stringify({
      order_table: table,
    });
    await fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        socket.emit('remove waiter call', result.data);
        setTableData([result.data])
      });
  }

  async function handleaddtable() {
    setAddTableNotif(true);
    setTimeout(() => {
      setAddTableNotif(false);
    }, 5000);

    const url = localUrl + "/create/" + tenant.tenant_id;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
      
          console.log("ttable is", result.data);
          socket.emit('add table', result.data);
          setTableData([result.data]);
          console.log("SOCKET IS EMITTED!!!!!!!!!", socket.on('add table', result))
      });
  }

  function handleedittable() {
    setEditTable(true);
  }

  function handlesavetable() {
    setTableSavedNotif(true);
    setTimeout(() => {
      setTableSavedNotif(false);
    }, 3000);
    setEditTable(false);
  }

  const [deletetabletext, setDeleteTableText] = useState();
  async function handledeletetable(a, b) {
    setRemoveTableNotif(true);
    setDeleteTableText(a);
    setTimeout(() => {
      setRemoveTableNotif(false);
    }, 3000);

    const url = localUrl + "/remove/" + tenant.tenant_id;
    const payload = JSON.stringify({
      table_id: b,
    });

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {

          console.log("Table deleted is:", result.data);
          socket.emit('delete table', result.data);
          setTableData([result.data]);
          console.log("SOCKET IS EMITTED!!!!!!!!!", socket.on('delete table', result))
        
      });
  }

  async function handleduplicatetable() {
    setDuplicateTableOpen(false);

    const url = localUrl + "/duplicate/" + tenant.tenant_id;
    const payload = JSON.stringify({
      or_table: startval,
      de_table: endval,
    });

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        
          console.log(result);
          setStartVal();
          setEndVal();
          socket.emit('duplicate table', result.data);
          setTableData([result.data]);
          console.log("SOCKET IS EMITTED!!!!!!!!!", socket.on('duplicate table', result))
         
      });
  }

  async function handleRemoveTableContent() {
    setRemoveTableOpen(false);

    {tableRetrieved == true &&
      tableData.map((post) => {
        return post.map((posts,index)=>{
          if (posts.table.id == removeval){
            const url = localUrl + "/remove/content/" + tenant.tenant_id;
            const payload = JSON.stringify({
              table_id: removeval,
              order_table: posts.table.index 
            });
            console.log("remove val is:", removeval)
            console.log("tableIndex val is:", posts.table.index)
            fetch(url, {
              method: "POST",
              body: payload,
              headers: { "content-type": "application/JSON" },
            })
              .then((response) => response.json())
              .then((result) => {
                
                  console.log(result.data);
                  setRemoveVal();
                  setTableIndex();
                   socket.emit('remove table', result.data);
                   setTableData([result.data]);
                   console.log("SOCKET IS EMITTED!!!!!!!!!", socket.on('remove table', result))
                
              });
           
          }
         
        })})}


   
  }

  const [addtablenotif, setAddTableNotif] = useState(false);
  const [removetablenotif, setRemoveTableNotif] = useState(false);
  const [tablecallnotif, setTableCallNotif] = useState(false);
  const [tablesavednotif, setTableSavedNotif] = useState(false);

  function handlenotification() {
    if (
      addtablenotif ||
      removetablenotif ||
      tablecallnotif ||
      tablesavednotif
    ) {
      setAddTableNotif(false);
      setRemoveTableNotif(false);
      setTableCallNotif(false);
      setTableSavedNotif(false);
    }
  }


  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Tables</div>

        <TopBar />
      </div>

     <Modal open={tableOrderOpen}>
        <Box className="ordermodalbox">
          {tableOrderRetrieved == true &&
            tableOrderData.map((post, index) => {
              const ordertime = new Date(post.order_time);
              const dateOptions = {
                year: "numeric",
                month: "short",
                day: "numeric",
              };

              return (
                <>
                  <div className="modalclose">
                    <button
                      className="modalclosebutton"
                      onClick={() => setTableOrderOpen(false)}
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
                            {ordertime.toLocaleDateString("en-ID", dateOptions)}
                          </span>
                        </div>
                      </div>

                      <div className="ordermodalstatus">
                        <div className="statustext">STATUS</div>
                        <div className="statuscoloredtext">
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
                      </div>
                    </div>
                    <div className="ordermodalitems">
                      <div className="ordermodalform">
                        <div className="ordermodalinputlabel">
                          Name <span style={{ color: "#E52C32" }}>*</span>
                        </div>
                        <input
                          type="text"
                          value={post.user_name}
                          className="ordermodalinputfile"
                        />
                        <div className="ordermodalinputlabel">
                          Phone Number
                          <span style={{ color: "#E52C32" }}>*</span>
                        </div>
                        <input
                          type="text"
                          value={post.user_phonenumber}
                          className="ordermodalinputfile"
                        />
                        <div className="ordermodalinputlabel">
                          Special Instructions
                        </div>
                        <input
                          type="text"
                          value={post.order_instruction}
                          className="ordermodalinputfile"
                        />
                        <div className="ordermodalinputlabel">Table</div>
                        <input
                          type="text"
                          value={post.order_table}
                          className="ordermodalinputfile"
                        />
                      </div>

                      <div className="ordermenuitemcontainer">
                        <div className="ordermenutitle">Order Items</div>
                        <div className="ordermenuitem">
                          {post.order_menu.map((posts, index) => (
                            <div className="ordermenucontainer">
                              <div className="ordermenuimagecontainer">
                                <img src={posts.menuImage} className="menuimage" />
                              </div>
                              <div className="orderdetailsmenutext">
                                <div className="orderdetailsmenutitle">
                                  {posts.name}
                                </div>
                                <div className="recommended">
                                  {posts.isRecommended === true ? (
                                    <img src={recommended} />
                                  ) : (
                                    "null"
                                  )}
                                </div>
                                <div className="orderdetailmenuprice">
                                  <NumberFormat
                                    value={posts.price}
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
                            <div className="righttext">{post.order_item}</div>
                          </div>

                          <div className="ordertotalitems">
                            <div className="lefttext">Subtotal:</div>
                            <div className="righttext">
                              <NumberFormat
                                value={post.order_total}
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
                                value={post.order_servicecharge}
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
                                value={post.order_taxcharge}
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
                </>
              );
            })}
        </Box>
      </Modal>

      <Modal open={tableNoOrderOpen}>
        <Box className="noordermodalbox">
          <>
            <div className="modalclose">
              <button
                className="modalclosebutton"
                onClick={() => setTableNoOrderOpen(false)}
              >
                <FontAwesomeIcon
                  className="closebuttonicon"
                  icon={faCircleXmark}
                />
              </button>
            </div>
            <div className="noinnermodalbox">
              <div className="noordertext">No orders has been made.</div>
            </div>
          </>
        </Box>
      </Modal>

      <Modal open={tableWaiterOpen}>
        <Box className="tablewaitermodalbox">
          {waiterDataRetrieved === true &&
            waiterData[0].map((post, index) => {
              console.log(post.waiter);
              return (
                <>
                  <div className="modalclose">
                    <button
                      className="modalclosebutton"
                      onClick={()=>{
                        setTableWaiterOpen(false);
                        setTableIndex();
                      }}
                    >
                      <FontAwesomeIcon
                        className="closebuttonicon"
                        icon={faCircleXmark}
                      />
                    </button>
                  </div>
                  <div className="tablewaitermodaltitle">T{tableIndex}</div>
                  <div className="sideattributes">
                    <div className="sidetexts">
                      <div className="modaltexts">Name</div>
                      <div className="modaltexts">Phone Number</div>
                      <div className="modaltexts">Number of Guess</div>
                    </div>
                    <div className="sidetexts">
                      <div className="modaltexts">:</div>
                      <div className="modaltexts">:</div>
                      <div className="modaltexts">:</div>
                    </div>
                    <div className="sidetexts">
                      <div className="boldmodaltexts">{post.waiter.user_name}</div>
                      <div className="boldmodaltexts">{post.waiter.user_phonenumber}</div>
                      <div className="boldmodaltexts">{post.waiter.user_guest}</div>
                    </div>
                  </div>
    
                  <div className="tablewaitercontainer">
                    <div className="modaltexts">
                      Special Instructions (optional)
                    </div>
                    <div className="waitertextinput">
                      <textarea
                        type="text"
                        value={post.waiter.order_instruction}
                        className="waiterdetailinput"
                      />
                    </div>
                  </div>

                  <div className="waiterbuttoncontainer">
                    <button
                      className="waiterconfirmbutton"
                      onClick={() => {
                        setTableWaiterOpen(false);
                        handleCloseWaiter(post.waiter.order_table);
                        setTableIndex();
                      }}
                    >
                      Proceed
                    </button>
                  </div>
                </>
              );
            })}
        </Box>
      </Modal>

      <Modal open={duplicatetableOpen}>
        <Box className="duplicatetablemodalbox">
          <div className="duplicateinnerbox">
            <div className="duplicatetablemodaltitle">Duplicate Table</div>
            <div className="duplicatetabletext">Select the table</div>
            <div className="tableselectorcontainer">
              <div className="tableselector1">
                <Select
                  defaultValue=""
                  disableUnderline
                  classes={{ root: outlineSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  value={startval}
                  onChange={(e) => setStartVal(e.target.value)}
                >
                  {tableRetrieved == true &&
                    tableData.map((post) => {
                      return post.map((posts,index)=>{
               console.log(posts)
                        if (posts.table.id != endval && posts.table.status !== 'EMPTY') {
                          return (
                            <MenuItem value={posts.table.id}>
                              T{posts.table.index}
                            </MenuItem>
                          );
                        }
                      })
                      
                    })}
                </Select>
              </div>
              <div
                style={{
                  color: "#424242",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faRightLong}
                  style={{ color: "#f10c0c" }}
                />
              </div>
              <div className="tableselector2">
                <Select
                  defaultValue=""
                  disableUnderline
                  classes={{ root: outlineSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  value={endval}
                  onChange={(e) => setEndVal(e.target.value)}
                >
                {tableRetrieved == true &&
                    tableData.map((post) => {
                      return post.map((posts,index)=>{
                     
                        if (posts.table.id != startval && posts.table.status !== 'FILLED') {
                          return (
                            <MenuItem value={posts.table.id}>
                              T{posts.table.index}
                            </MenuItem>
                          );
                        }
                      })
                      
                    })}
                </Select>
              </div>
            </div>
            <div className="modalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
                  onClick={() => {
                    setDuplicateTableOpen(false);
                    setStartVal();
                    setEndVal();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="modalconfirmbutton"
                  onClick={handleduplicatetable}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={removetableOpen}>
        <Box className="duplicatetablemodalbox">
          <div className="duplicateinnerbox">
            <div className="duplicatetablemodaltitle">Remove Table Content</div>
            <div className="duplicatetabletext">Select the table</div>
            <div className="tableselectorcontainer">
              <div className="tableselector1">
                <Select
                  defaultValue=""
                  disableUnderline
                  classes={{ root: outlineSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  value={removeval}
                  onChange={(e) => setRemoveVal(e.target.value)}
                >
                  {tableRetrieved == true &&
                    tableData.map((post) => {
                      return post.map((posts,index)=>{
                        if (posts.table.status == 'FILLED'){
                          return(
                            <MenuItem value={posts.table.id}>
                            T{posts.table.index}
                          </MenuItem>
                          )
                        }
                        
                      
                      })
                    
                  })}
                </Select>
              </div>
            </div>
            <div className="modalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
                  onClick={() => {
                    setRemoveTableOpen(false);
                    setRemoveVal();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="modalconfirmbutton"
                  onClick={handleRemoveTableContent}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal> 

{tableRetrieved? ( <div className="tablescontainer">
        <div
          className={
            addtablenotif ||
            removetablenotif ||
            tablecallnotif ||
            tablesavednotif
              ? "tablesnotification"
              : "hidden"
          }
        >
          <div className="notificationtextcontainer">
            <div className="notificationtext">
              {addtablenotif
                ? "New table has been added"
                : removetablenotif
                ? "Table " + deletetabletext + " has been removed"
                : tablecallnotif
                ? "Table No. is calling"
                : tablesavednotif
                ? "Table edit has been saved"
                : null}
            </div>
          </div>

          <div className="notificationclose">
            <button className="notifclosebutton" onClick={handlenotification}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="tablecontainergrid">
          {tableRetrieved == true &&
            tableData.map((post) => {
             console.log("Table Data is:", tableData)
              return post.map((posts, index)=>{
                
                if (posts.table.status == "EMPTY") {
          
                  return (
              
                    <div className="innergrid">
                      <div className="emptygrid">
                        <div className={edittable ? "emptytable" : "null"}>
                          <button
                            className="deletetablebutton"
                            type="button"
                            onClick={() =>
                              handledeletetable(posts.table.index, posts.table.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                        <button className="tabledetails">
                          <div className="tablenumberempty">
                            T{posts.table.index}
                          </div>
                          <div className="emptycenter">
                            <div className="tableempty">Empty</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                }
                if (posts.table.status == "FILLED") {
                  // Time
                  const orderTime = new Date(posts.table.timeStart);
                  const timeOptions = {
                    hour: "2-digit",
                    minute: "2-digit",
                  };
  
                  return (
                    <div className="innergrid">
                      <button
                        className={
                          posts.table.isWaiterCalled
                            ? "tablewaiteractive"
                            : "tabledetailsactive"
                        }
                        onClick={
                          posts.table.isWaiterCalled
                            ? () => {
                                handlepasswaiterinfo(posts.table.index);
                                setTableWaiterOpen(true);
                                setTableIndex(posts.table.index)
                              }
                            : posts.table.order_id == "NULL"
                            ? () => setTableNoOrderOpen(true)
                            : () => {
                                handlePassinginfo(posts.table.order_id);
                                setTableOrderOpen(true);
                              }
                        }
                      >
                        <div
                          className={
                            posts.table.isWaiterCalled
                              ? "waitercalltablenumber"
                              : "tablenumberactive"
                          }
                        >
                          T{posts.table.index}
                        </div>
  
                        <div className="center">
                          <div className="imagecenter">
                            <img
                              src={
                                posts.table.isWaiterCalled ? Waitercall : Customer
                              }
                              className={
                                posts.table.isWaiterCalled
                                  ? "waiterimage"
                                  : "customerimage"
                              }
                            />
                          </div>
  
                          <div
                            className={
                              posts.table.isWaiterCalled
                                ? "waitercallactive"
                                : "tablecustomeractive"
                            }
                          >
                            <img
                              src={Customer}
                              className={
                                posts.table.isWaiterCalled
                                  ? "customerwaiterimage"
                                  : "null"
                              }
                            />{" "}
                            {posts.table.customerCount} Customer
                          </div>
                        </div>
                        {posts.table.order_id != "NULL" ? (
                          <div
                            className={
                              posts.table.isWaiterCalled ? "waitertime" : "time"
                            }
                          >
                            <div
                              className={
                                posts.table.isWaiterCalled
                                  ? "waitertimestart"
                                  : "tabletimestart"
                              }
                            >
                              {orderTime.toLocaleTimeString("en-US", timeOptions)}
                            </div>
                          </div>
                        ) : (
                          <div className="notime">&nbsp;</div>
                        )}
                      </button>
                    </div>
                  );
                }
              })
            
            })}
        </div>

        <div className="tablebuttoncontainer">
          <div className="addtablecontainer">
            <button
              className={edittable ? "addtableinactive" : "addtableactive"}
              disabled={edittable ? true : false}
              onClick={() => {
                handleaddtable(), console.log("add");
              }}
            >
              + Add New Table
            </button>
          </div>

          <div className="duplicatetablecontainer">
            <button
              className={
                edittable
                  ? duplicatetableOpen
                    ? "duplicatetablebuttonactive"
                    : "duplicatetablebutton"
                  : "null"
              }
              onClick={() => setDuplicateTableOpen(true)}
            >
              Duplicate Table
            </button>
          </div>
          <div className="removetablecontainer">
            <button
              className={
                edittable
                  ? removetableOpen
                    ? "removetablebuttonactive"
                    : "removetablebutton"
                  : "null"
              }
              onClick={() => setRemoveTableOpen(true)}
            >
              Remove Table
            </button>
          </div>

          <div className="edittablecontainer">
            <button
              className="edittablebutton"
              onClick={edittable ? handlesavetable : handleedittable}
            >
              {edittable ? "Save Table" : "Edit Table"}
            </button>
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
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(TablesPage);
