import { IAxiosError } from './request.types'

export const handleUnauthorized = (error: IAxiosError) => {
    const { response } = error
    const status = response?.status

    if (status === 401) {
        // push to base url login
    }
}
