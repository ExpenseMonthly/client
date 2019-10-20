import Axios from 'axios'
import { API } from 'react-native-dotenv'

const baseURL = `${API}`

export const UserAxios = Axios.create({
    baseURL: `${baseURL}/users`,
});

export const TransactionAxios = Axios.create({
    baseURL: `${baseURL}/transactions`,
})