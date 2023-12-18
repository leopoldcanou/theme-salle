// sample events for testing
let chartConfig = {
  type: 'bar',
  plot: {
    styles: ["red", "orange", "yellow", "green", "blue", "purple", "brown", "black"] /* Bar Fill by Node */
  },
  'scale-x': {
    label: { /* Scale Title */
      text: "Le nombre d'heure par salle",
    },
    labels: ["R01", "R02", "R03", "R04", "101", "102", "103", "115", "ADM"] /* Scale Labels */
  },
  series: [{
    values: [20, 45, 25, 5, 10, 15, 20, 25, 30]
  },
  ]
};

zingchart.render({
  id: 'myChart',
  data: chartConfig,
  height: '100%',
  width: '100%'
});