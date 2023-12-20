let chartData = [{
  id: 'all',
  parent: '',
  name: 'The World',
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
  options: {
    containers: {

      R01: {
        height: '50%',
        width: '33%',
        x: '0%',
        y: '0%',
      },
      R02: {
        height: '50%',
        width: '33%',
        x: '33%',
        y: '0%',
      },

    },

    itemLevel1: {
      backgroundColor: '#ddd',
      borderWidth: '3px',
      alpha: 1,
      label: {
        text: '%fullname',
        fontSize: '13px',
        fontWeight: 'bold',
        padding: '2px',
        offsetY: '-111px',
      },
    },
    itemLevel2: {
      backgroundColor: 'red',
      borderWidth: '2px',
      alpha: 1,
      label: {
        text: '%fullname',
        fontSize: '13px',
        fontWeight: 'bold',
        padding: '2px',
        offsetY: '',
      },
    },

    minLevel: 1,
    minSize: 3,
    padding: '1px',
  },
  plotarea: {
    margin: '10 0 0 0',
  },
  series: chartData,
};

export { V };