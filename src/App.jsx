import './App.css'
import Cell from './components/Cell.jsx'
import {useState, useEffect} from 'react'
import Confetti from 'react-confetti'

const App = () => {

  const [cells, setCells] = useState(["","","","","","","","",""])
  const [go, setGo] = useState("circle") 
  const [winningMessage, setWinningMessage] = useState(null)

  let message = `It is now ${go}'s go.`
  
  const checkAutoReset = () =>{
    const emptyCellCount = cells.filter(cell => cell.length === 0).length;
    if(!winningMessage && emptyCellCount === 0){
      resetGame()
    }
  }
  
  const resetGame = () =>{
    setCells(["","","","","","","","",""])
    setGo("circle")
    setWinningMessage(null)
  }
  
  const checkScore = () =>{
    const winningCombos = [[0,1,2], [3,4,5], [6,7,8],
                          [0,3,6], [1,4,7], [2,5,8],
                          [0,4,8], [2,4,6]]

    winningCombos.forEach(array =>{
      let circleWins = array.every(cell => cells[cell] === 'circle')
      if(circleWins){
        setWinningMessage("Circle Wins!")
        return
      }

      let crossWins = array.every(cell => cells[cell] === 'cross')
      if(crossWins){
        setWinningMessage("Cross Wins!")
        return
      } 
    })
  }

  useEffect(() =>{
    checkScore()
    checkAutoReset()
  ,[cells]})
  
  return (
    <div className='app'>
      <header className="heading">Tic - Tac - Toe </header>
      <div className='gameboard'>
        {cells.map((cell, index) =>{
          return(
            <Cell 
              key={index}
              id={index}
              cell={cell}
              setCells={setCells}
              go={go}
              setGo={setGo}
              cells={cells}
              winningMessage={winningMessage}
              />
          )
        })}
      </div>
       <p className="message">{winningMessage || message}</p>  
      <button className="reset" onClick={resetGame}>R E S E T</button>

      {winningMessage && <Confetti
      width={	window.innerWidth}
      height={window.innerHeight}
    />}
    </div>

  )
}

export default App 