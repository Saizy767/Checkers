import React, { FC, useEffect, useState } from "react";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player";
import CellComponent from "../Cell/CellComponent";

import styles from './BoardComponent.module.scss'

interface BoardComponentProps{
    board: Board,
    setBoard: (board:Board)=>void,
    currentPlayer: Player | null,
    swapPlayer: ()=>void
}
const BoardComponent: FC<BoardComponentProps>=({board,setBoard, currentPlayer, swapPlayer})=>{
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

    function handleCellClick(cell:Cell){
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null);
            updateBoard()
        }
        else{
            if(cell.figure?.color === currentPlayer?.color ){
                setSelectedCell(cell)
                
            }
        }
    }
    return(
        <>
        <h3>{currentPlayer?.color}</h3>
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
        </>
    )
}

export default BoardComponent