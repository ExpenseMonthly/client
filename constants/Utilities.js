import Axios from 'axios'
const baseURL = "http://localhost:3000"

export const UserAxios = Axios.create({
    baseURL: `${baseURL}/users`,
});

export const TransactionAxios = Axios.create({
    baseURL: `${baseURL}/transactions`,
})