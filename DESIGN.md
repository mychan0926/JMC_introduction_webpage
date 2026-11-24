---
version: alpha
name: 정명찬 자기소개
colors:
  background: "#f8f4e9"
  text: "#302b23"
  muted: "#5b564b"
  accent: "#4d5f50"
typography:
  body:
    fontFamily: Noto Sans KR
    fontSize: 1rem
rounded:
  button: 14px
  video: 0px
  panel: 0px
spacing:
  section: 3.4rem
  video-width: 22rem
---

## Overview

게임 클라이언트 개발을 공부하는 정명찬의 자기소개 페이지. 첫 화면에서 이름, 전공, 관심 분야를 읽고 활동과 게임 작업으로 이어진다.

## Colors

샘플 D01의 종이색 배경과 짙은 글자를 쓰고, 링크와 날짜에는 차분한 녹색을 사용한다.

## Typography

한글 본문과 제목에는 Noto Sans KR을 쓴다. 프로젝트 설명은 제작 배경과 실제로 다룬 내용을 짧게 적는다.

## Layout

프로필, 이력, 프로젝트, 연락 순으로 배치한다. 샘플 D08처럼 데스크톱에서 이력의 제목과 날짜 목록을 좌우로 분리한다. 프로젝트 데모는 22rem 이하로 제한하고 작은 화면에서는 설명 아래에 둔다.

## Components

세로 Waterline 메뉴는 화면 오른쪽에 고정한다. 아이콘에 접근 가능한 이름을 제공하고 현재 섹션을 표시한다. 버튼에만 14px 곡률을 적용하고 메뉴 외곽과 프로필 패널, 영상은 직각으로 둔다. 데모는 16:9 비율과 YouTube 링크를 함께 제공한다.
