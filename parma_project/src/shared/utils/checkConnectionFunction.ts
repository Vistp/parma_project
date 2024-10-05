import {getData} from "./api.ts";
export const checkConnectionFunction = async () => {
    return await getData().then((data) => data.Check_conection)
};