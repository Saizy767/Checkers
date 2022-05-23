import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import BoardComponent from '../components/Board/BoardComponent'
import { Board } from '../models/Board'


const Home: NextPage = () => {
  const [board, setBoard] = useState(new Board)

  useEffect(()=>{
    restart()
  },[])

  function restart(){
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }
  return (
      <BoardComponent board={board} setBoard={setBoard}/>
  )
}

export default Home
