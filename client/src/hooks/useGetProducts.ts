import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useGetToken } from "./useGetToken";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {

    const [products, setProducts] = useState([]);
    const {headers} = useGetToken();
    const {isAuthenticated} = useContext<IShopContext>(ShopContext);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get("http://localhost:3001/product", {headers});
            setProducts(fetchedProducts.data.products); 
        } catch (error) {
          console.log("Error: Something went wrong")   
        }
    }

    useEffect(()=>{
        if(isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    return { products };
}