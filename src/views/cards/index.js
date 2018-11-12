import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { actionCreators } from './store'

class Cards extends Component {
  render() {
    return (
      <div className='cards_wrapper'>
        <div className='cards_filter'>
          <div className='filter_header'>
            <div className='header_name'>
              过滤器
            </div>
            <div className='header_search'>
              搜索
            </div>
          </div>
          <div className='filter_content'>
            <div>卡牌类型</div>
          </div>
        </div>
        <div className='flex-1 scroll-y align-self-start'>
          {
            // this._renderContent()
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props._getAllCards()
  }

  // _renderContent = () => {
  //   const { cards } = this.state

  //   if (!cards || !cards.length) return null

  //   return (
  //     // <Content cards={cards} />
  //   )
  // }
}

const mapState = (state) => ({
  typeList: state.getIn(['home', 'typeList'])
})

const mapDispatch = (dispatch) => ({
  _getAllCards() {
    dispatch(actionCreators.getAllCards())
  }
})

export default connect(mapState, mapDispatch)(Cards)