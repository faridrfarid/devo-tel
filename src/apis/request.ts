import axios, {
    AxiosHeaders,
    AxiosProgressEvent,
    AxiosRequestConfig,
    Method,
} from 'axios';
import {
    ApiEndpoints,
    ApiKeys,
    IAxiosError,
    IRequestBodyTypes,
    IResponseTypes,
    IUrlParamTypes,
} from './request.types';
import { handleUnauthorized } from './request.configs';
import { DEFAULT_LANGUAGE } from '@configs/setup';

const api = axios.create({
    headers: {
        Accept: 'application/json',
        withCredentials: false,
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: IAxiosError) => {
        handleUnauthorized(error);
        return Promise.reject(error?.response);
    }
);

interface RequestConfigs<U extends ApiKeys> {
    method: Method;
    baseurl?: 'Default' | 'Metaverse';
    url: U;
    params?: AxiosRequestConfig['params'];
    urlParams?: IUrlParamTypes[U];
    data?: IRequestBodyTypes[U];
    version?: number;
    headers?: AxiosHeaders;
    Progress?: (progressEvent: AxiosProgressEvent) => void;
}

export const request = async <U extends ApiKeys>({
    method,
    url,
    params,
    urlParams,
    data,
    headers,
}: RequestConfigs<U>) => {
    const defaultBaseUrl = import.meta.env.VITE_BASE_URL;
    const condition = false;

    const token = condition ? 'token' : null;

    const locale = DEFAULT_LANGUAGE;

    const res = await api<IResponseTypes[U]>({
        baseURL: defaultBaseUrl,
        method,
        url: ApiEndpoints[url]<U>(urlParams),
        params,
        data,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            'x-locale': locale,
            ...headers,
        },
    });

    return res;
};
