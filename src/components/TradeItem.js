import React, { Component } from 'react'
import './TradeItem.css'

class TradeItem extends Component {
  render() {
    let trade = this.props.trade

    return(
      <div className="c-trade-item">
        <h2 className="c-trade-item__title">{this.props.trade.name}</h2>

        <ul className="c-trade-item__list">
          {trade && trade.values.map(value =>
            <li className="c-trade-item__value" key={value.id}>
              {value.type}, {value.price}, {value.amount}, {value.fee}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default TradeItem
