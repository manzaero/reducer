import PropTypes from "prop-types";
import {store} from "../store.js";

export function GameLayout({restart, isDraw, isGameEnded, field}) {
    return (
        <div className="container">
            <button className="btn-restart" onClick={restart}>Заново
            </button>
            <button className="btn-restart btn-color" disabled={isDraw || isGameEnded || field.some((param) => param !== '') ?  true : null} onClick={() => store.dispatch({type: 'TOGGLE_GAME_STATUS'})}>Сменить игрока
            </button>
        </div>)
}
GameLayout.propTypes = {
    restart: PropTypes.func.isRequired,
    isDraw: PropTypes.bool,
    isGameEnded: PropTypes.bool,
    field: PropTypes.arrayOf(PropTypes.string),
}