import axiosClient from "./axiosClient";

const notifyEditAPI = {
    post: (data) => {
        const url='/NotifyEdit'
        return axiosClient.post(url, data)
    },
    getAll: () => {
        const url= '/notifyEdit'
        return axiosClient.get(url)
    },
    patch: (id, data) => {
        const url= `/notifyEdit/${id}`
        return axiosClient.patch(url, data)
    }
}

export default notifyEditAPI