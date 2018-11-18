import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  Card,
  Row,
  Col,
  Badge,
  Modal,
  Spin,
  Icon,
  Input
} from 'antd'
import { actionCreators } from './store'
import './style.sass'
import SearchType from './searchType.js'

const { Meta } = Card
const Search = Input.Search
const site = 'http://image.artifact4u.com/'

class Cards extends Component {
  state = {
    visible: false,
    loading: true,
    card: {}
  }
  render() {
    const {
      searchType,
      cardsInfo,
      pageInfo,
      typeList,
      // visible
    } = this.props
    const {
      visible,
      card,
      loading
    } = this.state
    return (
      <div className='cards_wrapper scroll-y'>
        <div className='cards_content'>
          <div className='cards_filter'>
            <div className='filter_header'>
              <div className='header_name'>
                过滤器
              </div>
              <div className='header_search'>
                <Search
                  placeholder="通过卡牌中文/英文查找卡牌"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </div>
            </div>
            <div className='filter_content'>
              <div>卡牌类型</div>
              <div>
                <SearchType/>
              </div>
            </div>
          </div>
          <div className='flex-1 align-self-start'>
            <Row gutter={16}>
              {
                cardsInfo.map((it, i) => (
                  <Col
                    className='col_wrapper'
                    key={i}
                    xl={{span: 4}}
                    lg={{span: 6}}
                    md={{span: 8}}
                    sm={{span: 12}}
                    xs={{span: 24}}
                  >
                    <Card
                      className='card'
                      bordered={true}
                      hoverable
                      cover={<img onClick={() => this._showModal(it)} src={site + it.img_key + '?imageMogr2/crop/526x890'} />}
                    >
                      <Meta
                        style={{overflow: 'hidden'}}
                        description={<p>{it.name},{it.type_en}</p>
                        }
                      />
                    </Card>
                  </Col>
                ))
              }
            </Row>
            <Modal
              footer={null}
              visible={visible}
              onCancel={this._handleCancel}
              width={'100%'}
            >
              <div className='modal_wrapper'>
                <div className='modal_left'>
                  {card.large_img_key ? <img className='modal_img' src={site + card.large_img_key + '?imageMogr2/crop/526x890'} /> : null}
                </div>
                <div className='modal_content'>
                  <h3>卡牌名称：{card.name}</h3>
                  {card.desc ? <p>简介：{desc}</p> : null}
                  {
                    this._skills(card.skills)
                  }
                </div>
                {
                  this._refCards(card.refCards)
                }
              </div>
            </Modal>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props._getAllCards(this.props.searchType.toJS())
  }

  _showModal(card) {
    this.setState({
      visible: true,
      card: card
    })
  }

  _handleCancel = (e) => {
    this.setState({
      visible: false,
      card: {}
    })
  }

  _skills(skills) {
    console.log(skills)
    if (skills) {
      if (skills.length > 0) {

        return (
          <div>
            <h2>技能：</h2>
            {
              skills.map((it, i) => (
                <div key={i}>
                  <img src={site + it.img_key} />
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </div>
              ))
            }
          </div>
        )
      }
    }
  }

  _refCards(ref) {
    console.log(ref)
    if (ref) {
      if (ref.length > 0) {
        return (
          <div className='modal_right scroll-y'>
            <h3>相关卡牌：</h3>
            {
              ref.map((it, i) => (
                <img className='ref_img' key={i} src={site + it.img_key} />
              ))
            }
          </div>
        )
      }
    }

  }
}

const mapState = (state) => ({
  typeList: state.getIn(['cards', 'typeList']),
  cardsInfo: state.getIn(['cards', 'cardsInfo']),
  pageInfo: state.getIn(['cards', 'pageInfo']),
  searchType: state.getIn(['cards', 'searchType'])
})

const mapDispatch = (dispatch) => ({
  _getAllCards(searchType) {
    dispatch(actionCreators.getAllCards(searchType))
  }
})

export default connect(mapState, mapDispatch)(Cards)