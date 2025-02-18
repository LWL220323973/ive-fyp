import axios from "axios";

const baseURL = "http://localhost:8080/api";

// Get orders by table name
export function getOrdersByTable(tableName) {
    return axios.get(`${baseURL}/orders/table`, {
        params: {
            tablename: tableName
        }
    });
}