import axios from "axios";
import { API_PATH, BASE_URL, getHeaders } from "./constant"
import { doctorsData } from "../data/appContent";


export const fetchDoctors = async ()=>{
    const url = BASE_URL + API_PATH.DOCTORS;
    console.log("request ",url);

    // if(process.env.USE_MOCK_DATA){
    //     // console.log("Data ",data);
    //     return doctorsData
    // }

    const {data} = await axios.get(url,{
        headers:{
            'Authorization':await getHeaders()
        }
    });
    
    return data;
}

export const fetchDoctorById = async (id)=>{
    const url = BASE_URL + API_PATH.DOCTORS+`/${id}`;

    // if(process.env.USE_MOCK_DATA){
    //     // console.log("Data ",data);
    //     return doctorsData.find((doctor)=> doctor.id === id);
    // }

    const {data} = await axios.get(url,{
        headers:{
            'Authorization':await getHeaders()
        }
    });
    return data;
}