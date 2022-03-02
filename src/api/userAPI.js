import axiosClient from "./axiosClient"

const userAPI = {
    getAll: () => {
        const url = '/customers'
        return axiosClient.get(url)
    },

    get: (id) => {
        const url = `/customers/${id}`
        return axiosClient.get(url)
    }
}

export default userAPI

