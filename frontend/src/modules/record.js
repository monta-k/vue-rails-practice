import axios from 'axios'

export default {
  async getAllRecords() {
    try{
      const getAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      const response = await getAxios.get('http://localhost:3000/api/v1/records/')
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async addRecord(newRecord) {
    try{
      const postAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      const response = await postAxios.post('http://localhost:3000/api/v1/records/', { record: { title: newRecord.title, year: newRecord.year, artist_id: newRecord.artist } })
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async deleteRecord(recordId) {
    try{
      const deleteAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      await deleteAxios.delete(`http://localhost:3000/api/v1/records/${recordId}`)
    } catch (e) {
      console.log(e.message)
    }
  },

  async updateRecord(record) {
    try{
      const patchAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      await patchAxios.patch(`http://localhost:3000/api/v1/records/${record.id}`, { record: { title: record.title, year: record.year, artist_id: record.artist } })
    } catch (e) {
      console.log(e.message)
    }
  }
}