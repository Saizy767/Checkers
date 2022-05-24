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

        if(!super.canMove(target)){
            return false;
        }
        if(             // can move only in cell up and dont come back
        (target.y === this.cell.y + direction)
        && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) 
        && (this.cell.board.getCells(target.x, target.y)).isEmpty()){
            return true
        }
        if(             // Attack left up
        (target.y === this.cell.y + direction * 2) 
        &&  (target.x === this.cell.x - 2)
        &&  this.cell.board.getCells(target.x, target.y).isEmpty()
        &&  this.cell.isEnemy(this.cell.board.getCells(this.cell.x - 1, 
                                                       this.cell.y + direction))){
            return true
        }
        if(             // Attack right up
        (target.y === this.cell.y + direction * 2)
        &&  (target.x === this.cell.x + 2)
        &&  this.cell.board.getCells(target.x, target.y).isEmpty()
        &&  this.cell.isEnemy(this.cell.board.getCells(this.cell.x + 1, 
                                                       this.cell.y + direction))){
            return true;
        }
        if(             // Attack right back
        (target.y === this.cell.y - direction * 2)
        &&  (target.x === this.cell.x + 2)
        &&  this.cell.board.getCells(target.x, target.y).isEmpty()
        &&  this.cell.isEnemy(this.cell.board.getCells(this.cell.x + 1, 
                                                        this.cell.y - direction))){
            return true              
        }
        if(             // Attack left back
        (target.y === this.cell.y - direction * 2)
        &&  (target.x === this.cell.x - 2)
        &&  this.cell.board.getCells(target.x, target.y).isEmpty()
        &&  this.cell.isEnemy(this.cell.board.getCells(this.cell.x - 1, 
                                                        this.cell.y - direction))){
            return true              
    }
      
        return false

      }
}