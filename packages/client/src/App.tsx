import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { Home } from './pages/Home/Home'
import { LeaderBoard } from './pages/Leaderboard/Leaderboard'
import { Error500 } from './pages/Error/Error500'
import { Error404 } from './pages/Error/Error404'
import { ErrorComponent } from './pages/Error/ErrorComponent'
import { Game } from './pages/Game/Game'
import { Register } from './pages/Register/Register'
import { Forum } from './pages/Forum/Forum'
import { Auth } from './pages/Auth/Auth'
import { Profile } from './pages/Profile/Profile'

export enum RouteNames {
  MAIN = '/',
  GAME = '/game',
  BLOG = '/blog',
  LEADERBOARD = '/leaderboard',
  PROFILE = '/profile',
  ERROR_500 = '/error500',
  REGISTER = '/register',
  ERROR_404 = '/error404',
  ERROR_COMPONENT = '/errorcomponent',
  FORUM = '/forum',
  AUTH = '/auth',
}

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <Routes>
      <Route path={RouteNames.MAIN} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={RouteNames.LEADERBOARD} element={<LeaderBoard />} />
        <Route path={RouteNames.GAME} element={<Game />} />
        <Route path={RouteNames.REGISTER} element={<Register />} />
        <Route path={RouteNames.FORUM} element={<Forum />} />
        <Route path={RouteNames.ERROR_500} element={<Error500 />} />
        <Route path={RouteNames.ERROR_COMPONENT} element={<ErrorComponent />} />
        <Route path="*" element={<Error404 />} />
        <Route path={RouteNames.AUTH} element={<Auth />} />
        <Route path={RouteNames.PROFILE} element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
