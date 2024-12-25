import axios from 'axios'

describe('Voucher', () => {
  let token: string
  let voucherId: string

  beforeAll(async () => {
    const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
      email: 'adminseed@gmail.com',
      password: 'abcd1234',
    })
    token = response.data.access_token
  })

  it('should create a new coupon', async () => {
    const response = await axios.post(
      'https://api.clothy.lvakhoa.me/api/v1/vouchers',
      {
        code: 'SPR123456789',
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

  it('should return a duplicate error', async () => {
    try {
      await axios.post(
        'https://api.clothy.lvakhoa.me/api/v1/vouchers',
        {
          code: 'SPR123456789',
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
      if (axios.isAxiosError(error) && error.response) {
        expect(error.response.status).toBe(409)
      } else {
        throw error
      }
    }
  })

  it('should delete an existing voucher', async () => {
    const response = await axios.delete(
      `https://api.clothy.lvakhoa.me/api/v1/vouchers/ced35408-e6af-4609-8ba9-e3bcd51ea9dd`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response.status).toBe(200)
  })

  it('should return an error for a non-existent voucher', async () => {
    try {
      await axios.delete(`https://api.clothy.lvakhoa.me/api/v1/vouchers/non-existent-id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        expect(error.response.status).toBe(500)
      } else {
        throw error
      }
    }
  })
})
