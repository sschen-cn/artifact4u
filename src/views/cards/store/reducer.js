import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  typeList: [
    {type_id: 1,type_en: 'Hero', type_cn: '英雄卡'},
    {type_id: 2,type_en: 'Spell', type_cn: '法术卡'},
    {type_id: 3,type_en: 'Ability', type_cn: '增益卡'},
    {type_id: 4,type_en: 'Creep', type_cn: '生物卡'},
    {type_id: 5,type_en: 'Item', type_cn: '道具卡'}
  ],
  searchType: {type_id: [1]},
  cardsInfo: [],
  pageInfo: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CARDS_DATA:
      return state.merge({
        cardsInfo: action.cardsInfo,
        pageInfo: action.pageInfo
      })
    default:
      return state;
  }
}