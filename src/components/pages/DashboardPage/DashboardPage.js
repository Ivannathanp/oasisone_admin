import React, { useState, useEffect } from "react";
import "../TopBar.css";
import "./DashboardPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import sorter from "sort-nested-json";

function DashboardPage({ tenant }) {
  let history = useHistory();

  const RestaurantData = [
    {
      id: 1,
      name: "Telaga Seafood",
      uri: require("../../icons/Logo.png"),
      location:
        "Jl. Raya Serpong Kav. Komersial No. 6, Bumi Serpong Damai, Jelupang, Lengkong Karya, Kec. Serpong Utara, Kota Tangerang Selatan, Banten.",
      schedule: [
        {
          id: 1,
          day: "Sunday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 2,
          day: "Monday",
          open: "",
          close: "",
        },
        {
          id: 3,
          day: "Tuesday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 4,
          day: "Wednesday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 5,
          day: "Thursday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 6,
          day: "Friday",
          open: "08:30",
          close: "20:30",
        },
        {
          id: 7,
          day: "Saturday",
          open: "08:30",
          close: "20:30",
        },
      ],
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
      category: [
        {
          categoryId: 0,
          categoryName: "menu",
          menu: [],
        },
        {
          categoryId: 1,
          categoryName: "Gurame",
          menu: [
            {
              menuId: 1,
              name: "Gurame Bakar",
              uri: require("../../icons/Gurame Bakar.png"),
              duration: 15,
              recommended: true,
              description:
                "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
              price: 65000,
              quantity: 10,
              availability: true,
              value: 0,
            },
            {
              menuId: 2,
              name: "Gurame Asam Manis",
              uri: require("../../icons/Gurame Saus Tiram.png"),
              duration: 15,
              recommended: false,
              description:
                "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
              price: 85000,
              quantity: 10,
              availability: true,
              value: 0,
            },
          ],
        },
        {
          categoryId: 2,
          categoryName: "Kerapu",
          menu: [
            {
              menuId: 1,
              name: "Kerapu Kukus",
              uri: require("../../icons/Kerapu Kukus.png"),
              duration: 10,
              recommended: true,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 15000,
              quantity: 12,
              availability: true,
              value: 0,
            },
          ],
        },
        {
          categoryId: 3,
          categoryName: "Udang",
          menu: [
            {
              menuId: 1,
              name: "Udang Bakar",
              uri: require("../../icons/Udang Bakar.png"),
              duration: 10,
              recommended: true,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 45000,
              quantity: 30,
              availability: true,
              value: 0,
            },
            {
              menuId: 2,
              name: "Udang Galah Rebus",
              uri: require("../../icons/Udang Galah Rebus.png"),
              duration: 10,
              recommended: true,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 45000,
              quantity: 40,
              availability: true,
              value: 0,
            },
          ],
        },
        {
          categoryId: 4,
          categoryName: "Cumi",
          menu: [
            {
              menuId: 1,
              name: "Cumi Goreng",
              uri: require("../../icons/Cumi Goreng.png"),
              duration: 10,
              recommended: true,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 15000,
              quantity: 8,
              availability: true,
              value: 0,
            },
          ],
        },
        {
          categoryId: 5,
          categoryName: "Sayur",
          menu: [
            {
              menuId: 1,
              name: "Kailan Polos",
              uri: require("../../icons/Kailan Polos.png"),
              duration: 5,
              recommended: false,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 30000,
              quantity: 10,
              availability: true,
              value: 0,
            },
            {
              menuId: 2,
              name: "Sayur Asem",
              uri: require("../../icons/Sayur Asem.png"),
              duration: 10,
              recommended: true,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 15000,
              quantity: 90,
              availability: true,
              value: 0,
            },
          ],
        },
        {
          categoryId: 6,
          categoryName: "Minum",
          menu: [
            {
              menuId: 1,
              name: "Ice Vietnam Drip",
              uri: require("../../icons/Ice Vietnam Drip.png"),
              duration: 10,
              recommended: true,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 15000,
              quantity: 10,
              availability: true,
              value: 0,
            },
          ],
        },
        {
          categoryId: 7,
          categoryName: "Kerang",
          menu: [
            {
              menuId: 1,
              name: "Kerang",
              uri: require("../../icons/Kerang.png"),
              duration: 10,
              recommended: true,
              description:
                "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
              price: 15000,
              quantity: 100,
              availability: true,
              value: 0,
            },
          ],
        },
      ],
    },
  ];

  const category = [
    {
      categoryId: 0,
      categoryName: "menu",
      menu: [],
    },
    {
      categoryId: 1,
      categoryName: "Gurame",
      menu: [
        {
          menuId: 1,
          name: "Gurame Bakar",
          uri: require("../../icons/Gurame Bakar.png"),
          duration: 15,
          recommended: true,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 65000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 2,
          name: "Gurame Asam Manis",
          uri: require("../../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 0,
        },
      ],
    },
    {
      categoryId: 2,
      categoryName: "Kerapu",
      menu: [
        {
          menuId: 1,
          name: "Kerapu Kukus",
          uri: require("../../icons/Kerapu Kukus.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 12,
          availability: true,
          value: 0,
        },
      ],
    },
    {
      categoryId: 3,
      categoryName: "Udang",
      menu: [
        {
          menuId: 1,
          name: "Udang Bakar",
          uri: require("../../icons/Udang Bakar.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 45000,
          quantity: 30,
          availability: true,
          value: 0,
        },
        {
          menuId: 2,
          name: "Udang Galah Rebus",
          uri: require("../../icons/Udang Galah Rebus.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 45000,
          quantity: 40,
          availability: true,
          value: 0,
        },
      ],
    },
    {
      categoryId: 4,
      categoryName: "Cumi",
      menu: [
        {
          menuId: 1,
          name: "Cumi Goreng",
          uri: require("../../icons/Cumi Goreng.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 8,
          availability: true,
          value: 0,
        },
      ],
    },
    {
      categoryId: 5,
      categoryName: "Sayur",
      menu: [
        {
          menuId: 1,
          name: "Kailan Polos",
          uri: require("../../icons/Kailan Polos.png"),
          duration: 5,
          recommended: false,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 30000,
          quantity: 90,
          availability: true,
          value: 0,
        },
        {
          menuId: 2,
          name: "Sayur Asem",
          uri: require("../../icons/Sayur Asem.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 10,
          availability: true,
          value: 0,
        },
      ],
    },
    {
      categoryId: 6,
      categoryName: "Minum",
      menu: [
        {
          menuId: 1,
          name: "Ice Vietnam Drip",
          uri: require("../../icons/Ice Vietnam Drip.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 10,
          availability: true,
          value: 0,
        },
      ],
    },
    {
      categoryId: 7,
      categoryName: "Kerang",
      menu: [
        {
          menuId: 1,
          name: "Kerang",
          uri: require("../../icons/Kerang.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 100,
          availability: true,
          value: 0,
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
            <img src={"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} className="image" />
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
                {category.map((post) => (
                  post.menu.map((item) => (
                    // const [first, setfirst] = useState({ item });
                    // const array = sorter.sort(first).desc("quantity");
                    // const [sorted, setsorted] = useState({ array });
                    // console.log("arr", sorted);
                   
                      <div className="inventorylistgrid">
                        <div className="inventoryindex">
                          <div className="index">{item.menuId}</div>
                        </div>
                        <div className="inventoryname">{item.name}</div>
                        <div className="inventorystock">{item.quantity}</div>
                      </div>
                 
                  ))
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
