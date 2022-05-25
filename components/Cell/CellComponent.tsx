import Image from "next/image";
import React, { FC } from "react";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import styles from './CellComponent.module.scss'

interface CellProps{
    cell: Cell,
    selected: boolean,
    handleCellClick: (cell: Cell) => void,
}
const CellComponent: FC<CellProps>=({cell, selected, handleCellClick})=>{
    return(
        <div className={`${styles.cell} 
                        ${cell.color === Colors.WHITE ? styles.cell_white : styles.cell_black}
                        ${selected && cell.figure ? styles.selected : ''}
                        ${cell.figure? styles.pointer: ''}`}
                        onClick={()=>handleCellClick(cell)} 
                        style={{cursor: cell.available 
                                && !cell.figure?.form 
                                ? 'pointer': '',
                                backgroundColor: cell.available && cell.figure?.form ? 'greenyellow' : '',
                                }}>
            {cell.available && 
            !cell.figure?.form &&
              <div className={styles.cell_available}/>}
            {cell.figure?.form && 
                <Image src={cell.figure.form} alt={(cell.figure.id).toString()}/>}
        </div>
    )
}

export default CellComponent