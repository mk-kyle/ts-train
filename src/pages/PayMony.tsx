import { useSelector } from "react-redux"
import { RootSrate } from "../redux/store"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addHistoryHandler, setNewAmount } from "../redux/card-Slice"
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'
import PayMonyHelper from "../utils/PayMonyHelper"


export interface History {
  desImg: string | undefined,
  amountDes: string,
  numberCardDes: string,
  imgCard: string | undefined,
  numberCard: string | undefined,
  payTime: string,
}

function PayMony() {


  const { bankPay } = useSelector((state: RootSrate)=> state.portalBank)
  const { bankCode } = useSelector((state: RootSrate)=> state.portalBank)
  const dispatch = useDispatch()


  const [ desImg, setDesImg] = useState<string | undefined>(undefined)
  const [ amountDes, setAmountDes] = useState<string>('')
  const [ numberCardDes, setNumberCardDes] = useState<string>('')
  const [ password, setPassword] = useState<string>('')

  function pushNotify() {
    new Notify({
      title: 'PLease Fill All Bxes',
      text: 'Check To Be Fill and Available Bank',
      status: 'warning'
    })
  } 

  const now = new Date();

  const options = { timeZone: "Asia/Tehran" };

  const formattedDate = now.toLocaleDateString("fa-IR", {
      ...options,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
  });


  const cardNumberHandler = (e:  React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length == 0 && e.which == 48) {
        e.preventDefault()
    } else if (e.target.value.length == 0 && e.which == 96) {
        e.preventDefault()
    }
    if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 48 || e.which < 96 && e.which > 57 || e.which > 105) {
        e.preventDefault()
    }
  }
  
  

  const inpValueImgHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fourBankIndex: string = e.target.value[0]+e.target.value[1]+e.target.value[2]+e.target.value[3]
    const findCode = bankCode.find((card)=> card.code == +fourBankIndex)
    setNumberCardDes(e.target.value)
    
    
    
    if (findCode) {
      bankCode.map((card)=> {
        if (+fourBankIndex == card.code) {
          setDesImg(card.url)
        }
      })
    } else setDesImg(undefined)
  }


const amountPayDesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setAmountDes(e.target.value)
}

const passvordValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value)
}

const payMonyHandler = () => {
  if (bankPay.amountCard) {
    if (numberCardDes.length == 16 && desImg && +amountDes <= +bankPay.amountCard && password.length > 5) {
        dispatch(setNewAmount({bankPayId, amountDes}))
        dispatch(addHistoryHandler(historyObj))
        setDesImg(undefined)
        setAmountDes('')
        setNumberCardDes('')
        setPassword('')
      } else{
        pushNotify()
      }
  } else{
    pushNotify()
  }
}

const historyPayTime = formattedDate 

const historyObj: History = {
  amountDes: amountDes,
  desImg: desImg,
  numberCardDes: numberCardDes,
  numberCard: bankPay.numberCard,
  imgCard: bankPay.imgCard,
  payTime: historyPayTime,
}

const bankPayId = bankPay.id

  return (
    bankPay.amountCard ? <div>
        <input type="text" readOnly value={bankPay.nameCard} placeholder='Card Namne' className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <div className="relative flex items-center mb-4"><img className="absolute right-2 w-8 rounded-full" src={bankPay.imgCard} alt="" /><input type="text" readOnly value={bankPay.numberCard && bankPay.numberCard.match(/.{1,4}/g)?.join(' ')}  placeholder='Card Number'  className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
        <div className="flex items-center relative  mb-4"><img className="absolute w-8 rounded-full right-2" src={desImg} alt="" /><input type="text" value={numberCardDes} onKeyDown={cardNumberHandler} onChange={inpValueImgHandle} placeholder="Destination Card Number" maxLength={16} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
        <input type="password" value={password} onChange={passvordValueHandler} placeholder="Password" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <input type="text" value={amountDes} onKeyDown={cardNumberHandler} onChange={amountPayDesHandler}  placeholder="Destination Amount" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <button  onClick={payMonyHandler} className="w-full h-10 bg-yellow-300 rounded-md">Add Card</button>
    </div> : <PayMonyHelper />
  )
}

export default PayMony