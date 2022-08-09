import React, { useState, useEffect, useContext } from "react";
import "./PromoPage.css";
import logo from "../../icons/Logo.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import inputimage from "../../icons/Edit Profile Pict.png";
import DatePicker from "../../datepicker/components/date_picker/date_picker";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";
import removecat from "../../icons/RemoveCat.svg";
import Compressor from "compressorjs";

function PromoPage({ tenant }) {
  const promoUrl = process.env.REACT_APP_PROMOURL;
  const imageUrl = process.env.REACT_APP_IMAGEURL;

  // socket connection
  const socket = useContext(SocketContext);
  const [promoImage, setPromoImage] = useState();

  //promo banner modal
  const [bannerType, setBannerType] = useState("");
  const [promobanneropen, setpromobanneropen] = useState(false);
  const [promoRetrieved, setPromoRetrieved] = useState(false);
  const [removepromobanner, setRemovePromoBanner] = useState(false);
  const [promoData, setPromoData] = useState([]);
  const [promoID, setPromoID] = useState();
  const [promoName, setPromoName] = useState();
  const [promoDetails, setPromoDetails] = useState();

  // Date
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // Notification
  const [promoaddnotif, setPromoAddNotif] = useState(false);
  const [promoremovenotif, setPromoRemoveNotif] = useState(false);
  const [promoeditnotif, setPromoEditNotif] = useState(false);
  function handlenotification() {
    if (promoaddnotif || promoremovenotif || promoeditnotif) {
      setPromoAddNotif(false);
      setPromoRemoveNotif(false);
      setPromoEditNotif(false);
    }
  }

  // Get Promo Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = promoUrl + "/retrieve/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setPromoData([result.data]);
              setPromoRetrieved(() => true);
            } else {
              setPromoRetrieved(() => true);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tenant, promoRetrieved]);

  useEffect(() => {
    if (socket) {
      socket.on("add promo", (data) => handleAddPromo(data));
      socket.on("update promo", (data) => handleAddPromo(data));
      socket.on("delete promo", (data) => handleAddPromo(data));
      socket.on("update user", (data) => handleUserUpdated(data));
    }
  });

  function handleAddPromo(user) {
    if (promoRetrieved) {
      let newData = promoData.splice();

      newData.push(user);
      setPromoData(newData);
    }
  } 

  const localUrl = process.env.REACT_APP_TENANTURL;
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [profileName, setProfileName] = useState();
  const [profileColor, setProfileColor] = useState();

  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
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

  function handleUserUpdated(user) {
    if (tenantRetrieved) {
      let newData = tenantData.slice();

      let i = tenantData.findIndex((u) => u.tenant_id === user.tenant_id);

      if (newData.length > i) {
        newData[i] = user;
      }

      setTenantData(newData);
    }
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenantRetrieved === true) {
        setProfileName(tenantData[0].name);
        setProfileColor(tenantData[0].profileColor)
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenantRetrieved, tenantData]);


  async function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPromoImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  async function HandleEditPromo() {
    setpromobanneropen(false);

    var inputs = document.querySelector('input[type="file"]');
    if (inputs.files[0] == undefined) {

      const url = promoUrl + "/edit/" + tenant.tenant_id + "/" + promoID;
      const payload = JSON.stringify({
        promo_name: promoName,
        promo_start: startDate,
        promo_end: endDate,
        promo_details: promoDetails,
      });

      await fetch(url, {
        method: "POST",
        body: payload,
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (socket) {
            socket.emit("update promo", result.data);
            setPromoData([result.data]);
            setPromoRetrieved(() => true);
          }
        });
    } else {

      const imagePromoUrl =
        imageUrl + "/promo/" + tenant.tenant_id + "/" + promoID;

      const file = inputs.files[0];

      new Compressor(file, {
        quality: 0.5,

        success(result) {
          let formData = new FormData();

          formData.append("promo", result, result.name);

          fetch(imagePromoUrl, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {})
            .catch((error) => {
              console.error("Error Upload Logo:", error);
            });
        },
      });

      const url = promoUrl + "/edit/" + tenant.tenant_id + "/" + promoID;
      const payload = JSON.stringify({
        promo_name: promoName,
        promo_start: startDate,
        promo_end: endDate,
        promo_details: promoDetails,
        promo_image:
          imageUrl +
          "/promo/render/" +
          tenant.tenant_id +
          "/" +
          promoID +
          ".jpg",
      });

      fetch(url, {
        method: "POST",
        body: payload,
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (socket) {
            setPromoEditNotif(true);
            setTimeout(() => {
              setPromoEditNotif(false);
            }, 3000);
            socket.emit("update promo", result.data);
            setPromoData([result.data]);
            setPromoRetrieved(() => true);
          }
        });
    }
  }

  async function HandleCreatePromo() {
    const url = promoUrl + "/create/" + tenant.tenant_id;
    setPromoAddNotif(true);
    setTimeout(() => {
      setPromoAddNotif(false);
    }, 3000);

   
    const payload = JSON.stringify({
      promo_name: promoName,
      promo_start: startDate,
      promo_end: endDate,
      promo_details: promoDetails,
    });

    

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {

        let length = result.data.length - 1

        const imagePromoUrl = imageUrl + "/promo/" + tenant.tenant_id + "/" + result.data[length].id;
        var input = document.querySelector('input[type="file"]');
    
        const file = input.files[0];
        new Compressor(file, {
          quality: 0.5,
    
          success(result) {
            let formData = new FormData();
    
            formData.append("promo", result, result.name);
    
            fetch(imagePromoUrl, {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((result) => {})
              .catch((error) => {
                console.error("Error Upload Logo:", error);
              });
          },
        });

        

        const url = promoUrl + "/edit/" + tenant.tenant_id + "/" +  result.data[length].id;
        const payload2 = JSON.stringify({
          promo_image:
            imageUrl +
            "/promo/render/" +
            tenant.tenant_id +
            "/" +
            result.data[length].id +
            ".jpg",
        });

      fetch(url, {
        method: "POST",
        body: payload2,
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (socket) {
            socket.emit("update promo", result.data);
            setPromoData([result.data]);
            setPromoRetrieved(() => true);
          }
        });

        setpromobanneropen(false);
        setPromoImage();
        setPromoName();
        setPromoDetails();
        setStartDate();
        setEndDate();
      });
  }

  async function HandleDeletePromo(ID) {
    setPromoID();
    setPromoName();
    setRemovePromoBanner(false);
    const url = promoUrl + "/delete/" + tenant.tenant_id + "/" + ID;

    setPromoRemoveNotif(true);
    setTimeout(() => {
      setPromoRemoveNotif(false);
    }, 3000);

    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (socket) {
          setPromoData([result.data]);

          socket.emit("delete promo", result.data);
        }
      });
  }

  function PromoModal() {
    return (
      <Modal open={promobanneropen}>
        <Box className="promomodalbox">
          <div className="innerbox">
            <div className="modaltitle">Promo Banner</div>
            <div className="modalform">
              <form>
                <div className="promoinputimage">
                  <div className="promoinputlabel">
                    Product Picture (Recommended Size: 374x110)
                  </div>
                  <div className="promopreview">
                    <img src={promoImage} className="promobannerimage" />
                  </div>
                  <div className="promobannerbuttoncontainer">
                    <div
                      className="promoimagebutton"
                      style={{ background: profileColor }}
                    >
                      <label html-for="file-input">
                        <FontAwesomeIcon
                          icon={faPencil}
                          className="promoinput"
                        />
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        name="promo"
                        accept=".png, .jpg"
                        style={{ background: profileColor }}
                        className="promoinputfile"
                        onChange={imageHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="promoinputlabel">Promo Banner Name</div>
                <input
                  type="text"
                  name="promoName"
                  defaultValue={promoName}
                  className="promotextinputfile"
                  onChange={(e) => setPromoName(e.target.value)}
                />
                <div className="promoinputlabel">Promo Period</div>
                <div className="promoperiodecontainer">
                  <div className="periodeinputlabel">Start</div>
                  <DatePicker
                    format="ddd, DD MMM "
                    value={startDate}
                    arrow={false}
                    editable={false}
                    onChange={(value) => {
                      setStartDate(new Date(value));
                    }}
                  />

                  <div className="periodeinputlabel"> &nbsp; End</div>
                  <DatePicker
                    format="ddd, DD MMM "
                    value={endDate}
                    arrow={false}
                    editable={false}
                    onChange={(value) => {
                      setEndDate(new Date(value));
                    }}
                  />
                </div>
                {endDate <= startDate ? (
                  <div
                    style={{
                      marginTop: "-15px",
                      marginBottom: "10px",
                      color: "#df3030",
                    }}
                  >
                    Please choose the right end date
                  </div>
                ) : (
                  <div style={{ marginBottom: "10px" }}></div>
                )}
                <div className="promoinputlabel">Promo Detail</div>
                <textarea
                  type="text"
                  defaultValue={promoDetails}
                  className="promodetailinputfile"
                  onChange={(e) => setPromoDetails(e.target.value)}
                />
              </form>
            </div>

            <div className="promomodalbutton">
              <button
                onClick={() => {
                  setpromobanneropen(false);
                  setPromoImage();
                  setPromoName();
                  setPromoDetails();
                  setStartDate();
                  setEndDate();
                }}
                style={{ color: profileColor }}
                className="cancelbutton"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  promoImage == undefined ||
                  promoName == undefined ||
                  promoName == "" ||
                  promoDetails == undefined ||
                  promoDetails == "" ||
                  startDate == undefined ||
                  endDate == undefined
                    ? true
                    : false
                }
                onClick={
                  bannerType == "Add" ? HandleCreatePromo : HandleEditPromo
                }
                style={
                  promoImage == undefined ||
                  promoName == undefined ||
                  promoName == "" ||
                  promoDetails == undefined ||
                  promoDetails == "" ||
                  startDate == undefined ||
                  endDate == undefined
                    ? { background: "#c4c4c4" }
                    : { background: profileColor }
                }
                className="savebutton"
              >
                Save Promo
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  }

  function RemovePromoModal() {
    return (
      <Modal open={removepromobanner}>
        <Box className="removecatmodalbox">
          <div className="removecatinnerbox">
            <div className="removecatheading">
              <img src={removecat} className="removecatimage" />
              <div
                className="removecatmodaltitle"
                style={{ color: profileColor }}
              >
                Remove Promo
              </div>
            </div>
            <div className="removecatmodaltext">
              Are you sure to remove the{" "}
              <span style={{ color: profileColor }}>"{promoName}"</span>{" "}
              promo?
            </div>

            <div className="removecatmodalbuttoncontainer">
              <div>
                <button
                  className="modalcancelbutton"
                  onClick={() => {
                    setRemovePromoBanner(false);
                    setPromoID();
                    setPromoName();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  style={{ background: profileColor }}
                  className="modalconfirmbutton"
                  onClick={() => HandleDeletePromo(promoID)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    );
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left" style={{ color: profileColor }}>
          Promo Banner
        </div>

        <TopBar />
      </div>
      {promoRetrieved ? (
        promoData.length != 0 ? (
          <div className="promocontainer">
            <div
              style={{ background: profileColor }}
              className={
                promoaddnotif || promoeditnotif || promoremovenotif
                  ? "promonotification"
                  : "hidden"
              }
            >
              <div className="notificationtextcontainer">
                <div className="notificationtext">
                  {promoaddnotif
                    ? "Promo Added"
                    : promoeditnotif
                    ? "Promo Edited"
                    : "Promo Removed"}
                </div>
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

            <div className="form">
              {PromoModal()}
              {RemovePromoModal()}
              {promoRetrieved == true &&
                promoData.map((post) => {
                  return post.map((item, index) => {
                    const endDate = new Date(item.endingPeriod);

                    return (
                      <div className="promoform" key={index}>
                        <div className="insidepromoform">
                          <div className="left-column">
                            <div className="promopreview" key={index}>
                              <img
                                src={item.promoImage + "?time" + new Date()}
                                className="bannerimage"
                              />
                            </div>
                          </div>
                          <div className="right-column">
                            <div
                              className="promotitle"
                              style={{ color: profileColor }}
                            >
                              {item.name}
                            </div>
                            <div className="promotext">
                              Promo ends at
                              <span
                                className="promodate"
                                style={{ color: profileColor }}
                              >
                                {endDate.toLocaleDateString(
                                  "en-ID",
                                  dateOptions
                                )}
                                , 23:55 PM
                              </span>
                            </div>
                            <div className="promotext2">
                              Promo info{" "}
                              <div className="promoinfo">{item.details}</div>
                            </div>

                            <div className="promobutton">
                              <button
                                className="buttonpromoedit"
                                style={{ background: profileColor }}
                                onClick={() => {
                                  setpromobanneropen(() => true);
                                  setPromoImage(() => item.promoImage);
                                  setPromoID(() => item.id);
                                  setPromoName(() => item.name);
                                  setStartDate(() => item.startingPeriod);
                                  setEndDate(() => item.endingPeriod);
                                  setPromoDetails(() => item.details);
                                  setBannerType(() => "Edit");
                                }}
                              >
                                Edit Promo Banner
                              </button>

                              <div className="buttontext">
                                or
                                <button
                                  type="button"
                                  style={{ color: profileColor }}
                                  className="buttonremove"
                                  onClick={() => {
                                    setRemovePromoBanner(true);
                                    setPromoID(() => item.id);
                                    setPromoName(() => item.name);
                                  }}
                                >
                                  Remove Promo Banner
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })}
            </div>

            <div className="addpromobutton">
              <button
                style={{ background: profileColor }}
                className="buttonadd"
                type="button"
                onClick={() => {
                  setpromobanneropen(() => true);
                  setBannerType(() => "Add");
                }}
              >
                + Add New Promo
              </button>
            </div>
          </div>
        ) : (
          <div className="form">
            {PromoModal()}{" "}
            <div className="addpromobutton">
              <button
                style={{ background: profileColor }}
                className="buttonadd"
                type="button"
                onClick={() => {
                  setpromobanneropen(true);
                  setBannerType("Add");
                }}
              >
                + Add New Promo
              </button>
            </div>
          </div>
        )
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
          <ThreeDots color={profileColor} height={80} width={80} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(PromoPage);
