import React, { useState } from "react";
import "../TopBar.css";
import "./PromoPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

function PromoPage() {
  const [formValues, setFormValues] = useState([{ name: "", email: "" }]);
  const [banner, setBanner] = useState()


  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", email: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  let imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = ()=>{
      if(reader.readyState === 2){
setBanner(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  let imageMultiple = (e) => {
    if(e.target.files){
      const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
    
      setBanner((prevImages) => prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file)=>URL.revokeObjectURL(file)
      )
    }
  }

  const renderPhotos = (source) => {
    return source.map((photo)=>{
      return <img src={photo} key={photo} className="bannerimage"/>
    })
  }
  
  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Promo Banner</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={logo} className="image" />
          </div>
          <div className="text">Telaga Seafood</div>
        </div>
      </div>

      <div className="promocontainer">
        
        <div className="form">
          <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
              <div className="form-inline" key={index}>
                <div className="promohead">Promo Banner {index + 1}</div>
                <div className="row">
                  <div className="preview">
                    <img src={banner} className="bannerimage"/>
                  </div>
                  <div className="input">
                    <div className="title">
                      Upload an image from your computer
                    </div>
                    <input
                      type="file"
                      className="promoinputfile"
                      onChange={(e) => handleChange(index, e),imageHandler }
                    />
                    <div className="buttons">
                      <button className="buttonsubmit" type="submit">
                        Upload Selected Image
                      </button>
                      {index ? (
                        <div className="buttontext">
                          or
                          <button
                            type="button"
                            className="buttonremove"
                            onClick={() => removeFormFields(index)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="desc">
                      <div className="texts">Uploaded image will be resized to fit within:
                      </div>
                      <div className="texts">
                        Width of 374 pixels and height of 110 pixels
                      </div>
                      <div className="texts">
                        Image must be in either jpg, jpeg, gif or png format
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="addbutton">
              <button
                className="buttonadd"
                type="button"
                onClick={() => addFormFields()}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PromoPage;
