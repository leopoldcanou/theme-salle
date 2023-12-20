let V = {};

V.chartConfig = {
  type: 'sunburst',
  plotarea: {
    margin: 10
  },
  plot: {
    tooltip: {
      align: 'left',
      padding: '10px 15px',
      borderRadius: '3px',
      thousandsSeparator: ',',
      text: "%t a %v heures",

    },
    valueBox: {
      text: '%data-vbtext',
      color: '#424242',
      fontSize: '10px',
      visible: null
    },
  },
  options: {
    palette: ['#33a8c7', '#52e3e1', '#a0e426', '#fdf148', '#ffab00', '#f77976', '#f050ae', '#d883ff', '#9336fd'],
  },
  series: [],
};

export { V };