import React, { Component } from 'react'
import './TradeForm.css'
import classnames from 'classnames'

const validators = {
  isNotBlank: /^(?!\s*$).+/g,
  isNumber: /^(\d*\.?\d*)$/g
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

class TradeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {
        type: {
          value: 'purchase',
          isValid: true,
        },
        name: {
          value: '',
          isValid: true,
        },
        price: {
          value: 0,
          isValid: true,
        },
        amount: {
          value: 0,
          isValid: true,
        },
        fee: {
          value: 0,
          isValid: true,
        }
      },
      isFormValid: false,
    }

    this.inputName = React.createRef()

    this.bind()
  }

  bind() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.validate = this.validate.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.inputName.current.focus()
  }

  componentDidUpdate(prevProp, prevState) {
    let isFormValid = this.validate()

    if (prevState.isFormValid !== isFormValid)
      this.setState({
        isFormValid
      })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.isFormValid) return

    let id = generateId()

    this.props.onFormSubmit({
      name: this.state.name.toLowerCase(),
      values: {
        id: id,
        createdAt: Date.now(),
        type: this.state.type,
        price: parseFloat(this.state.price),
        amount: parseFloat(this.state.amount),
        fee: parseFloat(this.state.fee)
      }
    })

    this.reset()
    this.inputName.current.focus()
  }

  handleInputChange(event) {
    const target = event.target
    let inputs = {...this.state.inputs}

    inputs[target.id].value = target.value.replace(',', '.')
    inputs[target.id].isValid = this.validateInput(target)

    this.setState({
      inputs
    })
  }

  validateInput(input) {
    const validations = input.dataset.validation.split(', ')
    let isValid = true;

    validations.forEach(validation => {
      isValid = isValid && !!input.value.match(validators[validation])
    })

    return isValid
  }

  validate() {
    const inputs = this.state.inputs
    let isValid = true;

    Object.keys(inputs).forEach(key => {
      isValid = isValid && inputs[key].isValid
    })

    return isValid
  }

  reset() {
    this.setState({
      type: 'purchase',
      name: '',
      price: '',
      amount: '',
      fee: ''
    })
  }

  render() {
    const inputs = this.state.inputs

    return(
      <form className="c-trade-form" onSubmit={this.handleSubmit}>
        <div className="c-trade-form__wrapper">
          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="name">Name:</label>
            <input className={classnames({
              'c-trade-form__input -name': true,
              'is-invalid': !inputs.name.isValid
            })}
              type="text"
              id="name"
              data-validation="isNotBlank"
              ref={this.inputName}
              value={inputs.name.value}
              onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="type">Type:</label>
            <div className="c-trade-form__select-wrapper">
              <select className={classnames({
                'c-trade-form__select': true,
                'is-invalid': !inputs.type.isValid
              })}
                id="type"
                data-validation="isNotBlank"
                value={inputs.type.value}
                onChange={this.handleInputChange}>
                <option value="purchase">Purchase</option>
                <option value="sale">Sale</option>
              </select>
            </div>
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="price">Price:</label>
            <input className={classnames({
              'c-trade-form__input': true,
              'is-invalid': !inputs.price.isValid
            })}
              type="text"
              id="price"
              data-validation="isNotBlank, isNumber"
              value={inputs.price.value}
              onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="amount">Amount:</label>
            <input className={classnames({
              'c-trade-form__input': true,
              'is-invalid': !inputs.amount.isValid
            })}
              type="text"
              id="amount"
              data-validation="isNotBlank, isNumber"
              value={inputs.amount.value}
              onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="fee">Fee:</label>
            <input className={classnames({
              'c-trade-form__input': true,
              'is-invalid': !inputs.fee.isValid
            })}
              type="text"
              id="fee"
              data-validation="isNotBlank, isNumber"
              value={inputs.fee.value}
              onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__button-wrapper">
            <button type="submit" className="c-trade-form__button" disabled={!this.state.isFormValid}>Calculate</button>
          </div>
        </div>
      </form>
    );
  }
}

export default TradeForm
