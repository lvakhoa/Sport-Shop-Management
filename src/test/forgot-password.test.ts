import axios from 'axios'

describe('Forgot password', () => {
  it('should send an email to existing user', async () => {
    const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/forgot-password', {
      email: 'customerseed@gmail.com',
    })

    expect(response.status).toBe(201)
    expect(response.data).toHaveProperty('message')
    expect(response.data.message).toBe('Email sent successfully')
  })

  it('should return an error for non-existing user', async () => {
    try {
      const response = await axios.post(
        'https://api.clothy.lvakhoa.me/api/v1/auth/forgot-password',
        {
          email: 'wrongemail@email.com',
        },
      )
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response data:', error.response.data)
        console.error('Error response status:', error.response.status)
        expect(error.response.status).toBe(404)
      } else {
        throw error
      }
    }
  })
})
