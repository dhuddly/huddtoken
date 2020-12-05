import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  orderBookSelector,
  orderBookLoadedSelector,
  exchangeSelector,
  accountSelector,
  orderFillingSelector
} from '../store/selectors'
import { fillOrder } from '../store/interactions'

const renderOrder = (order, props) => {
  const { dispatch, exchange, account } = props

  return(
    <OverlayTrigger
      key={order.id}
      placement='auto'
      overlay={
        <Tooltip id={order.id}>
          {`Click here to ${order.orderFillAction}`}
        </Tooltip>
      }
    >
      <tr
        key={order.id}
        className="order-book-order"
        onClick={(e) => fillOrder(dispatch, exchange, order, account)}
      >
        <td>{order.tokenAmount}</td>
        <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
        <td>{order.etherAmount}</td>
        { order.orderFillAction==='buy'
          ? <td>~{Number((order.etherAmount*0.1).toFixed(5))}</td>
          : <td>~{Number((order.tokenAmount*0.1).toFixed(5))}</td>
        }
      </tr>
    </OverlayTrigger>
  )
}

const showOrderBook = (props) => {
  const { orderBook } = props

  return(
    <tbody>
      <tr>
        <th>HUDD</th>
        <th>HUDD/ETH</th>
        <th>ETH</th>
        <th>Fee(ETH)</th>
      </tr>
      {orderBook.sellOrders.map((order) => renderOrder(order, props))}
      <tr>
        <th>HUDD</th>
        <th>HUDD/ETH</th>
        <th>ETH</th>
        <th>↓Fee(HUDD)</th>
      </tr>
      {orderBook.buyOrders.map((order) => renderOrder(order, props))}
    </tbody>
  )
}

class OrderBook extends Component {
  render() {
    return (
      <div className="vertical">
        <div className="card bg-transparent text-white">
          <div className="card-header">
            Order Book
            <div style={{ fontSize: '11px' }}>
              (filling order requires a fee, fee=0.1*order_cost)
            </div>
          </div>
          <div className="card-body order-book">
            <table className="table table-transparent text-light table-sm small">
              { this.props.showOrderBook ? showOrderBook(this.props) : <Spinner type='table' /> }
            </table>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const orderBookLoaded = orderBookLoadedSelector(state)
  const orderFilling = orderFillingSelector(state)

  return {
    orderBook: orderBookSelector(state),
    showOrderBook: orderBookLoaded && !orderFilling,
    exchange: exchangeSelector(state),
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(OrderBook);