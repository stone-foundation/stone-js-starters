import { isNotEmpty } from "@stone-js/core"
import { NotAuthenticateError } from "../errors/NotAuthenticateError"
import { AxiosError, Axios, AxiosRequestConfig, AxiosResponse } from "axios"

/**
 * Axios Client Options
 */
export interface AxiosClientOptions {
  axios: Axios
}

/**
 * Axios Client
 */
export class AxiosClient {
  private readonly axios: Axios

  /**
   * Create a new Axios Client
   * 
   * @param options - The options to create the Axios Client.
   */
  constructor({ axios }: AxiosClientOptions) {
    this.axios = axios
  }

  /**
   * Make a request
   * 
   * @param url - The URL to request
   * @param data - The data to send
   * @param options - The request options
   * @returns The response data
   * @throws NotAuthenticateError
   * @throws AxiosError
   */
  async request<T = any, R = AxiosResponse<T>, D = any>(url: string, payload?: D, options?: AxiosRequestConfig<D>): Promise<T> {
    try {
      const headers = options?.headers || {}
      headers['Accept'] ??= 'application/json'
      headers['Content-Type'] ??= 'application/json'
      const { data } = (await this.axios.request({ ...options, url, data: payload, headers }))
      return data
    } catch (error: any) {
      if (isNotEmpty<AxiosError<R, D>>(error) && error.status === 401) {
        throw new NotAuthenticateError(error.message, { cause: error })
      } else {
        throw error
      }
    }
  }

  /**
   * Make a GET request
   * 
   * @param url - The URL to request
   * @param options - The request options
   * @returns The response data
   */
  async get<T = any, R = AxiosResponse<T>, D = any>(url: string, options?: AxiosRequestConfig<D>): Promise<R> {
    return await this.request<R, D>(url, undefined, { ...options, method: 'GET' })
  }

  /**
   * Make a POST request
   * 
   * @param url - The URL to request
   * @param data - The data to send
   * @param options - The request options
   * @returns The response data
   */
  async post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
    return await this.request<R, D>(url, data, { ...options, method: 'POST' })
  }

  /**
   * Make a PUT request
   * 
   * @param url - The URL to request
   * @param data - The data to send
   * @param options - The request options
   * @returns The response data
   */
  async put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
    return await this.request<R, D>(url, data, { ...options, method: 'PUT' })
  }

  /**
   * Make a PATCH request
   * 
   * @param url - The URL to request
   * @param data - The data to send
   * @param options - The request options
   * @returns The response data
   */
  async patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
    return await this.request<R, D>(url, data, { ...options, method: 'PATCH' })
  }

  /**
   * Make a DELETE request
   * 
   * @param url - The URL to request
   * @param options - The request options
   * @returns The response data
   */
  async delete<T = any, R = AxiosResponse<T>, D = any>(url: string, options?: AxiosRequestConfig<D>): Promise<R> {
    return await this.request<R, D>(url, undefined, { ...options, method: 'DELETE' })
  }
}
