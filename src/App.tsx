import { useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import { RootSrate } from "./redux/store"
import { useDispatch } from "react-redux"
import { useState } from "react"
import AddCard from "./pages/AddCard"
import PayMony from "./pages/PayMony"
import History from "./pages/History"
import ShowCard from "./utils/ShowCard"


function App() {

  

  // const [num, setNum]= useState<number>(2)
  
  // const count = useSelector((state: RootSrate)=> state.counter.value)
  // const dispatch = useDispatch()

  // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   setNum(parseFloat(e.target.value))
  // }

  return (
    <div className="w-screen h-screen bg-[#424242] flex justify-center items-center">
      <Router>
        <div className="h-[90%] w-1/3  bg-[#212121] rounded-md">
          <div className="w-full h-16 rounded-b-xl bg-yellow-300">
            <div className="w-[90%] h-full mx-auto flex justify-between items-center">
              <NavLink className={({ isActive }) => isActive ? " font-semibold border-b-4 border-blue-600" : ""} to='/' >Add Card</NavLink>
              <NavLink className={({ isActive }) => isActive ? " font-semibold border-b-4 border-blue-600" : ""} to='/pay' >Pay</NavLink>
              <NavLink className={({ isActive }) => isActive ? " font-semibold border-b-4 border-blue-600" : ""} to='/history' >History</NavLink>
            </div>
          </div>
          <div className="shadow-xl w-[90%] h-64 mx-auto mt-4 rounded-md justify-center items-center overflow-auto text-white">
            <ShowCard />
          </div>
          <div className="w-[90%] mx-auto mt-4">
            <div className="w-full h-[340px] overflow-auto">
            <Routes>
              <Route path="/" element={<AddCard />} />
              <Route path="/pay" element={<PayMony />} />
              <Route path="/history" element={<History />} />
            </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>  )
}

export default App