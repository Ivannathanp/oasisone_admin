import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./components/Navbar/SideBar";
import Login from "./components/pages/LoginPage/ValidateLoginPage";
import Register from "./components/pages/LoginPage/RegisterPage";
import Forget from "./components/pages/LoginPage/ForgetPasswordPage";
import PasswordReset from "./components/pages/LoginPage/PasswordResetPage";
import EmailSent from "./components/pages/LoginPage/EmailSentPage";
import Dashboard from "./components/pages/DashboardPage/DashboardPage";
import Order from "./components/pages/OrderPage/OrderPage";
import OrderStatus from "./components/pages/OrderStatusPage/OrderStatusPage";
import Promo from "./components/pages/PromoPage/PromoPage";
import Inventory from "./components/pages/InventoryPage/InventoryPage";
import Tables from "./components/pages/TablesPage/TablesPage";
import Qr from "./components/pages/QrPage/QrPage";
import Customer from "./components/pages/CustomerPage/CustomerPage";
import Settings from "./components/pages/SettingsPage/SettingsPage";
import landingpage from "./components/pages/LandingPage/LandingPage";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";

//Auth & redux
import AuthRoute from "./components/Auth/routes/AuthRoute";
import BasicRoute from "./components/Auth/routes/BasicRoute";
import { connect } from "react-redux";


function App({ checked }) {
  return (
    <Router>
      {checked && (
        <div className="app">
          <Switch>
            <Route path="/" exact component={Login} />
            <BasicRoute path="/login/:userEmail?" exact component={Login} />
            <BasicRoute
              path="/emailsent/:userEmail?/:reset?"
              exact
              component={EmailSent}
            />
            <BasicRoute
              path="/passwordreset/:userID/:resetString"
              exact
              component={PasswordReset}
            />
            <BasicRoute path="/register" exact component={Register} />
            <BasicRoute path="/forgetpassword" exact component={Forget} />
            <div class="box">
              <div class="column">
                <SideBar />
              </div>
              <div class="column2">
                <AuthRoute path="/dashboard" exact component={Dashboard} />
                <AuthRoute path="/orders" exact component={Order} />
                <AuthRoute path="/orderstatus" exact component={OrderStatus} />
                <AuthRoute path="/promo" exact component={Promo} />
                <AuthRoute path="/inventory" exact component={Inventory} />
                <AuthRoute path="/tables" exact component={Tables} />
                <AuthRoute path="/qr" exact component={Qr} />
                <AuthRoute path="/customer" exact component={Customer} />
                <AuthRoute path="/settings" exact component={Settings} />
              </div>
            </div>
          </Switch>
        </div>
      )}
    </Router>
  );
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
});

export default connect(mapStateToProps)(App);
