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

let classes = events.map((event) => {
  return {
    duration: event.duration,
    location: event.location,
    classType: event.classType,
    group: event.group,
  };
});

// get the total duration of each group (BUT1, BUT2, BUT3)
let totalGroup = {};
classes
  .filter((event) => event.group === "BUT1" || event.group === "BUT2" || event.group === "BUT3")
  .forEach((event) => {
    if (totalGroup[event.group] === undefined) {
      totalGroup[event.group] = 0;
    }
    totalGroup[event.group] += event.duration;
  });

console.log(totalGroup);

//get the total duration of each classType
let totalClassType = {};
classes
  .filter((event) => event.classType === "TP" || event.classType === "TD" || event.classType === "CM")
  .forEach((event) => {
    if (totalClassType[event.classType] === undefined) {
      totalClassType[event.classType] = 0;
    }
    totalClassType[event.classType] += event.duration;
  });

console.log(totalClassType);

V.classcalendar.series = seriesObj1;
V.classcalendar["scale-x"].labels = Object.keys(sortedclasses);

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});