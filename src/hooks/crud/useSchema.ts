import { useQuery } from "react-query";
import axios from "axios";

const fetchSchema = async (name: string) => {
    const { data } = await axios.get(`http://localhost:8000/api/v1/crud/schema/${name}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data;
};

export const useSchema = (name: string) => {
    return useQuery(["schema", name], () => fetchSchema(name));
};