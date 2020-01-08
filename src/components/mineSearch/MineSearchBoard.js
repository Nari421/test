/*************************************************************************
* PROGRAM NAME :  지뢰찾기
* DESCRIPTION  : 지뢰판 생성
*************************************************************************/

// 1. import 정의
import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import MineSearchBoardRow from './MineSearchBoardRow';
// 2. inject으로 
@inject(({board})=>({
    setBoard:board.setBoard,
    game:board.game
}))
class MineSearchBoard extends Component {
    constructor(props) {
        super(props);
        const {setBoard} =this.props
        setBoard(); //8*8 지뢰찾기 게임 판 생성
    }
    
    render() {
        const {game} = this.props;  
        return (
            <div>
                <h1>지뢰찾기 게임</h1>
                <table>
                    <tbody>
                        {Array(game.length).fill().map((tr, i) =><MineSearchBoardRow key={i} rowIndex={i} />)}
                    </tbody>
                </table>
               
            </div>
        );
    }
}

export default (observer(MineSearchBoard));