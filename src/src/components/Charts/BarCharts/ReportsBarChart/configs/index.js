function configs(labels, datasets, title, isTransparent) {
  return !isTransparent
    ? {
        data: {
          labels,
          datasets: [
            {
              label: datasets.label,
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              data: datasets.data,
              maxBarThickness: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "rgba(255, 255, 255)"
              }
            },
            datalabels: {
              display: false
            },
            title: {
              display: true,
              padding: { bottom: 20, top: 5 },
              font: {
                size: 15
              },
              text: title
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
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: "rgba(255, 255, 255, .2)"
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 500,
                beginAtZero: true,
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2
                },
                color: "#fff"
              }
            },
            x: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: "rgba(255, 255, 255, .2)"
              },
              ticks: {
                display: true,
                color: "#f8f9fa",
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2
                }
              }
            }
          }
        }
      }
    : {
        data: {
          labels,
          datasets: [
            {
              label: datasets.label,
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 2,
              borderSkipped: false,
              backgroundColor: ["#49a3f1", "#B2A4FF", "#FFB4B4", "#A3EAD3", "#95BDFF"],
              data: datasets.data,
              maxBarThickness: 10
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              labels: {
                color: "rgba(255, 255, 255)"
              }
            },
            datalabels: {
              display: false
            },
            title: {
              display: true,
              padding: { bottom: 20, top: 5 },
              font: {
                size: 20,
                family: "'Roboto', 'Helvetica', 'Arial', sans-serif"
              },
              color: "#344767",
              text: title
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
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5]
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 500,
                beginAtZero: true,
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2
                },
                color: "rgb(102, 102, 102)"
              }
            },
            x: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: "rgba(255, 255, 255, .2)"
              },
              ticks: {
                display: true,
                color: "rgb(102, 102, 102)",
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2
                }
              }
            }
          }
        }
      };
}

export default configs;
