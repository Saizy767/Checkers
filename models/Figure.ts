import { Cell } from './Cell';
import { Colors } from './Colors';
import BasicChecker from '../../public/CheckerBlack.svg'


export class Figure{
    color: Colors;
    form: typeof BasicChecker | null;
    cell: Cell;
    id: number;

    constructor(color:Colors, cell: Cell){
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.form = null;
        this.id = Math.random()
    } 

    public canMove(target: Cell): boolean{
        if(target.figure?.color === this.color){
            return false
        }
        return true
    }
}