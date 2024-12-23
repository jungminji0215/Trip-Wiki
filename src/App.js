import Header from "./components/Header.js";
import RegionList from "./components/RegionList.js";
import CityList from "./components/CityList.js";
import CityDetail from "./components/CityDetail.js";
import { request } from "./api/api.js";

export default function App($app) {
  this.state = {
    startIdx: 0, // 몇 번째 데이터부터 불러올 것인지
    sortBy: "", // 정렬 필터
    searchWord: "", // 검색어
    region: "",
    cities: "",
  };

  // 필요한 컴포넌트들 생성
  const header = new Header();
  const regionList = new RegionList();
  const cityList = new CityList({
    $app,
    initialState: this.state.cities,
    handleLoadMore: async () => {
      const newStartIdx = this.state.startIdx + 40;
      const newCities = await request(
        newStartIdx,
        this.state.region,
        this.state.sortBy,
        this.state.searchWord
      );
      this.setState({
        ...this.state,
        startIdx: newStartIdx,
        cities: {
          cities: [...this.state.cities.cities, ...newCities.cities],
          isEnd: newCities.isEnd,
        },
      });
    },
  });
  const cityDetail = new CityDetail();

  // 여러 상태 값들을 변경할 수 있는 함수
  this.setState = (newState) => {
    this.state = newState;
    cityList.setState(this.state.cities);
  };

  // 웹사이트에 처음 접속할 때 실행
  const init = async () => {
    const cities = await request(
      this.state.startIdx,
      this.state.region,
      this.state.sortBy,
      this.state.searchWord
    );

    this.setState({
      ...this.state,
      cities: cities,
    });

    console.log("cities :>> ", cities);
  };

  init();
}
