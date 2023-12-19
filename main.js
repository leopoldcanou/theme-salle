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
  let title = event.title.includes("CM") ? "CM" : event.title.includes("TD") ? "TD" : event.title.includes("TP") ? "TP" : event.title;
  let groups = event.groups.toString().includes("BUT1") ? "BUT1" : event.groups.toString().includes("BUT2") ? "BUT2" : event.groups.toString().includes("BUT3") ? "BUT3" : event.groups;
  return {
    duration: durationHours,
    location: event.location,
    title: title,
    groups: groups,
  };
});

console.log(durations);

let yearFilter = ["BUT1", "BUT2", "BUT3"];
let classTypeFilter = ["CM", "TD", "TP"];
let locationsToFilter = ["R01", "R02", "R03", "R04", "101", "102", "103", "115", "ADM132"];


let filteredDurations = durations.filter((event) => {
  let groups = yearFilter.find((year) => event.groups.includes(year)) || event.groups;
  return locationsToFilter.includes(event.location) && classTypeFilter.includes(event.title) && yearFilter.includes(groups);
});

let sortedDurations = filteredDurations.reduce((acc, curr) => {
  let groups = yearFilter.find((year) => curr.groups.includes(year)) || curr.groups;

  if (!acc[curr.location]) {
    acc[curr.location] = {};
  }

  if (yearFilter.includes(groups)) {
    if (!acc[curr.location][groups]) {
      acc[curr.location][groups] = 0;
    }
    acc[curr.location][groups] += curr.duration;
  }

  return acc;
}, {});

for (const location in sortedDurations) {
  sortedDurations[location].getTotal = function () {
    let total = 0;
    for (const group in this) {
      if (group !== 'getTotal') {
        total += this[group];
      }
    }
    return total;
  };
}

console.log(sortedDurations);
console.log(sortedDurations["R01"].getTotal());



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