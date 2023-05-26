import * as React from "react";
import { saveToken, getToken, deleteToken } from "./secureStore";
import axios from "axios";

// const BASE_URL = "http://10.0.2.2:8000/api"; // || process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://r99.ngrok.dev/api"; // || process.env.REACT_APP_BASE_URL;
const BASE_URL = `http://192.168.1.19:8000/api`; // || process.env.REACT_APP_BASE_URL;
// const TEST_TOKEN =  "jZzoAASOs1SBYrs0mTJOmHw5gCqruexrpgfXEJmoVCzsPCor95QwRUpLMI8xd3Ty"

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class RithmApi {
  static async getAndSaveToken(cred) {
    console.log("login (api file) called with data = ", cred);

    let res;
    try {
      res = await axios.post(`${BASE_URL}/-token/`, cred);
      console.log("login res = ", res);
    } catch (err) {
      console.log("login catch - error = ", err);
      console.log("login catch - res = ", res);
      return false;
    }

    const token = res.data.token;
    console.log("token received = ", token);

    await saveToken(token);

    return true;
  }

  static async request(endpoint) {
    console.debug("API Call:", endpoint);

    const token = await getToken();
    console.log("TOKEN IN REQUEST CALL = ", token);
    const url = `${BASE_URL}/${endpoint}`;
    console.log("request url = ", url);
    const tokenHeaders = { Authorization: `Token ${token}` };
    console.log("request headers = ", tokenHeaders);

    try {
      console.log("MAKING AXIOS REQUEST");
      const res = await axios.get(url, { headers: tokenHeaders });
      console.log("res from request inside try block = ", res);
      return res;
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  // Individual API routes

  /**
   * Get all lecture sessions details
   * Returns JSON:
   * [
   *  {
        "id": 0,
        "lecture": "string",
        "title": "string",
        "description": "string",
        "cohort": "string",
        "dri": "string",
        "staff": [
          "string"
        ],
        "week_group": "string",
        "start_at": "2023-05-23T22:47:11.696Z",
        "end_at": "2023-05-23T22:47:11.696Z",
        "asset_set": [
          "string"
        ],
        "status": "private",
        "api_url": "string"
      }
   * ]
   *
   */

  static async getDetailedLectureSessions() {
    let res = await this.request("lecturesessions/");
    const allLectureSessions = res.data.results;
    console.log("allLectureSessions", allLectureSessions);
    const pubLectureSessions = allLectureSessions.filter(
      (l) => l.status === "published"
    );
    const lectureSessions = [];

    for (const lect of pubLectureSessions) {
      const endpoint = lect.api_url.split("/api/")[1];
      let res = await this.request(endpoint);
      lectureSessions.push(res.data);
    }
    lectureSessions.forEach((ls) => ls.type === "lecture");
    return lectureSessions;
  }

  /**
   * Get all exercise details
   * Returns JSON:
   * [{
        "id": 0,
        "title": "string",
        "description": "string",
        "exercise": "string",
        "cohort": "string",
        "dri": "string",
        "week_group": "string",
        "status": "private",
        "api_url": "string",
        "asset_set": [
          "string"
        ],
        "start_at": "2023-05-23T22:51:23.780Z",
        "end_at": "2023-05-23T22:51:23.780Z",
        "dri": "string",
        "staff": [
          "string"
        ]
      }, ... ]
   *
   */

  static async getDetailedExerciseSessions() {
    let res = await this.request("exercisesessions/");
    const allExerciseSessions = res.data.results;
    const pubExerciseSessions = allExerciseSessions.filter(
      (ex) => ex.status === "published"
    );
    const exerciseSessions = [];

    for (const exercise of pubExerciseSessions) {
      const endpoint = exercise.api_url.split("/api/")[1];
      let res = await this.request(endpoint);
      let shared = { ...res.data };
      delete shared.exerciselabsession_set;
      let labSessions = res.data.exerciselabsession_set.map((session) => ({
        ...shared,
        ...session,
      }));
      exerciseSessions.push(...labSessions);
    }

    exerciseSessions.forEach((ex) => (ex.type = "exercise"));
    return exerciseSessions;
  }

  /**
   * Get all events details
   * Returns JSON:
   * [
      {
        "id": 0,
        "slug": "string",
        "title": "string",
        "description": "string",
        "cohort": "string",
        "dri": "string",
        "start_at": "2023-05-23T22:57:47.732Z",
        "end_at": "2023-05-23T22:57:47.732Z",
        "staff": [
          "string"
        ],
        "location": "string",
        "week_group": "string",
        "status": "private",
        "api_url": "string",
        "asset_set": [
          "string"
        ]
      }
   * ]
   *
   */

  static async getDetailedEvents() {
    let res = await this.request("events/");
    const allEvents = res.data.results;
    const pubEvents = allEvents.filter((evt) => evt.status === "published");
    const events = [];

    for (const evt of pubEvents) {
      const endpoint = evt.api_url.split("/api/")[1];
      let res = await this.request(endpoint);
      events.push(res.data);
    }
    events.forEach((ev) => ev.type === "event");
    return events;
  }

  /** getCurricByDay
   *
   * Returns all curric items (lectures, exercises, events) in JSON: [
   *
   * ]
   *
   *
   */
  static async getCurricByDay() {
    const lectureSessionPromise = this.getDetailedLectureSessions();
    const exerciseSessionPromise = this.getDetailedExerciseSessions();
    const eventPromise = this.getDetailedEvents();

    const results = await Promise.allSettled([
      lectureSessionPromise,
      exerciseSessionPromise,
      eventPromise,
    ]);

    // const dayCurric = results.filter((thing) => {
    //   const curricDate = new Date(thing["start_at"]).toDateString();

    //   return curricDate === date;
    // });

    // Get all data from each of the promises that are fulfilled
    let curricItems = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      }
    });
    // compile into one array
    curricItems = curricItems.flat(1);
    // sort this array by start at
    curricItems.sort((a, b) => Date.parse(a.start_at) - Date.parse(b.start_at));
    // initialize array to hold each of the arrays of curric items
    let curricDays = [];
    // while there are still items in our everything data array
    while (curricItems.length > 0) {
      // initialize empty array for that date
      let dateCurricItems = [];
      // initialize comparison variable (zeroth element)
      let date = curricItems[0].start_at.slice(0, 10);
      // while loop - iterate through sorted array of all curric events
      while (
        curricItems.length > 0 &&
        date === curricItems[0].start_at.slice(0, 10)
      ) {
        //    compare string date to comparison variable
        //    if its the same, push item into array
        //    if its different, end inner loop
        let item = curricItems.shift();
        dateCurricItems.push(item);
      }
      curricDays.push(dateCurricItems);
    }
    // once outer while loop ends, return array of date items
    return curricDays;
  }

  /** Get details on a company by handle. */

  // static async getCompany(handle) {
  //   let res = await this.request(`companies/${handle}`);
  //   return res.company;
  // }

  // /** Get list of jobs (filtered by title if not undefined) */

  // static async getJobs(title) {
  //   let res = await this.request("jobs", { title });
  //   return res.jobs;
  // }

  // /** Apply to a job */

  // static async applyToJob(username, id) {
  //   await this.request(`users/${username}/jobs/${id}`, {}, "post");
  // }

  // /** Get token for login from username, password. */

  // static async login(data) {
  //   let res = await this.request(`auth/token`, data, "post");
  //   return res.token;
  // }

  // /** Signup for site. */

  // static async signup(data) {
  //   let res = await this.request(`auth/register`, data, "post");
  //   return res.token;
  // }

  // /** Save user profile page. */

  // static async saveProfile(username, data) {
  //   let res = await this.request(`users/${username}`, data, "patch");
  //   return res.user;
  // }
}

export default RithmApi;
