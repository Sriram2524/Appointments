// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppDetails, clickStare} = props
  const {id, name, date, isTrue} = eachAppDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const starImgUrl = isTrue
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickStar = () => {
    clickStare(id)
  }
  return (
    <li className="list">
      <div className="star">
        <p className="name">{name}</p>
        <button
          onClick={onClickStar}
          data-testid="star"
          className="star-button"
          type="button"
        >
          <img className="delete-img" alt="star" src={starImgUrl} />
        </button>
      </div>
      <p className="date">{formattedDate}</p>
    </li>
  )
}
export default AppointmentItem
