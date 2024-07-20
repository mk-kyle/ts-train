import { useSelector } from "react-redux"
import { RootSrate } from "../redux/store"

function History() {

  const { bankHistory } = useSelector((state: RootSrate) => state.portalBank)
  const showHistory = bankHistory.map((card)=> {
    return (
      <div className="text-white bg-[#ffff001b] border-yellow-400 border-2 rounded-lg p-3 flex flex-col gap-3 mb-4">
        <div className="flex justify-between gap-10">
          <img className="rounded-md w-10" src={card.imgCard} alt="" />
          <img className="rounded-md w-10" src={card.desImg} alt="" />
        </div>
        <div className="flex justify-between">
          <p>From: {card.numberCard}</p>
          <p>To: {card.numberCardDes}</p>
        </div>  
        <div className="flex justify-between">
          <p>Amount: £ {card.amountDes}</p>
          <p>Date Pay: {card.payTime}</p>
        </div>
      </div>
    )
  })

  return (
    bankHistory.length !== 0 ?
    <div>
      {showHistory}
    </div>
    : <div className="text-white text-5xl w-full h-full flex justify-center items-center font-semibold drop-shadow-2xl">
      No History
    </div>
  )
}

export default History