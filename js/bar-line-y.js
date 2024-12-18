const distributionChart = document.getElementById("distributionChart");
let distributionChartCanvas = null;
let chartData = {};

// Fetch data from JSON
fetch("./data/GenderDisributionByCountryandRevenue.json")
  .then((response) => response.json())
  .then((data) => {
    chartData = data;
    renderChart(Object.keys(chartData)); // Render default chart with all years
  });

const renderChart = (years, selectedCountries = []) => {
  const combinedLabels = [];
  const combinedData = {};

  // Initialize combinedData structure
  Object.keys(chartData[Object.keys(chartData)[0]].datasets).forEach(
    (datasetIndex) => {
      const label =
        chartData[Object.keys(chartData)[0]].datasets[datasetIndex].label;
      combinedData[label] = {
        label: label,
        data: [],
        backgroundColor:
          chartData[Object.keys(chartData)[0]].datasets[datasetIndex]
            .backgroundColor,
      };
    }
  );

  // Combine data from selected years and filter by selected countries
  years.forEach((year) => {
    const { labels, datasets } = chartData[year];
    labels.forEach((label, index) => {
      if (selectedCountries.length === 0 || selectedCountries.includes(label)) {
        if (!combinedLabels.includes(label)) {
          combinedLabels.push(label);
        }
        datasets.forEach((dataset, datasetIndex) => {
          const currentIndex = combinedLabels.indexOf(label);
          combinedData[dataset.label].data[currentIndex] =
            (combinedData[dataset.label].data[currentIndex] || 0) +
            dataset.data[index];
        });
      }
    });
  });

  const processedDatasets = Object.values(combinedData).map((dataset) => {
    return {
      ...dataset,
      data: dataset.data.map((value) => value / 1000000),
    };
  });

  if (distributionChartCanvas) {
    distributionChartCanvas.destroy();
  }

  distributionChartCanvas = new Chart(distributionChart.getContext("2d"), {
    type: "bar",
    data: {
      labels: combinedLabels,
      datasets: processedDatasets,
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + " M";
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 10,
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.x !== null) {
                label += context.parsed.x + "";
              }
              return label;
            },
          },
        },
        datalabels: {
          anchor: "end",
          align: "right",
          formatter: function (data, context) {
            return data + "m";
          },
          color: "white",
          font: {
            weight: "bold",
            size: 3,
          },
        },
      },
    },
  });
};

// Add event listeners to checkboxes for years
document
  .querySelectorAll("#checkboxesYear input[type=checkbox]")
  .forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const selectedYears = Array.from(
        document.querySelectorAll(
          "#checkboxesYear input[type=checkbox]:checked"
        )
      ).map((cb) => cb.value);
      const selectedCountries = Array.from(
        document.querySelectorAll(
          "#checkboxesCountry input[type=checkbox]:checked"
        )
      ).map((cb) => cb.value);
      if (selectedYears.length > 0) {
        renderChart(selectedYears, selectedCountries);
      } else {
        renderChart(Object.keys(chartData), selectedCountries); // Render chart with all data if no year is selected
      }
    });
  });
// Add event listeners to checkboxes for country
document
  .querySelectorAll("#checkboxesCountry input[type=checkbox]")
  .forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const selectedYears = Array.from(
        document.querySelectorAll(
          "#checkboxesYear input[type=checkbox]:checked"
        )
      ).map((cb) => cb.value);
      const selectedCountries = Array.from(
        document.querySelectorAll(
          "#checkboxesCountry input[type=checkbox]:checked"
        )
      ).map((cb) => cb.value);
      if (selectedYears.length > 0) {
        renderChart(selectedYears, selectedCountries);
      } else {
        renderChart(Object.keys(chartData), selectedCountries); // Render chart with all data if no year is selected
      }
    });
  });

  //buttom insight 
  document.addEventListener('DOMContentLoaded', function() {
    const insightButton = document.querySelector('.insight-button-bar-line');
    const textArea = document.querySelector('.text-area-hover');
  
    textArea.style.display = 'none';
    insightButton.textContent = 'Insight';
  
    insightButton.addEventListener('click', function() {
      if (textArea.style.display === 'none' || textArea.style.display === '') {
        textArea.style.display = 'block';
        insightButton.textContent = 'Insight';
      } else {
        textArea.style.display = 'none';
        insightButton.textContent = 'Insight';
      }
    });
  });
  