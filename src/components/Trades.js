import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import {
  filledOrdersLoadedSelector,
  filledOrdersSelector
} from '../store/selectors'

const showFilledOrders = (filledOrders) => {
  return(
    <tbody>
      { filledOrders.map((order) => {
        return(
          <tr className={`text-${order.id}`} key={order.id}>
            <td className="text-light">{order.formattedTimestamp}</td>
            <td>{order.tokenAmount}</td>
            <td className={`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
          </tr>
        )
      }) }
    </tbody>
  )
}

class Trades extends Component {
  render() {
    return (
      <div className="vertical">
        <div className="card bg-transparent text-white">
          <div className="card-header">
            Trades
          </div>
          <div className="card-body">
            <table className="table table-transparent text-light table-sm small">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>HUDD</th>
                  <th>HUDD/ETH</th>
                </tr>
              </thead>
              { this.props.filledOrdersLoaded ? showFilledOrders(this.props.filledOrders) : <Spinner type="table" />}
            </table>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filledOrdersLoaded: filledOrdersLoadedSelector(state),
    filledOrders: filledOrdersSelector(state),
  }
}

export default connect(mapStateToProps)(Trades)
