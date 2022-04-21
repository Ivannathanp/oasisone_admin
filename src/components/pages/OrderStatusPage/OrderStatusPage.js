import React, { useState, useEffect } from "react";
import "../TopBar.css";
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
  Radio
} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import {CustomizedRadios} from "./Radio/RadioButton";
import {MUIRadioGroup} from "./Radio/radio";


function OrderStatusPage({ tenant }) {

  const localUrl = process.env.REACT_APP_ORDERURL;
  const localUrl2 = process.env.REACT_APP_MENUURL;
  const [ orderData, setOrderData ] = useState([]);
  const [ orderRetrieved, setOrderRetrieved ] = useState(false);

  const [ menuData, setMenuData ] = useState([]);
  const [ menuRetrieved, setMenuRetrieved ] = useState(false);

  // Get Order Data
    useEffect(() => {
    let mounted = true;
    console.log('called')

    if ( mounted ) {
      if ( tenant.tenant_id != undefined ) {
        const url = localUrl + '/retrieve/' + tenant.tenant_id;
        console.log(url)

        fetch( url, {
          method: 'GET',
          headers: { "content-type": "application/JSON" },
        })
        .then((response) => response.json())
        .then((result) => {
          if ( result.status === 'SUCCESS' ) {
            // console.log(result)
            setOrderData(() => result.data); 
            setOrderRetrieved(() => true);
          } else { 
            // console.log(result);
            setOrderRetrieved(() => false); 
          }
        })
      }
    }


    return () => { mounted = false }
  }, [ tenant, orderRetrieved ])
  
  const [acceptance, setAcceptance] = useState("");
  
  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

  function handleacceptincrement(i) {
    setAcceptance({acceptance: i + 1});
    console.log("acc", acceptance);
  }

  const [rejectorder, setRejectOrder] = useState(false);
  const [rejectreason, setRejectReason] = useState(false)

  function handlerejectorder(){

  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handlerejected(){
    setRejectOrder(false);
    setRemoveItemNotif(true);
    setTimeout(() => {
      setRemoveItemNotif(false);
    }, 5000);
    setRejectReason(false)    
  }

  function rejectordermodal(){
    return(
      <Modal open={rejectorder}>
      <Box className={rejectreason? "rejectorderbox" : "removecatmodalbox"}>
        <div className="removecatinnerbox">
          <div className="removecatheading">
            <img src={removecat} className="removecatimage" />
            <div className="removecatmodaltitle">Reject Order</div>
          </div>
          <div className="removecatmodaltext">
            {rejectreason? "Reason why this order is rejected?" : "Are you sure to reject this order?" }
            {rejectreason? <div className="radiogroupcontainer"><CustomizedRadios/></div> : null}
          </div>
         
          
          <div className="removecatmodalbuttoncontainer">
            <div>
              <button
                className="modalcancelbutton"
                onClick={()=>{setRejectOrder(false);  setRejectReason(false)}}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="modalconfirmbutton"
                onClick={ () => {rejectreason? handlerejected() : setRejectReason(true)}}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
    )
  }

  const [removeitemnotif, setRemoveItemNotif] = useState(false);
  function handlenotification() {
    if (removeitemnotif) {
      setRemoveItemNotif(false);
    } else {
      setRemoveItemNotif(true);
      setTimeout(() => {
        setRemoveItemNotif(false);
      }, 5000); //wait 5 seconds
    }
  }
 
 

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Order Status Screen</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

<div className="orderstatusoutercontainer">
      <div className="orderstatuscontainer">
        {rejectordermodal()}
        <div className={removeitemnotif ? "notification" : "hidden"}>
              <div className="notificationtextcontainer">
                <div className="notificationtext">Order Removed</div>
              </div>

              <div className="notificationclose">
                <button
                  className="notifclosebutton"
                  onClick={handlenotification}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>

        {orderRetrieved == true && orderData.map((post, index) => {
          return (
            <>
              <div className="orderstatuscard">
                <FontAwesomeIcon icon={faXmark} className="closeordericon" onClick={()=>setRejectOrder(true)}/>
                <div className="orderID">{post.order_id}</div>
                <div className="orderdetail">
                  <div className="orderstatustime">{post.order_time} - </div>
                  <div className="tableID"> Table {post.order_table}</div>
                </div>
                <div className="menucontainer">

              
                { post.order_menu.map((posts, index) => {
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
                                prefix="RP. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </div>
                            <div className="menuquant">
                              Qty:{" "}
                              <span className="quant"> {posts.quantity} </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="totalcontainer">
                  <div className="total">
                    <div className="totalquant">x{post.order_item} items</div>
                    <div className="totalprice">
                      <NumberFormat
                        value={post.order_total}
                        prefix="RP. "
                        decimalSeparator="."
                        thousandSeparator=","
                        displayType="text"
                      />
                    </div>
                  </div>
                  <div className="buttoncontainer" key={index}>
                    {post.order_status == "Pending" ? (
                      <button
                        className="proceedstatusbutton"
                        type="button"
                        onClick={
                          (() => handleacceptincrement(post.order_status),
                          console.log(post.order_status))
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        Proceed
                      </button>
                    ) : post.order_status == "Order Placed" ? (
                      <button
                        type="button"
                        className="servestatusbutton"
                        onClick={() => handleacceptincrement(post.order_status)}
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        Serve
                      </button>
                    ) : post.order_status == "Served" ? (
                      <button
                        className="completestatusbutton"
                        type="button"
                        //onClick={handleacceptincrement(post.order_status)}
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
                        Complete
                      </button>
                    ) : post.order_status == "Completed" ? (
                      <button
                        className="completedstatusbutton"
                        type="button"
                        //onClick={post.order_status}
                      >
                        <FontAwesomeIcon icon={faCheck} className="icon" />
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
        })}
      </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(OrderStatusPage);



// const OrderData = [
  //   {
  //     id: 1,
  //     order_ID: "ODR - 1629840588",
  //     time: "59 minutes ago",
  //     table_ID: 12,
  //     order_status: 1,
  //     menu: [
  //       {
  //         id: 1,
  //         name: "Gurame Asam Manis",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Gurame Asam Manis.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Udang Bakar",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Bakar.png",
  //       },
  //     ],
  //     totalquant: 2,
  //     totalprice: 130000,
  //   },
  //   {
  //     id: 2,
  //     order_ID: "ODR - 1629840588",
  //     time: "59 minutes ago",
  //     table_ID: 12,
  //     accepted: 2,
  //     menu: [
  //       {
  //         id: 1,
  //         name: "Gurame Asam Manis",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Gurame Asam Manis.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Udang Bakar",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Bakar.png",
  //       },
  //     ],
  //     totalquant: 2,
  //     totalprice: 130000,
  //   },
  //   {
  //     id: 3,
  //     order_ID: "ODR - 1629840588",
  //     time: "59 minutes ago",
  //     table_ID: 12,
  //     accepted: 3,
  //     menu: [
  //       {
  //         id: 1,
  //         name: "Gurame Asam Manis",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Gurame Asam Manis.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Udang Bakar",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Bakar.png",
  //       },
  //       {
  //         id: 3,
  //         name: "Udang Saos Padang",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Asam Manis.png",
  //       },
  //     ],
  //     totalquant: 3,
  //     totalprice: 195000,
  //   },
  //   {
  //     id: 4,
  //     order_ID: "ODR - 1629840588",
  //     time: "59 minutes ago",
  //     table_ID: 12,
  //     accepted: 3,
  //     menu: [
  //       {
  //         id: 1,
  //         name: "Gurame Asam Manis",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Gurame Asam Manis.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Udang Bakar",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Bakar.png",
  //       },
  //       {
  //         id: 3,
  //         name: "Udang Saos Padang",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Asam Manis.png",
  //       },
  //     ],
  //     totalquant: 3,
  //     totalprice: 195000,
  //   },
  //   {
  //     id: 5,
  //     order_ID: "ODR - 1629840588",
  //     time: "59 minutes ago",
  //     table_ID: 12,
  //     accepted: 3,
  //     menu: [
  //       {
  //         id: 1,
  //         name: "Gurame Asam Manis",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Gurame Asam Manis.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Udang Bakar",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Bakar.png",
  //       },
  //       {
  //         id: 3,
  //         name: "Udang Saos Padang",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Asam Manis.png",
  //       },
  //     ],
  //     totalquant: 3,
  //     totalprice: 195000,
  //   },
  //   {
  //     id: 6,
  //     order_ID: "ODR - 1629840588",
  //     time: "59 minutes ago",
  //     table_ID: 12,
  //     accepted: 3,
  //     menu: [
  //       {
  //         id: 1,
  //         name: "Gurame Asam Manis",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Gurame Asam Manis.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Udang Bakar",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Bakar.png",
  //       },
  //       {
  //         id: 3,
  //         name: "Udang Saos Padang",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Asam Manis.png",
  //       },
  //     ],
  //     totalquant: 3,
  //     totalprice: 195000,
  //   },
  //   {
  //     id: 7,
  //     order_ID: "ODR - 1629840588",
  //     time: "59 minutes ago",
  //     table_ID: 12,
  //     accepted: 3,
  //     menu: [
  //       {
  //         id: 1,
  //         name: "Gurame Asam Manis",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Gurame Asam Manis.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Udang Bakar",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Bakar.png",
  //       },
  //       {
  //         id: 3,
  //         name: "Udang Saos Padang",
  //         price: 65000,
  //         quantity: 1,
  //         uri: "../../icons/Udang Asam Manis.png",
  //       },
  //     ],
  //     totalquant: 3,
  //     totalprice: 195000,
  //   },
  // ];
