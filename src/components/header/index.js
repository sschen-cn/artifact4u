import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  Spin
} from 'antd'
import './style.sass'

class Header extends Component {
  render () {
    return (
      <div className='flex-column header_wrapper'>
        <div className='header'>
          <Menu
            mode='horizontal'
          >
            <Menu.Item
              style={{
                marginLeft: 24,
                marginRight: 30,
                fontSize: 18,
                textAlign: 'center',
                color: '#fff !important',
                float: 'left'
              }}
            >
              <Link to={'/'}
              className='hover-scale logo-text' 
              style={{ color: '#fff2e8'}}
              >
                Artifact4u
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link 
                className='hover-scale' 
                style={{ color: '#fff2e8'}}
                to={'/cards'}
              >
                artifact牌库
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}

export default Header