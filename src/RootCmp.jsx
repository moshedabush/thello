import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes'
// import {BoardList} from '../src/pages/BoardList.jsx'
// import {Board} from '../src/pages/Board.jsx'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
            {/* <AppHeader /> */}
            <main>
                <Switch>
                {routes.map(route=> <Route key={route.path} exact component={route.component} path={route.path} /> )}
                </Switch>
            </main>
            {/* <AppFooter /> */}
            </div>

        )
    }
}
