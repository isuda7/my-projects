/**
 * 스테이션 QR 코드 관리 프린트 모달 - 다운로드 버튼 Component
 * URL: /station/code/qr - 인쇄하기 - 다운로드 버튼
 */
import React, { useState } from 'react';
import {useTranslation} from "react-i18next";
import { Button } from "@progress/kendo-react-buttons";
import useAlert from '@/hooks/useAlert';
import JSZip from "jszip";
import { getFormattedTime } from '@/utils/common';
import { setLoading } from '@/store/modules/commonStore';
import {useDispatch} from "react-redux";

interface QRData {
  id: string,
  qrCode: string;  // byte string
}

interface QRPrinterProps {
  data: QRData[];
}

const QRDownloadButton: React.FC<QRPrinterProps> = ({ data }) => {
  const dispatch = useDispatch();
  const showAlert = useAlert();
  const{t} = useTranslation()

  const createQRImage = async (item: QRData): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      // QR 코드 이미지 먼저 로드
      const qrImage = new Image();
      qrImage.onload = () => {
        try {
          // 크기 설정
          const FONT_SIZE = 28;        // 1.75rem = 28px
          const QR_SIZE = 171;         // QR 코드 크기 45mm
          //const QR_SIZE = 342;         // QR 코드 크기 45mm
          const TEXT_QR_GAP = 11;      // QR 코드와 텍스트 사이 간격 3mm
          const QR_MARGIN = 11;        // QR 코드 주변 여백 3mm
          const TOP_MARGIN = 11;       // 텍스트 상단 여백 3mm
          
          // .slide { display: inline-block }
          // .slide-text { margin-bottom: 1.25rem (20px); padding: 0 1.5rem (24px) }
          // .slide-img img { width: 171px; height: 171px }

          // 전체 컨테이너 크기 계산
          const containerWidth = QR_SIZE + (QR_MARGIN * 2);  // QR 코드 + 좌우 여백
          const containerHeight = TOP_MARGIN + FONT_SIZE + TEXT_QR_GAP + QR_SIZE + QR_MARGIN; // 텍스트 + 간격 + QR + 하단 여백
          
          // Canvas 생성
          const canvas = document.createElement('canvas');
          canvas.width = containerWidth;
          canvas.height = containerHeight;
          const ctx = canvas.getContext('2d');

          // 디바이스 픽셀 비율
          if(ctx) {
            ctx.imageSmoothingEnabled = false; // 보간 비활성화
          }
          
          if (!ctx) {
            throw new Error('Failed to get canvas context');
          }
  
          // 배경을 흰색으로 설정
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          // ID 텍스트 그리기
          // .slide-text { font-weight: 600; font-size: 1.75rem; color: #111111; }
          ctx.fillStyle = '#111111';
          ctx.font = `600 ${FONT_SIZE}px Arial`;  // 1.75rem = 28px
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(`QRID:${item.id}`, containerWidth / 2, TOP_MARGIN);
  
          // QR 코드 이미지 그리기
          // .slide-img img { width: 171px; height: 171px; margin: 0 auto }
          const qrY = TOP_MARGIN + FONT_SIZE + TEXT_QR_GAP; // 텍스트높이 + 간격
          ctx.drawImage(qrImage, QR_MARGIN, qrY, QR_SIZE, QR_SIZE);
          //ctx.drawImage(qrImage, QR_MARGIN, qrY, 700, 700);
  
          // Canvas를 Blob으로 변환
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob from canvas'));
            }
          }, 'image/png');
  
        } catch (error) {
          reject(error);
        }
      };
  
      qrImage.onerror = () => {
        reject(new Error('Failed to load QR code image'));
      };
  
      // base64 이미지 로드 시작
      qrImage.src = `data:image/png;base64,${item.qrCode}`;
    });
  }

  const handleDownloadAll = async() => {
    dispatch(setLoading(true))

    const zip = new JSZip();
    

    try {
      const imagePromises = data.map(async(item:QRData) => {
        try {
          const blob = await createQRImage(item)
          return { blob, id: item.id, success: true };
        } 
        catch (error) {
          console.error(`Failed to create image for QR code ${item.id}:`, error);
          return { id: item.id, success: false };
        }
      });
      
      const results = await Promise.all(imagePromises);
      const successfulImages = results.filter((result): result is { blob: Blob; id: string; success: true } => 
        result.success && 'blob' in result
      );

      if (successfulImages.length === 0) {
        throw new Error('No images were successfully created');
      }

      console.log('images', successfulImages)

      // ZIP 파일에 이미지 추가
      successfulImages.forEach(({ blob, id }) => {
        zip.file(`qr_${id}.png`, blob);
      });

      // ZIP 파일 생성 및 다운로드
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr_codes_${getFormattedTime(new Date(), 'YYMMDDHHmmss')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } 
    catch (error) {
      showAlert({message: '다운로드중 오류가 발생했습니다.'})
      console.error('Error creating zip file:', error);
      throw error;
    }
    finally {
      dispatch(setLoading(false))
    }

  };

  const handleDownloadClick = () => {
    showAlert({
      title: '다운로드',
      message: '다운로드 하시겠습니까?',
      type: 'confirm',
      onConfirm: () => handleDownloadAll(),
    })
  };

  return (
    <>
      {/* <div style={{display: 'hidden'}} /> */}
      <Button size={"medium"} onClick={handleDownloadClick}>
        {/* 다운로드 */}
        {t("common.download")}
      </Button>
    </>
  );
};

export default QRDownloadButton;