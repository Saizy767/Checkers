import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure } from '../Figure';

import QueenCheckerBlack from '../../public/QueenCheckerBlack.svg'
import QueenCheckerWhite from '../../public/QueenCheckerWhite.svg'

export class Queen extends Figure{
    constructor(color:Colors, cell:Cell){
        super(color, cell)
        this.form = (color === Colors.BLACK) ? 
                     QueenCheckerBlack:
                     QueenCheckerWhite
    }

    canMove(target: Cell):boolean{
        if(!super.canMove(target)){
            return false
        }
        return true
    }
}