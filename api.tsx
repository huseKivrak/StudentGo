import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api" // || process.env.REACT_APP_BASE_URL;
// const TEST_TOKEN =  "jZzoAASOs1SBYrs0mTJOmHw5gCqruexrpgfXEJmoVCzsPCor95QwRUpLMI8xd3Ty"



async function saveToken(value) {
  await SecureStore.setItemAsync("token", value);
}

async function getToken() {
  let result = await SecureStore.getItemAsync("token");
  if (result) {
    return result;
  } else {
    throw new Error("No values stored under that key.");
  }
}

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class RithmApi {
  // the token for interactive with the API will be stored here.


  static async login(data){
    let res = await axios.post(`${BASE_URL}/-token`,{
      username:data.username,
      password:data.password
    })

    const token = res.data.token;

    await saveToken(token);

    return "Token saved.";
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${getToken()}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
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
    let res = await this.request("lecturesessions");
    const allLectureSessions = res.data.results;
    const pubLectureSessions = allLectureSessions.filter(
      (l) => l.status === "published"
    );
    const lectureSessions = [];

    for (const lect of pubLectureSessions) {
      let res = await this.request(`lecturesessions/${lect.id}`);
      lectureSessions.push(res.data);
    }

    return lectureSessions;
  }

  /**
   * Get all exercise details
   * Returns JSON:
   * [
      {
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
        "exerciselabsession_set": [
          {
            "start_at": "2023-05-23T22:51:23.780Z",
            "end_at": "2023-05-23T22:51:23.780Z",
            "dri": "string",
            "staff": [
              "string"
            ]
          }
        ]
      }
   * ]
   *
   */

  static async getDetailedExerciseSessions() {
    let res = await this.request("exercisesessions");
    const allExerciseSessions = res.data.results;
    const pubExerciseSessions = allExerciseSessions.filter(
      (ex) => ex.status === "published"
    );
    const exerciseSessions = [];

    for (const exercise of pubExerciseSessions) {
      let res = await this.request(`exercisesessions/${exercise.id}`);
      exerciseSessions.push(res.data);
    }

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
    let res = await this.request("events");
    const allEvents = res.data.results;
    const pubEvents = allEvents.filter((evt) => evt.status === "published");
    const events = [];

    for (const evt of pubEvents) {
      let res = await this.request(`events/${evt.id}`);
      events.push(res.data);
    }

    return events;
  }



  /** getDayCurric
   *
   * Returns the (few) curriculum objects of all of them...!?
   *
   */
  static async getDayCurric(date = new Date().toDateString()) {
    const lectureSessionPromise = this.getDetailedLectureSessions();
    const exerciseSessionPromise = this.getDetailedExerciseSessions();
    const eventPromise = this.getDetailedEvents();

    const results = await Promise.all([
      lectureSessionPromise,
      exerciseSessionPromise,
      eventPromise,
    ]);

    const dayCurric = results.filter((thing) => {
      const curricDate = new Date(thing["start_at"]).toDateString();

      return curricDate === date;
    });

    return dayCurric;
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
