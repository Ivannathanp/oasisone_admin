import React, { useState } from "react";
import "../TopBar.css";
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
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import NumberFormat from "react-number-format";
import recommended from "../../icons/Recommend.png";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { useOutlineSelectStyles } from "./select/index";

function TablesPage({ tenant }) {
  const TableData = [
    {
      id: 1,
      table_ID: 1,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: true,
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
      status: 1,
      totalitems: 2,
    },

    {
      id: 2,
      table_ID: 2,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: false,
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
      status: 2,
      totalitems: 2,
    },
    {
      id: 3,
      table_ID: 3,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 4,
      table_ID: 4,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 4,
      totalitems: 2,
    },
    {
      id: 5,
      table_ID: 5,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 2,
      totalitems: 2,
    },
    {
      id: 6,
      table_ID: 6,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 7,
      table_ID: 7,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 5,
      totalitems: 2,
    },
    {
      id: 8,
      table_ID: 8,
      time_start: "11:00",
      time_end: "11:30",
      customer: 0,

      waitercall: false,
    },
    {
      id: 9,
      table_ID: 9,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 10,
      table_ID: 10,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 2,
      totalitems: 2,
    },
    {
      id: 11,
      table_ID: 11,
      time_start: "11:00",
      time_end: "11:30",
      customer: 0,

      waitercall: false,
    },
    {
      id: 12,
      table_ID: 12,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 3,
      totalitems: 2,
    },
    {
      id: 13,
      table_ID: 13,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 4,
      totalitems: 2,
    },
    {
      id: 14,
      table_ID: 14,
      time_start: "11:00",
      time_end: "11:30",
      customer: 4,
      waitercall: true,
      customername: "Lena",
      customerphone: "0891232232323",
      instruction: "Minta Sendok",
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 15,
      table_ID: 15,

      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 1,
      table_ID: 1,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: true,
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
      status: 1,
      totalitems: 2,
    },

    {
      id: 2,
      table_ID: 2,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: false,
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
      status: 2,
      totalitems: 2,
    },
    {
      id: 3,
      table_ID: 3,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 4,
      table_ID: 4,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 4,
      totalitems: 2,
    },
    {
      id: 5,
      table_ID: 5,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 2,
      totalitems: 2,
    },
    {
      id: 6,
      table_ID: 6,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 7,
      table_ID: 7,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 5,
      totalitems: 2,
    },
    {
      id: 8,
      table_ID: 8,
      time_start: "11:00",
      time_end: "11:30",
      customer: 0,

      waitercall: false,
    },
    {
      id: 9,
      table_ID: 9,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 10,
      table_ID: 10,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 2,
      totalitems: 2,
    },
    {
      id: 11,
      table_ID: 11,
      time_start: "11:00",
      time_end: "11:30",
      customer: 0,

      waitercall: false,
    },
    {
      id: 12,
      table_ID: 12,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 3,
      totalitems: 2,
    },
    {
      id: 13,
      table_ID: 13,
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 4,
      totalitems: 2,
    },
    {
      id: 14,
      table_ID: 14,
      time_start: "11:00",
      time_end: "11:30",
      customer: 4,
      waitercall: true,
      customername: "Lena",
      customerphone: "0891232232323",
      instruction: "Minta Sendok",
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
      status: 1,
      totalitems: 2,
    },
    {
      id: 15,
      table_ID: 15,

      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
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
      status: 1,
      totalitems: 2,
    },
  ];
  const [tableOrderOpen, setTableOrderOpen] = useState(false);
  const handleTableOrderOpen = () => setTableOrderOpen(true);
  const handleTableOrderClose = () => setTableOrderOpen(false);

  const [duplicatetableOpen, setDuplicateTableOpen] = useState(false);
  const handleDuplicateTableOpen = () => setDuplicateTableOpen(true);
  const handleDuplicateTableClose = () => setDuplicateTableOpen(false);

  const [tableWaiterOpen, setTableWaiterOpen] = useState(false);
  const handleTableWaiterOpen = () => setTableWaiterOpen(true);
  const handleTableWaiterClose = () => setTableWaiterOpen(false);

  const [removetableOpen, setRemoveTableOpen] = useState(false);
  const handleRemoveTableOpen = () => setRemoveTableOpen(true);
  const handleRemoveTableClose = () => setRemoveTableOpen(false);

  const [restaurantname, setRestaurantname] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [instruction, setInstruction] = useState("");
  const [table, setTable] = useState("");
  const [orderitems, setOrderitems] = useState([]);
  const [itemtotal, setItemtotal] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [service, setService] = useState("");
  const [tax, setTax] = useState("");

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

  //const [condition, setCondition] = useState(false);

  const [startval, setStartVal] = useState();
  const catstartvalchange = (e) => {
    setStartVal(e.target.value);
    // setCondition(true);
  };

  const [endval, setEndVal] = useState();
  const catendvalchange = (e) => {
    setEndVal(e.target.value);
  };

  // function handleerror() {
  //   console.log(condition);
  //   alert("please pick another table");
  //   endval == null;
  // }

  const [removeval, setRemoveVal] = useState();
  const catremovevalchange = (e) => {
    setRemoveVal(e.target.value);
    // setCondition(true);
  };

  const [edittable, setEditTable] = useState(false);

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

  function handlepasswaiterinfo(
    tableid,
    customername,
    customerphone,
    waiterinstruction
  ) {
    setTableID(tableid);
    setCustomerName(customername);
    setCustomerPhone(customerphone);
    setWaiterInstruction(waiterinstruction);
  }

  function handleaddtable() {
   
  }

  function handleedittable() {
    setEditTable(true);
  }

  function handlesavetable() {
    setEditTable(false);
    setDeleteTable(false);
  }

  function handledeletetable(e) {
    console.log("Table", e, "has been deleted!");
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Tables</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <Modal open={tableOrderOpen}>
        <Box className="ordermodalbox">
          <div className="modalclose">
            <button
              className="modalclosebutton"
              onClick={handleTableOrderClose}
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
                    <div className="ready">READY TO SERVE</div>
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
          
                  <div className="ordermodalinputlabel">
                    Name <span style={{ color: "#E52C32" }}>*</span>
                  </div>
                  <input
                    type="text"
                    value={customername}
                    className="ordermodalinputfile"
               
                  />
                  <div className="ordermodalinputlabel">
                    Phone Number<span style={{ color: "#E52C32" }}>*</span>
                  </div>
                  <input
                    type="text"
                    value={customerphone}
                    className="ordermodalinputfile"
                   
                  />
                  <div className="ordermodalinputlabel">
                    Special Instructions
                  </div>
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
                        <img src={post.uri} className="menuimage" />
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

      <Modal open={tableWaiterOpen}>
        <Box className="tablewaitermodalbox">
          <div className="modalclose">
            <button
              className="modalclosebutton"
              onClick={handleTableWaiterClose}
            >
              <FontAwesomeIcon
                className="closebuttonicon"
                icon={faCircleXmark}
              />
            </button>
          </div>
          <div className="tablewaitermodaltitle">{tableid}</div>
          <div className="sideattributes">
            <div className="sidetexts">
              <div className="modaltexts">Name</div>
              <div className="modaltexts">Phone Number</div>
            </div>
            <div className="sidetexts">
              <div className="modaltexts">:</div>
              <div className="modaltexts">:</div>
            </div>
            <div className="sidetexts">
              <div className="boldmodaltexts">{customername}</div>
              <div className="boldmodaltexts">{customerphone}</div>
            </div>
          </div>
          <div className="tablewaitercontainer">
            <div className="modaltexts">Special Instructions (optional)</div>
            <div className="waitertextinput">
              <textarea
                type="text"
                value={waiterinstruction}
                className="waiterdetailinput"
              />
            </div>
          </div>

          <div className="waiterbuttoncontainer">
            <button
              className="waiterconfirmbutton"
              onClick={handleTableWaiterClose}
            >
              Proceed
            </button>
          </div>
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
                  onChange={catstartvalchange}
                >
                  {TableData.map((post, index) => (
                   <MenuItem value={index}>T{post.table_ID}</MenuItem>
                  ))}
                </Select>
              </div>
              <div
                style={{
                  color: "#424242",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                {">"}{" "}
              </div>
              <div className="tableselector2">
                <Select
                  defaultValue=""
                  disableUnderline
                  classes={{ root: outlineSelectClasses.select }}
                  MenuProps={menuProps}
                  IconComponent={iconComponent}
                  value={endval}
                  //onChange={condition? (startval === endval? handleerror() : catendvalchange) : catendvalchange}
                  onChange={catendvalchange}
                >
                  {TableData.map((post, index) => (
                    <MenuItem value={index}>T{post.table_ID}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="modalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
                  onClick={handleDuplicateTableClose}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="modalconfirmbutton"
                  onClick={handleDuplicateTableClose}
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
            <div className="duplicatetablemodaltitle">Remove Table</div>
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
                  onChange={catremovevalchange}
                >
                  {TableData.map((post, index) => (
                    <MenuItem value={index}>T{post.table_ID}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="modalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
                  onClick={handleRemoveTableClose}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="modalconfirmbutton"
                  onClick={handleRemoveTableClose}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <div className="tablescontainer">
        <div className="tablecontainergrid">
          {TableData.map((post, index) => {
            if (post.customer === 0) {
              return (
                <div className="innergrid">
                  <div className="emptygrid">
                  <div className={edittable ? "emptytable" : "null"}>
                    <button
                      className="deletetablebutton"
                      type="button"
                      onClick={() => handledeletetable(post.table_ID)}
                    >
                      Delete
                    </button>
                  </div>
                  <button className="tabledetails">
                    <div className="tablenumberempty">T{post.table_ID}</div>
                    <div className="emptycenter">
                      <div className="tableempty">Empty</div>
                    </div>
                  </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="innergrid">
                <button
                  className={
                    post.waitercall ? "tablewaiteractive" : "tabledetailsactive"
                  }
                  onClick={
                    post.waitercall
                      ? () => {
                          handleTableWaiterOpen();

                          handlepasswaiterinfo(
                            post.name,
                            post.customername,
                            post.customerphone,
                            post.instruction
                          );
                        }
                      : () => {
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
                          handleTableOrderOpen();
                        }
                  }
                >
                  <div
                    className={
                      post.waitercall
                        ? "waitercalltablenumber"
                        : "tablenumberactive"
                    }
                  >
                    T{post.table_ID}
                  </div>

                  <div className="center">
                    <div className="imagecenter">
                      <img
                        src={post.waitercall ? Waitercall : Customer}
                        className={
                          post.waitercall ? "waiterimage" : "customerimage"
                        }
                      />
                    </div>

                    <div
                      className={
                        post.waitercall
                          ? "waitercallactive"
                          : "tablecustomeractive"
                      }
                    >
                      <img
                        src={Customer}
                        className={
                          post.waitercall ? "customerwaiterimage" : "null"
                        }
                      />{" "}
                      {post.customer} Customer
                    </div>
                  </div>
                  <div className={post.waitercall ? "waitertime" : "time"}>
                    <div
                      className={
                        post.waitercall ? "waitertimestart" : "tabletimestart"
                      }
                    >
                      {post.time_start}
                    </div>
                    <div className={post.waitercall ? "null" : "tabletimeend"}>
                      {post.time_end}
                    </div>
                  </div>
                </button>
                </div>
              );
            }
          })}
        </div>

        <div className="tablebuttoncontainer">
          <div className="addtablecontainer">
            <button
              className={edittable ? "addtableinactive" : "addtableactive"}
              disabled={edittable ? true : false}
              onClick={() => {handleaddtable() ,console.log("add")}}
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
              onClick={handleDuplicateTableOpen}
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
              onClick={handleRemoveTableOpen}
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
      </div>
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(TablesPage);
