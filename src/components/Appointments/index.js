// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialDetails = []
class Appointments extends Component {
  state = {
    name: '',
    date: '',
    appointmentDetails: initialDetails,
    isStarredFilterActive: false,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {name, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      name,
      date,
      isTrue: false,
    }
    this.setState(prevState => ({
      appointmentDetails: [...prevState.appointmentDetails, newAppointment],
      name: '',
      date: '',
    }))
  }

  clickStare = id => {
    this.setState(prevState => ({
      appointmentDetails: prevState.appointmentDetails.map(each => {
        if (id === each.id) {
          return {...each, isTrue: !each.isTrue}
        }
        return each
      }),
    }))
  }

  onStarChange = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  getFilteredStared = () => {
    const {appointmentDetails, isStarredFilterActive} = this.state
    if (isStarredFilterActive) {
      const filteredDetails = appointmentDetails.filter(each => {
        if (each.isTrue) {
          return true
        }
        return ''
      })
      return filteredDetails
    }
    return appointmentDetails
  }

  render() {
    const {name, date, isStarredFilterActive} = this.state
    const filteredAppointments = this.getFilteredStared()
    return (
      <div className="bg-container">
        <div className="card">
          <div className="shadow-con">
            <div className="text-con">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label className="label" htmlFor="titleLabel">
                  TITLE
                </label>
                <input
                  className="input"
                  onChange={this.onChangeName}
                  id="titleLabel"
                  type="text"
                  value={name}
                  placeholder="Title"
                />
                <label className="label" htmlFor="dateLabel">
                  DATE
                </label>
                <input
                  className="input"
                  onChange={this.onChangeDate}
                  id="dateLabel"
                  type="date"
                  value={date}
                  placeholder="dd/mm/yyyy"
                />
                <div>
                  <button type="submit" className="button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="img-con">
              <img
                className="img"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <div className="app-start-con">
            <h1 className="app-text">Appointments</h1>
            <div>
              <button
                onClick={this.onStarChange}
                className={isStarredFilterActive ? 'color-button' : 'buton'}
                type="button"
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="unodered">
            {filteredAppointments.map(each => (
              <AppointmentItem
                clickStare={this.clickStare}
                key={each.id}
                eachAppDetails={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
