import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Detail extends Component {
  render() {
    return (
      <div>
        <h1>详情页</h1>
        <Link to='/'>首页</Link>
      </div>
    )
  }
}