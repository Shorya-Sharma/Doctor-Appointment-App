import axios from "axios";
import { API_PATH, BASE_URL, getHeaders } from "./constant"


export const createAppointment = async (data) =>{
    const url = BASE_URL + API_PATH.APPOINTMENT;

    console.log("Data ",data,url);
    // if(process.env.USE_MOCK_DATA){
    //     // console.log("Data ",data);
    //     return {
    //     ...data,
    //     id:new Date().getTime().toString(),
    //     }
    // }

    const response = await axios(url,{
        data:data,
        method:'POST',
        headers:{
            'Authorization':await getHeaders()
        }
    });
    return response.data;
    
}

export const fetchAppointments = async ()=> {
    const url = BASE_URL + API_PATH.APPOINTMENT;
    const response = await axios(url,{
        method:'GET',
        headers:{
            'Authorization':await getHeaders()
        }
    });
    return response.data;
}