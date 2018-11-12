import { combineReducers } from 'redux-immutable'
import { reducer as cardsReducer } from '../views/cards/store'

const reducer = combineReducers({
  cards: cardsReducer
})

export default reducer