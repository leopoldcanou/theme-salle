let V = {};

V.HeatMap = {
  "type": "heatmap",
  scaleY: { values: "" },
  scaleX: {},

  "series": [
  ],
  plot: {
    tooltip: {
      text: 'Il y a %v heures de cours',
      fontColor: 'white',
      fontSize: '14px',
      textAlign: 'left',
    }
  },
};


V.classcalendar = {
  type: "bar",
  plot: {
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
  "scale-x": {
    label: {
      /* Scale Title */ text: "Le nombre d'heure par salle",
    },
    labels: [

    ] /* Scale Labels */,
  },
  series: [],

  plotarea: {
    margin: "dynamic"
  },

  legend: {
    "toggle-action": "remove",
    adjustLayout: true,
    verticalAlign: "middle"
  },
};

export { V };