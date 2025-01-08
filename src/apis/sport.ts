import { ISportCreate, ISport, ISportUpdate } from '@/interfaces/sport'
import BaseApi from './base'

class SportApi extends BaseApi {
  constructor() {
    super('/sports')
  }

  async getAllSports(count?: number, page?: number) {
    return super.getAll<ISport>(count, page)
  }

  async getSportById(id: string) {
    return super.getById<ISport>(id)
  }

  async createSport(sport: ISportCreate) {
    const formData = new FormData()
    Object.entries(sport).forEach(([key, value]) => {
      if (key === 'file' && sport.file) {
        formData.append(key, sport.file, sport.file.name)
      } else {
        formData.append(key, value as string)
      }
    })

    return super.create(formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async updateSport(sport: ISportUpdate, id: string) {
    const formData = new FormData()
    Object.entries(sport).forEach(([key, value]) => {
      if (key === 'file' && sport.file) {
        formData.append(key, sport.file, sport.file.name)
      } else {
        formData.append(key, value as string)
      }
    })

    return super.update(formData, id, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async deleteSportById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllSports() {
    return super.deleteAll()
  }

  async restoreSport(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const sportApi = new SportApi()

export default sportApi
