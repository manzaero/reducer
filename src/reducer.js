export const initialState = {
    currentPlayer: 'X',
    isGameEnded: false,
    isDraw: false,
    field: ['', '', '', '', '', '', '', '', '',]
};

export const appReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'TOGGLE_GAME_STATUS': {
            return {
                ...state,
                currentPlayer: state.currentPlayer === 'X' ? '0' : 'X',
            }
        }
        case 'SET_GAME_STATUS': {
            return {
                ...state,
                isGameEnded: state.isGameEnded,
                isDraw: state.isDraw
            }
        }
        case 'UPDATE_GAME_STATUS': {
            return {
                ...state,
                field: payload.field,
            }
        }
        case 'RESET_GAME_STATUS': {
            return initialState
        }
        default:
            return state
    }
}