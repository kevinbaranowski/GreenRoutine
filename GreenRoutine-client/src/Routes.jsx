import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'


import DataComponent from './Components/ExternalApiTester/Data.jsx'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import About2 from './Components/About/About2.jsx'
import Challenges from './Components/Challenge/ViewChallenges/Challenges.jsx'
import CreateChallenge from './Components/Challenge/CreateChallenge/CreateChallenge.jsx'
import Profile from './Components/ProfilePage/Profile.jsx'
import ErrorPage from './ErrorPage.jsx'
import DeleteChallenge from './Components/Challenge/DeleteChallenge/DeleteChallenge.jsx'
import RegisterForm from './Components/LoginRegister/RegisterForm.jsx'
import LoginForm from './Components/LoginRegister/LoginForm.jsx'
import Leaderboard from './Components/Leaderboard/Leaderboard.jsx'
import FriendProfile from './Components/FriendProfilePage/FriendProfile.jsx'
import ThankYou from './Components/Challenge/ThankYou.jsx'
import ElectricityEstimate from'./Components/ElectricityComponents/Electricity.jsx'
import Unauthorized from './Components/AuthorizationPages/Unauthorized.jsx'
import ProtectedRoute from './Components/AuthorizationPages/ProtectedRoute.jsx'
import AdminPage from './Components/Admin/AdminPage.jsx'
import ChallengeRequests from './Components/ChallengeRequests/ChallengeRequests.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/about2/2b1d0cd5-59be-4010-83b3-b60c5e5342da',
        element: <About2 />
      },
      {
        path: '/challenge',
        element: <Challenges />
      },
      {
        path: '/create',
        element: <CreateChallenge/>
      },
      {
        path: '/delete',
        element: <DeleteChallenge/>
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />
      },
      {
        path: '/data',
        element: <DataComponent/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/register',
        element: <RegisterForm/>
      },
      {
        path: '/login',
        element: <LoginForm/>
      },
      {
        path: '/test2',
        element: <ElectricityEstimate/>
      },
      {
        path: '/friend-profile/:id',
        element: <FriendProfile/>
      },
      {
        path: '/thankyou',
        element: <ThankYou/>
      },
      {
        path: '/unauthorized',
        element: <Unauthorized/>
      },
      {
        path: '/admin',
        element: <ProtectedRoute element={<AdminPage/>}/>
      },
      {
        path: '/challengerequests',
        element: <ChallengeRequests/>
      }
    ]
  }
])

export default router;