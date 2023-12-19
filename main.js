import { V } from "./js/view.js";
import { M } from "./js/model.js";

await M.init(); // on attend que les données soient chargées

// Objet qui contient les données du graphique
let seriesObj1 = [
  {
    values: [20, 45, 25, 5, 10, 15, 20, 25, 30],
  },
];

V.classcalendar.series = seriesObj1; // on ajoute les données au graphique

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});


// get location of each M.getEvents("mmi1") and get the start and end time of each event
// get the difference between end and start time

let events = [...M.getEvents("mmi1"), ...M.getEvents("mmi2"), ...M.getEvents("mmi3")];

let durationHours = events.map((event) => (event.end - event.start) / 3600000);
console.log(durationHours);

