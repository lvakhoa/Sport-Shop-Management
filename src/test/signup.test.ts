import axios from 'axios'

describe('Signup', () => {
  it('Create valid', async () => {
    try {
      const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/sign-up', {
        email: 'quominle@gmail.com', // Change when demo
        password: 'abcd1234',
        fullname: 'quominle',
        phone: '1234567890',
        gender: 'MALE',
      })
      expect(response.status).toBe(201)
      expect(response.data).toHaveProperty('message')
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
  it('Existed email', async () => {
    try {
      await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/sign-up', {
        email: 'quominle@gmail.com',
        password: 'abcd1234',
        fullname: 'quominle',
        phone: '1234567890',
        gender: 'MALE',
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response status:', error.response.status)
        expect(error.response.status).toBe(400)
      } else {
        throw error
      }
    }
  })
  it('Missing email', async () => {
    try {
      await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/sign-up', {
        email: undefined,
        password: 'abcd1234',
        fullname: 'quominle',
        phone: '1234567890',
        gender: 'MALE',
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        expect(error.response.status).toBe(400)
      } else {
        throw error
      }
    }
  })
  it('Missing password', async () => {
    try {
      await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/sign-up', {
        email: 'quominle@gmail.com',
        password: undefined,
        fullname: 'quominle',
        phone: '1234567890',
        gender: 'MALE',
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        expect(error.response.status).toBe(400)
      } else {
        throw error
      }
    }
  })
})
