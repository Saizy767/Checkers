import BasicCheckerBlack from '../../public/BasicCheckerBlack.svg'
import BasicCheckerWhite from '../../public/BasicCheckerWhite.svg'
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure } from '../Figure';

export class Basic extends Figure{
    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.form = (color === Colors.BLACK) ? 
                     BasicCheckerBlack:
                     BasicCheckerWhite
    }

    canMove(target: Cell): boolean {
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const dy = this.cell.y < target.y ? 1 : -1
        const dx= this.cell.x < target.x ? 1 : -1

        if(!super.canMove(target)){
            return false;
        }
        if(             // can move only in cell up and dont come back
        (target.y === this.cell.y + direction)
        && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) 
        && (this.cell.board.getCells(target.x, target.y)).isEmpty()){
            return true
        }
        if(
            (target.y === this.cell.y + dy * 2)
            &&  (target.x === this.cell.x + (2 * dx)) 
            &&  this.cell.board.getCells(target.x, target.y).isEmpty()
            &&  this.cell.isEnemy(this.cell.board.getCells(this.cell.x + 1 * dx, this.cell.y + dy))){
                return true
        }
      
        return false

      }
}