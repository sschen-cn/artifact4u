import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd'
import './style.sass'
import pic1 from '../../static/1.jpg'
import pic2 from '../../static/2.png'

class Swipper extends Component {
  render() {
    return (
      <Carousel autoplay>
        <div>
          <div
            style={{background: `url(${pic1}) center`, height: '480px', backgroundSize: 'cover'}}>
            <Link to='/news'>
              <h3>
                新闻1
              </h3>
            </Link>
          </div>
        </div>
        <div>
          <div
            style={{background: `url(${pic2}) center`, height: '480px', backgroundSize: 'cover'}}>
            <Link to='/news'>
              <h3>
                新闻2
              </h3>
            </Link>
          </div>
        </div>
      </Carousel>
    )
  }
}

export default Swipper