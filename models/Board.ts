import { Basic } from './figures/Basic';
import { Colors } from './Colors';
import { Cell } from "./Cell";

export class Board{
    cells: Cell[][] = []

    public initCells(){
        for (let i=0; i< 8;i++){
            const row:Cell[] = []
            for(let j=0; j< 8; j++){
                if((i+j) % 2 !== 0){
                    row.push(new Cell(this, j , i, Colors.WHITE, null)) //white
                }
                else{
                    row.push(new Cell(this, j, i ,Colors.BLACK, null)) //black
                }
            }
            this.cells.push(row)
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
          const row = this.cells[i];
          for (let j = 0; j < row.length; j++) {
            const target = row[j];
            target.available = !!selectedCell?.figure?.canMove(target)
          }
        }
      }

    private addBasicFigures(){
        for(let i=0; i<8; i++){
            for (let j=0; j<3; j++){
                if(j%2!==0 && i%2 !==0){
                    new Basic(Colors.BLACK, this.getCells(i,j))
                }
                else if(j%2===0 && i%2===0){
                    new Basic(Colors.BLACK, this.getCells(i,j))
                }
                
            }
            for (let j=5; j<8; j++){
                if(j%2!==0 && i%2 !==0){
                    new Basic(Colors.WHITE, this.getCells(i,j))
                }
                else if(j%2===0 && i%2===0){
                    new Basic(Colors.WHITE, this.getCells(i,j))
                }
                
            }
        }
    }

    public getCells(x:number, y:number){
        return this.cells[y][x]
    }

    public addFigures(){
        this.addBasicFigures()
    }
}