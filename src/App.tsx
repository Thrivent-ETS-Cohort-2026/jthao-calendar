import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './components/HomePage'

function App() {
  

  return (
    <>
      <Header />
      <HomePage />
      {/* Option 1: Display Calendar in HomePage 
      Logic will stay in HomePage*/}
      {/* Option 2: Display Calendar here once user logs in 
      Will need to send callback function*/}
      <Footer />
    </>
  )
}

export default App
