import axios from 'axios'

describe('Employee', () => {
  let token: string
  beforeAll(async () => {
    const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
      email: 'adminseed@gmail.com',
      password: 'abcd1234',
    })
    token = response.data.access_token
  })

  it('should return a list of employees', async () => {
    const response = await axios.get('https://api.clothy.lvakhoa.me/api/v1/employees', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })
})
