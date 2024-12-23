export default function CityList({ $app, initialState, handleLoadMore }) {
  console.log("---------- CityList ----------");
  console.log("$app :>> ", $app);
  console.log("initialState :>> ", initialState);

  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "city-list";
  this.handleLoadMore = handleLoadMore;

  $app.appendChild(this.$target);

  this.template = () => {
    let temp = `<div class="city-items-container">`;

    if (this.state) {
      this.state.cities.forEach((city) => {
        temp += `
      <div class="city-item" id=${city.id}>
        <img src=${city.image}></img>
        <div class="city-item-info">${city.city}, ${city.country}</div>
        <div class="city-item-score">⭐️ ${city.total}</div>
      </div>
    `;
      });

      temp += `</div>`;
    }

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    // 아직 불러올 데이터가 존재한다면
    if (!this.state.isEnd) {
      const $loadMoreButton = document.createElement("button");
      $loadMoreButton.className = "add-items-btn";
      $loadMoreButton.textContent = "+ 더보기";
      this.$target.appendChild($loadMoreButton);

      $loadMoreButton.addEventListener("click", () => {
        this.handleLoadMore();
      });
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
