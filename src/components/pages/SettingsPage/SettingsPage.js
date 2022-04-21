import React, { useState, useEffect } from "react";
import "../TopBar.css";
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
  faXmark
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

function SettingsPage({ tenant }) {

  const localUrl = process.env.REACT_APP_TENANTURL;
  console.log(localUrl)

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

  //put the current color
  const [color, setColor] = useState();
  const [profileName, setProfileName] = useState();

  const [formValues, setFormValues] = useState("");

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

  const [ tenantRetrieved, setTenantRetrieved ] = useState(false);

  useEffect(() => {
    console.log('called')
    if ( tenant != undefined ) {
      console.log('retrieved', tenant.tenant_id)
      setTenantRetrieved(() => true)
    } else {
      console.log('not retrieved', tenant.tenant_id)
      setTenantRetrieved(() => false);
    }
  }, [tenant, tenantRetrieved])
  

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
    const url = 'http://localhost:5000/api/tenant/edit/openinghours/';

    function handlesavehour() {

      function verifyTime() {
        if ( closedtimetf == opentimetf ) { 
          if ( closedtimehour == opentimehour ) {
            if ( closedtimeminute <= opentimeminute ) { 
              console.log('Closed time cant be earlier than open time');
              return false;
            };
          } else if ( closedtimehour < opentimehour ) { 
            console.log('Closed time cant be earlier than open time');
            return false;
          }
        } else if ( closedtimetf == 'AM' && opentimetf == 'PM' ) {
          console.log('Closed time cant be earlier than open time');
          return false;
        } else {
          return true;
        }
      }

      if ( verifyTime ) {
        setOpenHourEdit((state) => !state);
        daysSelected.map((item, index) => {
          const payload = JSON.stringify({
            tenant_id : tenant.tenant_id,
            day       : item,
            is24Hours : open24hrs,
            isClosed  : isclosed,
            OpenHour  : opentimehour,
            OpenMins  : opentimeminute,
            OpenTF    : opentimetf,
            CloseHour : closedtimehour,
            CloseMins : closedtimeminute,
            CloseTF   : closedtimetf,
          });

          console.log(payload)
          
          fetch(url, {
            method: "POST",
            body: payload,            
            headers: { "content-type": "application/JSON" },
          })
          .then((response) => response.json())
          .then((result) => {

            console.log(result);  
            setDaysSelected([]);
          });
        })
      }
    }
    
    // console.log(daysSelected);
    function renderButton(item, index) {
      const [selected, setSelected] = useState(false);

      useEffect(() => {
        if ( item.name == day ) { 
          setSelected(true);
          daysSelected.indexOf(item.name) === -1 ? 
            daysSelected.push(item.name) : null;
        }
      }, [day])

      useEffect(() => {
        if ( item.name == daysSelected ) { setSelected( true ) }
        if ( item.name != daysSelected ) { setSelected( false ) }
      }, [daysSelected])

      return (
        <button
          type="button"
          className={ selected ? "daysbutton" : "daysbuttonoff" }
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
                    <div className={ open24hrs || isclosed ? "timelabel" : "timelabelactive" } >
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
                        (open24hrs || isclosed) ? "timelabel" : "timelabelactive"
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
                          disabled={(open24hrs || isclosed) ? true : false}
                          classes={
                            (open24hrs || isclosed)
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
                onClick={()=> { 
                  // setDay();
                  setOpenHourEdit((state) => !state); 
                  setDaysSelected([]);
                }}
                className="cancelbutton"
              >
                Cancel
              </button>

              <button
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

  //tax settings


  const [taxchargeedit, setTaxChargeEdit] = useState(false);
  const [servicechargeedit, setServiceChargeEdit] = useState(false);
  const [AddressTextEdit, setAddressTextEdit] = useState(false);

  const [taxChargeValue, setTaxChargeValue] = useState();
  const [serviceChargeValue, setServiceChargeValue] = useState();
  const [textAddress, setTextAddress] = useState();

  
  useEffect(() => {
    if ( tenant != undefined ) {
      console.log(tenant)
      setProfileName(() => tenant.name);
      setColor(() => tenant.profileColor);
      setTextAddress(() => tenant.address);
      setTaxChargeValue(() => tenant.taxCharge);
      setServiceChargeValue(() => tenant.serviceCharge);
    }
  }, [tenant])

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
          console.log(result);

        });
    }

  }

  async function handleServiceChargeEdit() {
    setServiceChargeEdit(() => !servicechargeedit);

    if (servicechargeedit == true) {
      const url = localUrl + "/edit/servicecharges";
      console.log("sent to backend, value : " + serviceChargeValue);

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          tenant_id: tenant.tenant_id,
          charges: serviceChargeValue,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handleChangeAddressText(event) {
    setTextAddress(event.target.value);
  }

  const [profileimage, setPofileimage] = useState(tenant.profileimage);

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPofileimage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    alert("A name was submitted: " + profileName);
  }

  async function handleAddressTextEdit() {
    setAddressTextEdit(() => !AddressTextEdit);

    if (AddressTextEdit == true) {
      const url = localUrl + "/edit/profileaddress";
      console.log("sent to backend, value : " + textAddress);

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          tenant_id: tenant.tenant_id,
          address: textAddress,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    }
  }

  function HandleSaveProfile() {
    setEditprofile(false);
    setSettingSavedNotif(true);
    setTimeout(() => {
      setSettingSavedNotif(false);
    }, 5000); //wait 5 seconds

    if (color != tenant.profileColor) {
      const url = localUrl + "/edit/profilecolor";
      console.log("sent to backend, value : " + color);

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          tenant_id: tenant.tenant_id,
          profileColor: color,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    }

    if (profileName != tenant.name) {
      const url = localUrl + "/edit/profilename";
      console.log("sent to backend, value : " + profileName);

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          tenant_id: tenant.tenant_id,
          profileName: profileName,
        }),
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    }
  }

  const [settingsavednotif, setSettingSavedNotif] = useState(false);
  function handlenotification() {
    if (settingsavednotif) {
      setSettingSavedNotif(false);
    } else {
      setSettingSavedNotif(true);
      setTimeout(() => {
        setSettingSavedNotif(false);
      }, 5000); //wait 5 seconds
    }
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Settings</div>

        <div className="right">
          <div className="imagecontainer">
            <img
              src={
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              className="image"
            />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
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
                        defaultValue={tenant.name}
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
                      <img src={profileimage} className="editprofileimage" />
                    </div>
                    <div className="editprofileimagebuttoncontainer">
                      <div className="imagebuttoncontainer">
                        <div className="productimagebutton">
                          <label htmlFor="file-input">
                            <img src={inputimage} />
                          </label>

                          <input
                            id="file-input"
                            type="file"
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
                onClick={() => setEditprofile(false)}
                className="cancelbutton"
              >
                Cancel
              </button>

              <button
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

<div className="settingsoutercontainer">
<div className={settingsavednotif ? "settingsnotification" : "hidden"}>
              <div className="notificationtextcontainer">
                <div className="notificationtext">Settings Saved</div>
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
      <div className="settingscontainer">
     
            
        <div className="settingsheader">
          <div className="headertext">Profile</div>
          <div className="settingscontent">
            <div className="profilesettings">
              <div className="profilecontainer">
                <div className="profileimg">
                  <img
                    className="profilelogo"
                    src={
                      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                  />
                </div>
                <div className="profilename">
                  <div className="restaurantname">{ tenantRetrieved ? profileName : 'NULL' }</div>
                  <div className="profilecolor">
                    <div className="profilecolortext">Profile color: </div>
                    <div
                      className="profilecolorimg"
                      style={{ background: tenant.profileColor }}
                    ></div>
                  </div>
                </div>
                <div className="editprofile">
                  <button
                    className="editprofilebutton"
                    onClick={handleEditprofileopen}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="profilecontainer2">
                <div className="profileaddressheader">
                  <div className="profiletitle">Address</div>
                  <div className="editcontainer">
                    <button
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
                <form onSubmit={(event) => handleOnSubmit(event)}>
                  { tenantRetrieved &&
                    <textarea
                      disabled={AddressTextEdit ? false : true}
                      value={textAddress}
                      className="profileaddress"
                      onChange={handleChangeAddressText}
                    />
                  }     
                </form>

                <div className="profileopenheader">
                  <div className="profiletitle">Opening Hour</div>
                  <div className="editcontainer">
                    <button
                      className={
                        OpenTimeEdit
                          ? "editbuttoncontainer"
                          : "editbuttoncontaineractive"
                      }
                      type="button"
                      onClick={()=> setOpenTimeEdit((state)=> !state)}
                    >
                      {OpenTimeEdit ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>

                <div className="profileopen">
                { 
                  tenantRetrieved == true && 
                  tenant.openingDays.map((item, index) => {     
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
                            {item.OpenHour}:{item.OpenMins}&nbsp;{item.OpenTF}&nbsp;-&nbsp;
                            {item.CloseHour}:{item.CloseMins}&nbsp;{item.CloseTF}
                          </>
                        )}
                        <FontAwesomeIcon
                          icon={faPencil}
                          className={OpenTimeEdit ? "edithouricon" : "hidden"}
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
                    )
                  })
                }
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
                  <div className="percentagetext">
                  { tenantRetrieved &&
                    <div>
                      <input
                        type="number"
                        className="percentageinput"
                        disabled={taxchargeedit == true ? false : true}
                        defaultValue={taxChargeValue}
                        onChange={(e) => setTaxChargeValue(e.target.value)}
                      />
                      %
                    </div>
                  }
                  </div>
                  <div className="taxedit">
                    <button
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
                  <div className="percentagetext">
                    <input
                      type="number"
                      className="percentageinput"
                      disabled={servicechargeedit == true ? false : true}
                      defaultValue={serviceChargeValue}
                      onChange={(e) => setServiceChargeValue(e.target.value)}
                    />
                    %
                  </div>
                  <div className="taxedit">
                    <button
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
                  If you need help, you can contact our management at the button
                  below
                </div>
                <div style={{ width: "90%" }}>
                  <div className="helpbuttoncontainer">
                    <button className="helpbutton">
                      <FontAwesomeIcon
                        className="helpicons"
                        icon={faEnvelope}
                      />
                      Email
                    </button>
                    <button className="helpbutton2">
                      <FontAwesomeIcon className="helpicons" icon={faPhone} />
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
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(SettingsPage);
