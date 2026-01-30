import axios from "axios";

export function config(): void {
    axios.interceptors.request.use(request => {
        // console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
    })
}