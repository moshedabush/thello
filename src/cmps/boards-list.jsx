import { Link } from 'react-router-dom'
import { ReactComponent as Star } from "../assets/img/full-star.svg";
export function BoardsList({ boards, onToggleFavorite,onToggleBoard }) {
    return (
        <div className="board-list">
            {boards.map(board => {
                return <Link key={board._id} className="clean-link" to={`/board/${board._id}`}>
                    <div className="board-preview" 
                       style={{backgroundColor: board.style.coverColor
                        ? board.style.coverColor
                          : "green",
                        //   style={{background: `${board.style.imgUrl ? `${board.style.imgUrl} center center / cover` : board.style.coverColor}`
                              
                          }}>
                        <div className="board-preview-details" onClick={(ev) => onToggleBoard(ev,board._id)}>
                            <h3>{board.title.length > 20 ? board.title.substring(0, 20) + '...' : board.title}</h3>
                            <Star  className={`far fa-star ${board.isFavorite ? 'favorite' : ''}`}
                                onClick={(ev) => onToggleFavorite(ev, board._id)}/>
                        </div>
                    </div>
                </Link >
            })}
        </div>
    )
}