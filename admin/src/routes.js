import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/layout";
import Auth from "./hoc/auth";

import Surveys from "./components/surveys/survey";
import Users from "./components/users/user";
import Comb from "./components/crud/comb";
import Eyes from "./components/crud/eyes";
import Skins from "./components/crud/skin";
import Stripes from "./components/crud/stripes";
import Messages from "./components/messages/messages";
import Feedback from "./components/feedback/feedback";
import Login from "./components/login/login";
import Payment from "./components/payment/payment";
import Transaction from "./components/transaction/transaction";
import Wattle from "./components/crud/wattle";
import Create from "./components/chicken/create"

//static 
import StaticHomePage from "./static/pages/home";


const NotFound = () => <div>Page not found</div>;

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/admin/beak" exact component={Users} />
        <Route path="/admin/comb" exact component={Auth(Comb, true)} />
        <Route path="/admin/eyes" exact component={Auth(Eyes, true)} />
        <Route path="/admin/skins" exact component={Auth(Skins, true)} />
        <Route path="/admin/stripes" exact component={Auth(Stripes, true)} />
        <Route path="/admin/wattle" exact component={Auth(Wattle, true)} />
        <Route path="/admin/list-surveys" exact component={Auth(Surveys, true)} />
        <Route path="/admin/create_chicken" exact component={Auth(Create, true)} />
        <Route
          path="/surveyMessages/:userId"
          exact
          component={Auth(Messages, true)}
        />
        <Route path="/admin/feedbacks" exact component={Auth(Feedback, true)} />
        <Route path="/admin/login" exact component={Auth(Login, false)} />
        <Route path="/admin/paymentSetting" exact  component={Auth(Payment, true)} />
        <Route path="/admin/transactions" exact  component={Auth(Transaction, true)} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
