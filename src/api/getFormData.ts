import { Questionnaire } from "@/lib/interfaces";
import axios from "axios";

export const getFormData = async (): Promise<Questionnaire> => {
  const url = "/data/questions.json";
  const { data } = await axios.get(url);
  return data;
};
