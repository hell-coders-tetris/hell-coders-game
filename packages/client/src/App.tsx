import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { Home } from './pages/home'
import { Error500 } from './pages/error500'
import { Error404 } from './pages/error404'
import { Forum } from './pages/Forum/Forum'

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
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/error500" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/forum" element={<Forum />} />
      </Route>
    </Routes>
  )
}

export default App
