import { V } from "./js/view.js";
import { M } from "./js/model.js";

await M.init(); // on attend que les données soient chargées



// get location of each M.getEvents("mmi1") and get the start and end time of each event
// get the difference between end and start time

let events = [
  ...M.getEvents("mmi1"),
  ...M.getEvents("mmi2"),
  ...M.getEvents("mmi3"),
];

let durations = events.map((event) => {
  let durationHours = (event.end - event.start) / 3600000;
  return {
    duration: durationHours,
    location: event.location,
  };
});

const locations = [
  "R01",
  "R02",
  "R03",
  "R04",
  "101",
  "102",
  "103",
  "115",
  "ADM132",
];

const locationHours = {};

durations.forEach((event) => {
  const { duration, location } = event;
  if (locations.includes(location)) {
    if (locationHours[location]) {
      locationHours[location] += duration;
    } else {
      locationHours[location] = duration;
    }
  }
});

console.log(locationHours);

// Objet qui contient les données du graphique
let seriesObj1 = [
  {
    values: [20, 45, 25, 5, 10, 15, 20, 25, 30],
  },
];

V.classcalendar.series = seriesObj1; // on ajoute les données au graphique

V.classcalendar["scale-x"].labels = Object.keys(locationHours);



zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});