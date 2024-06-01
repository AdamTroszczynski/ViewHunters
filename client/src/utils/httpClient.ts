import {
  CapacitorHttp,
  type HttpOptions,
  type HttpHeaders,
  type HttpResponse,
} from '@capacitor/core';
import { BASE_SERVER_URL } from '@/const/commonConst';
import RequestError from '@/mod/errors/RequestError';

/**
 * Convert params object to url string
 * @param {Object} paramsObject params object to convert
 * @returns {string} params url string
 */
export const createParamsString = (paramsObject: Object): string => {
  let paramsString: string = '?';
  const keys = Object.keys(paramsObject);
  const values = Object.values(paramsObject);

  if (keys.length === 0) {
    return '';
  }

  for (let i = 0; i < keys.length; i++) {
    paramsString += `${keys[i]}=${values[i]}`;

    if (i !== keys.length - 1) {
      paramsString += '&';
    }
  }

  return paramsString;
};

/**
 * Create HTTP request
 * @param {string} method http request type/method
 * @param {string} controller controller name
 * @param {string} action action name
 * @param {Object} extraHeaders extra headers
 * @param {Object} paramsData extra params data
 * @param {Object} bodyData extra data to body
 * @returns {Promise<HttpResponse>} http response
 */
export const httpClient = async (
  method: string,
  controller: string,
  action: string,
  extraHeaders: HttpHeaders = {},
  paramsData: Object = {},
  bodyData: Object = {},
): Promise<HttpResponse> => {
  const options: HttpOptions = {
    method,
    url: `${BASE_SERVER_URL}/api/${controller}/${action}${createParamsString(paramsData)}`,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  };

  if (Object.keys(bodyData).length > 0) {
    options.data = bodyData;
  }

  const response: HttpResponse = await CapacitorHttp.request(options);

  if (response.status !== 200 && response.status !== 201) {
    throw new RequestError(response);
  }

  return response;
};
