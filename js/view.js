let V = {};

V.HeatMap = {
  "type": "heatmap",

  "series": [{
    "values": [59, 15, 5, 30, 60, 99, 28]
  },
  {
    "values": [34, 32, 87, 65, 9, 17, 40]
  },
  {
    "values": [90, 19, 50, 39, 12, 49, 14]
  }
  ],
  plot: {
    tooltip: {
      text: 'Il y %v heures de cours',
      fontColor: 'white',
      fontSize: '14px',
      textAlign: 'left',
    }
  },
};

export { V };