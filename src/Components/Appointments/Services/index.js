import axios from "axios";
import {APIURL} from "../../../Constants/apiUrl";

export async function getUser (payload) {
    return axios.get(`${APIURL}users/${payload.user_id}`)
}
