import React, { useState, useEffect, useContext } from "react";
import "./SettingsPage.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import inputimage from "../../icons/Edit Profile Pict.png";
import { connect, useSelector } from "react-redux";
import { BlockPicker } from "./colorpalette/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faPencil,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useNeonCheckboxStyles } from "./checkbox/index";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

import { useOutlineSelectStyles } from "./select2/index";
import { useTimeSelectStyles } from "./select1/index";
import { PostAddOutlined } from "@material-ui/icons";
import TopBar from "../TopBar/TopBar";
import { SocketContext } from "../../socketContext";
import { sessionService } from "redux-react-session";
import { ThreeDots } from "react-loader-spinner";

function SettingsPage({ tenant }) {
  const localUrl = process.env.REACT_APP_TENANTURL;
  const imageUrl = process.env.REACT_APP_IMAGEURL;

  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);

  // socket connection
  const socket = useContext(SocketContext);
  console.log("socket context:", SocketContext);
  console.log("socket", socket);

  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      console.log("mounted");
      if (tenant.tenant_id != undefined) {
        const url = localUrl + "/user/" + tenant.tenant_id;
        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTenantData([result.data]);
              setTenantRetrieved(() => true);
            } else {
              setTenantRetrieved(() => false);
            }
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenant, tenantRetrieved]);

  useEffect(() => {
    if (socket) {
      socket.on('update user', (data) => handleUserUpdated(data));

      console.log("I am setting socket",socket.on('update user', (data) => handleUserUpdated(data)) );
    }
  });

  const [color, setColor] = useState();
  const [profileName, setProfileName] = useState();
  const [taxchargeedit, setTaxChargeEdit] = useState(false);
  const [servicechargeedit, setServiceChargeEdit] = useState(false);
  const [LocationTextEdit, setLocationTextEdit] = useState(false);
  const [PhoneTextEdit, setPhoneTextEdit] = useState(false);
  const [AddressTextEdit, setAddressTextEdit] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [taxChargeValue, setTaxChargeValue] = useState();
  const [serviceChargeValue, setServiceChargeValue] = useState();
  const [textAddress, setTextAddress] = useState();
  const [textLocation, setTextLocation] = useState();
  const [textPhone, setTextPhone] = useState();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenantRetrieved === true) {
        setProfileName(tenantData[0].name);
        setTextPhone(tenantData[0].phoneNumber);
        setColor(tenantData[0].profileColor);
        setTextAddress(tenantData[0].address);
        setTextLocation(tenantData[0].location);
        setTaxChargeValue(tenantData[0].taxCharge);
        setServiceChargeValue(tenantData[0].serviceCharge);
        console.log("Tenant Data socket is called");
        setProfileImage(tenantData[0].profileImage);
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenantRetrieved, tenantData]);

  function handleUserUpdated(user) {
    console.log("update SOCKET IS CALLED!!!!!!!!!")
    if (tenantRetrieved) {
      let newData = tenantData.splice();

     
      newData.push(user);
      setTenantData(newData);
      console.log("new data is", newData)
    }
    console.log("tenant new data is", tenantData)
  }


  async function HandleSaveProfile() {
    setEditprofile(false);
    setSettingSavedNotif(true);
    setTimeout(() => {
      setSettingSavedNotif(false);
    }, 3000); 

    var tenantID= tenant.tenant_id;
    console.log("tenant IDDDDD:", tenantID);
    const profileUrl = imageUrl + "/avatar/" + tenant.tenant_id;
    var input = document.querySelector('input[type="file"]');
    console.log(input);
    console.log(input.files[0]);
    let formData = new FormData();
    formData.append("avatar", input.files[0]);
    console.log(formData);
    fetch(profileUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error Upload Logo:", error);
      });

    const editUrl = localUrl + "/edit/" + tenant.tenant_id;

    fetch(editUrl, {
      method: "POST",
      body: JSON.stringify({
        tenant_id: tenant.tenant_id,
        profileName: profileName,
        profileColor: color,
        profileImage: imageUrl + "/avatar/render/" + tenant.tenant_id + ".jpg",
      }),
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("settings data is:       ", result.data)
        socket.emit('update user', result.data);
        sessionService.saveUser(result.data);
        console.log("SOCKET IS EMITTED!!!!!!!!!",  socket.emit('update user', result.data))
      });
  }
  //console.log("change2?", textareatext);

  async function handleTaxChargeEdit() {
    setTaxChargeEdit(() => !taxchargeedit);

    if (taxchargeedit == true) {
      const url = localUrl + "/edit/taxcharges";
      console.log("sent to backend, value : " + taxChargeValue);

      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          tenant_id: tenant.tenant_id,
          charges: taxChargeValue,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          socket.emit('update user', result.data);
          console.log(result);
        });
    }
  }

  async function handleServiceChargeEdit() {
    setServiceChargeEdit(() => !servicechargeedit);

    if (servicechargeedit == true) {
      const url = localUrl + "/edit/servicecharges";
      console.log("sent to backend, value : " + serviceChargeValue);

      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          tenant_id: tenant.tenant_id,
          charges: serviceChargeValue,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          socket.emit('update user', result.data);
          console.log(result);
        });
    }
  }

  async function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  async function handleAddressTextEdit() {
    setAddressTextEdit(() => !AddressTextEdit);

    if (AddressTextEdit == true) {
      const editUrl = localUrl + "/edit/" + tenant.tenant_id;

      fetch(editUrl, {
        method: "POST",
        body: JSON.stringify({
          address: textAddress,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          socket.emit('update user', result.data);
       
        });
    }
  }

  async function handleLocationTextEdit() {
    setLocationTextEdit(() => !LocationTextEdit);

    if (LocationTextEdit == true) {
      const editUrl = localUrl + "/edit/" + tenant.tenant_id;

      fetch(editUrl, {
        method: "POST",
        body: JSON.stringify({
          location: textLocation,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          socket.emit('update user', result.data);
       
        });
    }
  }

  async function handlePhoneTextEdit() {
    setPhoneTextEdit(() => !PhoneTextEdit);

    if (PhoneTextEdit == true) {
      const editUrl = localUrl + "/edit/" + tenant.tenant_id;

      fetch(editUrl, {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: textPhone,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          socket.emit('update user', result.data);
       
        });
    }
  }

  const daysInAWeek = [
    {
      name: "Monday",
      initial: "M",
      isSelected: false,
    },
    {
      name: "Tuesday",
      initial: "T",
      isSelected: false,
    },
    {
      name: "Wednesday",
      initial: "W",
      isSelected: false,
    },
    {
      name: "Thursday",
      initial: "T",
      isSelected: false,
    },
    {
      name: "Friday",
      initial: "F",
      isSelected: false,
    },
    {
      name: "Saturday",
      initial: "S",
      isSelected: false,
    },
    {
      name: "Sunday",
      initial: "S",
      isSelected: false,
    },
  ];

  const [OpenTimeEdit, setOpenTimeEdit] = useState(false);

  const [editprofile, setEditprofile] = useState(false);
  const handleEditprofileopen = () => setEditprofile(true);
  const handleEditProfileClose = () => setEditprofile(false);

  const [day, setDay] = useState();
  const [open24hrs, setOpen24hrs] = useState(false);
  const [isclosed, setIsClosed] = useState(false);
  const [opentimehour, setOpenTimeHour] = useState();
  const [opentimeminute, setOpenTimeMinute] = useState();
  const [opentimetf, setOpenTimeTF] = useState();
  const [closedtimehour, setClosedTimeHour] = useState();
  const [closedtimeminute, setClosedTimeMinute] = useState();
  const [closedtimetf, setClosedTimeTF] = useState();
  const [openhouredit, setOpenHourEdit] = useState(false);
  const neonStyles = useNeonCheckboxStyles();

  function handleOpenHourEditOpen(
    day,
    is24hrs,
    isclosed,
    openh,
    openm,
    opentf,
    closeh,
    closem,
    closetf
  ) {
    setOpenHourEdit(true);
    setDay(day);
    setOpen24hrs(is24hrs);
    setIsClosed(isclosed);
    setOpenTimeHour(openh);
    setOpenTimeMinute(openm);
    setOpenTimeTF(opentf);
    setClosedTimeHour(closeh);
    setClosedTimeMinute(closem);
    setClosedTimeTF(closetf);
    // console.log(day);
  }

  function DateAndTimeModal() {
    const [daysSelected, setDaysSelected] = useState([]);
    const url = localUrl + "/edit/openinghours/" + tenant.tenant_id;

    function handlesavehour() {
      function verifyTime() {
        if (closedtimetf == opentimetf) {
          if (closedtimehour == opentimehour) {
            if (closedtimeminute <= opentimeminute) {
              console.log("Closed time cant be earlier than open time");
              return false;
            }
          } else if (closedtimehour < opentimehour) {
            console.log("Closed time cant be earlier than open time");
            return false;
          }
        } else if (closedtimetf == "AM" && opentimetf == "PM") {
          console.log("Closed time cant be earlier than open time");
          return false;
        } else {
          return true;
        }
      }

      if (verifyTime) {
        setOpenHourEdit((state) => !state);
        daysSelected.map((item, index) => {
          const payload = JSON.stringify({
            day: item,
            is24Hours: open24hrs,
            isClosed: isclosed,
            OpenHour: opentimehour,
            OpenMins: opentimeminute,
            OpenTF: opentimetf,
            CloseHour: closedtimehour,
            CloseMins: closedtimeminute,
            CloseTF: closedtimetf,
          });

          console.log(payload);

          fetch(url, {
            method: "POST",
            body: payload,
            headers: { "content-type": "application/JSON" },
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              socket.emit('update user', result.data);
              sessionService.saveUser(result.data);
              setDaysSelected([]);
            });
        });
      }
    }

    console.log(daysSelected);
    function renderButton(item, index) {
      const [selected, setSelected] = useState(false);

      useEffect(() => {
        if (item.name == day) {
          setSelected(true);
          daysSelected.indexOf(item.name) === -1
            ? daysSelected.push(item.name)
            : null;
        }
      }, [day]);

      useEffect(() => {
        if (item.name == daysSelected) {
          setSelected(true);
        }
        if (item.name != daysSelected) {
          setSelected(false);
        }
      }, [daysSelected]);

      return (
        <button
        style={selected? {background: tenant.profileColor, borderColor: tenant.profileColor, color:"#fff"} : null}
          type="button"
          className={selected ? "daysbutton" : "daysbuttonoff"}
          onClick={() => {
            setSelected((state) => !state);
            daysSelected.indexOf(item.name) === -1
              ? daysSelected.push(item.name)
              : daysSelected.splice(daysSelected.indexOf(item.name), 1);
          }}
        >
          {item.initial}
        </button>
      );
    }

    function handle24checked(event) {
      setOpen24hrs((state) => !state);
      if (open24hrs) {
        setIsClosed(() => false);
      }
      if (isclosed) {
        setIsClosed(() => false);
      }
    }

    function handleclosedchecked(event) {
      setIsClosed((state) => !state);
      if (open24hrs) {
        setOpen24hrs(() => false);
      }
      if (isclosed) {
        setOpen24hrs(() => false);
      }
    }

    return (
      <Modal open={openhouredit}>
        <Box className="openhourbox">
          <div className="openhourinnerbox">
            <div className="openhourmodaltitle">Select Days & Time</div>

            <form>
              <div className="openhourinnermodalbox">
                <div className="days">
                  {daysInAWeek.map((item, index) => renderButton(item, index))}
                </div>

                <div className="checkbox">
                  <FormControlLabel
                    control={
                      <Checkbox
                        disableRipple
                        checked={open24hrs}
                        onChange={handle24checked}
                        classes={neonStyles}
                        checkedIcon={<span />}
                        icon={<span />}
                      />
                    }
                    label="24 Hours"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disableRipple
                        checked={isclosed}
                        onChange={handleclosedchecked}
                        classes={neonStyles}
                        checkedIcon={<span />}
                        icon={<span />}
                        
                      />
                    }
                    label="Closed"
                  />
                </div>

                <div className="time">
                  <div className="opentime">
                    <div
                      className={
                        open24hrs || isclosed ? "timelabel" : "timelabelactive"
                      }
                    >
                      Open Time
                    </div>
                    <div className="timeinputcontainer">
                      <div className="timeinputs">
                        <Select
                          defaultValue={opentimehour}
                          disableUnderline
                          disabled={open24hrs || isclosed ? true : false}
                          classes={
                            open24hrs || isclosed
                              ? { root: timeSelectClasses.selectdisabled }
                              : { root: timeSelectClasses.select }
                          }
                          MenuProps={timemenuProps}
                          value={opentimehour}
                          IconComponent={timeiconComponent}
                          onChange={(e) => setOpenTimeHour(e.target.value)}
                        >
                          <MenuItem value="00">00</MenuItem>
                          <MenuItem value="01">01</MenuItem>
                          <MenuItem value="02">02</MenuItem>
                          <MenuItem value="03">03</MenuItem>
                          <MenuItem value="04">04</MenuItem>
                          <MenuItem value="05">05</MenuItem>
                          <MenuItem value="06">06</MenuItem>
                          <MenuItem value="07">07</MenuItem>
                          <MenuItem value="08">08</MenuItem>
                          <MenuItem value="09">09</MenuItem>
                          <MenuItem value="10">10</MenuItem>
                          <MenuItem value="11">11</MenuItem>
                          <MenuItem value="12">12</MenuItem>
                        </Select>

                        <div
                          className={
                            open24hrs || isclosed
                              ? "semicolon"
                              : "semicolonactive"
                          }
                        >
                          :
                        </div>
                        <Select
                          defaultValue={opentimeminute}
                          disableUnderline
                          disabled={open24hrs || isclosed ? true : false}
                          classes={
                            open24hrs || isclosed
                              ? { root: timeSelectClasses.selectdisabled }
                              : { root: timeSelectClasses.select }
                          }
                          MenuProps={timemenuProps}
                          value={opentimeminute}
                          IconComponent={timeiconComponent}
                          onChange={(e) => setOpenTimeMinute(e.target.value)}
                        >
                          <MenuItem value="00">00</MenuItem>
                          <MenuItem value="05">05</MenuItem>
                          <MenuItem value="10">10</MenuItem>
                          <MenuItem value="15">15</MenuItem>
                          <MenuItem value="20">20</MenuItem>
                          <MenuItem value="25">25</MenuItem>
                          <MenuItem value="30">30</MenuItem>
                          <MenuItem value="35">35</MenuItem>
                          <MenuItem value="40">40</MenuItem>
                          <MenuItem value="45">45</MenuItem>
                          <MenuItem value="50">50</MenuItem>
                          <MenuItem value="55">55</MenuItem>
                        </Select>
                      </div>
                      <div className="timeselector">
                        <Select
                          defaultValue={opentimetf}
                          disableUnderline
                          disabled={open24hrs || isclosed ? true : false}
                          classes={
                            open24hrs || isclosed
                              ? { root: outlineSelectClasses.selectdisabled }
                              : { root: outlineSelectClasses.select }
                          }
                          MenuProps={menuProps}
                          value={opentimetf}
                          IconComponent={iconComponent}
                          onChange={(e) => setOpenTimeTF(e.target.value)}
                        >
                          <MenuItem value="AM">AM</MenuItem>
                          <MenuItem value="PM">PM</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="closetime">
                    <div
                      className={
                        open24hrs || isclosed ? "timelabel" : "timelabelactive"
                      }
                    >
                      Closed Time
                    </div>
                    <div className="timeinputcontainer">
                      <div className="timeinputs">
                        <Select
                          defaultValue={closedtimehour}
                          disableUnderline
                          disabled={open24hrs || isclosed ? true : false}
                          classes={
                            open24hrs || isclosed
                              ? { root: timeSelectClasses.selectdisabled }
                              : { root: timeSelectClasses.select }
                          }
                          MenuProps={timemenuProps}
                          value={closedtimehour}
                          IconComponent={timeiconComponent}
                          onChange={(e) => setClosedTimeHour(e.target.value)}
                        >
                          <MenuItem value="00">00</MenuItem>
                          <MenuItem value="01">01</MenuItem>
                          <MenuItem value="02">02</MenuItem>
                          <MenuItem value="03">03</MenuItem>
                          <MenuItem value="04">04</MenuItem>
                          <MenuItem value="05">05</MenuItem>
                          <MenuItem value="06">06</MenuItem>
                          <MenuItem value="07">07</MenuItem>
                          <MenuItem value="08">08</MenuItem>
                          <MenuItem value="09">09</MenuItem>
                          <MenuItem value="10">10</MenuItem>
                          <MenuItem value="11">11</MenuItem>
                          <MenuItem value="12">12</MenuItem>
                        </Select>

                        <div
                          className={
                            open24hrs
                              ? isclosed
                                ? "semicolonactive"
                                : "semicolon"
                              : "semicolon"
                          }
                        >
                          :
                        </div>
                        <Select
                          defaultValue={closedtimeminute}
                          disableUnderline
                          disabled={open24hrs || isclosed ? true : false}
                          classes={
                            open24hrs || isclosed
                              ? { root: timeSelectClasses.selectdisabled }
                              : { root: timeSelectClasses.select }
                          }
                          MenuProps={timemenuProps}
                          value={closedtimeminute}
                          IconComponent={timeiconComponent}
                          onChange={(e) => setClosedTimeMinute(e.target.value)}
                        >
                          <MenuItem value="00">00</MenuItem>
                          <MenuItem value="05">05</MenuItem>
                          <MenuItem value="10">10</MenuItem>
                          <MenuItem value="15">15</MenuItem>
                          <MenuItem value="20">20</MenuItem>
                          <MenuItem value="25">25</MenuItem>
                          <MenuItem value="30">30</MenuItem>
                          <MenuItem value="35">35</MenuItem>
                          <MenuItem value="40">40</MenuItem>
                          <MenuItem value="45">45</MenuItem>
                          <MenuItem value="50">50</MenuItem>
                          <MenuItem value="55">55</MenuItem>
                        </Select>
                      </div>
                      <div className="timeselector">
                        <Select
                          defaultValue={closedtimetf}
                          disableUnderline
                          disabled={open24hrs || isclosed ? true : false}
                          classes={
                            open24hrs || isclosed
                              ? { root: outlineSelectClasses.selectdisabled }
                              : { root: outlineSelectClasses.select }
                          }
                          MenuProps={menuProps}
                          value={closedtimetf}
                          IconComponent={iconComponent}
                          onChange={(e) => setClosedTimeTF(e.target.value)}
                        >
                          <MenuItem value="AM">AM</MenuItem>
                          <MenuItem value="PM">PM</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="openhourmodalbutton">
              <button
              style={{color: tenant.profileColor}}
                onClick={() => {
                  setDay();
                  setOpenHourEdit((state) => !state);
                  setDaysSelected([]);
                }}
                className="cancelbutton"
              >
                Cancel
              </button>

              <button
              style={{background: tenant.profileColor}}
                type="submit"
                onClick={handlesavehour}
                className="savebutton"
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  }

  //select inputs

  const timeSelectClasses = useTimeSelectStyles();
  const outlineSelectClasses = useOutlineSelectStyles();

  // moves the menu below the select input
  const timemenuProps = {
    classes: {
      paper: timeSelectClasses.paper,
      list: timeSelectClasses.list,
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

  const timeiconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon
        className={props.className + " " + timeSelectClasses.icon}
      />
    );
  };

  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon
        className={
          open24hrs
            ? isclosed
              ? props.className + " " + outlineSelectClasses.icondisabled
              : props.className + " " + outlineSelectClasses.icondisabled
            : props.className + " " + outlineSelectClasses.icon
        }
      />
    );
  };

  const [settingsavednotif, setSettingSavedNotif] = useState(false);
  function handlenotification() {
    if (settingsavednotif) {
      setSettingSavedNotif(false);
    }
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left"  style={{color: tenant.profileColor}}>Settings</div>

        <TopBar />
      </div>

      {DateAndTimeModal()}

      <Modal open={editprofile}>
        <Box className="editprofilebox">
          <div className="editprofileinnerbox">
            <div className="editprofilemodaltitle">Edit Profile</div>

            <form>
              <div className="editprofileinnermodalbox">
                <div className="editprofileleftmodalcolumn">
                  <div className="profileinputtext">
                    <div className="editprofileinputlabel">Restaurant Name</div>
                    <div className="inputtext">
                      <input
                        type="text"
                        className="editprofileinputfile"
                        defaultValue={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                      />
                    </div>
                    <div className="editprofileinputlabel">Profile Color</div>

                    <div className="colorpaletteselector">
                      <BlockPicker
                        color={color}
                        onChange={(color) => {
                          setColor(color.hex);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="rightmodalcolumn">
                  <div className="editprofileinputimage">
                    <div className="editprofileinputlabel">Product Picture</div>
                    <div className="editprofileimagecontainer">
                      <img
                        src={profileImage}
                        // src={profileImage + "?time" + new Date()}
                        className="editprofileimage"
                      />
                    </div>
                    <div className="editprofileimagebuttoncontainer">
                      <div className="imagebuttoncontainer">
                      <div className="promoimagebutton" style={{background: tenant.profileColor}}>
                          <label htmlFor="file-input">
                          <FontAwesomeIcon
                                  icon={faPencil}
                                  className="promoinput"/>
                          </label>

                          <input
                            id="file-input"
                            type="file"
                            name="avatar"
                            accept=".png, .jpg"
                            className="productinputfile"
                            onChange={imageHandler}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="editprofilemodalbutton">
              <button
              style={{color: tenant.profileColor}}
                onClick={() => setEditprofile(false)}
                className="cancelbutton"
              >
                Cancel
              </button>

              <button
              style={{background: tenant.profileColor}}
                type="submit"
                onClick={HandleSaveProfile}
                className="savebutton"
              >
                Save Profile
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      {tenantRetrieved ? (
        <div className="settingsoutercontainer">
          <div
           style={{background: tenant.profileColor}}
            className={settingsavednotif ? "settingsnotification" : "hidden"}
          >
            <div className="notificationtextcontainer">
              <div className="notificationtext">Settings Saved</div>
            </div>
        
        

            <div className="notificationclose">
              <button className="notifclosebutton" onClick={handlenotification}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>

          <div className="settingscontainer">
            <div className="settingsheader">
              <div className="headertext">Profile</div>
              <div className="settingscontent">
                <div className="profilesettings">
                  <div className="profilecontainer">
                    <div className="profileimg">
                      <img
                        className="profilelogo"
                        // src={profileImage}
                        src={profileImage + "?time" + new Date()}
                      />
                    </div>
                    <div className="profilename">
                      <div className="restaurantname">{profileName}</div>
                      <div className="profilecolor">
                        <div className="profilecolortext">Profile color: </div>
                        <div
                          className="profilecolorimg"
                          style={{ background: color }}
                        ></div>
                      </div>
                    </div>
                    <div className="editprofile">
                      <button
                       style={{background: tenant.profileColor}}
                        className="editprofilebutton"
                        onClick={handleEditprofileopen}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  

                  <div className="profilecontainer2">
                  <div className="profileaddressheader">
                      <div className="profiletitle">Phone Number</div>
                      <div className="editcontainer">
                        <button
                         style={ PhoneTextEdit?  {borderColor: tenant.profileColor, color: tenant.profileColor}: {background: tenant.profileColor} }
                          className={
                            
                            PhoneTextEdit
                              ? "editbuttoncontainer"
                              : "editbuttoncontaineractive"
                          }
                          type="button"
                          onClick={() => handlePhoneTextEdit()}
                        >
                          {PhoneTextEdit ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                    <form>
                      {tenantRetrieved == true && (
                        <textarea
                          disabled={PhoneTextEdit ? false : true}
                          value={textPhone}
                          className="profilelocation"
                          onChange={(e) => setTextPhone(e.target.value)}
                        />
                      )}
                    </form>
                  <div className="profileaddressheader">
                      <div className="profiletitle">Location</div>
                      <div className="editcontainer">
                        <button
                        style={ LocationTextEdit?  {borderColor: tenant.profileColor, color: tenant.profileColor}: {background: tenant.profileColor} }
                          className={
                            LocationTextEdit
                              ? "editbuttoncontainer"
                              : "editbuttoncontaineractive"
                          }
                          type="button"
                          onClick={() => handleLocationTextEdit()}
                        >
                          {LocationTextEdit ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                    <form>
                      {tenantRetrieved == true && (
                        <textarea
                          disabled={LocationTextEdit ? false : true}
                          value={textLocation}
                          className="profilelocation"
                          onChange={(e) => setTextLocation(e.target.value)}
                        />
                      )}
                    </form>

                    <div className="profileaddressheader">
                      <div className="profiletitle">Address</div>
                      <div className="editcontainer">
                        <button
                        style={ AddressTextEdit?  {borderColor: tenant.profileColor, color: tenant.profileColor}: {background: tenant.profileColor} }
                          className={
                            AddressTextEdit
                              ? "editbuttoncontainer"
                              : "editbuttoncontaineractive"
                          }
                          type="button"
                          onClick={() => handleAddressTextEdit()}
                        >
                          {AddressTextEdit ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                    <form>
                      {tenantRetrieved == true && (
                        <textarea
                          disabled={AddressTextEdit ? false : true}
                          value={textAddress}
                          className="profileaddress"
                          onChange={(e) => setTextAddress(e.target.value)}
                        />
                      )}
                    </form>

                    <div className="profileopenheader">
                      <div className="profiletitle">Opening Hour</div>
                      <div className="editcontainer">
                        <button
                        style={ OpenTimeEdit?  {borderColor: tenant.profileColor, color: tenant.profileColor}: {background: tenant.profileColor} }
                          className={
                            OpenTimeEdit
                              ? "editbuttoncontainer"
                              : "editbuttoncontaineractive"
                          }
                          type="button"
                          onClick={() => setOpenTimeEdit((state) => !state)}
                        >
                          {OpenTimeEdit ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>

                    <div className="profileopen">
                      {tenantRetrieved == true &&
                        tenantData[0].openingDays.map((item, index) => {
                          // console.log(item)
                          return (
                            <div className="opentext">
                              <div className="openleft">{item.day}</div>
                              <div className="openright">
                                {item.is24Hours ? (
                                  "Open 24 hours"
                                ) : item.isClosed ? (
                                  "Closed"
                                ) : (
                                  <>
                                    {item.OpenHour}:{item.OpenMins}&nbsp;
                                    {item.OpenTF}&nbsp;-&nbsp;
                                    {item.CloseHour}:{item.CloseMins}&nbsp;
                                    {item.CloseTF}
                                  </>
                                )}
                                <FontAwesomeIcon
                                style={{color: tenant.profileColor}}
                                  icon={faPencil}
                                  className={
                                    OpenTimeEdit ? "edithouricon" : "hidden"
                                  }
                                  onClick={() => {
                                    handleOpenHourEditOpen(
                                      item.day,
                                      item.is24Hours,
                                      item.isClosed,
                                      item.OpenHour,
                                      item.OpenMins,
                                      item.OpenTF,
                                      item.CloseHour,
                                      item.CloseMins,
                                      item.CloseTF
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="settingsinsidegrid">
              <div className="taxandservicecontainer">
                <div className="headertext">Tax & Service Charge</div>
                <div className="taxsettings">
                  <div className="taxcontents">
                    <div className="taxtext">Tax Charge</div>
                    <div className="taxdetails">
                      <div className="percentagetext" style={{background: tenant.profileColor}}>
                        {tenantRetrieved && (
                          <div>
                            <input
                              type="number"
                              className="percentageinput"
                              disabled={taxchargeedit == true ? false : true}
                              defaultValue={taxChargeValue}
                              onChange={(e) =>
                                setTaxChargeValue(e.target.value)
                              }
                            />
                            %
                          </div>
                        )}
                      </div>
                      <div className="taxedit">
                        <button
                        style={{color: tenant.profileColor}}
                          type="button"
                          className="taxeditbutton"
                          onClick={handleTaxChargeEdit}
                        >
                          {taxchargeedit ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="taxcontents">
                    <div className="taxtext">Service Charge</div>
                    <div className="taxdetails">
                      <div className="percentagetext" style={{background: tenant.profileColor}}>
                        <input
                          type="number"
                          className="percentageinput"
                          disabled={servicechargeedit == true ? false : true}
                          defaultValue={serviceChargeValue}
                          onChange={(e) =>
                            setServiceChargeValue(e.target.value)
                          }
                        />
                        %
                      </div>
                      <div className="taxedit">
                        <button
                        style={{color: tenant.profileColor}}
                          type="button"
                          className="taxeditbutton"
                          onClick={handleServiceChargeEdit}
                        >
                          {servicechargeedit ? "Save" : "Edit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="helpcontainer">
                <div className="headertext">Help</div>
                <div className="helpsettings">
                  <div className="helpcontents">
                    <div className="helptext">
                      If you need help, you can contact our management at the
                      button below
                    </div>
                    <div style={{ width: "90%" }}>
                      <div className="helpbuttoncontainer">
                        <button style={{background: tenant.profileColor}} className="helpbutton">
                          <FontAwesomeIcon
                            className="helpicons"
                            icon={faEnvelope}
                          />
                          Email
                        </button>
                        <button style={{background: tenant.profileColor}} className="helpbutton2">
                          
                          <FontAwesomeIcon
                            className="helpicons"
                            icon={faPhone}
                          />
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeDots color={tenant.profileColor} height={80} width={80} />
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ session }) {
  console.log("session user", session.user);
  return { tenant: session.user };
}

console.log(mapStateToProps);
export default connect(mapStateToProps)(SettingsPage);
