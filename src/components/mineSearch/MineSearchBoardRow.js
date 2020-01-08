/*************************************************************************
* PROGRAM NAME :  지뢰찾기
* DESCRIPTION  : 지뢰판 중 가로 생성
*************************************************************************/

// 1. import 정의
import React, { Component } from 'react';
import {inject,observer} from 'mobx-react';
import MineSearchBoardCell from './MineSearchBoardCell';

@inject(({ board }) => ({
    game: board.game,
}))
class MineSearchBoardRow extends Component {
    render() {
        const { rowIndex } = this.props //game이 2차원 배열이기 때문에 rowIndex를 props로 받아 BoardCell로 전달
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

export default (observer(MineSearchBoardRow));