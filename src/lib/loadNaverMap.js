let promise;

export function loadNaverMap(ncpKeyId) {
  if (window.naver?.maps) return Promise.resolve(window.naver);
  if (promise) return promise;

  if (!ncpKeyId) {
    return Promise.reject(new Error('Naver Map Key가 비어있습니다.'));
  }

  //스크립트 파일이 로드된 후, 실제로 window.naver.maps 객체가 생성될 때까지 대기
  const waitForNaver = (timeoutMs = 8000) =>
    new Promise((resolve, reject) => {
      const start = Date.now();
      const tick = () => {
        if (window.naver?.maps) return resolve(window.naver);
        if (Date.now() - start > timeoutMs)
          return reject(
            new Error(
              'maps.js 로드 후에도 window.naver.maps가 생성되지 않았습니다.'
            )
          );
        setTimeout(tick, 50);
      };
      tick();
    });

  promise = new Promise((resolve, reject) => {
    //네이버 지도 API 인증 실패 시 호출되는 전역 콜백 정의
    window.navermap_authFailure = () => {
      reject(new Error('Naver Maps 인증 실패(navermap_authFailure)'));
    };

    const scriptId = 'naver-maps-sdk';
    const existing = document.getElementById(scriptId);

    //스크립트 태그가 이미 DOM에 존재한다면, 객체 생성만 기다림
    if (existing) {
      waitForNaver().then(resolve).catch(reject);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.defer = true;

    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(
      ncpKeyId
    )}`;

    //스크립트 로드 완료 후 객체 초기화 대기
    script.onload = () => {
      waitForNaver().then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error('maps.js 네트워크 로드 실패'));

    document.head.appendChild(script);
  });

  return promise;
}
