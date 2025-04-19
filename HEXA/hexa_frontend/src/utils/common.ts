import CryptoJS from "crypto-js";
import dayjs from 'dayjs'
import i18n from 'i18next';
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts"; // i18next에서 locale 정보를 받아옴
import {Page} from "@/utils/apiService/type/common/Page.type.ts";
import Cookies from "js-cookie";
import store from "@/store";
import {addPopup} from "@/store/modules/popupStore.ts";

function formatNumber(value: number, options?: Intl.NumberFormatOptions, nullStr?: string): string {
  // const option: Intl.NumberFormatOptions = {
  //   style: 'decimal', // 'decimal', 'currency', 'percent', 'unit' 중 하나로 숫자 형식을 지정합니다.
  //   currency: 'USD', // 'currency' 스타일을 사용할 때, 통화 단위를 지정합니다. 예: 'USD', 'EUR', 'JPY'
  //   currencyDisplay: 'symbol', // 통화 스타일을 사용할 때 통화의 표시 방법을 지정합니다. 'symbol', 'narrowSymbol', 'code', 'name' 중 하나.
  //   currencySign: 'standard', // 통화 기호를 'standard' (표준) 또는 'accounting' (회계 표기법)으로 표시합니다.
  //   unit: 'liter', // 'unit' 스타일을 사용할 때 측정 단위를 지정합니다. 예: 'liter', 'kilogram'
  //   unitDisplay: 'short', // 측정 단위를 'long', 'short', 'narrow' 중 하나로 표시합니다.
  //   useGrouping: true, // 천 단위 구분 기호를 사용할지 여부를 결정합니다. true는 사용, false는 사용 안 함.
  //   minimumIntegerDigits: 1, // 최소 정수 자릿수를 지정합니다. 예: 123에서 최소 2자리로 지정하면 "01"로 표시됩니다.
  //   minimumFractionDigits: 0, // 소수점 이하 최소 자릿수를 지정합니다. 이 값보다 적은 소수점 자릿수가 있는 경우, 지정된 자릿수만큼 0이 추가됩니다.
  //   maximumFractionDigits: 2, // 소수점 이하 최대 자릿수를 지정합니다. 이 값을 초과하는 소수점 자릿수는 반올림됩니다.
  //   minimumSignificantDigits: 1, // 숫자의 최소 유효 자릿수를 지정합니다. 이 옵션이 설정되면 소수점 이하 자릿수 대신 유효 자릿수가 적용됩니다.
  //   maximumSignificantDigits: 21, // 숫자의 최대 유효 자릿수를 지정합니다. 이 값을 초과하는 자릿수는 반올림됩니다.
  //   notation: 'standard', // 숫자 표기 방법을 지정합니다. 'standard', 'scientific', 'engineering', 'compact' 중 하나.
  //   compactDisplay: 'short', // 'notation'이 'compact'일 때, 숫자를 'short' (예: 1K) 또는 'long' (예: 1 thousand) 형식으로 표시합니다.
  //   signDisplay: 'auto', // 숫자에 부호를 표시할 방법을 지정합니다. 'auto', 'always', 'never', 'exceptZero' 중 하나.
  //   localeMatcher: 'best fit', // 로케일 매칭 알고리즘을 지정합니다. 'best fit' 또는 'lookup' 중 하나.
  // };

  const formatter = new Intl.NumberFormat(undefined, options);
  let returnValue = isNaN(value) ? nullStr ? nullStr : '-' : formatter.format(value);
  return returnValue;
}

function getFormattedTime(value: any, format?: string, nullValue?: string) {
  const locale = i18n.language;
  let currentFormat = format ? format : (locale === 'ko' || locale === 'kr') ? 'YYYY-MM-DD HH:mm:ss' : 'MM/DD/YYYY h:mm:ss A';
  let curNullValue = nullValue ? nullValue : '-';
  return value ? dayjs(value).format(currentFormat) : curNullValue;
}

function getCurrentDate(): string {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = `0${date.getUTCMonth() + 1}`.slice(-2); // Months are zero indexed
  const day = `0${date.getUTCDate()}`.slice(-2);
  const hours = `0${date.getUTCHours()}`.slice(-2);
  const minutes = `0${date.getUTCMinutes()}`.slice(-2);
  const seconds = `0${date.getUTCSeconds()}`.slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}(UTC+0)`;
}

function encrypt(payload: string | undefined) {
  try {
    const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;
    if (!secretKey) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return CryptoJS.AES.encrypt(payload, secretKey).toString();
  } catch (e) {
    return null;
  }
}

function decrypt(encrypted: string) {
  try {
    const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;
    if (!secretKey) {
      return null;
    }
    const decryptedBytes = CryptoJS.AES.decrypt(encrypted, secretKey);
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (e) {
    return null;
  }
}

// 다양한 형식의 이미지 데이터를 처리하는 향상된 변환 함수
function convertToImageSrc(data: string) {
  try {
    // 이미 data URL 형식인 경우
    if (data.startsWith('data:image')) {
      return data;
    }

    // 이미 base64인 경우
    if (data.match(/^[A-Za-z0-9+/=]+$/)) {
      return `data:image/png;base64,${data}`;
    }

    // byte array string인 경우 (예: [72,101,108,108,111])
    if (data.startsWith('[') && data.endsWith(']')) {
      try {
        const byteArray = JSON.parse(data);
        const uint8Array = new Uint8Array(byteArray);
        return `data:image/png;base64,${btoa(
          Array.from(uint8Array)
            .map(byte => String.fromCharCode(byte))
            .join('')
        )}`;
      } catch (e) {
        console.error('Failed to parse byte array:', e);
        throw new Error('Invalid byte array format');
      }
    }

    // UTF-8 encoded string을 base64로 변환
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);
    return `data:image/png;base64,${btoa(
      Array.from(uint8Array)
        .map(byte => String.fromCharCode(byte))
        .join('')
    )}`;
  } catch (error) {
    console.error('Image conversion error:', error);
    return ''; // 에러 시 빈 문자열 반환
  }
};

function dataURLtoBlob(dataURL: string) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {type: mime});
};

//Base64 데이터를 Blob으로 변환하는 함수
function base64ToBlob(base64Data: string): Blob {
  // Step 1: MIME 타입 헤더 추가
  const fullBase64Data = `data:image/png;base64,${base64Data}`;

  // Step 2: Base64 데이터를 Blob으로 변환
  const binaryString = atob(fullBase64Data.split(',')[1]);
  const len = binaryString.length;
  const byteArray = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  // Blob 생성 (MIME 타입은 PNG 이미지로 설정)
  return new Blob([byteArray], {type: 'image/png'});
}

const flattenMenu = (menuList: Menu[]): Menu[] => {
  return menuList.reduce((acc: Menu[], menu: Menu) => {
    acc.push(menu);
    if (menu.children) {
      acc.push(...flattenMenu(menu.children));
    }
    return acc;
  }, []);
};

/**
 * esponseDataType이 T나 Page<T> 둘중 한개가 올수있어서 자꾸 에러메세지가뜸
 * 현재데이터가 T인지 Page<T>인지판단할수있도록 결과 반환
 * @param data
 * @returns
 */
function isPage<T>(data: T | Page<T>): data is Page<T> {
  return (data as Page<T>).content !== undefined;
}

/**
 * 전화번호 문자열 오면, 하이픈 붙여서 반환
 * @param phone
 * @returns
 */
function formatPhoneNumber(phone: string): string {
  // 숫자가 아닌 문자는 제거
  const cleaned = phone.replace(/\D/g, "");

  // 길이 및 앞자리 확인 후 하이픈 추가
  if (cleaned.length === 10) {
    // 10자리 휴대폰 번호
    return cleaned.replace(/^(01[016789]|02|0[3-9][0-9])(\d{3})(\d{4})$/, "$1-$2-$3");
  } else if (cleaned.length === 11) {
    // 11자리 휴대폰 번호
    return cleaned.replace(/^(01[016789]|02|0[3-9][0-9])(\d{4})(\d{4})$/, "$1-$2-$3");
  } else {
    // 형식이 맞지 않을 경우 원본 반환
    return phone;
  }
}

function setCookie(name: string, value: string, expireInDays: number) {
  Cookies.set(name, value, {expires: expireInDays});
};

function getCookie(name: string): string | undefined {
  return Cookies.get(name)
}

function getBaseUrl() {
  if (window.location.origin.indexOf('kooroo.co.kr') > -1 || window.location.origin.indexOf('lgensol.com') > -1) {
    return `${window.location.origin}`;
  }
  return `${import.meta.env.VITE_PUBLIC_HEXA_API_URL}:${import.meta.env.VITE_PUBLIC_HEXA_API_PORT}`;
}

function fileDownload(fileName: string) {
  const link = document.createElement('a');
  const url = window.location.origin + "/excelSample/" + fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function openDashboardDetail(role: any, generation: string, stationId: string) {
  const gen = generation == "2" ? '2nd' : '1st';
  // const dashboardDetailUrl = `${window.location.origin}/dashboard/${gen}/${isAdmin(role.roleCode) ? 'admin' : 'user'}/${stationId}`;
  const dashboardDetailUrl = `${window.location.origin}/dashboard/${gen}/user/${stationId}`;
  const newPopup = window.open(
    dashboardDetailUrl,
    `Dashboard${gen}SecondStationDetail`,
    `width=1800,height=1108,top=100,left=100`
  )
  store.dispatch(addPopup(newPopup));
}

function isAdmin(roleCode: string) {
  //STN_ENG
  //STN_MFR
  //SUPER_ADMIN
  const adminCodeList = ['STN_ENG', 'STN_MFR', 'SUPER_ADMIN'];
  return adminCodeList.includes(roleCode);
}

export {
  getCurrentDate,
  encrypt,
  decrypt,
  getFormattedTime,
  formatNumber,
  convertToImageSrc,
  dataURLtoBlob,
  base64ToBlob,
  flattenMenu,
  isPage,
  formatPhoneNumber,
  setCookie,
  getCookie,
  fileDownload,
  openDashboardDetail,
  isAdmin
};
