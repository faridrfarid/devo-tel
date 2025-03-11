import { AxiosError } from 'axios';
import {
    IInsuranceFormResponseType,
    IInsuranceFormSubmissionResponseType,
    IInsuranceFormSubmitRequestType,
    IInsuranceFormSubmitResponseType,
} from './entities/insurance.entities';

type IErrorResponse = {
    statusCode?: number;
    message?: string;
    error?: string;
    blockDescription?: string;
    blockAt?: string;
    blockCategory?: string;
};
export type IAxiosError = AxiosError<IErrorResponse>;

export type ApiKeys = keyof IResponseTypes &
    keyof IRequestBodyTypes &
    keyof IUrlParamTypes;

type IEndpointType = Record<
    ApiKeys,
    <T extends ApiKeys>(params?: IUrlParamTypes[T]) => string
>;

export interface IResponseTypes {
    insuranceForms: IInsuranceFormResponseType;
    insuranceFormsSubmit: IInsuranceFormSubmitResponseType;
    insuranceFormsSubmissions: IInsuranceFormSubmissionResponseType;
}

export interface IUrlParamTypes {
    insuranceForms: null;
    insuranceFormsSubmit: null;
    insuranceFormsSubmissions: null;
}

export interface IRequestBodyTypes {
    insuranceForms: null;
    insuranceFormsSubmit: IInsuranceFormSubmitRequestType;
    insuranceFormsSubmissions: null;
}

export const ApiEndpoints: IEndpointType = {
    insuranceForms: () => `/api/insurance/forms`,
    insuranceFormsSubmit: () => `/api/insurance/forms/submit`,
    insuranceFormsSubmissions: () => `/api/insurance/forms/submission`,
};
