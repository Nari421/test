/*************************************************************************
* PROGRAM NAME :  지뢰찾기
* DESCRIPTION  : 지뢰판 중 한칸 생성
*************************************************************************/

// 1. import 정의
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CODE } from '../common/MineSearch'
import './MineSearchBoardCell.css';
// 2. 
//  rowIndex : 지뢰판의 x좌표
//  cellIndex : 지뢰판의 y좌표
//  game : 지뢰판 정보가 담긴 2차원 배열
//  cellClick: 지뢰 판을 클릭 했을 때, 좌표와 우클릭, 좌클릭 방향 전달
//  setStyle: 지뢰판 스타일 지정
//  setText: 지뢰판 글씨 지정
class MineSearchBoardCell extends Component {
    setStyle = (code) => {
        switch (code) {
            case CODE.NORMAL:
            case CODE.MINE:
                return {
                    background: "#444",
                }
            case CODE.CLICKED_MINE:
            case CODE.OPENED:
                return {
                    background: 'white',
                };
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                return {
                    background: 'red',
                };
            default:
                return {
                    background: 'white',
                };
        }
    }
    setText = (code) => {
        // const CODE = CODE

        switch (code) {
            case CODE.NORMAL:
                return '　';
            case CODE.MINE:
                return '💣';
            case CODE.CLICKED_MINE:
                return '💣';
            case CODE.FLAG_MINE:
                return '⚑';
            case CODE.FLAG:
                return '💣';
            default:
                return code;
        }
    };
    render() {
        const { rowIndex, cellIndex, game, cellClick } = this.props
        return (
            <>
                <td className="btn"
                    style={this.setStyle(game[rowIndex][cellIndex])}
                    onClick={() => cellClick(rowIndex, cellIndex, 0)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        cellClick(rowIndex, cellIndex, 1);
                    }}>
                    {this.setText(game[rowIndex][cellIndex])}

                </td>
            </>

        )
    }
}
// const BoardCell = ({rowIndex,cellIndex,game,cellClick,setStyle})=>{ 
//     return(
//         <>
//                 <td className="btn"
//                     style={setStyle(game[rowIndex][cellIndex])}
//                     onClick={() => cellClick(rowIndex, cellIndex,0)}
//                     onContextMenu={(e) => { 
//                         e.preventDefault(); 
//                         cellClick(rowIndex, cellIndex,1);
//                     }}>
//                     {setText(game[rowIndex][cellIndex])}

//                 </td>
//             </>
//     );

// }
export default inject(({ board }) => ({
    game: board.game,
    cellClick: board.cellClick,
    CODE: board.CODE,

}))(observer(MineSearchBoardCell));