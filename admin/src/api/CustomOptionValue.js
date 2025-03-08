import axios from "axios";

const baseURL = "http://localhost:8080/api/customOptionValue";

//Custom OptionValue

export function getCustomOptionValue(custom_option_id) {
  return axios.post(baseURL + "/getCustomOptionValue", { custom_option_id });
}

export function deleteCustomOptionValueByCustomOptionID(custom_option_id) {
  return axios.post(baseURL + "/deleteCustomOptionValueByCustomOptionID", {
    custom_option_id,
  });
}

export function addCustomOptionValue(optionValue) {
  return axios.post(baseURL + "/addCustomOptionValue", {
    custom_option_id: optionValue.custom_option_id,
    value_us_en: optionValue.value_us_en,
    value_zh_hk: optionValue.value_zh_hk,
    value_zh_cn: optionValue.value_zh_cn,
    price_adjustment: optionValue.price_adjustment,
  });
}
