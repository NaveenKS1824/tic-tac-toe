import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Confetti from 'react-confetti';

function Square({value,onSquareClick}){
  return (<>
  <button className={`square ${value ? (value === 'X' ? 'cross' : 'circle') : ''}`} onClick={onSquareClick}>{value}</button>
  </>)
}
export default function Board() {
  const [squares,setSquares]=useState(Array(9).fill(null));
  const [xis,setXis]=useState(true);
  const [count,setCount]=useState(0);
  const handleClick=(i)=>{
    if(squares[i]||calculateWinner(squares)){
      return;
    }
    const next = squares.slice();
    if(xis){
      next[i]='X';
    }
    else{
      next[i]='O';
    }
    setSquares(next);
    setXis(!xis);
    setCount(count+1);
  }
  const calculateWinner = (squares)=>{
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let i=0;i<lines.length;i++){
      const [a,b,c]=lines[i];
      if(squares[a]&&squares[a]==squares[b]&&squares[a]==squares[c]){
        return squares[a];
      }
    }
    return null;
  }
  const winner = calculateWinner(squares);
  let status;
  let win=false;
  const isdraw = (count==9) && !winner;
  if (winner) {
    win = true;
    status = 'Winner: ' + winner;
  }
  else if(isdraw){
    status = 'No one Wins';
  }
  else {
    status = 'Next player: ' + (xis? 'X' : 'O');
  }
  return (
    <>
      <div className="status">{status}</div>
      {win &&  <Confetti/>}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)} />
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>
  );
}


