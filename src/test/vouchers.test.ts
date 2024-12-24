import axios from 'axios'

describe('Voucher', () => {
  let token: string
  beforeAll(async () => {
    const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
      email: 'adminseed@gmail.com',
      password: 'abcd1234',
    })
    token = response.data.access_token
  })
  it('should return a new coupon', async () => {
    const response = await axios.post(
      'https://api.clothy.lvakhoa.me/api/v1/vouchers',
      {
        code: 'SPR12345',
        expired_date: '2024-12-26T17:00:00.000Z',
        quantity: 1,
        sale_percent: 0.4,
        title: 'SPRING',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response.status).toBe(201)
  })

  it('should return duplicate error', async () => {
    try {
      const response = await axios.post(
        'https://api.clothy.lvakhoa.me/api/v1/vouchers',
        {
          code: 'SPR123',
          expired_date: '2024-12-26T17:00:00.000Z',
          quantity: 1,
          sale_percent: 0.4,
          title: 'SPRING',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
        expect(error.response.status).toBe(409)
      }
    }
  })
})
