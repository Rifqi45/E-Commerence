import { Category } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
console.log(URL);
const getCategory = async (id: String): Promise<Category> => {
  const res = await axios.get(`${URL}/${id}`);

  return res.data;
};

export default getCategory;
