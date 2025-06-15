import { specialitiesData } from "../data/appContent";
import { API_PATH, BASE_URL } from "./constant";

export const fetchSpecialities = async ()=>{
    const url = BASE_URL + API_PATH.SPECIALITY;
    
        // const {data} = await axios.get(url);
        // return data;
    return specialitiesData;
}