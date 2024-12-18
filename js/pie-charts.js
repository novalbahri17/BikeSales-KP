const checkboxesAgeGroup = document.getElementById("checkboxesAgeGroup");
const AgeGroupInput = checkboxesAgeGroup.querySelectorAll("input[type=checkbox]");
let selectedAgeGroup = [];

for (let i = 0; i < AgeGroupInput.length; i++) {
  AgeGroupInput[i].addEventListener("change", () => {
    if (AgeGroupInput[i].checked) {
      selectedAgeGroup.push(AgeGroupInput[i].value);
    } else {
      const index = selectedAgeGroup.indexOf(AgeGroupInput[i].value);
      if (index > -1) {
        selectedAgeGroup.splice(index, 1);
      }
    }
    drawChart();
  });
}

function drawChart() {
  fetch("../data/ageGroupDisributionData.json")
    .then((response) => response.json())
    .then((responseData) => {
      const response = responseData.data;

      let data = new google.visualization.DataTable();
      data.addColumn("string", "Age");
      data.addColumn("number", "Percentage");

      for (let i = 0; i < response.length; i++) {
        let label = response[i].label;
        let value = response[i].value;

        if (selectedAgeGroup.length === 0 || selectedAgeGroup.includes(label)) {
          data.addRow([label, value]);
        }
      }

      let options = {
        height: 280,
        chartArea: {
          left: 20,
          top: 20,
          width: "90%",
          height: "80%",
        },
        colors: ["#006C80", "#0093A7", "#00C0CC", "#00E5FF"],
        legend: {
          position: "bottom",
          alignment: "center",
          textStyle: {
            fontSize: 12,
          },
        },
        pieSliceText: "percentage",
        pieSliceTextStyle: {
          color: "black",
        },
        tooltip: {
          text: "percentage",
        },
        backgroundColor: "none",
      };

      let chart = new google.visualization.PieChart(document.getElementById("pie-chart"));

      // Variabel untuk menyimpan warna asli
      let originalColors = options.colors.slice();

      // Event listener untuk 'select'
      google.visualization.events.addListener(chart, 'select', function() {
        let selection = chart.getSelection();
        if (selection.length > 0) {
          let selectedItem = selection[0].row;
          let newColors = originalColors.map((color, index) => index === selectedItem ? color : "#E0E0E0");
          options.colors = newColors;
          chart.draw(data, options);

          // Menghapus seleksi untuk memungkinkan klik pada bagian lain
          setTimeout(() => chart.setSelection([]), 100);
        }
      });

      // Event listener untuk 'onmouseout' - Mengembalikan warna asli
      google.visualization.events.addListener(chart, 'onmouseout', function() {
        options.colors = originalColors.slice();
        chart.draw(data, options);
      });

      chart.draw(data, options);
    });
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// insight button
function showHideComposition() {
  let chart_pie = document.getElementById("insightPieChart");

  if (chart_pie.style.display === "none" || chart_pie.style.display === "") {
    chart_pie.style.display = "flex";
  } else {
    chart_pie.style.display = "none";
  }
}
