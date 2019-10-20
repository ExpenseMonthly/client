import Axios from 'axios'
const baseURL = "http://192.168.1.3:3000"

export const UserAxios = Axios.create({
    baseURL: `${baseURL}/users`,
});

export const TransactionAxios = Axios.create({
    baseURL: `${baseURL}/transactions`,
})