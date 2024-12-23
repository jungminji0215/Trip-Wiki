/**
 * 3. 동작 원리
$target

this.$target은 document.createElement("div")로 초기화되어 객체에 동적으로 추가됨.
this.$target.className = "header"는 $target의 클래스 이름을 설정함.
state

초기에는 this.state가 존재하지 않음.
setState 메서드가 호출될 때 this.state가 동적으로 추가되고 업데이트됨.
JavaScript의 유연성

JavaScript는 객체의 속성을 동적으로 추가할 수 있음.
미리 this.state나 this.$target을 선언하지 않아도 필요한 시점에 추가 가능.
 */

// 이 함수는 Header라는 이름의 생성자 함수로 보인다.
// JavaScript에서 생성자 함수는 보통 new 키워드를 사용하여 객체를 생성하고 초기화하는 데 사용된다.
export default function Header({
  $app,
  initialState,
  handleSortChange,
  handleSearchWord,
}) {
  /**
   * 생성자 함수로 사용될 때 (new Header()):
   * this는 생성된 새 객체를 가리킨다.
   *
   * 만약 new 없이 호출하면:
   * this는 undefined가 될 가능성이 크다 (strict mode에서).
   * strict mode가 아니면 this는 전역 객체(window 또는 global)를 가리킬 수 있다.
   */
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "header";

  this.handleSortChange = handleSortChange;
  this.handleSearchWord = handleSearchWord;
  $app.appendChild(this.$target);

  this.template = () => {
    const { sortBy, searchWord } = this.state;
    let temp = `
    <div class="title">
      <a href="/">✈️ Trip Wiki</a>
    </div>
    <div class="filter-search-container">
      <div class="filter">
        <select id="sortList" class="sort-list">
          <option value="total" ${
            sortBy === "total" ? "selected" : ""
          }>Total</option>
          <option value="cost" ${
            sortBy === "cost" ? "selected" : ""
          }>Cost</option>
          <option value="fun" ${sortBy === "fun" ? "selected" : ""}>Fun</option>
          <option value="safety" ${
            sortBy === "safety" ? "selected" : ""
          }>Safety</option>
          <option value="internet" ${
            sortBy === "internet" ? "selected" : ""
          }>Internet</option>
          <option value="air quality" ${
            sortBy === "air quality" ? "selected" : ""
          }>Air Quality</option>
          <option value="food" ${
            sortBy === "food" ? "selected" : ""
          }>Food</option>

        </select>
      </div>
      <div class="search">
          <input type="text" placeholder="Search" id="search" autocomplete="off" value=${searchWord}>
      </div>
    </div>
    `;

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    document.getElementById("sortList").addEventListener("change", (event) => {
      this.handleSortChange(event.target.value);
    });

    const $searchInput = document.getElementById("search");

    $searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleSearchWord($searchInput.value);
      }
    });
  };

  this.setState = (newState) => {
    // this.state는 setState가 호출될 때 객체의 속성으로 동적으로 추가된다.
    // JavaScript 객체는 동적으로 속성을 추가할 수 있기 때문에, this.state가 미리 선언되지 않아도 문제가 없다.

    this.state = newState;
    this.render();
  };

  this.render();
}
