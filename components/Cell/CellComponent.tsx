import Image from "next/image";
import React, { FC } from "react";
import { Cell } from "../../models/Cell";
import styles from './CellComponent.module.scss'

interface CellProps{
    cell: Cell,
    selected: boolean,
    handleCellClick: (cell: Cell) => void,
}
const CellComponent: FC<CellProps>=({cell, selected, handleCellClick})=>{
    return(
        <div className={`${styles.cell} 
                        ${cell.color === "white" ? styles.cell_white : styles.cell_black}
                        ${selected && cell.figure ? styles.selected : ''}`}
                        onClick={()=>handleCellClick(cell)} 
                        style={{cursor: cell.available 
                                && !cell.figure?.form 
                                ? 'pointer': '',
                                backgroundColor: cell.available && cell.figure?.form ? 'greenyellow' : ''}}>
            {cell.available && 
            !cell.figure?.form &&
              <div className={styles.cell_available}/>}
            {cell.figure?.form && 
                <Image src={cell.figure.form} alt={'cell.figure.name'} className={styles.cell__figure}/>}
        </div>
    )
}

export default CellComponent