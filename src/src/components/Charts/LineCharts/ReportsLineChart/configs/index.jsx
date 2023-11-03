function configs(labels, datasets, title, isTransparent) {
  const configDatasets =
    datasets && datasets.length > 0
      ? datasets.map((item) => {
          return {
            label: item.label,
            tension: 0,
            pointRadius: 5,
            pointBorderColor: "#49a3f1",
            pointBackgroundColor: "#fff",
            borderColor: ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#696969"],
            borderWidth: 2,
            backgroundColor: "transparent",
            fill: true,
            data: item.data,
            maxBarThickness: 2
          };
        })
      : [];

  return !isTransparent
    ? {
        data: {
          labels,
          datasets: configDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
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
                display: true,
                color: "#fff",
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2
                }
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
          datasets: configDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: {
                padding: 15,
                font: {
                  size: 16
                }
              }
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
                borderDash: [5, 5]
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
            },
            x: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5]
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
