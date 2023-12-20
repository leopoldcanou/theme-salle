class Event {
  #id;
  #summary;
  #description;
  #start;
  #end;
  #location;
  #groups;
  #duration;
  #group;
  #classType;
  #ressource; // fait
  #semestre; // fait
  #semaine;

  constructor(id, summary, description, start, end, location, duration, group, classType, ressource, semaine) {
    this.#id = id;
    this.#summary = summary.slice(0, summary.lastIndexOf(","));
    this.#description = description;
    this.#start = new Date(start);
    this.#end = new Date(end);
    this.#location = location;

    this.#groups = summary.slice(summary.lastIndexOf(",") + 1);
    this.#groups = this.#groups.split(".");
    this.#groups = this.#groups.map((gr) => gr.replace(/\s/g, ""));

    this.#duration = (this.#end - this.#start) / 3600000;

    this.#group = this.groups.toString().includes("BUT1") ? "BUT1" : this.groups.toString().includes("BUT2") ? "BUT2" : this.groups.toString().includes("BUT3") ? "BUT3" : this.groups;

    this.#classType = summary.includes("CM") ? "CM" : summary.includes("TD") ? "TD" : summary.includes("TP") ? "TP" : summary;

    this.#ressource = summary.match(/^(R|(SA))[EÉ ]{0,2}[1-6](\.Crea)?(\.DWeb-DI)?\.[0-9]{2}/)?.[0]; // a faire
    this.#semestre = "S" + summary.match(/^(R|(SA))[EÉ ]{0,2}([1-6])/)?.[3]; // fait
    this.#semaine = Math.ceil(((this.#start - new Date(this.#start.getFullYear(), 0, 1)) + 1) / (24 * 60 * 60 * 1000 * 7));

  }

  get id() {
    return this.#id;
  }

  get summary() {
    return this.#summary;
  }

  get description() {
    return this.#description;
  }

  get start() {
    return this.#start;
  }

  get end() {
    return this.#end;
  }

  get location() {
    return this.#location;
  }

  get groups() {
    return this.#groups.map((gr) => gr); // retourne une copie du tableau
  }

  get duration() {
    return this.#duration;
  }

  get group() {
    return this.#group;
  }

  get classType() {
    return this.#classType;
  }

  get ressource() { // fait
    return this.#ressource;
  }

  get semestre() { // fait
    return this.#semestre;
  }
  // retourne un objet contenant les informations de l'événement
  toObject() {
    return {
      id: this.#id,
      title: this.#summary,
      body: this.#description,
      start: this.#start,
      end: this.#end,
      location: this.#location,
      groups: this.#groups,
      duration: this.#duration,
      group: this.#group,
      classType: this.#classType,
      ressource: this.#ressource, //fait
      semestre: this.#semestre, // fait
      semaine: this.#semaine,
    };
  }
}

export { Event };
