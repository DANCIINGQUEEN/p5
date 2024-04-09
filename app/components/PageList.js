"use client"
import React from "react"
import Link from "next/link"
import styled from "styled-components"
const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`
const ContentLink = styled.div`
  margin: 2rem;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 280px;
  max-width: 270px; // xl:max-w-[270px]
  min-height: 260px;
  border-radius: 14px;
  cursor: pointer;
`

const PageList = () => {
  return (
    <MainContainer>
      <Link href="/drawingcam">
        <ContentLink style={{ backgroundColor: "red" }}>
          Drawing Cam
        </ContentLink>
      </Link>
      <Link href="/wave">
        <ContentLink style={{ backgroundColor: "purple" }}>Wave</ContentLink>
      </Link>
      <Link href="/letterdragger">
        <ContentLink style={{ backgroundColor: "blue" }}>
          Letter Dragger
        </ContentLink>
      </Link>
    </MainContainer>
  )
}

export default PageList
