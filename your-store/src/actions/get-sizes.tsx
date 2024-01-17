import { Size } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;
console.log(URL);
const getSizes = async (): Promise<Size[]> => {
  const res = await axios.get(URL);

  return res.data;
};

export default getSizes;
