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
    title: event.title,
    groups: event.groups,
  };
});

console.log(durations);

let locationsToFilter = ["R01", "R02", "R03", "R04", "101", "102", "103", "115", "ADM132"];
let classTypeFilter = ["CM", "TD", "TP"];

let sortedDurations = durations.reduce((acc, curr) => {
  if (locationsToFilter.includes(curr.location)) {
    if (acc[curr.location]) {
      acc[curr.location] += curr.duration;
    } else {
      acc[curr.location] = curr.duration;
    }
  }
  return acc;
}, {});

let seriesObj1 = [{
  values: Object.keys(sortedDurations).map(key => sortedDurations[key]),
}];

V.classcalendar.series = seriesObj1;
V.classcalendar["scale-x"].labels = Object.keys(sortedDurations);

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});