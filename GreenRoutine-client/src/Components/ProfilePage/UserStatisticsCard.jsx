import { Card, CardBody, CardTitle } from "reactstrap";
import leafIcon from '../../assets/images/leaf.png'
import formatNumbers from "../../utils/helpers/formatNumbers";

const UserStatisticsCard = ({ user }) => {

    return (
        <Card className='lightgrey-card statistics-margin'>
            <CardBody>
                <CardTitle className='display-6'>
                    Personal Statistics
                </CardTitle>
                <ul className="no-bullets-on-list">
                    <li>Leaves: <img src={leafIcon} height='15'/> {formatNumbers(user.leaves)}</li>
                    <li>Lifetime Leaves: <img src={leafIcon} height='15'/> {formatNumbers(user.lifetimeLeaves)}</li>
                    <li>Current Streak: {formatNumbers(user.currentStreak)} days</li>
                    <li>Longest Streak: {formatNumbers(user.longestStreak)} days</li>
                    <li>Number of Challenges Completed: {formatNumbers(user.numChallengesComplete)}</li>
                    <li>Number of Challenges Created: {formatNumbers(user.numChallengesCreated)}</li>
                </ul>
            </CardBody>
        </Card>
    )
}

export default UserStatisticsCard;