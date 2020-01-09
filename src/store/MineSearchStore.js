/*************************************************************************
* PROGRAM NAME : 지뢰찾기 스토어
* DESCRIPTION  : 지뢰찾기 게임의 상태관리를 위한 store
* DATE         : 2020.01.09
* PROGRAMMER   : 김나리
*************************************************************************/

/***********************************************************************
* Import Define
***********************************************************************/
import { observable, action } from 'mobx';
import {CODE} from '../components/common/MineSearch';

export default class MineSearchStore {
    @observable row = 8;        //지뢰판의 세로길이
    @observable cell = 8;       //지뢰판의 가로길이
    @observable mine = 10;      //지뢰 갯수

    @observable finishCount = 0;  //게임이 끝나기 위한 마우스 버튼 클릭 횟수를 저장
    @observable notMine = 0;      //우클릭으로 지뢰를 선택하지 못했을때 카운트되어 게임이 종료 되었을 때 성공 여부를 결정
    @observable timer = 0;        //게임 소요시간
    @observable timerStart=false; //setInterval을 쓰기 위한 변수
    @observable timeList = 0;     //사용자의 게임 시간 저장
    @observable game = [];        //지뢰게임을 위한 지뢰판 2차원
    @observable subgameData = []  //이전 위치가 지뢰인지 확인하기 위한 game의 서브배열


    //지뢰 게임을 위한 지뢰판 생성 및 지뢰 랜덤 배치
    @action
    setBoard = () => {
        const size = this.row * this.cell - this.mine;
        const candidate = Array(this.row * this.cell).fill().map((arr, i) => {
            return i;
        });
        const shuffle = [];
        while (candidate.length > size) {
            const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
            shuffle.push(chosen);
        }
        const data = [];
        for (let i = 0; i < this.row; i++) {
            const rowData = [];
            data.push(rowData);
            for (let j = 0; j < this.cell; j++) {
                rowData.push(CODE.NORMAL);
            }
        }

        for (let k = 0; k < shuffle.length; k++) {
            const ver = Math.floor(shuffle[k] / this.cell);
            const hor = shuffle[k] % this.cell;
            data[ver][hor] = CODE.MINE;
        }

        this.game = data;
        this.subgameData = data;
    }
    
    //게임 재시작
    @action
    restartGame = () => {
        this.mine = 10;
        this.timer = 0;
        this.setBoard();
        clearInterval(this.timerStart);
    }

    //게임끝났을 때, 결과 채점
    @action
    endGame = () => {
        if (this.mine === 0) {
            if (this.notMine > 0) {
                alert("지뢰를 다 발견하지 못했습니다.");
                this.result()
                this.timeList = this.timer;
                clearInterval(this.timerStart);
            }
            else {
                alert("축하합니다. 지뢰를 다 찾았습니다.");
                this.timeList = this.timer;
                clearInterval(this.timerStart);
            }

        } else if (54 === this.finishCount) {
            alert("축하합니다. 지뢰를 다 찾았습니다.");
            this.result();
            this.timeList = this.timer;
            clearInterval(this.timerStart);
        }
        this.mine = 10;
        this.timerStart = false;
        this.timer = 0;
    }

    
    //시간 카운트를 위해 1초마다 setInterval
    @action
    setTimer = () => {
        this.timerStart = setInterval(() => {
            this.timer += 1;
        }, 1000);

    }

    //셀 클릭 이벤트
    @action
    cellClick = (row, cell, direction) => {
        if (this.timer === 0) this.setTimer();  //첫 셀이 클릭되면 timer시작

        let code = this.game[row][cell]
        if (direction === 0) {          //0: 마우스 왼쪽 클릭 ,1: 마우스 오른쪽 클릭
            if (code === CODE.MINE) {   
                this.game[row][cell] = CODE.CLICKED_MINE;
                alert('지뢰입니다.');
                this.result();
                this.timeList = this.timer;
                clearInterval(this.timerStart);
                this.finishCount += 1;
            } else if (code === CODE.NORMAL) {
                code = this.aroundCell(row, cell)   //주변 셀 검사
                this.game[row][cell] = code;
                this.finishCount += 1;
            } else if (code === CODE.OPENED) {      //열렸던 칸은 finishCount되지 않음
                return;
            }

        }
        else {
            if (code === CODE.FLAG_MINE) {                  //마우스 오른쪽 클릭시 깃발이 있던 칸
                let before = this.subgameData[row][cell];   //이전의 좌표와 비교하여 일반칸이었는지 지뢰칸이었는지 확인
                this.game[row][cell] = before;
                before = before !== -5 ? this.notMine -= 1 : before;    //일반 칸이 지뢰였다 해제되었으면 notMine감소
                this.mine += 1;
                this.finishCount += 1;
            } else {
                code = code === -1 ? this.notMine += 1 : code;
                this.game[row][cell] = CODE.FLAG_MINE;
                this.mine -= 1;
                this.finishCount -= 1;
            }

        }
        
        return (this.finishCount === 54 ? this.endGame() : null )||(this.mine === 0 ? this.endGame() : null);
    }

    //게임이 끝나고 난 후 지뢰의 모습을 판에 보여줌
    @action
    result = () => {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.cell; j++) {
                if (this.game[i][j] === -5) {
                    this.game[i][j] = CODE.FLAG;
                }
            }
        }
    }
    //클릭한 셀의 주변 지뢰 카운트
    aroundCell = (row, cell) => {
        const x = [-1, -1, -1, 0, 0, 1, 1, 1];      //클릭한 셀을 중심으로 주변 좌표 탐색을 위한 변수
        const y = [-1, 0, 1, -1, 1, -1, 0, 1];
        let count = 0;
        for (let i = 0; i < 8; i++) {
            if (row + (x[i]) < 0 || row + (x[i]) >= this.game.length || cell + y[i] < 0 || cell + y[i] >= this.game[0].length) {
                continue;
            } else {
                if (this.game[row + (x[i])][cell + y[i]]=== -5) count++;
            }
        }
        return count;
    };
}