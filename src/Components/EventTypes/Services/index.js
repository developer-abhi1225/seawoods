import axios from "axios";
import {APIURL} from "../../../Constants/apiUrl";

export async function getEventTypes (payload) {
    return axios.get(`${APIURL}users/${payload.user_id}/event-types`)
}

export async function updateEventTypes (action) {
    return axios.put(`${APIURL}users/${action.user_id}/event-types/${action.id}`,{...action.payload})
}

export async function addEventTypes (action) {
    return axios.post(`${APIURL}users/${action.user_id}/event-types`,{...action.payload})
}