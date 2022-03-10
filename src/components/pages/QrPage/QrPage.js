import React from "react";
import "../TopBar.css";
import "./QrPage.css";
import logo from "../../icons/Logo.png";
import qrcode from "../../icons/qrcode.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { connect } from "react-redux";

function QrPage({tenant}) {

  return (
    <div className="qrcontainer">
      <div className="topbar">
        <div className="left">Print QR Codes</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <div className="printqrsection">
        <div className="qrgrid">
          <div className="qrimage">
            <img src={qrcode} className="qr"/>
          </div>
          <div className="qrsettings">
            <div className="printqr">
              <button className="printqrbutton">Print QR Code</button>
            </div>
            <div className="downloadqr">
              <button className="downloadqrbutton">Download as PNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({session}) => ({
  tenant: session.user
})

export default connect(mapStateToProps)(QrPage);
