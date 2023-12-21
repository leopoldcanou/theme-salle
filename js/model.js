import ical from "ical";
import { EventManager } from "./class/event-manager";

let Events = {
  mmi1: null,
  mmi2: null,
  mmi3: null,
};

let M = {};

M.getEvents = function (annee) {
  if (annee in Events) {
    return Events[annee].toObject();
  }
  return null;
};

M.init = async function () {
  let eventNames = ["mmi1", "mmi2", "mmi3"];
  for (let eventName of eventNames) {
    let data = await fetch(`./data/${eventName}.ics`);
    data = await data.text();
    data = ical.parseICS(data);
    Events[eventName] = new EventManager(eventName, `MMI ${eventName.slice(3)}`, `Agenda des MMI ${eventName.slice(3)}`);
    Events[eventName].addEvents(data);
  }
};

export { M };