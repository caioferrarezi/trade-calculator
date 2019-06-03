import React, { Component } from 'react'
import './TradeForm.css'
import classnames from 'classnames'

const validators = {
  isNotBlank: /^(?!\s*$).+/g,
  isNumber: /^(\d*\.?\d*)$/g,
  isNotEmpty: /^(?!0*$).+/g
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
      }
    }

    this.inputRefs = {
      type: React.createRef(),
      name: React.createRef(),
      price: React.createRef(),
      amount: React.createRef(),
      fee: React.createRef()
    }

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
    this.inputRefs.name.current.focus()
  }

  handleSubmit(event) {
    const inputs = this.state.inputs

    event.preventDefault()
    if (!this.validate()) return

    this.props.onFormSubmit({
      name: inputs.name.value.toLowerCase(),
      values: {
        id: generateId(),
        createdAt: Date.now(),
        type: inputs.type.value,
        price: parseFloat(inputs.price.value),
        amount: parseFloat(inputs.amount.value),
        fee: parseFloat(inputs.fee.value)
      }
    })

    this.reset()
    this.inputRefs.name.current.focus()
  }

  handleInputChange(event) {
    const target = event.target
    let inputs = {...this.state.inputs}

    inputs[target.id].value = target.value.replace(',', '.')

    this.validateInput(target)

    this.setState({
      inputs
    })
  }

  validateInput(input) {
    const inputs = {...this.state.inputs}
    const validations = input.dataset.validation.split(', ')
    let isValid = true;

    validations.forEach(validation => {
      isValid = isValid && !!input.value.match(validators[validation])
    })

    inputs[input.id].isValid = isValid

    this.setState({
      inputs
    })

    return isValid
  }

  validate() {
    const inputRefs = this.inputRefs
    let isValid = true;

    Object.keys(inputRefs).forEach(key => {
      let inputValidated = this.validateInput(inputRefs[key].current)
      isValid = isValid && inputValidated
    })

    return isValid
  }

  reset() {
    const inputs = {...this.state.inputs}

    inputs.type.value = 'purchase'
    inputs.name.value = ''
    inputs.price.value = 0
    inputs.amount.value = 0
    inputs.fee.value = 0

    this.setState({
      inputs
    })
  }

  render() {
    const inputs = this.state.inputs
    const inputRefs = this.inputRefs

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
              ref={inputRefs.name}
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
                ref={inputRefs.type}
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
              data-validation="isNotBlank, isNotEmpty, isNumber"
              ref={inputRefs.price}
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
              data-validation="isNotBlank, isNotEmpty, isNumber"
              ref={inputRefs.amount}
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
              ref={inputRefs.fee}
              value={inputs.fee.value}
              onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__button-wrapper">
            <button type="submit" className="c-trade-form__button">Calculate</button>
          </div>
        </div>
      </form>
    );
  }
}

export default TradeForm
