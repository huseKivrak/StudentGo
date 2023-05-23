import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/api"
//'X-CSRFToken: jZzoAASOs1SBYrs0mTJOmHw5gCqruexrpgfXEJmoVCzsPCor95QwRUpLMI8xd3Ty'


async function saveToken(value) {
  await SecureStore.setItemAsync("token", value);
}

async function getToken() {
  let result = await SecureStore.getItemAsync("token");
  if (result) {
    return result;
  } else {
    throw new Error('No values stored under that key.');
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
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${RithmApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */

  static async getCurrentLectureSessions(date=Date.today()) {
    /**
     * {
      "id": 1,
      "title": "Test-Lecture-1 Title",
      "status": "published",
      "api_url": "http://localhost:8000/api/lecturesessions/1/"
    }
     */
    let res = await this.request("lecturesessions");
    const allLectureSessions =  res.data
    const pubLectures =  allLectureSessions.filter(l => l.status === "published")
    const upcomingLectures = [];

    for (const lect of pubLectures){
      let res =  await this.request(`lecturesessions/${lect.id}`)
      const upcomingSess = res.data;
      if (upcomingSess.start_at > Date.now()) upcomingLectures.push(upcomingSess)
    }

    // return date ? upcomingLectures.filter() : upcomingLectures
    return upcomingLectures;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs (filtered by title if not undefined) */

  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Apply to a job */

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default RithmApi;




