/*************************************************************************
* PROGRAM NAME : 지뢰찾기의 한 칸
* DESCRIPTION  : 지뢰판 중 한 칸 생성 후 클릭 이벤트
* DATE         : 2020.01.09
* PROGRAMMER   : 김나리
*************************************************************************/

/***********************************************************************
* Import Define
***********************************************************************/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CODE } from '../common/MineSearch'
import './MineSearchBoardCell.css';

//inject로 Store에 있는 값을 props에 주입
@inject(({ board }) => ({
    game: board.game,
    cellClick: board.cellClick,
    CODE: board.CODE,
    // setStyle : board.setStyle,
    // setText : board.setText

}))

//react 클래스형 컴포넌트
class MineSearchBoardCell extends Component {

    //setStyle: 지뢰판 셀 스타일 지정
    setStyle = (code) => {
        switch (code) {
            case CODE.NORMAL:
            case CODE.MINE:
                return {
                    background: "#444",
                }
            case CODE.OPENED:
                return {
                    background: 'white',
                };
            case CODE.CLICKED_MINE:
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

    //setText: 지뢰판 글씨 지정
    setText = (code) => {
        switch (code) {
            case CODE.NORMAL:
            case CODE.MINE:
                return '　';
            case CODE.CLICKED_MINE:
                return '💣';
            case CODE.FLAG_MINE:
                return '🚩';
            case CODE.FLAG:
                return '💣';
            default:
                return code;
        }
    };

    render() {
        //rowIndex : 지뢰판의 x좌표
        //cellIndex : 지뢰판의 y좌표
        //game : 지뢰판 정보가 담긴 2차원 배열
        //cellClick: 지뢰 판을 클릭 했을 때, 좌표와 우클릭, 좌클릭 방향 전달
        const { rowIndex, cellIndex, game, cellClick} = this.props
        return (
            <>
                <td className="tdStyle"
                    style={this.setStyle(game[rowIndex][cellIndex])}
                    onClick={() => cellClick(rowIndex, cellIndex, 0)}
                    //마우스 오른쪽 버튼 클릭 시
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

/***********************************************************************
* 클래스형 컴포넌트를 Export하고 Hoc방식으로 observer로 감싸 관찰대상 컴포넌트를 명시
***********************************************************************/
export default (observer(MineSearchBoardCell));