import {HomePage} from '../src/pages/HomePage.jsx';
import { BoardList } from './pages/BoardList.jsx';
import { Board } from './pages/Board.jsx';
import { Login } from './pages/Login.jsx';
import { SignUp } from './pages/SignUp.jsx';
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
        path:'/signup',
        component: SignUp,
        label: 'Singup',
    },
    {
        path:'/login',
        component: Login,
        label: 'Login',
    },
]

export default routes;