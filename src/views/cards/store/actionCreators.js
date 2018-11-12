import axios from 'axios'
import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

const changeCardsData = (result) => ({
  type: actionTypes.CHANGE_CARDS_DATA,
  cardsInfo: result.cardsInfo
})

export const getAllCards = () => {
  return (dispatch) => {
    const options = {
      method: 'post',
      url: '/graphql?',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: JSON.stringify({query: `
        query {
          cardsInfo {
            cards {
              id
            }
          }
        }
      `})
    }
    axios(options).then((res) => {
      const result = res.data.data
      const action = changeCardsData(result)
      dispatch(action)
    }).catch((error) => {
      console.log(error)
    })
  }
}