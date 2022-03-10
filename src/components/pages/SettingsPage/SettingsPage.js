import React, { useState } from "react";
import "../TopBar.css";
import "./SettingsPage.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import inputimage from "../../icons/Edit Profile Pict.png";
import { connect } from "react-redux";
import { BlockPicker } from "./colorpalette/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useNeonCheckboxStyles } from "./checkbox/index";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

import { useOutlineSelectStyles } from "./select2/index";
import { useTimeSelectStyles } from "./select1/index";


function SettingsPage({ tenant }) {
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

  //put the current color
  const [color, setColor] = useState("#424242");

  const [formValues, setFormValues] = useState("");

  const [textareatext, setTextAreaText] = useState(tenant.address);
  const [textareaedit, setTextAreaEdit] = useState(false);

  const [editprofile, setEditprofile] = useState(false);
  const handleEditprofileopen = () => setEditprofile(true);
  const handleEditprofileclose = () => setEditprofile(false);

  const [openhouredit, setOpenHourEdit] = useState(false);
  const handleOpenHourEditOpen = () => setOpenHourEdit(true);
  const handleOpenHourEditClose = () => setOpenHourEdit(false);

  //button
  const buttondata = [
    {
      id: 0,
      name: "M",
      isSelected: false,
    },
    {
      id: 1,
      name: "T",
      isSelected: false,
    },
    {
      id: 2,
      name: "W",
      isSelected: false,
    },
    {
      id: 3,
      name: "T",
      isSelected: false,
    },
    {
      id: 4,
      name: "F",
      isSelected: false,
    },
    {
      id: 5,
      name: "S",
      isSelected: false,
    },
    {
      id: 6,
      name: "S",
      isSelected: false,
    },
  ];

  const [buttonclicked, setButtonClicked] = useState(buttondata);
  function handledaysbuttonclick(selecteditem) {
    const buttonToSelect = buttonclicked.map((item, index) => {
      if (selecteditem === index) item.isSelected = !item.isSelected;
      return item;
    }, []);

    setButtonClicked(buttonToSelect);
    console.log("button array", buttonclicked);
  }

  function renderButton(item, index) {
    const isSelected = buttonclicked[index].isSelected;

    return (
      <button
        type="button"
        className={isSelected ? "daysbutton" : "daysbuttonoff"}
        onClick={() => handledaysbuttonclick(index)}
      >
        {item.name}
      </button>
    );
  }

  //checkbox
  const checkdata = [
    {
      id:0,
      name: 'Open 24 Hours',
      isChecked: false
    },
    {
      id: 1,
      name: 'Closed',
      isChecked: false
    }
  ]

  const neonStyles = useNeonCheckboxStyles();
  const [checked, setChecked] = useState(checkdata);
  const [checkbox, setCheckBox] = useState(false)
  function handlechecked(checkeditem) {
    const checkToSelect = checked.map((item, index) => {
      if (checkeditem === index) item.isChecked = !item.isChecked;
      return item;
    }, []);

    setChecked(checkToSelect);

    if(checkbox){
     

      setCheckBox(false)
      checkbox = !checkbox
    } else {
      setCheckBox(true)
    }
    console.log("check array", checked);
  }

  function renderCheck(item, index) {
    const isChecked = checked[index].isChecked;

    return (
      <FormControlLabel
      control={
        <Checkbox
          disableRipple
          checked={isChecked}
          onChange={()=>handlechecked(index)}
          classes={neonStyles}
          checkedIcon={<span />}
          icon={<span />}
        />
      }
      label={item.name}
    />
    );
  }


  //time inputs
  const [opentimeh, setOpenTimeH] = useState();

  function handleopentimeh(e) {
    setOpenTimeH(e.target.value);
   
  }
  console.log("timeh", opentimeh)

  const [opentimem, setOpenTimeM] = useState();

  function handleopentimem(e) {
    setOpenTimeM(e.target.value);
  }

  const [closetimeh, setCloseTimeH] = useState();

  function handleclosetimeh(e) {
    setCloseTimeH(e.target.value);
  }

  const [closetimem, setCloseTimeM] = useState();

  function handleclosetimem(e) {
    setCloseTimeM(e.target.value);
  }

  function handlesavehour(){
    handleOpenHourEditClose();
    console.log("time is", opentimeh, ":", opentimem, "and ", closetimeh, ":", closetimem )
    setOpenTimeH()
    setOpenTimeM()
    setCloseTimeH()
    setCloseTimeM()
  }

  //select inputs
  const [opentimeselect, setOpenTimeSelect] = useState();
  function handleopentimeselect(e) {
    setOpenTimeSelect(e.target.value);
  }

  const [closetimeselect, setCloseTimeSelect] = useState();
  function handleclosetimeselect(e) {
    setCloseTimeSelect(e.target.value);
  }
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
        className={checkbox? props.className + " " + outlineSelectClasses.icondisabled : props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

  //tax settings
  const [taxchargeedit, setTaxChargeEdit] = useState(false)

  function handleTaxChargeEdit(){
    if(taxchargeedit){
      setTaxChargeEdit(false)
      taxchargeedit = !taxchargeedit
    } else {
      setTaxChargeEdit(true)
    }
  }

  const [taxserviceedit, setTaxServiceEdit] = useState(false)

  function handleTaxServiceEdit(){
    if(taxserviceedit){
      setTaxServiceEdit(false)
      taxserviceedit = !taxserviceedit
    } else {
      setTaxServiceEdit(true)
    }
  }

  const [taxcharge, setTaxCharge] = useState()
  function handleTaxCharge(event){
    setTaxCharge(event.target.value)
  }

  const [servicecharge, setServiceCharge] = useState()
  function handleServiceCharge(event){
    setServiceCharge(event.target.value)
  }

  console.log("tax charge", taxcharge)
  console.log("service charge", servicecharge)

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handleChangeText(event) {
    setTextAreaText(event.target.value);
    //console.log("change?", textareatext);
  }
  //console.log("change2?", textareatext);

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

  function handleChange(color) {
    setColor({ color: color.hex });
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    alert("A name was submitted: " + textareatext);
  }

  function handletextareaedit() {
    if (textareaedit) {
      setTextAreaEdit(false);
      textareaedit = !textareaedit;
    } else {
      setTextAreaEdit(true);
      textareaedit = !textareaedit;
    }
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Settings</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

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
                        value={tenant.name}
                        className="editprofileinputfile"
                        onChange={handleChange}
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
                        src={profileimage}
                        className="editprofileimage"
                      />
                    </div>
                    <div className="editprofileimagebuttoncontainer">
                      <div className="imagebuttoncontainer">
                        <div className="productimagebutton">
                          <label for="file-input">
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
              <button onClick={handleEditprofileclose} className="cancelbutton">
                Cancel
              </button>

              <button
                type="submit"
                onClick={handleEditprofileclose}
                className="savebutton"
              >
                Save Profile
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={openhouredit}>
        <Box className="openhourbox">
          <div className="openhourinnerbox">
            <div className="openhourmodaltitle">Select Days & Time</div>

            <form>
              <div className="openhourinnermodalbox">
                <div className="days">
                  {buttondata.map((item, index) => renderButton(item, index))}
                </div>

                <div className="checkbox">
                {checkdata.map((item, index) => renderCheck(item, index))}
                </div>
                <div className="time">
                  <div className="opentime">
                    <div className={checkbox? "timelabel" : "timelabelactive"}>Open Time</div>
                    <div className="timeinputcontainer">
                      <div className="timeinputs">
                       
                      <Select
                          defaultValue=""
                          disableUnderline
                          disabled={checkbox? true: false}
                          classes={checkbox? { root: timeSelectClasses.selectdisabled }:{root: timeSelectClasses.select}}
                          MenuProps={timemenuProps}
                          IconComponent={timeiconComponent}
                          value={opentimeh}
                          onChange={(value)=>handleopentimeh(value)}
                        >
                 
                          <MenuItem value='01'>01</MenuItem>
                          <MenuItem value='02'>02</MenuItem>
                          <MenuItem value='03'>03</MenuItem>
                          <MenuItem value='04'>04</MenuItem>
                          <MenuItem value='05'>05</MenuItem>
                          <MenuItem value='06'>06</MenuItem>
                          <MenuItem value='07'>07</MenuItem>
                          <MenuItem value='08'>08</MenuItem>
                          <MenuItem value='09'>09</MenuItem>
                          <MenuItem value='10'>10</MenuItem>
                          <MenuItem value='11'>11</MenuItem>
                          <MenuItem value='12'>12</MenuItem>
             
                        </Select>
                       
                        <div className={checkbox? "semicolon" : "semicolonactive"}>:</div>
                        <Select
                          defaultValue=""
                          disableUnderline
                          disabled={checkbox? true: false}
                          classes={checkbox? { root: timeSelectClasses.selectdisabled }:{root: timeSelectClasses.select}}
                          MenuProps={timemenuProps}
                          IconComponent={timeiconComponent}
                          value={opentimem}
                          onChange={(value)=>handleopentimem(value)}
                          
                        >
                        <MenuItem value='00'>00</MenuItem>
                         <MenuItem value='01'>01</MenuItem>
                          <MenuItem value='02'>02</MenuItem>
                          <MenuItem value='03'>03</MenuItem>
                          <MenuItem value='04'>04</MenuItem>
                          <MenuItem value='05'>05</MenuItem>
                          <MenuItem value='06'>06</MenuItem>
                          <MenuItem value='07'>07</MenuItem>
                          <MenuItem value='08'>08</MenuItem>
                          <MenuItem value='09'>09</MenuItem>
                          <MenuItem value='10'>10</MenuItem>
                          <MenuItem value='11'>11</MenuItem>
                          <MenuItem value='12'>12</MenuItem>

                          <MenuItem value='13'>13</MenuItem>
                          <MenuItem value='14'>14</MenuItem>
                          <MenuItem value='15'>15</MenuItem>
                          <MenuItem value='16'>16</MenuItem>
                          <MenuItem value='17'>17</MenuItem>
                          <MenuItem value='18'>18</MenuItem>
                          <MenuItem value='19'>19</MenuItem>
                          <MenuItem value='20'>20</MenuItem>
                          <MenuItem value='21'>21</MenuItem>
                          <MenuItem value='22'>22</MenuItem>
                          <MenuItem value='23'>23</MenuItem>
                          <MenuItem value='24'>24</MenuItem>

                          <MenuItem value='25'>25</MenuItem>
                          <MenuItem value='26'>26</MenuItem>
                          <MenuItem value='27'>27</MenuItem>
                          <MenuItem value='28'>28</MenuItem>
                          <MenuItem value='29'>29</MenuItem>
                          <MenuItem value='30'>30</MenuItem>
                          <MenuItem value='31'>31</MenuItem>
                          <MenuItem value='32'>32</MenuItem>
                          <MenuItem value='33'>33</MenuItem>
                          <MenuItem value='34'>34</MenuItem>
                          <MenuItem value='35'>35</MenuItem>
                          <MenuItem value='36'>36</MenuItem>

                        

                          <MenuItem value='37'>37</MenuItem>
                          <MenuItem value='38'>38</MenuItem>
                          <MenuItem value='39'>39</MenuItem>
                          <MenuItem value='40'>40</MenuItem>
                          <MenuItem value='41'>41</MenuItem>
                          <MenuItem value='42'>42</MenuItem>
                          <MenuItem value='43'>43</MenuItem>
                          <MenuItem value='44'>44</MenuItem>
                          <MenuItem value='45'>45</MenuItem>
                          <MenuItem value='46'>46</MenuItem>
                          <MenuItem value='47'>47</MenuItem>
                          <MenuItem value='48'>48</MenuItem>

                          <MenuItem value='49'>49</MenuItem>
                          <MenuItem value='50'>50</MenuItem>
                          <MenuItem value='51'>51</MenuItem>
                          <MenuItem value='52'>52</MenuItem>
                          <MenuItem value='53'>53</MenuItem>
                          <MenuItem value='54'>54</MenuItem>
                          <MenuItem value='55'>55</MenuItem>
                          <MenuItem value='56'>56</MenuItem>
                          <MenuItem value='57'>57</MenuItem>
                          <MenuItem value='58'>58</MenuItem>
                          <MenuItem value='59'>59</MenuItem>
                          

                          
                        </Select>
                        
                      </div>
                      <div className="timeselector">
                        <Select
                          defaultValue=""
                          disableUnderline
                          disabled={checkbox? true : false}
                          classes={checkbox? { root: outlineSelectClasses.selectdisabled} : { root: outlineSelectClasses.select } }
                          MenuProps={menuProps}
                          IconComponent={iconComponent}
                          value={opentimeselect}
                          onChange={handleopentimeselect}
                        >
                          <MenuItem value={0}>AM</MenuItem>
                          <MenuItem value={1}>PM</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="closetime">
                  <div className={checkbox? "timelabel" : "timelabelactive"}>Closed Time</div>
                  <div className="timeinputcontainer">
                    <div className="timeinputs">
                    <Select
                          defaultValue=""
                          disableUnderline
                          disabled={checkbox? true: false}
                          classes={checkbox? { root: timeSelectClasses.selectdisabled }:{root: timeSelectClasses.select}}
                          MenuProps={timemenuProps}
                          IconComponent={timeiconComponent}
                          value={closetimeh}
                          onChange={(value)=>handleclosetimeh(value)}
                        >
                 
                          <MenuItem value='01'>01</MenuItem>
                          <MenuItem value='02'>02</MenuItem>
                          <MenuItem value='03'>03</MenuItem>
                          <MenuItem value='04'>04</MenuItem>
                          <MenuItem value='05'>05</MenuItem>
                          <MenuItem value='06'>06</MenuItem>
                          <MenuItem value='07'>07</MenuItem>
                          <MenuItem value='08'>08</MenuItem>
                          <MenuItem value='09'>09</MenuItem>
                          <MenuItem value='10'>10</MenuItem>
                          <MenuItem value='11'>11</MenuItem>
                          <MenuItem value='12'>12</MenuItem>
             
                        </Select>
                       
                        <div className={checkbox? "semicolon" : "semicolonactive"}>:</div>
                        <Select
                          defaultValue=""

                          disableUnderline
                          disabled={checkbox? true: false}
                          classes={checkbox? { root: timeSelectClasses.selectdisabled }:{root: timeSelectClasses.select}}
                          MenuProps={timemenuProps}
                          IconComponent={timeiconComponent}
                          value={closetimem}
                          onChange={(value)=>handleclosetimem(value)}
                          
                        >
                        <MenuItem value='00'>00</MenuItem>
                         <MenuItem value='01'>01</MenuItem>
                          <MenuItem value='02'>02</MenuItem>
                          <MenuItem value='03'>03</MenuItem>
                          <MenuItem value='04'>04</MenuItem>
                          <MenuItem value='05'>05</MenuItem>
                          <MenuItem value='06'>06</MenuItem>
                          <MenuItem value='07'>07</MenuItem>
                          <MenuItem value='08'>08</MenuItem>
                          <MenuItem value='09'>09</MenuItem>
                          <MenuItem value='10'>10</MenuItem>
                          <MenuItem value='11'>11</MenuItem>
                          <MenuItem value='12'>12</MenuItem>

                          <MenuItem value='13'>13</MenuItem>
                          <MenuItem value='14'>14</MenuItem>
                          <MenuItem value='15'>15</MenuItem>
                          <MenuItem value='16'>16</MenuItem>
                          <MenuItem value='17'>17</MenuItem>
                          <MenuItem value='18'>18</MenuItem>
                          <MenuItem value='19'>19</MenuItem>
                          <MenuItem value='20'>20</MenuItem>
                          <MenuItem value='21'>21</MenuItem>
                          <MenuItem value='22'>22</MenuItem>
                          <MenuItem value='23'>23</MenuItem>
                          <MenuItem value='24'>24</MenuItem>

                          <MenuItem value='25'>25</MenuItem>
                          <MenuItem value='26'>26</MenuItem>
                          <MenuItem value='27'>27</MenuItem>
                          <MenuItem value='28'>28</MenuItem>
                          <MenuItem value='29'>29</MenuItem>
                          <MenuItem value='30'>30</MenuItem>
                          <MenuItem value='31'>31</MenuItem>
                          <MenuItem value='32'>32</MenuItem>
                          <MenuItem value='33'>33</MenuItem>
                          <MenuItem value='34'>34</MenuItem>
                          <MenuItem value='35'>35</MenuItem>
                          <MenuItem value='36'>36</MenuItem>

                        

                          <MenuItem value='37'>37</MenuItem>
                          <MenuItem value='38'>38</MenuItem>
                          <MenuItem value='39'>39</MenuItem>
                          <MenuItem value='40'>40</MenuItem>
                          <MenuItem value='41'>41</MenuItem>
                          <MenuItem value='42'>42</MenuItem>
                          <MenuItem value='43'>43</MenuItem>
                          <MenuItem value='44'>44</MenuItem>
                          <MenuItem value='45'>45</MenuItem>
                          <MenuItem value='46'>46</MenuItem>
                          <MenuItem value='47'>47</MenuItem>
                          <MenuItem value='48'>48</MenuItem>

                          <MenuItem value='49'>49</MenuItem>
                          <MenuItem value='50'>50</MenuItem>
                          <MenuItem value='51'>51</MenuItem>
                          <MenuItem value='52'>52</MenuItem>
                          <MenuItem value='53'>53</MenuItem>
                          <MenuItem value='54'>54</MenuItem>
                          <MenuItem value='55'>55</MenuItem>
                          <MenuItem value='56'>56</MenuItem>
                          <MenuItem value='57'>57</MenuItem>
                          <MenuItem value='58'>58</MenuItem>
                          <MenuItem value='59'>59</MenuItem>
                          

                          
                        </Select>
                    </div>
                    <div className="timeselector">
                      <Select
                        defaultValue=""
                        disableUnderline
                        disabled={checkbox? true : false}
                        classes={checkbox? { root: outlineSelectClasses.selectdisabled} : { root: outlineSelectClasses.select } }
                      
                        MenuProps={menuProps}
                        IconComponent={iconComponent}
                        value={closetimeselect}
                        onChange={handleclosetimeselect}
                      >
                        <MenuItem value={0}>AM</MenuItem>
                        <MenuItem value={1}>PM</MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </form>
            <div className="openhourmodalbutton">
              <button
                onClick={handleOpenHourEditClose}
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

      <div className="settingscontainer">
        <div className="settingsheader">
          <div className="headertext">Profile</div>
          <div className="settingscontent">
            <div className="profilesettings">
              <div className="profilecontainer">
                <div className="profileimg">
                  <img className="profilelogo" src={tenant.profileimage} />
                </div>
                <div className="profilename">
                  <div className="restaurantname">{tenant.name}</div>
                  <div className="profilecolor">
                    <div className="profilecolortext">Profile color</div>
                    <div
                      className="profilecolorimg"
                      style={{ background: color }}
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
                        textareaedit
                          ? "editbuttoncontainer"
                          : "editbuttoncontaineractive"
                      }
                      type="button"
                      onClick={() => handletextareaedit()}
                    >
                      {textareaedit ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>
                <form onSubmit={(event) => handleOnSubmit(event)}>
                  <textarea
                    disabled={textareaedit ? false : true}
                    value={textareatext}
                    className="profileaddress"
                    onChange={handleChangeText}
                  />
                </form>

                <div className="profileopenheader">
                  <div className="profiletitle">Opening Hour</div>
                  <div className="editcontainer">
                    <button
                      className={
                        textareaedit
                          ? "editbuttoncontainer"
                          : "editbuttoncontaineractive"
                      }
                      type="button"
                      onClick={handleOpenHourEditOpen}
                    >
                      {textareaedit ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>

                <div className="profileopen">
                  <div className="opentext">
                    <div className="openleft">Monday</div>
                    <div className="openright">8 AM - 21 PM</div>
                  </div>

                  <div className="opentext">
                    <div className="openleft">Tuesday</div>
                    <div className="openright">8 AM - 21 PM</div>
                  </div>

                  <div className="opentext">
                    <div className="openleft">Wednesday</div>
                    <div className="openright">8 AM - 21 PM</div>
                  </div>

                  <div className="opentext">
                    <div className="openleft">Thursday</div>
                    <div className="openright">8 AM - 21 PM</div>
                  </div>

                  <div className="opentext">
                    <div className="openleft">Friday</div>
                    <div className="openright">8 AM - 21 PM</div>
                  </div>

                  <div className="opentext">
                    <div className="openleft">Saturday</div>
                    <div className="openright">Closed</div>
                  </div>

                  <div className="opentext">
                    <div className="openleft">Sunday</div>
                    <div className="openright">Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settingsinsidegrid">
          <div className="taxandservicecontainer">
            <div className="headertext">Tax & Servive Charge</div>
            <div className="taxsettings">
              <div className="taxcontents">
                <div className="taxtext">Tax Charge</div>
                <div className="taxdetails">
                  <div className="percentagetext">
                  <input type="number" className="percentageinput" disabled={taxchargeedit? false : true} value={taxcharge} onChange={(e)=>handleTaxCharge(e)}/>
                    %
                  </div>
                  <div className="taxedit">
                  <button type="button" className="taxeditbutton" onClick={handleTaxChargeEdit}>{taxchargeedit? "Save" : "Edit"}</button>
                  </div>
                </div>
              </div>

              <div className="taxcontents">
                <div className="taxtext">Service Charge</div>
                <div className="taxdetails">
                  <div className="percentagetext">
                    <input type="number" className="percentageinput" disabled={taxserviceedit? false : true} value={servicecharge} onChange={(e)=>handleServiceCharge(e)}/>
                    %</div>
                  <div className="taxedit">
                    <button type="button" className="taxeditbutton" onClick={handleTaxServiceEdit}>{taxserviceedit? "Save" : "Edit"}</button>
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
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(SettingsPage);
