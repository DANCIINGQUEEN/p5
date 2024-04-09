"use client"
import React from "react"
import Sketch from "react-p5"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

class Letter {
  //Letter class
  constructor(p5, x, y, fonts) {
    //생성자
    this.p5 = p5 //p5.js의 기능을 사용할 수 있게 해준다.
    this.alphabets = [
      //알파벳 배열
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ]
    this.letter = this.p5.random(this.alphabets) //알파벳을 랜덤하게 선택
    this.f = this.p5.random(fonts) //폰트를 랜덤하게 선택
    this.size = this.p5.random(10, 30) //크기를 랜덤하게 선택
    this.x = x //x좌표
    this.y = y //y좌표
    this.dx = this.p5.random(-5, 5) //x방향 속도
    this.dy = this.p5.random(-5, 5) //y방향 속도
    this.angle = this.p5.random(360) //각도
    this.angleV = this.p5.random(1, 3) //각속도
  }

  update() {
    //업데이트 함수
    this.x += this.dx //x좌표 업데이트
    this.y += this.dy //y좌표 업데이트
    this.angle += this.angleV //각도 업데이트
  }

  display() {
    //화면에 표시하는 함수
    this.p5.push() // 현재의 변환 행렬을 스택에 저장
    this.p5.translate(this.x, this.y) // 현재의 원점을 (x,y)로 이동
    this.p5.rotate(this.angle) // 현재의 회전각도를 angle만큼 회전
    this.p5.textFont(this.f) // 폰트를 f로 설정
    this.p5.textSize(this.size) // 텍스트 크기를 size로 설정
    this.p5.text(this.letter, 0, 0) // (0,0)에 letter를 표시
    this.p5.pop() // 스택에 저장된 변환 행렬을 꺼내서 현재의 변환 행렬로 설정
  }

  Offscreen() {
    //화면 밖으로 나갔는지 확인하는 함수
    let margin = this.size * 2 //마진
    if (
      //화면 밖으로 나갔는지 확인
      this.x > width + margin ||
      this.x < 0 - margin ||
      this.y > height + margin ||
      this.y < 0 - margin
    ) {
      return true
    } else return false
  }
}

const LetterDragger = () => {
  let font = []
  let letters = []

  const preload = (p5) => {
    font[0] = p5.loadFont("fonts/Roboto-Regular.ttf")
    font[1] = p5.loadFont("fonts/Kanit-Black.ttf")
    font[2] = p5.loadFont("fonts/BebasNeue-Regular.ttf")
  }
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef)
    p5.angleMode(p5.DEGREE)
  }
  const draw = (p5) => {
    p5.background("#f8d404")
    for (let i = letters.length - 2; i >= 0; i--) {
      letters[i].update()
      letters[i].display()
      if (letters[i].offScreen() == true) {
        letters.splice(i, 1)
      }
    }
  }
  const mouseDragged = (p5) => {
    letters.push(new Letter(p5, p5.mouseX, p5.mouseY, font))
  }
  return (
    <Wrapper>
      <h1>Drag the letters</h1>
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
        preload={preload}
      />
    </Wrapper>
  )
}

export default LetterDragger
