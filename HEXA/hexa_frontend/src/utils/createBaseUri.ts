function createBaseUri(service: string) {
  const originUrl = window.location.origin;
  const mobileSubDomain = import.meta.env.VITE_MOBILE_SUB_DOMAIN;
  const pcSubDomain = import.meta.env.VITE_PC_SUB_DOMAIN;
  const url = originUrl && mobileSubDomain != '' && originUrl.indexOf(mobileSubDomain) > -1
      ? window.location.origin.replace(mobileSubDomain, pcSubDomain)
      : window.location.origin
  ;
  if(url.indexOf('kooroo.co.kr') > -1 || url.indexOf('lgensol.com') > -1){
    return `${url}${import.meta.env.VITE_PUBLIC_HEXA_API_PATH}/${service}`;
  }
  return   `${import.meta.env.VITE_PUBLIC_HEXA_API_URL}:${import.meta.env.VITE_PUBLIC_HEXA_API_PORT}${import.meta.env.VITE_PUBLIC_HEXA_API_PATH}/${service}`;
}

export default createBaseUri;
