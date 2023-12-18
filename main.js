import { V } from "./js/view.js";

// Objet qui contient les données du graphique
let seriesObj1 = [
  {
    values: [20, 45, 25, 5, 10, 15, 20, 25, 30],
  },
];

V.classcalendar.series = seriesObj1;

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});
