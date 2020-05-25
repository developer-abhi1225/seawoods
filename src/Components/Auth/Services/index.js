import axios from "axios";
import {APIURL} from "../../../Constants/apiUrl";

export async function getUser (payload) {
    return axios.get(`${APIURL}users?search=${payload.email}`)
}
export async function createUser (payload) {
    return axios.post(`${APIURL}users`,{...payload})
}