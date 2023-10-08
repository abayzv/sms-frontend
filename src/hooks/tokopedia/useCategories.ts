import { useQuery } from "react-query";
import axios from "axios";

const fetchCategories = async (brandId: string) => {
    const { data } = await axios.get(`https://api-tokopedia.mahesadev.com/categories/${brandId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data;
};

export const useCategories = (brandId: string) => {
    return useQuery(["categories", brandId], () => fetchCategories(brandId));
};