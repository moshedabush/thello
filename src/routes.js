import {HomePage} from '../src/pages/HomePage.jsx'
import { BoardList } from './pages/BoardList.jsx';
import { Board } from './pages/Board.jsx';
import { Login } from './pages/Login.jsx';
import { SingUp } from './pages/SingUp.jsx';
const routes = [
    {
        path:'/',
        component: HomePage,
        label: 'Home | ',
    },
    {
        path:'/boardlist',
        component: BoardList,
        label: 'Boards | ',
    },
    {
        path:'/board/:boardId',
        component: Board,
        label: 'Board',
    },
    {
        path:'/login',
        component: Login,
        label: 'login',
    },
    {
        path:'/singup',
        component: SingUp,
        label: 'singup',
    },
]

export default routes;