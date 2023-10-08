import { useQuery } from "react-query";
import axios from "axios";

const fetchProducts = async (brandId: string, categorySlug: string) => {
    const { data } = await axios.get(`https://api-tokopedia.mahesadev.com/products/${brandId}/${categorySlug}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data;
};

export const useProducts = (brandId: string, categorySlug: string) => {
    return useQuery(["products", brandId], () => fetchProducts(brandId, categorySlug));
};