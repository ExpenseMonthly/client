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

export const getDate = (dateFormat) => {
    const convertedDate = new Date(dateFormat)
    const date = convertedDate.getDate();
    return date
}

export const convertMonth = (dateFormat) => {
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const convertedDate = new Date(dateFormat)
    
    const month = monthArray[convertedDate.getMonth()];
    return `${month}`
}

export const convertYear = (dateFormat) => {
    const convertedDate = new Date(dateFormat)
    const year = convertedDate.getFullYear();
    return `${year}`
}

export const addZero = (num) => {
    if(Number(num) <= 9) {
        return '0'+num
    } else {
        return String(num)
    }
}

export const dateNow = () => {
    return new Date();
}