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

class Wave {
  constructor(p5, shift, color) {
    //코드를 보면 p5를 받아서 사용하는데, 이는 p5.js의 모든 기능을 사용할 수 있게 해준다.
    this.p5 = p5 //p5.js의 기능을 사용할 수 있게 해준다.
    this.x = [] //x좌표를 저장할 배열
    this.y = [] //y좌표를 저장할 배열
    this.size = 10 //사각형의 크기
    this.num = this.p5.width / this.size //사각형의 개수

    this.amplitude = 30 //진폭
    this.angle = 0 //각도
    this.period = 1.4 //주기, 어떤 주기? 사인함수의 주기

    this.shift = shift //시프트, 무슨 역할? 사인함수의 시작점을 이동시키는 역할
    this.color = color //색상
  }

  displayWave() {
    //Wave를 화면에 표시하는 함수
    this.p5.noStroke() //선을 그리지 않는다.
    this.p5.fill(this.color) //색상을 채운다.
    for (let i = 0; i < this.num; i++) {
      //사각형을 그리는 반복문
      this.angle = (i / (this.num - 1)) * 360 * this.period //사인함수의 각도를 계산
      this.x[i] = this.amplitude * this.p5.cos(this.angle + this.shift) //x좌표를 계산
      this.y[i] = i * this.size //y좌표를 계산
      this.p5.rect(this.x[i], this.y[i], this.size, this.size) //사각형을 그린다.
    }
    this.shift += 0.03 //시프트를 증가시킨다.
  }
}

class Pack {
  //Pack class
  constructor(p5, numWave, shift, color) {
    //생성자
    this.p5 = p5 //p5.js의 기능을 사용할 수 있게 해준다.
    this.waves = [] //Wave 객체를 저장할 배열
    this.numWave = numWave //Wave 객체의 개수
    this.shift = shift //시프트
    this.color = color //색상

    for (let i = 0; i < numWave; i++) {
      //Wave 객체를 생성하여 배열에 저장
      this.waves[i] = new Wave(this.p5, this.shift, this.color) //Wave 객체 생성
    }
  }

  display() {
    //Pack을 화면에 표시하는 함수
    for (let i = 0; i < this.numWave; i++) {
      //Wave 객체를 화면에 표시
      let horPos = (i / (this.numWave - 1)) * this.p5.width //Wave 객체의 가로 위치를 계산
      this.p5.push() //좌표계를 저장
      this.p5.translate(horPos, 0) //좌표계를 이동
      this.waves[i].displayWave() //Wave 객체를 화면에 표시
      this.p5.pop() //좌표계를 복원
    }
  }
}

const WavePage = () => {
  let waves1, waves2, waves3 //Pack 객체를 저장할 변수

  const setup = (p5, canvasParentRef) => {
    //초기화 함수
    p5.createCanvas(400, 400).parent(canvasParentRef) //캔버스 생성
    p5.background(21, 47, 63) //배경색 설정

    // Initialize Pack objects with the p5 instance
    waves1 = new Pack(p5, 8, 0, p5.color(0, 105, 119)) //Pack 객체 생성
    waves2 = new Pack(p5, 8, 90, p5.color(156, 201, 222))
    waves3 = new Pack(p5, 8, 30, p5.color(79, 148, 167))
  }

  const draw = (p5) => {
    p5.background(21, 47, 63, 30) //배경색 설정
    waves1.display() //Pack 객체를 화면에 표시
    waves2.display()
    waves3.display()
  }
  return (
    <Wrapper>
      <h1>Wave</h1>
      <Sketch setup={setup} draw={draw} />
    </Wrapper>
  )
}

export default WavePage
