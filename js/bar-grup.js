document.addEventListener("DOMContentLoaded", function () {
  // Filtering by Country
  const checkboxesCountry = document.getElementById("checkboxesCountry");
  const countryInput = checkboxesCountry.querySelectorAll(
    "input[type=checkbox]"
  );

  let selectedCountry = [];
  for (let i = 0; i < countryInput.length; i++) {
    countryInput[i].addEventListener("change", () => {
      if (countryInput[i].checked) {
        selectedCountry.push(countryInput[i].value);
      } else {
        const index = selectedCountry.indexOf(countryInput[i].value);
        if (index > -1) {
          selectedCountry.splice(index, 1);
        }
      }
      updateChart();
    });
  }

  // Filtering by ProductCategory
  const checkboxesProductCat = document.getElementById(
    "checkboxesProductCategory"
  );
  const productCatInput = checkboxesProductCat.querySelectorAll(
    "input[type=checkbox]"
  );

  let selectedProductCat = [];
  for (let i = 0; i < productCatInput.length; i++) {
    productCatInput[i].addEventListener("change", () => {
      if (productCatInput[i].checked) {
        selectedProductCat.push(productCatInput[i].value);
      } else {
        const index = selectedProductCat.indexOf(productCatInput[i].value);
        if (index > -1) {
          selectedProductCat.splice(index, 1);
        }
      }
      updateChart();
    });
  }

  let chart;
  let salesData;

  fetch("./data/SalesByproductCatandCountry.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      salesData = data;
      updateChart();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  function updateChart() {
    if (!salesData) return;

    // Filter data based on selected countries and product categories
    const filteredData = salesData.filter(
      (item) =>
        (selectedCountry.length === 0 ||
          selectedCountry.includes(item.Country)) &&
        (selectedProductCat.length === 0 ||
          selectedProductCat.includes(item.Product_Category))
    );

    // Group the filtered data
    const groupedData = filteredData.reduce((acc, cur) => {
      const key = cur.Country;
      if (!acc[key]) {
        acc[key] = {};
      }
      acc[key][cur.Product_Category] = cur.Revenue;
      return acc;
    }, {});

    const countries = Object.keys(groupedData);
    const categories = Object.keys(
      salesData.reduce((acc, cur) => {
        acc[cur.Product_Category] = true;
        return acc;
      }, {})
    );

    const categoryColors = {
      Bikes: "#006C80",
      Accessories: "#0093A7",
      Clothing: "#00C0CC",
    };

    const datasets = categories.map((category) => {
      return {
        label: category,
        data: countries.map((country) =>
          groupedData[country] ? groupedData[country][category] || 0 : 0
        ),
        backgroundColor: categoryColors[category] || "rgba(0, 0, 0, 0.1)",
        stack: "Stack 1",
      };
    });

    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById("salesChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: countries,
        datasets: datasets,
      },
      options: {
        animation: {
          onComplete: function () {
            window.delayed = true;
          },
          delay: function (context) {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !window.delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
          duration: 1000, // Durasi animasi dalam milidetik
          easing: 'easeInElastic' // Efek easing
        },
        scales: {
          x: { stacked: true },
          y: {
            stacked: true,
            ticks: {
              callback: function (value, index, values) {
                if (value >= 1000000) {
                  return value / 1000000 + " M";
                } else if (value >= 1000) {
                  return value / 1000 + " K";
                }
                return value;
              },
            },
          },
        },
      },
    });
  }
});

//button insight bar grup chart
document.addEventListener('DOMContentLoaded', function() {
  const insightButton = document.querySelector('.insight-button-bargrup');
  const textAreaBarChart = document.querySelector('.text-area-bargrup');

  textAreaBarChart.style.display = 'none';
  insightButton.textContent = 'Insight';

  insightButton.addEventListener('click', function() {
    if (textAreaBarChart.style.display === 'none' || textAreaBarChart.style.display === '') {
      textAreaBarChart.style.display = 'block';
    } else {
      textAreaBarChart.style.display = 'none';
    }
  });
});
