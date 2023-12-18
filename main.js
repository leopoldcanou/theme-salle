import { V } from "./js/view.js";
// sample events for testing

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});

// recuperate the start time from each event from the data/mmi1.ics file
