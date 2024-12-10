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

  const header = new Header();
  const regionList = new RegionList();
  const cityList = new CityList({
    $app,
    initialState: this.state.cities,
  });
  const cityDetail = new CityDetail();

  this.setState = (newState) => {
    this.state = newState;
    cityList.setState(this.state.cities);
  };

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
