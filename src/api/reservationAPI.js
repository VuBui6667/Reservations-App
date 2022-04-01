import axiosClient from "./axiosClient";

const reservationAPI = {
    post: (data) => {
        const url='/reservations'
        return axiosClient.post(url, data)
    },
    getAll: () => {
        const url= '/reservations'
        return axiosClient.get(url)
    },
    get: (dates) => {
        const url = `/reservations?dates=${dates}`
        return axiosClient.get(url)
    },
    put: (id, data) => {
        const url= `/reservations/${id}`
        return axiosClient.put(url, data)
    }
}

export default reservationAPI