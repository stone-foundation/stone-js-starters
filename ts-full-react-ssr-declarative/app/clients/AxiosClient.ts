import { isNotEmpty } from "@stone-js/core"
import { AxiosError, Axios, AxiosRequestConfig } from "axios"
import { NotAuthenticateError } from "../errors/NotAuthenticateError"

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
  async request<R = any, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
    try {
      return (await this.axios.request({ url, data, ...options })).data
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
  async get<R = any, D = any>(url: string, options?: AxiosRequestConfig<D>): Promise<R> {
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
  async post<R = any, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
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
  async put<R = any, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
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
  async patch<R = any, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
    return await this.request<R, D>(url, data, { ...options, method: 'PATCH' })
  }

  /**
   * Make a DELETE request
   * 
   * @param url - The URL to request
   * @param options - The request options
   * @returns The response data
   */
  async delete<R = any, D = any>(url: string, options?: AxiosRequestConfig<D>): Promise<R> {
    return await this.request<R, D>(url, undefined, { ...options, method: 'DELETE' })
  }
}