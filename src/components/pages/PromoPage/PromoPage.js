import React, { useState } from "react";

import "./PromoPage.css";
import logo from "../../icons/Logo.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import inputimage from "../../icons/Edit Profile Pict.png";
import DatePicker from "../../datepicker/components/date_picker/date_picker";
import { connect } from "react-redux";

function PromoPage({tenant}) {
  const [formValues, setFormValues] = useState([{ image: "" }]);
  const [banner, setBanner] = useState([]);

  //date
  const [startvalue, setstartValue] = useState();
  const [endvalue, setendValue] = useState();

  //promo banner modal
  const [promobanneropen, setpromobanneropen] = useState(false);
  const handlepromobanneropen = () => setpromobanneropen(true);
  const handlepromobannerclose = () => setpromobanneropen(false);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    console.log("target value", e.target.value);
    console.log("form value", formValues);

    // image preview
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log("imagearray", ImagesArray);
    setBanner([...banner, ...ImagesArray]);
    console.log("banner", banner);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { image: "" }]);
    console.log("form values", formValues);
  };

  let removeFormFields = (e) => {
    let newFormValues = [...formValues];
    newFormValues.splice(e, 1);
    setFormValues(newFormValues);

    const s = banner.filter((item, index) => index !== e);
    setBanner(s);
    console.log(s);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

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
        <div className="addpromobutton">
          <button
            className="buttonadd"
            type="button"
            onClick={() => addFormFields()}
          >
            + Add New Promo
          </button>
        </div>

        <div className="form">
          {formValues.map((element, index) => (
            <div className="promoform" key={index}>
              <Modal open={promobanneropen}>
                <Box className="promomodalbox">
                  <div className="innerbox">
                    <div className="modaltitle">Promo Banner</div>
                    <div className="modalform">
                      <form>
                        <div className="promoinputimage">
                          <div className="promoinputlabel">Product Picture</div>
                          <div className="promopreview" key={index}>
                          <img src={banner[index]} className="promobannerimage" />
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
                                onChange={(e) => handleChange(index, e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="promoinputlabel">Promo Banner Name</div>
                        <input
                          type="text"
                          className="promotextinputfile"
                          onChange={handleChange}
                        />
                        <div className="promoinputlabel">Promo Period</div>
                        <div className="promoperiodecontainer">
                          <div className="periodeinputlabel">Start</div>
                          <DatePicker
                            format="ddd, DD MMM "
                            value={startvalue}
                            arrow={false}
                            onChange={setstartValue}
                          />

                          <div className="periodeinputlabel"> &nbsp; End</div>
                          <DatePicker
                            format="ddd, DD MMM "
                            value={endvalue}
                            arrow={false}
                            onChange={setendValue}
                          />
                        </div>
                        <div className="promoinputlabel">Promo Detail</div>
                        <textarea
                          type="text"
                          className="promodetailinputfile"
                          onChange={handleChange}
          
                        />
                      </form>
                    </div>

                    <div className="promomodalbutton">
                      <button
                        onClick={handlepromobannerclose}
                        className="cancelbutton"
                      >
                        Cancel
                      </button>
                      <button type="submit" onClick={handlepromobannerclose} className="savebutton">
                        Save Product
                      </button>
                    </div>
                  </div>
                </Box>
              </Modal>

              <div className="left-column">
                <div className="promopreview" key={index}>
                  <img src={banner[index]} className="bannerimage"/>
                </div>
              </div>
              <div className="right-column">
                <div className="promotitle">Promo Banner {index + 1}</div>
                <div className="promotext">
                  Promo ends at{" "}
                  <span className="promodate">Friday, 27 June 2021, 23:59</span>
                </div>
                <div className="promotext2">
                  Promo info{" "}
                  <div className="promoinfo">
                    50% discount per purchase of more than 1 million rupiah with
                    a maximum discount of 200 thousand rupiah 50% discount per
                    purchase of more than 1 million rupiah with a maximum
                    discount of 200 thousand rupiah{" "}
                  </div>
                </div>

                <div className="promobutton">
                  <button
                    className="buttonpromoedit"
                    onClick={handlepromobanneropen}
                  >
                    Edit Promo Banner
                  </button>

                  <div className="buttontext">
                    or
                    <button
                      type="button"
                      className="buttonremove"
                      onClick={() => removeFormFields(index)}
                    >
                      Remove Promo Banner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({session}) => ({
  tenant: session.user
})

export default connect(mapStateToProps)(PromoPage);