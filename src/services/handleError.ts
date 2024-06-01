import axios, { AxiosResponse } from 'axios'

export default function handleError(
  error: any,
  onError?: (error: AxiosResponse<{ message: string; status: number }>) => void,
) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 600) {
        throw new Error('Something went wrong, please try again later')
      }

      onError?.(error.response)
    } else {
      throw new Error('Something went wrong, please try again later')
    }
  } else {
    throw new Error('Something went wrong, please try again later')
  }
}
