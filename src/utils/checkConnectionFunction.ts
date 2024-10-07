import { getData } from "./api";

export const checkConnectionFunction = async () => {
    return await getData().then((data) => data.Check_conection)
};