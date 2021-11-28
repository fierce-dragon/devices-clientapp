import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";
import { DeviceList } from "../containers/DeviceList";
import { AddDevice } from "../containers/AddDevice";
import { EditDevice } from "../containers/EditDevice";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={DeviceList} />
      <Route path="/add" component={AddDevice} />
      <Route path="/edit" component={EditDevice} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
