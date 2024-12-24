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

  it('should return a new order', async () => {
    const response = await axios.post(
      'https://api.clothy.lvakhoa.me/api/v1/orders',
      {
        buy_in_app: false,
        customer_id: '6fbc0ad7-51c0-455c-aa1e-ace17649103c',
        order_details: [{ product_stock_id: 'bdc71368-78dd-401e-adf7-74ae1c0fc409', quantity: 2 }],
        payment_type: 'CASH',
        product_total_price: 2000000,
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
