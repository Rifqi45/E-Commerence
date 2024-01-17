import { Billboard } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;
console.log(URL);
const getBillboard = async (id: String): Promise<Billboard> => {
  const res = await axios.get(`${URL}/${id}`);

  return res.data;
};

export default getBillboard;
