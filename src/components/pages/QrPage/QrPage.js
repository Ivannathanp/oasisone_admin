import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import QRCode from "qrcode.react";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";
import "../TopBar/TopBar.css";
import "./QrPage.css";

function QrPage({ tenant }) {
  const localUrl = process.env.REACT_APP_TENANTURL;
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [qrCode, setQrCode] = useState();
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

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("update user", (data) => handleUserUpdated(data));
    }
  });

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
        setProfileColor(tenantData[0].profileColor);
        setQrCode(tenantData[0].qrCode);
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenant, tenantRetrieved]);

  function downloadQRCode() {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = tenantData[0].name + "qrcode.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

  if (tenantRetrieved) {
  }
  return (
    <div className="qrcontainer">
      <div className="topbar">
        <div className="left" style={{ color: profileColor }}>
          Print QR Codes
        </div>

        <TopBar />
      </div>
      {tenantRetrieved ? (
        <div className="printqrsection">
          <div className="qrgrid">
            <div className="qrimage">
              <QRCode id="qrCodeEl" size={300} value={qrCode} />
            </div>
            <div className="qrsettings">
              <div className="downloadqr">
                <button
                  style={{ background: profileColor }}
                  className="downloadqrbutton"
                  onClick={downloadQRCode}
                >
                  Download as PNG
                </button>
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
          <ThreeDots color={profileColor} height={80} width={80} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(QrPage);
