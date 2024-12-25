import axios from 'axios'

describe('Order', () => {
  let token: string
  beforeAll(async () => {
    const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
      email: 'adminseed@gmail.com',
      password: 'abcd1234',
    })
    token = response.data.access_token
  })

  it('should return a list of orders', async () => {
    const response = await axios.get('https://api.clothy.lvakhoa.me/api/v1/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })

  it('should create a new order', async () => {
    const response = await axios.post(
      'https://api.clothy.lvakhoa.me/api/v1/orders',
      {
        buy_in_app: false,
        customer_id: 'c0b92974-f6fd-4519-b0f3-c12e7f10f0ea',
        order_details: [{ product_stock_id: 'fe73455f-1215-474a-9138-9d758003d23f', quantity: 10 }],
        payment_type: 'CASH',
        product_total_price: 10000000,
        shipping_price: 30000,
        status: 'PENDING',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response.status).toBe(201)
  })
})
