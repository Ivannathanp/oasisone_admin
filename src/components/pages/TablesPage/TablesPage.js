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
<<<<<<< HEAD

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

=======
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

>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon
        className={props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

<<<<<<< HEAD
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
=======
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
    setTableRetrieved(() => false);

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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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

     <Modal open={tableOrderOpen}>
        <Box className="ordermodalbox">
<<<<<<< HEAD
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

         
=======
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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
        </Box>
      </Modal>

      <Modal open={tableWaiterOpen}>
        <Box className="tablewaitermodalbox">
<<<<<<< HEAD
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
=======
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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
          </div>
        </Box>
      </Modal>

<<<<<<< HEAD
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
=======
      <Modal open={removetableOpen}>
        <Box className="duplicatetablemodalbox">
          <div className="duplicateinnerbox">
            <div className="duplicatetablemodaltitle">Remove Table Content</div>
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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
<<<<<<< HEAD
                  onChange={catremovevalchange}
                >
                  {TableData.map((post, index) => (
                    <MenuItem value={index}>T{post.table_ID}</MenuItem>
                  ))}
=======
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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                </Select>
              </div>
            </div>
            <div className="modalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
<<<<<<< HEAD
                  onClick={handleRemoveTableClose}
=======
                  onClick={() => {
                    setRemoveTableOpen(false);
                    setRemoveVal();
                  }}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="modalconfirmbutton"
<<<<<<< HEAD
                  onClick={handleRemoveTableClose}
=======
                  onClick={handleRemoveTableContent}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Box>
<<<<<<< HEAD
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
=======
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
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
        </div>

        <div className="tablebuttoncontainer">
          <div className="addtablecontainer">
            <button
              className={edittable ? "addtableinactive" : "addtableactive"}
              disabled={edittable ? true : false}
<<<<<<< HEAD
              onClick={() => {handleaddtable() ,console.log("add")}}
=======
              onClick={() => {
                handleaddtable(), console.log("add");
              }}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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
<<<<<<< HEAD
              onClick={handleDuplicateTableOpen}
=======
              onClick={() => setDuplicateTableOpen(true)}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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
<<<<<<< HEAD
              onClick={handleRemoveTableOpen}
=======
              onClick={() => setRemoveTableOpen(true)}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
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
<<<<<<< HEAD
      </div>
=======
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
     
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(TablesPage);
