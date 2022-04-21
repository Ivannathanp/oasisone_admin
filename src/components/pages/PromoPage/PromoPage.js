import React, { useState, useEffect } from "react";
import "./PromoPage.css";
import logo from "../../icons/Logo.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import inputimage from "../../icons/Edit Profile Pict.png";
import DatePicker from "../../datepicker/components/date_picker/date_picker";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function PromoPage({ tenant }) {
  
  const localUrl = process.env.REACT_APP_PROMOURL;
  
  const [formValues, setFormValues] = useState([{ image: "" }]);
  const [promoImage, setPromoImage] = useState([]);

  //promo banner modal
  const [ bannerType, setBannerType ] = useState('');
  const [ promobanneropen, setpromobanneropen ] = useState(false);
  const [ promoRetrieved, setPromoRetrieved ] = useState(false);
  
  const [ promoData, setPromoData ] = useState([]);
  const [ promoID, setPromoID ] = useState();
  const [ promoName, setPromoName ] = useState();
  const [ promoDetails, setPromoDetails ] = useState();

  //date
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

  // Get Promo Data
  useEffect( () => {
    let mounted = true;

    console.log('tenant', tenant)

    if ( mounted ) {
      if ( tenant.tenant_id != undefined ) {
        const url = localUrl + '/retrieve/' + tenant.tenant_id;
        console.log(url)

        fetch( url, {
          method: 'GET',
          headers: { "content-type": "application/JSON" },
        })
        .then((response) => response.json())
        .then((result) => {
          if ( result.status === 'SUCCESS' ) {
            console.log(result)
            setPromoData(() => result.data); 
            setPromoRetrieved(() => true);
          } else { 
            setPromoRetrieved(() => false); 
          }
        })
      }
    }

    return () => { mounted = false }
  }, [tenant])


  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPromoImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  // let handleChange = (i, e) => {
  //   let newFormValues = [...formValues];
  //   newFormValues[i][e.target.name] = e.target.value;
  //   setFormValues(newFormValues);
  //   console.log("target value", e.target.value);
  //   console.log("form value", formValues);

  //   // image preview
    

  //   let ImagesArray = Object.entries(e.target.files).map((e) =>
  //     URL.createObjectURL(e[1])
  //   );
  //   console.log("imagearray", ImagesArray);
  //   setBanner([...banner, ...ImagesArray]);
  //   console.log("banner", banner);
  // };

  // let addFormFields = () => {
  //   setFormValues([...formValues, { image: "" }]);
  //   console.log("form values", formValues);
  // };

  // let removeFormFields = (e) => {
  //   let newFormValues = [...formValues];
  //   newFormValues.splice(e, 1);
  //   setFormValues(newFormValues);

  //   const s = banner.filter((item, index) => index !== e);
  //   setBanner(s);
  //   console.log(s);
  // };

  // let handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(JSON.stringify(formValues));
  // };
  
  async function HandleEditPromo() {
    const url = localUrl + '/edit/' + promoID;
    console.log('url', url)
    const payload = JSON.stringify({
      promo_name  : promoName,
      promo_start : startDate,
      promo_end   : endDate,
      promo_details : promoDetails
    })
    console.log('payload', payload);

    await fetch( url, {
      method: 'POST',
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      setPromoData( result.data );
      setPromoRetrieved(() => true);
      setpromobanneropen( false );
    });
    location.reload();
  }
  
  async function HandleCreatePromo() {
    const url = localUrl + '/create';
    console.log('url', url)
    setPromoAddNotif(true);
    setTimeout(() => {
      setPromoAddNotif(false);
    }, 5000); //wait 5 seconds

    const payload = JSON.stringify({
      tenant_id   : tenant.tenant_id,
      promo_name  : promoName,
      promo_start : startDate,
      promo_end   : endDate,
      promo_details : promoDetails
    })
    console.log('payload', payload);

    await fetch( url, {
      method: 'POST',
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      setPromoData( result.data );
      setPromoRetrieved(() => true);
      setpromobanneropen( false );
    });
    location.reload();
  }

  async function HandleDeletePromo( ID ) {
    const url = localUrl + '/delete/' + ID;
    console.log('url', url)

    await fetch( url, {
      method: 'POST',
      headers: { "content-type": "application/JSON" },
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
    location.reload();
  }

  const [promoaddnotif, setPromoAddNotif] = useState(false);
  function handlenotification() {
    if (promoaddnotif) {
      setPromoAddNotif(false);
    } else {
      setPromoAddNotif(true);
      setTimeout(() => {
        setPromoAddNotif(false);
      }, 5000); //wait 5 seconds
    }
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
                  <div className="promopreview" >
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
                        name="image"
                        className="promoinputfile"
                        onChange={imageHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="promoinputlabel">Promo Banner Name</div>
                <input
                  type="text"
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
                    onChange={(value) => { setStartDate(new Date(value)) }}
                  />

                  <div className="periodeinputlabel"> &nbsp; End</div>
                  <DatePicker
                    format="ddd, DD MMM "
                    value={endDate}
                    arrow={false}
                    onChange={(value) => { setEndDate(new Date(value)) } }
                  />
                </div>
                <div className="promoinputlabel">Promo Detail</div>
                <textarea
                  type="text"
                  defaultValue={promoDetails}
                  className="promodetailinputfile"
                  onChange={(e) => setPromoDetails(e.target.value) }
                />
              </form>
            </div>

            <div className="promomodalbutton">
              <button
                onClick={() => setpromobanneropen(false) }
                className="cancelbutton"
              >
                Cancel
              </button>
              <button type="submit" 
                onClick={ bannerType == 'Add' ? HandleCreatePromo : HandleEditPromo } 
                className="savebutton">
                Save Product
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    )
  }
  
  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Promo Banner</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <div className="promocontainer">
      
      <div className={promoaddnotif ? "promonotification" : "hidden"}>
              <div className="notificationtextcontainer">
                <div className="notificationtext">{bannerType? "Promo Added":"Promo Edited"}</div>
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
          { PromoModal() }
          
          { promoRetrieved == true && promoData.promotions.map((item, index) => {
            const endDate = new Date(item.endingPeriod)

            return (
            <div className="promoform" key={index}>
              <div className="left-column">
                <div className="promopreview" key={index}>
                  <img src={promoImage} className="bannerimage"/>
                </div>
              </div>
              <div className="right-column">
                <div className="promotitle">{item.name}</div>
                <div className="promotext">Promo ID : { item.id }</div>
                <div className="promotext">
                  Promo ends at{" "}
                  <span className="promodate">{ endDate.toLocaleDateString('en-ID', dateOptions) }, 23:55 PM</span>
                        
                </div>
                <div className="promotext2">
                  Promo info{" "}
                  <div className="promoinfo">
                   {item.details}
                  </div>
                </div>

                <div className="promobutton">
                  <button
                    className="buttonpromoedit"
                    onClick={() => {
                      setpromobanneropen(() => true);
                      setPromoID(() => item.id );
                      setPromoName(()=> item.name);
                      setStartDate(()=> item.startingPeriod);
                      setEndDate(()=> item.endingPeriod);
                      setPromoDetails(()=>item.details);
                      setBannerType(() => 'Edit');
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
            )
            })
          }
        </div>

        <div className="addpromobutton">
          <button
            className="buttonadd"
            type="button"
            onClick={() => {
              setpromobanneropen(() => true);
              setBannerType(() => 'Add');
            }} >
            + Add New Promo
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({session}) => ({
  tenant: session.user
})

export default connect(mapStateToProps)(PromoPage);