import { handleError } from "@/services"

const handleResponse = async <T = any>(request: () => Promise<T>): Promise<T | undefined> => {
  try {
    const data = await request()
    return data
  } catch (error) {
    handleError(error, (res) => {
      throw new HttpException(res.data.status, res.data.message)
    })
  }
}

export default handleResponse