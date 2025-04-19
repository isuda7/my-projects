#!/bin/bash

## 실행 변수 설정
APP_HOME=/u01/webapps/mngr_web
DPLY_HOME=/u01/deploy/mngr_web
BACK_HOME=/u01/backup/mngr_web

SERVICE_NAME=LGES-ENBLOCK-MANAGER-WEB

prefix=`date +%Y%m%d%H%M`

## 이전 소스 삭제
rm -rf ${APP_HOME}/*

## 기존 WEB Source 파일 백업
tar xfz ${DPLY_HOME}/frontend.tar.gz -C ${APP_HOME} 

