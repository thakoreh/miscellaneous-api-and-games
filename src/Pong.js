import React, { useEffect, useRef } from 'react';

export default function Pong() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;

    let ballx=20;
    let bally=20;
    let ballSpeedX=15;
    let ballSpeedY=15;
    let paddle1Y=250;
    let paddle2Y=250;

    const PADDLE_THICKNESS=10;
    const PADDLE_HEIGHT=100;
    
    let showingWinScreen=false;
    let player1Score=0;
    let player2Score=0;
    const WINNING_SCORE=2;
    function handleMouseClick(){
      if (showingWinScreen){
        player2Score=0;
        player1Score=0;
        showingWinScreen=false;
      }
    }
    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      if (!rect.height) return;
      const mouseY = (event.clientY - rect.top) * canvas.height / rect.height;
      paddle1Y = mouseY - PADDLE_HEIGHT / 2;
    }

    function callBoth(){
      moveEverything()
      drawBox()
    }
    function ballReset(){
      if (player1Score>=WINNING_SCORE || player2Score>=WINNING_SCORE ){
        showingWinScreen=true;

      }

      ballSpeedX=-ballSpeedX;
      ballx=canvas.width/2;
      bally=canvas.height/2;
    }
    function computerMovement(){
      let paddle2YCenter=paddle2Y+(PADDLE_HEIGHT/2);
      if (paddle2Y<bally-35){
          paddle2Y+=6;
      } else if(paddle2YCenter>bally+35){
        paddle2Y-=6;
      }
    }
    function moveEverything(){
      if (showingWinScreen){
        return;
      }
      computerMovement();
      ballx=ballx+ballSpeedX;
      bally=bally+ballSpeedY;
      if (ballx >canvas.width){

        if (bally>paddle2Y && bally<paddle2Y+PADDLE_HEIGHT){
          ballSpeedX=-ballSpeedX;
          let deltaY=bally-(paddle2Y+PADDLE_HEIGHT/2);
          ballSpeedY=deltaY*0.35;
        } else {
          player1Score+=1;
          ballReset();
          
        }
      }
      if (ballx<0){
        if (bally>paddle1Y && bally<paddle1Y+PADDLE_HEIGHT){
          ballSpeedX=-ballSpeedX;
          let deltaY=bally-(paddle1Y+PADDLE_HEIGHT/2);
          ballSpeedY=deltaY*0.35;
        } else {
          player2Score+=1;
          ballReset();
          
        }

      }
      if (bally >canvas.height){
        ballSpeedY=-ballSpeedY; 
        
      }
      if (bally<0){
        ballSpeedY=-ballSpeedY; 
      }
    }
    function drawNet(){
      for(let i=0;i<canvas.height;i+=40){
        canvasContext.fillStyle='white';
        canvasContext.fillRect(canvas.width/2-1,i,2,20);
      }
    }
    function drawBox(){
      canvasContext.fillStyle='black';
      canvasContext.fillRect(0,0,canvas.width,canvas.height);
      if (showingWinScreen){
        canvasContext.fillStyle='white';
        if(player1Score >=WINNING_SCORE){
          canvasContext.fillText("Player One Won",350,200)
        }else if(player2Score>=WINNING_SCORE){
          canvasContext.fillText("Player Two Won",350,200)
        }
        canvasContext.fillStyle='white';
        canvasContext.fillText("Click to Continue",350,500);
        return;
      }
        drawNet();
      canvasContext.fillStyle='white';
      canvasContext.fillRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT);
      canvasContext.fillStyle='white';
      canvasContext.fillRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT);
      canvasContext.fillStyle='red';
      canvasContext.beginPath();
      canvasContext.arc(ballx,bally,10,0,Math.PI*2,true);
      canvasContext.fill();
      canvasContext.fillText(player1Score,100,100);
      canvasContext.fillText(player2Score,canvas.width-100,100);
  }

    const interval = setInterval(callBoth, 1000 / 30);
    canvas.addEventListener('mousedown', handleMouseClick);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      canvas.removeEventListener('mousedown', handleMouseClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} id="gameCanvas" className="pong-canvas" />;
}
