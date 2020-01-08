import { observable, action } from 'mobx';
import {CODE} from '../components/common/MineSearch';


export default class MineSearchStore {
    @observable row = 8;        //지뢰판의 세로길이
    @observable cell = 8;       //지뢰판의 가로길이
    @observable mine = 10;      //지뢰 갯수

    @observable finishCount = 0;    //게임이 ... 되기 위한 버튼 클릭 횟수를 저장
    @observable notMine = 0;      //우클릭으로 지뢰를 선택하지 못했을때 카운트되어 게임이 종료 되었을 때 성공 여부를 결정
    @observable timer = 0;        //게임 소요시간
    @observable timerStart;
    @observable timeList = 0;
    // @observable CODE = {        //지뢰판의 상태 코드
    //     MINE: -7,               //지뢰 칸
    //     NORMAL: -1,             //일반 칸
    //     FLAG: -3,               //지뢰 결과표시 
    //     FLAG_MINE: -5,          //깃발 표시
    //     CLICKED_MINE: -6,       //지뢰선택
    //     OPENED: 0,              //일반 칸
    // }
    @observable game = [];      //지뢰게임을 위한 지뢰판 2차원
    @observable subgameData = []//이전 위치가 지뢰인지 확인하기 위한 game의 서브배열



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
    }

    //게임끝났을 때, 결과 채점
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

    

    @action
    setTimer = () => {
        this.timerStart = setInterval(() => {
            this.timer += 1;
        }, 1000);

    }

    //
    @action
    cellClick = (row, i, direction) => {
        if (this.timer === 0) this.setTimer();
        let code = this.game[row][i]
        if (direction === 0) {
            if (code === CODE.MINE) {
                this.game[row][i] = CODE.CLICKED_MINE;
                setTimeout(() => {
                    alert('지뢰입니다.');
                    this.result()
                    this.timeList = this.timer;
                    clearInterval(this.timerStart);
                }, 200);
                this.finishCount += 1;
            } else if (code === CODE.NORMAL) {
                code = this.aroundCell(row, i)

                this.game[row][i] = code;
                this.finishCount += 1;
            } else if (code === CODE.OPENED) {

            }

        }
        else {

            if (code === CODE.FLAG_MINE) {
                let before = this.subgameData[row][i];
                this.game[row][i] = before;
                before = before !== -7 ? this.notMine -= 1 : before;
                this.mine += 1;
                this.finishCount += 1;
            } else {
                code = code === -1 ? this.notMine += 1 : code;
                this.game[row][i] = CODE.FLAG_MINE;
                this.mine -= 1;
                this.finishCount -= 1;
            }

        }
        return this.finishCount === 54 ? this.endGame() : null || this.mine === 0 ? this.endGame() : null;

    }
    aroundCell = (row, cell) => {
        const x = [-1, -1, -1, 0, 0, 1, 1, 1];
        const y = [-1, 0, 1, -1, 1, -1, 0, 1];
        let count = 0;
        let aroudArr = [];
        for (let i = 0; i < 8; i++) {
            if (row + (x[i]) < 0 || row + (x[i]) >= this.game.length || cell + y[i] < 0 || cell + y[i] >= this.game[0].length) {
                continue;
            } else {
                aroudArr[i] = this.game[row + (x[i])][cell + y[i]];
                if (aroudArr[i] === -7) count++;
            }
        }
        return count;
    };
    result = () => {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.cell; j++) {
                if (this.game[i][j] === -7) {
                    this.game[i][j] = CODE.FLAG;
                    this.setStyle(this.game[i][j]);
                }
            }
        }
    }

    // setStyle = (code) => {
    //     // const CODE = CODE
    //     switch (code) {
    //         case CODE.NORMAL:
    //         case CODE.MINE:
    //             return {
    //                 background: "#444",
    //             }
    //         case CODE.CLICKED_MINE:
    //         case CODE.OPENED:
    //             return {
    //                 background: 'white',
    //             };
    //         case CODE.FLAG_MINE:
    //         case CODE.FLAG:
    //             return {
    //                 background: 'red',

    //             };
    //         default:
    //             return {
    //                 background: 'white',
    //             };
    //     }
    // }
    // setText = (code) => {
    //     // const CODE = CODE

    //     switch (code) {
    //         case CODE.NORMAL:
    //             return '　';
    //         case CODE.MINE:
    //             return '💣';
    //         case CODE.CLICKED_MINE:
    //             return '💣';
    //         case CODE.FLAG_MINE:
    //             return '⚑';
    //         case CODE.FLAG:
    //             return '💣';
    //         default:
    //             return code;
    //     }
    // };
}