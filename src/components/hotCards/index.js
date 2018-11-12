import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tabs } from 'antd'
import './style.sass'

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class HotCards extends Component {
  render() {
    return (
      <Tabs className='hot_wrapper' defaultActiveKey="1" onChange={callback}>
        <TabPane tab="热门卡组" key="1">热门卡组</TabPane>
        <TabPane tab="热门新闻" key="2">热门新闻</TabPane>
      </Tabs>
    )
  }
}

export default HotCards