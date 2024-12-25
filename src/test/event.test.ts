import axios from 'axios'

describe('Event', () => {
  let token: string

  beforeAll(async () => {
    const response = await axios.post('https://api.clothy.lvakhoa.me/api/v1/auth/log-in', {
      email: 'adminseed@gmail.com',
      password: 'abcd1234',
    })
    token = response.data.access_token
  })
  it('should return a list of events', async () => {
    const response = await axios.get('https://api.clothy.lvakhoa.me/api/v1/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })

  it('should return an event by id', async () => {
    const response = await axios.get(
      'https://api.clothy.lvakhoa.me/api/v1/events/09a16749-83cf-4fc6-932b-af661e9c9a9a',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      id: '09a16749-83cf-4fc6-932b-af661e9c9a9a',
      media_id: null,
      title: 'SPRING SALE',
      content: 'Sale',
      start_date: '2024-12-25T17:00:00.000Z',
      end_date: '2024-12-27T17:00:00.000Z',
      sale_percent: 0.1,
      deleted_at: null,
      deleted_by: null,
      product: [],
      media: null,
    })
  })

  it('should return a new event', async () => {
    const response = await axios.post(
      'https://api.clothy.lvakhoa.me/api/v1/events',
      {
        title: 'SPRING SALE',
        content: 'Sale',
        start_date: '2024-12-25T17:00:00.000Z',
        end_date: '2024-12-26T17:00:00.000Z',
        sale_percent: 0.1,
        product_list: { product_id: 'a5a847f5-3e50-4968-88dd-4051edffc002' },
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
