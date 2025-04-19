import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import MOCK_STAT_LIST from "@/utils/apiService/sample/hexaStationStatMonthly.json";

// 이 파일에서만 사용할 독립적인 axios 인스턴스 생성
const apiInstance = axios.create({
  baseURL: 'https://your-api-base-url.com',
});

const mock = new AxiosMockAdapter(apiInstance);

// 특정 URL 패턴에 대해서만 mock 적용
mock.onGet(/\/v1\/stat\/statList/).reply(200, {
  data: MOCK_STAT_LIST,
});

function SampleMock() {
  const getSampleStatList = async (urlParams: any) => {
    const response = await apiInstance.get('/v1/stat/statList', { params: urlParams });
    return response.data;
  };

  // Mock 해제 함수
  const resetMock = () => {
    mock.reset();
  };

  return {
    getSampleStatList,
    resetMock
  };
}

export default SampleMock;