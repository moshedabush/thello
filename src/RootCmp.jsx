import React from "react";
import { Switch, Route } from "react-router";
import { AppHeader } from "./cmps/app-header";

import routes from "./routes";
// import {BoardList} from '../src/pages/BoardList.jsx'
// import {Board} from '../src/pages/Board.jsx'
import { userService } from "./services/user.service";
import { getLoggedinUser } from "./services/user.service.js";

export class RootCmp extends React.Component {
  componentDidMount = () => {
    console.log("loggedInUser", userService.getLoggedinUser());
  };
  render() {
    return (
      <div>
        {userService.getLoggedinUser() && <AppHeader />}
        {/* <AppHeader/> */}
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
          </Switch>
        </main>
        {/* <AppFooter /> */}
      </div>
    );
  }
}
