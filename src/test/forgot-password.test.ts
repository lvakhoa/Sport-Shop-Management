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
    const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/forgot-password', {
      email: 'wrongemail@email.com',
    })
    expect(response.status).toBe(404)
    expect(response.data).toHaveProperty('message')
    expect(response.data.message).toBe('There is no account found with this email')
  })
})
