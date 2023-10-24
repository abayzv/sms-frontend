import { useQuery } from "react-query";
import axios from "axios";

const fetchCruds = async () => {
    const { data } = await axios.get('http://localhost:8000/api/v1/crud', {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data;
};

export const useCruds = () => {
    return useQuery(["crudList", "menu"], () => fetchCruds());
};