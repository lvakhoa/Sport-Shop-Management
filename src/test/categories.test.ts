import axios from 'axios'

describe('Categories', () => {
  it('should return a list of categories', async () => {
    const response = await axios.get('https://api.clothy.lvakhoa.me/api/v1/categories')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)
    expect(response.data[0]).toBeInstanceOf(Object)
  })

  it('should return a category by id', async () => {
    const response = await axios.get(
      'https://api.clothy.lvakhoa.me/api/v1/categories/ac601c42-5bf7-4f85-bc37-43c925aea296',
    )

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      id: 'ac601c42-5bf7-4f85-bc37-43c925aea296',
      media_id: '3e6cc29b-c9fb-4685-8af9-f9a1a160e11e',
      name: 'T-Shirt',
      type: 'Top',
      gender: 'MALE',
      description: null,
      deleted_at: null,
      deleted_by: null,
      media: {
        url: 'https://res.cloudinary.com/dbpvh14wj/image/upload/f_auto,q_auto/v1/category/MALE_T-Shirt/qxbuh2pusqzg13uufvve',
      },
      product_list: [],
    })
  })
})
