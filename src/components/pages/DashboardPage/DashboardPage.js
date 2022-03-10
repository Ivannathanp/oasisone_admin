import React from "react";
import "../TopBar.css";
import "./DashboardPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function DashboardPage({ tenant }) {
  let history = useHistory();

  const RestaurantData = [
    {
      id: 1,
      name: "Telaga Seafood",
      table: [
        {
          id: 1,
          name: 1,
          available: true,
        },
        {
          id: 2,
          name: 2,
          available: true,
        },
        {
          id: 3,
          name: 3,
          available: false,
        },
        {
          id: 4,
          name: 4,
          available: true,
        },
        {
          id: 5,
          name: 5,
          available: false,
        },
        {
          id: 6,
          name: 6,
          available: true,
        },
        {
          id: 7,
          name: 7,
          available: false,
        },
        {
          id: 8,
          name: 8,
          available: true,
        },
        {
          id: 9,
          name: 9,
          available: true,
        },
        {
          id: 10,
          name: 10,
          available: true,
        },
        {
          id: 11,
          name: 11,
          available: true,
        },
        {
          id: 12,
          name: 12,
          available: true,
        },
        {
          id: 13,
          name: 13,
          available: false,
        },
        {
          id: 14,
          name: 14,
          available: true,
        },
        {
          id: 15,
          name: 15,
          available: false,
        },
        {
          id: 16,
          name: 16,
          available: true,
        },
        {
          id: 17,
          name: 17,
          available: false,
        },
        {
          id: 18,
          name: 18,
          available: true,
        },
        {
          id: 19,
          name: 19,
          available: true,
        },
        {
          id: 20,
          name: 20,
          available: true,
        },
        {
          id: 21,
          name: 21,
          available: true,
        },
        {
          id: 22,
          name: 22,
          available: true,
        },
        {
          id: 23,
          name: 23,
          available: false,
        },
        {
          id: 24,
          name: 24,
          available: true,
        },
        {
          id: 25,
          name: 25,
          available: false,
        },
        {
          id: 26,
          name: 26,
          available: true,
        },
        {
          id: 27,
          name: 27,
          available: false,
        },
        {
          id: 28,
          name: 28,
          available: true,
        },
        {
          id: 29,
          name: 29,
          available: true,
        },
        {
          id: 30,
          name: 30,
          available: true,
        },
      ],
      promo: [
        {
          id: 1,
          uri: "../../icons/Banner1.jpg",
        },
        {
          id: 2,
          uri: "../../icons/Banner1.jpg",
        },
      ],
    },
  ];

  const OrderData = [
    {
      id: 1,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 2,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 3,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 4,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
    {
      id: 5,
      order_ID: "ODR - 1629840588",
      time: "59 minutes ago",
      table_ID: 12,
    },
  ];

  const InventoryData = [
    {
      id: 1,
      name: "Gurame Asem Manis",
      stock: "12",
    },
    {
      id: 2,
      name: "Gurame Bakar",
      stock: "8",
    },
    {
      id: 3,
      name: "Gurame Saus Tiram",
      stock: "9",
    },
    {
      id: 4,
      name: "Gurame Saus Padang",
      stock: "9",
    },
    {
      id: 5,
      name: "Udang Bakar",
      stock: "7",
    },
    {
      id: 6,
      name: "Udang Saus Padang",
      stock: "9",
    },
    {
      id: 7,
      name: "Soda Gembira",
      stock: "12",
    },
    {
      id: 8,
      name: "Sayur Kangkung",
      stock: "20",
    },
    {
      id: 9,
      name: "Kepiting",
      stock: "10",
    },
    {
      id: 10,
      name: "Es Teh",
      stock: "15",
    },
  ];

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

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <div className="dashboardsection">
        <div className="tables">
          Tables
          <div className="tablecol">
            <div className="tablecolumn1">
              <div className="heading">Table Available List</div>
              <div className="scrollable">
                <div className="dashboardtablecontainer">
                  <div className="tablegrid">
                    {RestaurantData.map((post) => {
                      return post.table.map((posts) => {
                        if (posts.available === true) {
                          return (
                            <>
                              <div className="tablenumber">{posts.name}</div>
                            </>
                          );
                        }
                      });
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="tablecolumn2">
              <div className="tablerow">
                <div className="number">14</div>
                <div className="tablerowtext">
                  <div className="up">Table</div>
                  <div className="down">Occupied</div>
                </div>
              </div>
              <div className="tablerow">
                <div className="number2">12</div>
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
                <div className="number">12</div>
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
                {InventoryData.map((post, index) => (
                  <div className="inventorylistgrid">
                    <div className="inventoryindex">
                      <div className="index">{post.id}</div>
                    </div>
                    <div className="inventoryname">{post.name}</div>
                    <div className="inventorystock">{post.stock}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="orderscreen">
          Order Screen
          <div className="outer">
            <div className="dashboardouterborder">
              <div className="ordergrid">
                {OrderData.map((post) => {
                  return (
                    <>
                      <div className="orderdetails">
                        <div className="orderID">{post.order_ID}</div>
                        <div className="orderdetail">
                          <div className="orderdetailtime">{post.time} -</div>
                          <div className="tableID"> Table {post.table_ID}</div>
                        </div>
                        <div className="orderbuttoncontainer">
                          <button
                            className="orderbutton"
                            onClick={redirectorder}
                          >
                            View Detail
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="promo">
          Promo Banner
          <div className="dashboardpromocontainer">
            {RestaurantData.map((post) => {
              return post.promo.map((posts, index) => {
                return (
                  <div className="promodetails">
                    <button
                      key={index}
                      className="promodetailbutton"
                      type="button"
                      onClick={redirectpromo}
                    >
                      <img
                        src={require("../../icons/Banner1.jpg")}
                        className="picture"
                      />
                    </button>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(DashboardPage);
