import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.sass'
import Swipper from '../../components/swipper'
import HotCards from '../../components/hotCards'

class Home extends Component {
  render() {
    return (
      <div className='home_wrapper'>
        <div className='home_left'>
          <Swipper />
        </div>
        <div className='home_right'>
          <HotCards />
        </div>
      </div>
    )
  }
}

export default Home