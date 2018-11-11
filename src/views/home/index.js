import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>首页</h1>
        <Link to='/detail/1'>详情页</Link>
      </div>
    )
  }
}