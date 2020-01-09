/*************************************************************************
* PROGRAM NAME : 지뢰찾기 게임판
* DESCRIPTION  : 8 x 8의 지뢰판 생성
* DATE         : 2020.01.09
* PROGRAMMER   : 김나리
*************************************************************************/

/***********************************************************************
* Import Define
***********************************************************************/
import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import MineSearchBoardRow from './MineSearchBoardRow';

//inject로 Store에 있는 값을 props에 주입 
@inject(({board})=>({
    setBoard:board.setBoard,
    game:board.game
}))
//react 클래스형 컴포넌트
class MineSearchBoard extends Component {
    constructor(props) {
        super(props);
        const {setBoard} =this.props
        setBoard(); //8*8 지뢰찾기 게임 판 생성
    }
    
    render() {
        //setBoard로 지뢰찾기 게임 판 생성 후 game배열 props로 전달
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

/***********************************************************************
* 클래스형 컴포넌트를 Export하고 Hoc방식으로 observer로 감싸 관찰대상 컴포넌트를 명시
***********************************************************************/
export default (observer(MineSearchBoard));