import axios from 'axios'

describe('Products', () => {
  it('should return a list of products', async () => {
    const response = await axios.get('https://api.clothy.lvakhoa.me/api/v1/products')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })

  it('should return a product by id', async () => {
    const response = await axios.get(
      'https://api.clothy.lvakhoa.me/api/v1/products/0957258c-58ef-4397-a118-b8561f4a21ec',
    )

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      id: '0957258c-58ef-4397-a118-b8561f4a21ec',
      event_id: null,
      name: 'Cargo Jeans Men',
      description: null,
      status: true,
      list_price: '1000000',
      selling_price: '1000000',
      deleted_at: null,
      deleted_by: null,
      stocks: [],
      category_list: [],
    })
  })

  it('should return a list of products with search keyword', async () => {
    const response = await axios.get(
      'https://api.clothy.lvakhoa.me/api/v1/products/search?text=shirt',
    )

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })
})
