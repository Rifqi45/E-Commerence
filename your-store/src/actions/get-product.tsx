import { Product } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
console.log(URL);
const getProduct = async (id: String): Promise<Product> => {
  const res = await axios.get(`${URL}/${id}`);

  return res.data;
};

export default getProduct;
