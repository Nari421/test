/*************************************************************************
* PROGRAM NAME :  지뢰찾기
* DESCRIPTION  : 지뢰찾기 전체 화면 구성
*************************************************************************/

// 1. import 정의
import React, { Component } from 'react';
import MineSearchBoard from './MineSearchBoard';
import './MineSearch.css';
import {inject,observer} from 'mobx-react'
 
// 2. inject로 
@inject(({board})=>({
    restartGame:board.restartGame,
    mine:board.mine,
    timer:board.timer,
    timerStart:board.timerStart,
    timeList:board.timeList
}))
class MineSearch extends Component {

    render() {
        const {restartGame,mine,timer,timeList} =this.props
        return (
            <div className="game">
                
                <div className="gameboard">
                    <div>
                        <MineSearchBoard />
                    </div>
                </div>
                <div className="gameinfo">
                    <div><h2>지뢰 : {mine}</h2></div>
                    <div><h3>시간 : {timer}</h3></div>
                    <div><p>{timeList}초가 소요되었습니다. </p></div>
                    <div><button className="restart" onClick={()=>restartGame()}>재시작</button></div>
                </div>
            </div>
        );
    }
}

export default (observer(MineSearch));