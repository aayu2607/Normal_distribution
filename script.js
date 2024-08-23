


function generateNormalData(mean, stddev, numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      let u1 = Math.random();
      let u2 = Math.random();
      let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2); // Box-Muller transform
      let randNormal = mean + stddev * randStdNormal;
      data.push(randNormal);
    }
    return data;
  }
  
  
  function generateData() {
    const mean = parseFloat(document.getElementById("mean").value);
    const stddev = parseFloat(document.getElementById("stddev").value);
       
    const data = generateNormalData(mean, stddev, 1000);
    
    plotHistogram(data);
  
  
    
    plotLineChart(data);
  }
  
  function plotHistogram(data) {
    const ctx = document.getElementById('histogram').getContext('2d');
    const bins = 20;
    const histogramData = new Array(bins).fill(0);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binWidth = (max - min) / bins;
  
    data.forEach(value => {
      const bin = Math.floor((value - min) / binWidth);
      if (bin < bins) histogramData[bin]++;
    });
  
    if (window.histogramChart) window.histogramChart.destroy(); 
  
    window.histogramChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: histogramData.map((_, i) => (min + i * binWidth).toFixed(2)),
        datasets: [{
          label: 'Frequency',
          data: histogramData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Value'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frequency'
            }
          }
        }
      }
    });
  }
  
  
  function plotLineChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
  
    
    const sortedData = [...data].sort((a, b) => a - b);
  
    if (window.lineChart) window.lineChart.destroy();
  
    window.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sortedData,
        datasets: [{
          label: 'Normal Distribution',
          data: sortedData.map((y, i) => ({x: i, y})),
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Index'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  }
  