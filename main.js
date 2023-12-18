// sample events for testing
let chartConfig = {
  type: "bar",
  plot: {
    styles: [
      "#33a8c7",
      "#52e3e1",
      "#a0e426",
      "#fdf148",
      "#ffab00",
      "#f77976",
      "#f050ae",
      "#d883ff",
      "#9336fd",
    ],
    "border-radius": "16px 16px 0px 0px",
    border: "2px solid #dddddd",
  },
  "scale-x": {
    label: {
      /* Scale Title */ text: "Le nombre d'heure par salle",
    },
    labels: [
      "R01",
      "R02",
      "R03",
      "R04",
      "101",
      "102",
      "103",
      "115",
      "ADM132",
    ] /* Scale Labels */,
  },
  series: [
    {
      values: [20, 45, 25, 5, 10, 15, 20, 25, 30],
    },
  ],
};

zingchart.render({
  id: "myChart",
  data: chartConfig,
  height: "100%",
  width: "100%",
});

// recuperate the start time from each event from the data/mmi1.ics file
