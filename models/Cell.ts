import { Board } from './Board';
import { Colors } from "./Colors";
import { Figure } from './Figure';

export class Cell{
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x:number, y:number, color:Colors, figure: Figure | null){
        this.x = x
        this.y = y
        this.id = parseInt(y.toString() + x.toString())
        this.figure = figure
        this.color = color
        this.board = board
        this.available = false
    }


    public isEmpty(): boolean {
        return this.figure === null;
    }

    public isEnemy(target: Cell):boolean{
        if( target?.figure){
            return this.figure?.color !== target.figure.color
        }
        return false
    }

    private setFigure(target: Figure){
        this.figure = target
        this.figure.cell = this
    }

    public moveFigure(target: Cell){
        const direction = this.figure?.color === Colors.BLACK ? 1 : -1
        if(this.figure && this.figure?.canMove(target)){  // clean figures on start and move to target
            this.figure.canMove(target)                  // but not clean different between start and end 
            if(             // Attack left up
                (target.y === this.y + direction * 2) 
                &&  (target.x === this.x - 2)
                &&  this.board.getCells(target.x, target.y).isEmpty()
                &&  this.isEnemy(this.board.getCells(this.x - 1, this.y + direction))){
                    this.board.getCells(this.x - 1, this.y + direction).figure = null
                }
            if(             // Attack right up
                (target.y === this.y + direction * 2)
                &&  (target.x === this.x + 2)
                &&  this.board.getCells(target.x, target.y).isEmpty()
                &&  this.isEnemy(this.board.getCells(this.x + 1, this.y + direction))){
                this.board.getCells(this.x + 1,this.y + direction).figure = null;
            }
            if(             // Attack right back
                (target.y === this.y - direction * 2)
                &&  (target.x === this.x + 2)
                &&  this.board.getCells(target.x, target.y).isEmpty()
                &&  this.isEnemy(this.board.getCells(this.x + 1,this.y - direction))){
                    this.board.getCells(this.x + 1, this.y - direction).figure = null             
                }
                if(             // Attack left back
                (target.y === this.y - direction * 2)
                &&  (target.x === this.x - 2)
                &&  this.board.getCells(target.x, target.y).isEmpty()
                &&  this.isEnemy(this.board.getCells(this.x - 1, this.y - direction))){
                    this.board.getCells(this.x - 1, this.y - direction).figure = null             
            }
            target.setFigure(this.figure)
            this.figure = null
        }
    }

    public isEmptyDiagonal(target: Cell): boolean{
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)

        const dy = this.y < target.y ? 1 : -1
        const dx= this.x < target.x ? 1 : -1

        if(absX !== absY){
            return false
        }
        for( let i=1; i < absY; i++){
            if(!this.board.getCells(this.x + dx * i, this.y + dy *i).isEmpty()
            && !this.board.getCells(this.x + dx * (i + 1), this.y + dy * (i + 1)).isEmpty()){
                return false
            }
        }
        return true
    }

}