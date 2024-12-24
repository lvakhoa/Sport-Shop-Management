import axios from 'axios'

describe('Stocks', () => {
  it('should return a list of stocks', async () => {
    const response = await axios.get('https://api.clothy.lvakhoa.me/api/v1/stocks')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })

  it('should return a list of best-seller stocks', async () => {
    const response = await axios.get('https://api.clothy.lvakhoa.me/api/v1/stocks/best-seller')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })

  it('should return a stock by id', async () => {
    const response = await axios.get(
      'https://api.clothy.lvakhoa.me/api/v1/stocks/0582aedf-236c-4a18-9e40-1bd818625227',
    )

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      id: '0582aedf-236c-4a18-9e40-1bd818625227',
      product_id: 'a42e291c-f1fe-4ff7-8bdc-bf830395f093',
      color_id: 'def1aa28-c170-410a-a02d-fd2b80e52c1c',
      media_id: null,
      size: 'M',
      quantity_in_stock: 10,
      deleted_at: null,
      deleted_by: null,
      product: {
        name: 'Bucket Hat',
        list_price: '1000000',
        selling_price: '1000000',
      },
      media: null,
      color: {
        name: 'grey',
      },
    })
  })
})
