import axios from "axios";
import {APIURL} from "../../../Constants/apiUrl";

export async function createScheduleEvent (payload) {
    const {user_id,...rest} = payload
    return axios.post(`${APIURL}users/${payload.user_id}/scheduled-events`,{...rest})
}

export async function getScheduleEvent (payload) {
    let queryString = "";
    if(payload.filters){
        const item =  payload.filters;
        if(item.page){
            queryString += `page=${item.page}&limit=${item.limit}&`
        }
        if(item.sort){
            queryString += `sortBy=${item.key}&order=${item.sort}`
        }
    }
    return axios.get(`${APIURL}users/${payload.user_id}/scheduled-events?${queryString}`,)
}
