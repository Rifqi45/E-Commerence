import { Store } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/`;
console.log(URL);
const getStore = async (): Promise<Store> => {
  const res = await axios.get(`${URL}/`);

  return res.data;
};

export default getStore;
