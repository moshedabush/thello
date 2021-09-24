import {HomePage} from '../src/pages/HomePage.jsx'
import { BoardList } from './pages/BoardList.jsx';
import { Board } from './pages/Board.jsx';
const routes = [
    {
        path:'/',
        component: HomePage,
        label: 'Home 🏠',
    },
    {
        path:'/boardlist',
        component: BoardList,
        label: 'Board List',
    },
    {
        path:'/board',
        component: Board,
        label: 'Board',
    },


    // {
    //     path:'/board/:boardId',
    //     component: Board,
    //     label: 'Board',
    // },
]

export default routes;