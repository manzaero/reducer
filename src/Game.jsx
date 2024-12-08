import {InformationLayout} from "./GameLayout/Information/InformationLayout.jsx";
import {Field} from "./GameLayout/Field/FieldLayout.jsx";
import './Game.css'
import {GameLayout} from "./GameLayout/GameLayout.jsx";
import {store} from "./store.js";
import {useState, useEffect} from "react";

export const Game = () => {
    const winnerSchema = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(store.getState());
        });
        return () => unsubscribe();
    }, []);

    const onClicked = (index) => {
            const newField = [...state.field];
            if (newField[index] || state.isGameEnded) return

            newField[index] = state.currentPlayer;



        for (let [x, y, z] of winnerSchema) {
            if ( newField[x] && newField[x] === newField[y] && newField[x] === newField[z]) {
                store.dispatch({
                    type: 'UPDATE_GAME_STATUS',
                    payload: { field: newField },
                });
                store.dispatch({
                    type: 'SET_GAME_STATUS',
                    payload: { isGameEnded: true, isDraw: false },
                });
                return;
            }
        }

            if (!newField.includes('')) {
                store.dispatch({type: 'UPDATE_GAME_STATUS', payload: newField});
                store.dispatch({type: 'SET_GAME_STATUS', payload: {isGameEnded: true, isDraw: false}});
            } else {
                store.dispatch({type: 'UPDATE_GAME_STATUS', payload: { field: newField }});
                store.dispatch({type: 'TOGGLE_GAME_STATUS'});
            }
        console.log(state.currentPlayer)
    }

    const restart = () => {
        store.dispatch({type: 'RESET_GAME_STATUS'})
    }

    return (<>
        <InformationLayout isDraw={state.isDraw} isGameEnded={state.isGameEnded} currentPlayer={state.currentPlayer}/>
        <Field field={state.field} isGameEnded={state.isGameEnded} onClick={onClicked}/>
        <GameLayout field={state.field} isGameEnded={state.isGameEnded} isDraw={state.isDraw} restart={restart}/>
    </>)
}