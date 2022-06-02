import React, { useState, useEffect, useContext } from "react";
import "./PromoPage.css";
import logo from "../../icons/Logo.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import inputimage from "../../icons/Edit Profile Pict.png";
import DatePicker from "../../datepicker/components/date_picker/date_picker";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

function PromoPage({ tenant }) {
  const localUrl = process.env.REACT_APP_PROMOURL;
  const imageUrl = process.env.REACT_APP_IMAGEURL;

  // socket connection
  const socket = useContext(SocketContext);
  console.log("socket context:", SocketContext);
  console.log("socket", socket);

  const [promoImage, setPromoImage] = useState();

  //promo banner modal
  const [bannerType, setBannerType] = useState("");
  const [promobanneropen, setpromobanneropen] = useState(false);
  const [promoRetrieved, setPromoRetrieved] = useState(false);

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
        const url = localUrl + "/retrieve/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              console.log(result.data);
              setPromoData([result.data]);
              setPromoRetrieved(() => true);
            } else {
              console.log("I am not retrieved")
              setPromoRetrieved(() => true);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tenant, promoRetrieved]);

  console.log(promoData)
  useEffect(() => {
    if (socket) {
      socket.on('add promo', (data) => handleAddPromo(data));
      socket.on('update promo', (data) => handleUpdatePromo(data));
      socket.on('delete promo', (data) => handleDeletePromo(data));

      console.log("I am setting socket",socket.on('update user', (data) => handleAddPromo(data)) );
    }
  });

  function handleAddPromo(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", promoData);

    if (promoRetrieved) {
      console.log("I am table retrieved!!!!!!!!!!!!!", user)
    
      let newData = promoData.splice();
 
      newData.push(user);
      setPromoData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", promoData)
     
    }
  }

  function handleUpdatePromo(user) {
    console.log("TABLE1", user);
    console.log("update SOCKET IS CALLED!!!!!!!!!")
    if (promoRetrieved) {
      let newData = promoData.splice();
 
      newData.push(user);
      setPromoData(newData);
      console.log("NEW DATA IS!!!!!!!!!: ", newData);
      console.log("...user is", promoData)
    }
    console.log("tenant new data is", promoData)
  }

  function handleDeletePromo(user) {
    console.log("TABLE1", user);
    console.log(" TABLE original ", promoData);

    if (tableRetrieved) {
     console.log("I am table retrieved!!!!!!!!!!!!!", user)
    
     let newData = promoData.splice();
 
     newData.push(user);
     setPromoData(newData);
     console.log("NEW DATA IS!!!!!!!!!: ", newData);
     console.log("...user is", promoData)
  }
  }

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

    console.log("edit promo is called.")

    let formData = new FormData();
    const promoUrl = imageUrl + "/promo/" + tenant.tenant_id + "/" + promoName;
    var inputs = document.querySelector('input[type="file"]')
    console.log("input", inputs)
    console.log("form", inputs.files[0]);
    formData.append("promo", inputs.files[0]);


    fetch(promoUrl, {
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


    const url = localUrl + "/edit/" + tenant.tenant_id + "/" + promoID;
    const payload = JSON.stringify({
      promo_name: promoName,
      promo_start: startDate,
      promo_end: endDate,
      promo_details: promoDetails,
      promo_image: imageUrl + "/promo/render/" + tenant.tenant_id + "/" + promoName + '.jpg',
    });

    await fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        socket.emit('update promo', result.data);
        setPromoData([result.data]);
        setPromoRetrieved(() => true);
        setpromobanneropen(false);
      })
  
   
  }

  async function HandleCreatePromo() {
    const url = localUrl + "/create/" + tenant.tenant_id;
    console.log("url", url);
    setPromoAddNotif(true);
    setTimeout(() => {
      setPromoAddNotif(false);
    }, 5000); //wait 5 seconds

    let formData = new FormData();
    const promoUrl = imageUrl + "/promo/" + tenant.tenant_id + "/" + promoName;
    var input = document.querySelector('input[type="file"]')
    formData.append("promo", input.files[0]);
    console.log("input", input)
    console.log("form", input.files[0]);

    fetch(promoUrl, {
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

    const payload = JSON.stringify({
      promo_name: promoName,
      promo_start: startDate,
      promo_end: endDate,
      promo_details: promoDetails,
      promo_image: imageUrl + "/promo/render/" + tenant.tenant_id + "/" + promoName + '.jpg',
    });
    console.log("payload", payload);

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPromoData([result.data]);
        socket.emit('add promo', result.data);
        setPromoRetrieved(() => true);
        setpromobanneropen(false);
        setPromoImage();
        setPromoName();
        setPromoDetails(); 
        setStartDate();
        setEndDate();
      });
  }

  async function HandleDeletePromo(ID) {
    console.log("delete promo data!!!!!1")
    const url = localUrl + "/delete/" + tenant.tenant_id +  "/" + ID;
    console.log("url", url);

    setPromoRemoveNotif(true);
    setTimeout(() => {
      setPromoRemoveNotif(false);
    }, 5000); //wait 5 seconds

    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPromoData([result.data]);
        socket.emit('delete promo', result.data);
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
                  <div className="promoinputlabel">Product Picture</div>
                  <div className="promopreview">
                    <img src={promoImage} className="promobannerimage" />
                  </div>
                  <div className="promobannerbuttoncontainer">
                    <div className="promoimagebutton">
                      <label for="file-input">
                        <img src={inputimage} />
                      </label>
                      <input
                       id="file-input"
                       type="file"
                       name="promo"
                       accept=".png, .jpg"
                       className="productinputfile"
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
                    onChange={(value) => {
                      setStartDate(new Date(value));
                    }}
                  />

                  <div className="periodeinputlabel"> &nbsp; End</div>
                  <DatePicker
                    format="ddd, DD MMM "
                    value={endDate}
                    arrow={false}
                    onChange={(value) => {
                      setEndDate(new Date(value));
                    }}
                  />
                </div>
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
                className="cancelbutton"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={
                  bannerType == "Add" ? HandleCreatePromo : HandleEditPromo
                }
                className="savebutton"
              >
                Save Product
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    );
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Promo Banner</div>

        <TopBar/>
      </div>
{promoRetrieved? promoData.length != 0 ? ( <div className="promocontainer">
        <div
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
            <button className="notifclosebutton" onClick={handlenotification}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        <div className="form">
          {PromoModal()}

          {promoRetrieved == true &&
            promoData.map((post) => {
              console.log(post)
              return post.map((item,index)=>{
                console.log(item)
                const endDate = new Date(item.endingPeriod);
  
                return (
                  <div className="promoform" key={index}>
                    <div className="insidepromoform">
                      <div className="left-column">
                        <div className="promopreview" key={index}>
                          <img src={item.promoImage + "?time" + new Date()} className="bannerimage" />
                        </div>
                      </div>
                      <div className="right-column">
                        <div className="promotitle">{item.name}</div>                   
                        <div className="promotext">
                          Promo ends at{" "}
                          <span className="promodate">
                            {endDate.toLocaleDateString("en-ID", dateOptions)},
                            23:55 PM
                          </span>
                        </div>
                        <div className="promotext2">
                          Promo info{" "}
                          <div className="promoinfo">{item.details}</div>
                        </div>
  
                        <div className="promobutton">
                          <button
                            className="buttonpromoedit"
                            onClick={() => {
                              setpromobanneropen(() => true);
                              setPromoImage(()=> item.promoImage);
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
                              className="buttonremove"
                              onClick={() => {
                                HandleDeletePromo(item.id);
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
              })
           
            })}
        </div>

        <div className="addpromobutton">
          <button
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
      </div> ): ( <div className="form">
          {PromoModal()} <div className="addpromobutton">
          <button
            className="buttonadd"
            type="button"
            onClick={() => {
              setpromobanneropen(() => true);
              setBannerType(() => "Add");
            }}
          >
            + Add New Promo
          </button>
        </div></div>):(
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
     
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(PromoPage);
