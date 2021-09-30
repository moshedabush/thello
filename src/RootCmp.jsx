import React from "react";
import { Switch, Route } from "react-router";
import { AppHeader } from "./cmps/app-header";

import routes from "./routes";
// import {BoardList} from '../src/pages/BoardList.jsx'
// import {Board} from '../src/pages/Board.jsx'
import { userService } from "./services/user.service";

export class RootCmp extends React.Component {
  state = {
    user : userService.getLoggedinUser()
  }
  componentDidMount = () => {
    console.log("loggedInUser", userService.getLoggedinUser(),this.state.user);
    
  };
  render() {
    return (
      <div>
       
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
