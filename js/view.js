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
  type: 'bubble-pack',
  plotarea: {
    margin: 10
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