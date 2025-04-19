/**
 * 스테이션 QR 코드 관리 프린트 모달 - 인쇄 버튼 Component
 * URL: /station/code/qr - 프린트아이콘 - 인쇄 버튼
 */
import React from 'react';
import {useTranslation} from "react-i18next";
import { Button } from "@progress/kendo-react-buttons";
import { convertToImageSrc } from "@/utils/common"
import useAlert from '@/hooks/useAlert';

interface QRData {
  id: string,
  qrCode: string;  // byte string
}

interface QRPrinterProps {
  data: QRData[];
}

const QRPrinterButton: React.FC<QRPrinterProps> = ({ data }) => {
  const showAlert = useAlert();
  const {t} = useTranslation();

  // 이미지 로드 테스트를 위한 함수
  const testImageLoading = (imageUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!imageUrl) {
        resolve(false);
        return;
      }
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  };

  const handlePrint = async () => {
    // 먼저 모든 이미지가 제대로 로드되는지 테스트
    const testResults = await Promise.all(
      data.map(item => testImageLoading(convertToImageSrc(item.qrCode)))
    );

    if (testResults.some(result => !result)) {
      //'일부 QR 코드 이미지를 로드할 수 없습니다. 데이터를 확인해주세요.'
      showAlert({message: t("station.qr_code_error")});
      return;
    }

    const printWindow = window.open('', 'Print QR Codes', 'height=600,width=800');
    
    if (printWindow) {
      const printContent = `
        <html>
          <head>
            <title>QR Codes</title>
            <style>
              .slideContainer {
                width: 100%;
                gap: 10px;
                flex-wrap: wrap;
                display: flex;
              }
              .slide {
                margin: 0;
                padding: 0;
                display: inline-block;
                page-break-inside: avoid; /* 페이지 넘어가는 중간에 잘리지 않도록 설정 */
              }
              .slide-text {
                margin-bottom: 1.25rem;
                padding: 0 1.5rem;
                display: block;
                text-align: center;
                font-weight: 600;
                font-size: 1.75rem;
                color: #111111;
                line-height: 110%;
              }
              .slide-img {
                padding: 0;
              }
              .slide-img img {
                display: block;
                margin: 0 auto;
                width: 171px;
                height: 171px;
              }
              .error-text {
                color: red;
                margin-top: 10px;
                font-size: 12px;
              }
              @media print {
                @page {
                  margin: 20px;
                }
                .slide {
                  page-break-after: auto;
                }
                .error-text {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="slideContainer">
              ${data.map((item, index) => `
                <div class="slide" id="qr-item-${index}">
                  <div class="slide-text">
                    QR ID : <span>${item.id}</span>
                  </div>
                  <div class="slide-img">
                    <img 
                      src="${convertToImageSrc(item.qrCode)}" 
                      alt="QR Code ${index + 1}"
                      onerror="handleImageError(${index})"
                    />
                  </div>
                  <div class="error-text" id="error-${index}" style="display: none;">
                    이미지 로드 실패
                  </div>
                </div>
              `).join("")}
            </div>
            <script>
              function handleImageError(index) {
                const item = document.getElementById('qr-item-' + index);
                const img = item.querySelector('img');
                const error = document.getElementById('error-' + index);
                
                img.style.display = 'none';
                error.style.display = 'block';
              }

              let loadedImages = 0;
              const totalImages = ${data.length};
              const images = document.querySelectorAll('img');
              
              const checkAllImagesLoaded = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                  // 모든 이미지가 로드되면 잠시 후 인쇄
                  setTimeout(() => {
                    window.print();
                    // 인쇄 다이얼로그가 닫힌 후 창 닫기
                    setTimeout(() => window.close(), 1000);
                  }, 500);
                }
              };

              images.forEach(img => {
                if (img.complete) {
                  checkAllImagesLoaded();
                } else {
                  img.onload = checkAllImagesLoaded;
                  img.onerror = checkAllImagesLoaded;
                }
              });

              // 10초 후에도 모든 이미지가 로드되지 않으면 경고
              setTimeout(() => {
                if (loadedImages < totalImages) {
                  alert('일부 이미지가 로드되지 않았습니다. 계속하시겠습니까?');
                  window.print();
                  setTimeout(() => window.close(), 1000);
                }
              }, 10000);
            </script>
          </body>
        </html>
      `;
      
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  return (
    <>
      <Button
        size={"medium"}
        themeColor={"primary"}
        onClick={handlePrint}
        //onClick={handlePrintReact}
      >
        {/* 인쇄 */}
        {t("common.print")}
      </Button>
    </>
  );
};

export default QRPrinterButton;