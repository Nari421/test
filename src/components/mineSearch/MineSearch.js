/*************************************************************************
* PROGRAM NAME : 지뢰찾기
* DESCRIPTION  : 지뢰찾기 전체 화면 구성
* DATE         : 2020.01.09
* PROGRAMMER   : 김나리
*************************************************************************/

//import 정의
import React, { Component } from 'react';
import MineSearchBoard from './MineSearchBoard';
import './MineSearch.css';
import {inject,observer} from 'mobx-react'
 
//inject로 Store에 있는 값을 props에 주입
@inject(({board})=>({
    restartGame:board.restartGame,
    mine:board.mine,
    timer:board.timer,
    timerStart:board.timerStart,
    timeList:board.timeList
}))
//react 클래스형 컴포넌트
class MineSearch extends Component {

    render() {
        //restartGame : 게임을 재시작 하기 위한 클릭 이벤트
        //mine : 지뢰 갯수 카운트
        //timer : 첫 클릭 후 소요시간
        //timerList : 게임이 끝나고 난 후 기록 저장
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
/***********************************************************************
* 클래스형 컴포넌트를 Export하고 Hoc방식으로 observer로 감싸 관찰대상 컴포넌트를 명시
***********************************************************************/
export default (observer(MineSearch));