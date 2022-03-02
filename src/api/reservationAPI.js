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
    get: (id) => {
        const url = `/reservations/${id}`
        return axiosClient.get(url)
    },
    patch: (id, data) => {
        const url= `/reservations/${id}`
        return axiosClient.patch(url, data)
    }
}

export default reservationAPI