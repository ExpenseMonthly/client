import Axios from 'axios'
import { API } from 'react-native-dotenv'
console.log(`server base url : ${API}`)

const baseURL = `${API}`

export const UserAxios = Axios.create({
    baseURL: `${baseURL}/users`,
});

export const TransactionAxios = Axios.create({
    baseURL: `${baseURL}/transactions`,
})
export const convertToRupiah = (nominal) => {
    let rupiah = '';
    let angkarev = nominal.toString().split('').reverse().join('');
    for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return rupiah.split('', rupiah.length - 1).reverse().join('');
}

export const convertDate = (dateFormat) => {
    const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
    const monthArray = ["Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const convertedDate = new Date(dateFormat)
    const day = weekday[convertedDate.getDay()];
    const date = convertedDate.getDate();
    const month = monthArray[convertedDate.getMonth()];
    const year = convertedDate.getFullYear();
    return `${day}, ${date} ${month} ${year}`
}

export const convertMonthYear = (dateFormat) => {
    const monthArray = ["Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const convertedDate = new Date(dateFormat)
    
    const month = monthArray[convertedDate.getMonth()];
    const year = convertedDate.getFullYear();
    return `${month} ${year}`
}