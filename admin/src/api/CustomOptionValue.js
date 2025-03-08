import axios from "axios";

const baseURL = "http://localhost:8080/api/customOptionValue";

//Custom OptionValue

export function getCustomOptionValue(custom_option_id) {
  return axios.post(baseURL + "/getCustomOptionValue", { custom_option_id });
}
