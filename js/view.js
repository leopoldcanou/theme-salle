let V = {};

V.uicalendar = new Calendar("#calendar", {
  defaultView: "week",
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ["time"],
  },
  template: {
    time: function (event) {
      return `<span style="color: white;">${event.title}</span>`;
    },
  },
});

export { V };
