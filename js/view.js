let chartData = [{
  id: 'all',
  parent: '',
  name: 'All',
},

{
  id: 'R01',
  parent: 'all',
  name: 'R01',
},
{
  id: 'TD',
  parent: 'R01',
  name: 'TD',
  value: 192,
},
{
  id: 'tp',
  parent: 'R01',
  name: 'TP',
  value: 346,
},

{
  id: 'R02',
  parent: 'all',
  name: 'R02',
},
{
  id: 'TD',
  parent: 'R02',
  name: 'TD',
  value: 192,
},
{
  id: 'tp',
  parent: 'R02',
  name: 'TP',
  value: 346,
},
];



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
      thousandsSeparator: ','
    },
    valueBox: {
      text: '%data-vbtext',
      color: '#424242',
      fontSize: '10px',
      visible: null
    },
    stacked: true,
    'stack-type': "normal",
    // styles: [
    //   "#33a8c7",
    //   "#52e3e1",
    //   "#a0e426",
    //   "#fdf148",
    //   "#ffab00",
    //   "#f77976",
    //   "#f050ae",
    //   "#d883ff",
    //   "#9336fd",
    // ],
    // "border-radius": "6px",
    // border: "1px solid #dddddd",
    animation: {
      "sequence": "ANIMATION_BY_NODE",
      effect: "ANIMATION_FADE_IN",
      speed: 500,
      method: "ANIMATION_FADE_OUT"
    }
  },
  _options: {
    padding: 0,
    minSize: 3,
    groupFilter: ['asia', 'southamerica', 'africa', 'europe'],
    format: {
      short: true,
      decimals: 2,
      decimalsSeparator: '.',
      thousandsSeparator: ','
    }
  },
  itemLevel1: {
    backgroundColor: '#f5f5f5',
  },
  series: [],
};

export { V };