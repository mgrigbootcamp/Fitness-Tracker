console.log(" I am in the API.js file");
const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log('API json is: ', json);

    return json[json.length - 1];
  },
  async addExercise(data) {
    console.log("location.search is here!!", location.search);
    console.log('PUT & addExercise fn data is here: ', data);
    const id = location.search.split("=")[1];

    console.log("Logging out the 'id': ", id);

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    console.log("POST & Creating a workout: ", data);
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
  
    console.log('location.search.split("=")[1]: ', location.search.split("=")[1]);

    if (location.search.split("=")[1] === undefined) {
      history.pushState(null, '', `/?id=${json.result._id}`);
    }

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
