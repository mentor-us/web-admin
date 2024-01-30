// import colors from "assets/theme/base/colors";

// const { gradients, dark } = colors;

function configs(labels, datasets) {
  const backgroundColors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "#B2A4FF",
    "#FFB4B4",
    "#FEFF86",
    "#62CDFF",
    "#DFFFD8"
  ];

  // if (datasets.backgroundColors) {
  //   datasets.backgroundColors.forEach((color) =>
  //     gradients[color]
  //       ? backgroundColors.push(gradients[color].state)
  //       : backgroundColors.push(dark.main)
  //   );
  // } else {
  //   backgroundColors.push(dark.main);
  // }

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          weight: 9,
          cutout: 0,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 2,
          backgroundColor: backgroundColors,
          fill: false,
          data: datasets.data
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true
          }
        }
      },
      interaction: {
        intersect: false,
        mode: "index"
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false
          },
          ticks: {
            display: false
          }
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false
          },
          ticks: {
            display: false
          }
        }
      }
    }
  };
}

export default configs;
