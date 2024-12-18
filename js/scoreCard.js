function fetchData(callback) {
  fetch("../data/scoreCard.json")
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => {
      alert("Error fetching data: " + error);
    });
}

function formatNumber(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + " M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + " K";
  }
  return value;
}

function updateData(data, years) {
  let revenue = 0;
  let profit = 0;
  let itemSold = 0;

  if (years.length === 0) {
    // Jika tidak ada checkbox yang dipilih, menampilkan total dari semua tahun
    data["cardsone"].forEach((item) => {
      revenue += item.revenue;
      profit += item.profit;
      itemSold += item.itemSold;
    });
  } else {
    // menampilkan data dari checkbox yang dipilih
    data["cardsone"].forEach((item) => {
      if (years.includes(item.year.toString())) {
        revenue += item.revenue;
        profit += item.profit;
        itemSold += item.itemSold;
      }
    });
  }

  document.getElementById("revenue").textContent = formatNumber(revenue);
  document.getElementById("profit").textContent = formatNumber(profit);
  document.getElementById("itemSold").textContent = formatNumber(itemSold);
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData(function (data) {
    // Tampilkan data untuk semua tahun secara default
    updateData(data, []);

    document
      .querySelectorAll("#checkboxesYear input[type=checkbox]")
      .forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const selectedYears = Array.from(
            document.querySelectorAll(
              "#checkboxesYear input[type=checkbox]:checked"
            )
          ).map((cb) => cb.value);
          updateData(data, selectedYears);
        });
      });
  });
});
