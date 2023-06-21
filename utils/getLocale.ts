import axios from "axios/index";
// @ts-ignore
import {GOOGLE_API_KEY} from "@env";

export const getLocale = async (latitude: any, longitude: any) => {
    const options = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&result_type=country&key=' + GOOGLE_API_KEY,
    };

    const response = await axios.request(options).catch(function (error) {
        console.error(error);
    })

    if (response?.status !== 200) {
        throw new Error("Get location failed.")
    }

    return response.data;
}