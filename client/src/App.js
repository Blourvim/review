import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// COMPONENTS
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackForm from './components/FeedbackForm'
import FeedbackStats from './components/FeedbackStats'
import AboutPage from './pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'
import Profile from './components/Profile'
import CheckLogin from './components/CheckLogin'
import Achivements from './components/Achivements'
// AUTH
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

// CONTEXT
import { FeedbackProvider } from './context/FeedbackContext'

const App = () => {
  return (
    <FeedbackProvider>
      <LoginButton/>
      <LogoutButton/>
      <CheckLogin/>
      <Profile/>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              exact
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>
            <Route path='/about' element={<AboutPage />} />
            <Route path='/achivements' element={<Achivements/>}/>
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App
