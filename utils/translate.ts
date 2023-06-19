import axios from "axios/index";
// @ts-ignore
import {GOOGLE_API_KEY} from "@env";

export const translate = async (text: string, languageFrom: string, languageTo: string) => {
    const options = {
        method: 'POST',
        url: 'https://translation.googleapis.com/language/translate/v2?key=' + GOOGLE_API_KEY,
        params: {
            "q": text,
            "source": languageFrom,
            "target": languageTo,
            "format": "text"
        }
    };

    const response = await axios.request(options).catch(function (error) {
        console.error(error);
    })

    if (response?.status !== 200) {
        throw new Error("Translate failed.")
    }

    return response.data.data
}