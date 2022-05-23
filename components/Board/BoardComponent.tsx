import React, { FC, useCallback, useEffect, useState } from "react";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import CellComponent from "../Cell/CellComponent";

import styles from './BoardComponent.module.scss'

interface BoardComponentProps{
    board: Board,
    setBoard: (board:Board)=>void
}
const BoardComponent: FC<BoardComponentProps>=({board,setBoard})=>{
    const [selectedCell, setSelectedCell]= useState<Cell | null>(null)

    useEffect(()=>{
        highlightCells()
    },[selectedCell])
    

    function highlightCells(){
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    const handleCellClick = useCallback((cell:Cell) =>{
        if(selectedCell && selectedCell !== cell && selectedCell.moveFigure(cell)){
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
            updateBoard()
        }
        else{
            setSelectedCell(cell)
        }
        if(cell.figure){
            setSelectedCell(cell)
        }
    },[selectedCell])

    return(
        <div className={styles.board}>
            {board.cells.map((row, index)=>
                    <React.Fragment key={index}>
                        {row.map((cell)=>
                            <CellComponent key={cell.id} cell={cell} 
                                                         selected={selectedCell?.x === cell.x 
                                                                && selectedCell?.y === cell.y}
                                                         handleCellClick={handleCellClick}/>
                        )}
                    </React.Fragment> 
            )}
        </div>
    )
}

export default BoardComponent