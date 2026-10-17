import api from "../../utils/axios.js"

export const verifyPayment = async (payload)=>{
    try {
        const {data} = await api.post(`/api/billing/verify`, payload)
        console.log(data)
    } catch (error) {
        console.log(`Creating order error : ${error}`)
        return []
    }
}