import axios from 'axios'

describe('Login', () => {
  it('should return a token for valid credentials', async () => {
    try {
      const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
        email: 'adminseed@gmail.com',
        password: 'abcd1234',
      })
      expect(response.status).toBe(201)
      expect(response.data).toHaveProperty('access_token')
      expect(response.data).toHaveProperty('refresh_token')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data
        console.error('Error response data:', error.response.data)
        console.error('Error response status:', error.response.status)
        throw errorData
      } else {
        throw error
      }
    }
  })

  it('should return an error for invalid credentials', async () => {
    try {
      await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
        email: 'invalidEmail@gmail.com',
        password: 'invalidPassword',
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response data:', error.response.data)
        console.error('Error response status:', error.response.status)
        expect(error.response.status).toBe(400)
      } else {
        throw error
      }
    }
  })

  it('should not let unauthorized account to log in', async () => {
    try {
      await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
        email: 'quominle@gmail.com',
        password: 'abcd1234',
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response data:', error.response.data)
        console.error('Error response status:', error.response.status)
        expect(error.response.status).toBe(401)
        expect(error.response.data).toHaveProperty('message')
        expect(error.response.data.message).toBe('Account is not verified')
      } else {
        throw error
      }
    }
  })
})
