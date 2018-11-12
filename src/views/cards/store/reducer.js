import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  typeList: ['英雄卡', '法术卡', '增益卡', '生物卡', '道具卡'],
  cardsInfo: {},
  totalCount: 0,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CARDS_DATA:
      return state.merge({
        cardsInfo: fromJS(action.cardsInfo)
      })
    default:
      return state;
  }
}