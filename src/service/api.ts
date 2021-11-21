import { CartItemType } from "../types/CartItemType";

const getProducts = async (): Promise<CartItemType[]> => {
    let data = await (await fetch("https://fakestoreapi.com/products")).json();
    return data;
}

export default getProducts;