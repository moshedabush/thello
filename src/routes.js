import {HomePage} from '../src/pages/HomePage.jsx'
import { BoardList } from './pages/BoardList.jsx';
import { Board } from './pages/Board.jsx';
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
]

export default routes;