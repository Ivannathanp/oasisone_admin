import React, { useState } from "react";
import "../TopBar.css";
import "./SettingsPage.css";
import logo from "../../icons/Logo.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@material-ui/core/Select";
import inputimage from "../../icons/Edit Profile Pict.png";
function SettingsPage() {
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

  const [formValues, setFormValues] = useState("");

  const [editprofile, setEditprofile] = useState(false);
  const handleEditprofileopen = () => setEditprofile(true);
  const handleEditprofileclose = () => setEditprofile(false);
  const [profileimage, setPofileimage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPofileimage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Settings</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={logo} className="image" />
          </div>
          <div className="text">Telaga Seafood</div>
        </div>
      </div>

      <Modal open={editprofile} onClose={handleEditprofileclose}>
        <Box className="editprofilebox">
          <div className="editprofilemodaltitle">Edit Profile</div>

          <form onSubmit={handleSubmit}>
            <div className="editprofileinnermodalbox">
              <div className="editprofileleftmodalcolumn">
                <div className="profileinputtext">
                  <div className="editprofileinputlabel">Restaurant Name</div>
                  <input
                    type="text"
                    className="editprofileinputfile"
                    onChange={handleChange}
                  />
                  <div className="editprofileinputlabel">Profile Color</div>
                </div>
                <div className="editprofilemodalbutton">
                <button
                  onClick={handleEditprofileclose}
                  className="cancelbutton"
                >
                  Cancel
                </button>
                </div>
                </div>

                <div className="rightmodalcolumn">
                  <div className="editprofileinputimage">
                    <div className="editprofileinputlabel">Product Picture</div>
                    <img src={profileimage} className="editprofileimage" />
                    <div className="editprofileimagebuttoncontainer">
                      <div className="editprofileimagebutton">
                        <label for="profilefile-input">
                          <img src={inputimage} />
                        </label>

                        <input
                          id="profliefile-input"
                          type="file"
                          className="editprofileinputfile"
                          onChange={(handleChange, imageHandler)}
                        />
                      </div>
                    </div>
                  </div>
                
           

              <div className="editprofilemodalbutton">
               
                <button
                  type="submit"
                  onClick={handleEditprofileclose}
                  className="savebutton"
                >
                  Save Profile
                </button>
              </div>
            </div>
            </div>
          </form>
        </Box>
      </Modal>

      <div className="settingscontainer">
        <div className="settingsheader">
          <div className="headertext">Profile</div>
          <div className="headertext">Tax & Servive Charge</div>
        </div>

        <div className="settingscontent">
          <div className="profilesettings">
            <div className="profilecontainer">
              <div className="profileimg">
                <img className="profilelogo" src={logo} />
              </div>
              <div className="profilename">
                <div className="restaurantname">Telaga Seafood</div>
                <div className="profilecolor">
                  <div className="profilecolortext">Profile color</div>
                  <div className="profilecolorimg"></div>
                </div>
              </div>
              <div className="editprofile">
                <button className="editprofilebutton">Edit Profile</button>
              </div>
            </div>

            <div className="profilecontainer2">
              <div className="profileaddressheader">
                <div className="profiletitle">Address</div>
                <div className="editcontainer">
                  <button className="editbuttoncontainer">Edit</button>
                </div>
              </div>
              <div className="profileaddress">
                Jl. Raya Serpong Kav. Komersial No. 6, Bumi Serpong Damai,
                Jelupang, Lengkong Karya, Kec. Serpong Utara, Kota Tangerang
                Selatan, Banten.
              </div>
              <div className="profileopenheader">
                <div className="profiletitle">Opening Hour</div>
                <div className="editcontainer">
                  <button className="editbuttoncontainer">Edit</button>
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

          <div className="taxsettings">
            <div className="taxcontents">
              <div className="taxtext">Tax Charge</div>
              <div className="taxdetails">
                <div className="percentagetext">10%</div>
                <div className="taxedit">
                  <button className="taxeditbutton">Edit</button>
                </div>
              </div>
            </div>

            <div className="taxcontents">
              <div className="taxtext">Service Charge</div>
              <div className="taxdetails">
                <div className="percentagetext">15%</div>
                <div className="taxedit">
                  <button className="taxeditbutton">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
