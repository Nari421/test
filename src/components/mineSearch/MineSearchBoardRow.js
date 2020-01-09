/*************************************************************************
* PROGRAM NAME : 지뢰찾기의 행
* DESCRIPTION  : 지뢰판 중 가로 생성
* DATE         : 2020.01.09
* PROGRAMMER   : 김나리
*************************************************************************/

/***********************************************************************
* Import Define
***********************************************************************/
import React, { Component } from 'react';
import {inject,observer} from 'mobx-react';
import MineSearchBoardCell from './MineSearchBoardCell';

//inject로 Store에 있는 값을 props에 주입
@inject(({ board }) => ({
    game: board.game,
}))
//react 클래스형 컴포넌트
class MineSearchBoardRow extends Component {
    render() {
        const { rowIndex } = this.props //game이 2차원 배열이기 때문에 rowIndex를 props로 받아 MineSearchBoardCell 전달
        const {game} = this.props
        return (
            <>
            <tr>
                {game[0]&&game.map((index, i) =><MineSearchBoardCell key={i} rowIndex={rowIndex} cellIndex={i}/>)}
            </tr>
            </>
        );
    }
}
/***********************************************************************
* 클래스형 컴포넌트를 Export하고 Hoc방식으로 observer로 감싸 관찰대상 컴포넌트를 명시
***********************************************************************/
export default (observer(MineSearchBoardRow));