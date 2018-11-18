import axios from 'axios'
import * as actionTypes from './actionTypes'

const changeCardsData = (result) => ({
  type: actionTypes.CHANGE_CARDS_DATA,
  cardsInfo: result.cardsInfo.cards,
  pageInfo: result.cardsInfo.pageInfo
})

export const getAllCards = (searchType) => {
  let query = searchType.type_id
  
  return (dispatch, searchType) => {
    const options = {
      method: 'post',
      url: '/graphql',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: JSON.stringify({query: `
        query {
          cardsInfo(limit:18, type: [${query}]) {
            cards {
              id
              name
              type_id
              type_en
              color
              atk
              hp
              mana_cost
              img_key
              large_img_key
              skills {
                title
                skill
                desc
                img_key
              }
              refCards {
                id
                name
                img_key
                desc
              }
            }
            pageInfo {
              totalCount
              pageCount
              currentPage
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