import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import BoardComponent from '../components/Board/BoardComponent'
import { Board } from '../models/Board'
import { Colors } from '../models/Colors'
import { Player } from '../models/Player'


const Home: NextPage = () => {
  const [board, setBoard] = useState(new Board)
  const [whitePlayer, setWhitePlayer] =  useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(()=>{
    restart()
  },[])

  function restart(){
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function swapPlayer(){
    setCurrentPlayer((currentPlayer?.color == Colors.WHITE) ? blackPlayer : whitePlayer)
  }
  return ( 
      <BoardComponent board={board}
                      setBoard={setBoard}
                      currentPlayer={currentPlayer}
                      swapPlayer={swapPlayer}/>
  )
}

export default Home
