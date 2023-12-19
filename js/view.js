let V = {};
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
    // "border-radius": "16px",
    // border: "1px solid #dddddd",
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
    adjustLayout: true,
    verticalAlign: "middle"
  },
};

export { V };


graphset: [{
  type: 'bar',
  palette: ["#f44336", "#8bc34a", "#03a9f4"],
  title: {
    text: "Gitlab Commits",
    adjustLayout: true
  },
  scaleX: {
    labels: [2013, 2014, 2015, 2016],
    label: {
      text: "All-time"
    }
  },
  crosshairX: {
    lineWidth: "100%",
    lineColor: '#ccc',
    alpha: 0.5,
    plotLabel: {
      visible: false
    }
  },
  scaleY: {
    label: {
      text: "Commits per Repo"
    }
  },
  plotarea: {
    margin: "dynamic"
  },
  plot: {
    lineWidth: 1
  },
  legend: {
    adjustLayout: true,
    verticalAlign: "middle"
  },

}]