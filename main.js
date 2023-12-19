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
  return {
    duration: event.duration,
    location: event.location,
    classType: event.classType,
    group: event.group,
  };
});

// get the total duration of each group
let totalDuration = {};
durations.forEach((event) => {
  if (totalDuration[event.group] === undefined) {
    totalDuration[event.group] = 0;
  }
  totalDuration[event.group] += event.duration;
});

console.log(totalDuration);



console.log(durations);

let seriesObj1 = yearFilter.map((year) => {
  let classTypeObj = classTypeFilter.map((classType) => {
    return {
      values: locationsToFilter.map((location) => sortedDurations[year]?.[classType]?.[location] || 0),
    };
  });
  return {
    values: classTypeObj,
  };
});

V.classcalendar.series = seriesObj1;
V.classcalendar["scale-x"].labels = Object.keys(sortedDurations);

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});