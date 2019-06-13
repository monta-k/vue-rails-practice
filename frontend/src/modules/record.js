import http from './http'

export default {
  async getAllRecords() {
    try{
      const response = await http.tokenHttp(localStorage.getItem('token')).get('/api/v1/records/')
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async addRecord(newRecord) {
    try{
      const response = await http.tokenHttp(localStorage.getItem('token')).post('/api/v1/records/', { record: { title: newRecord.title, year: newRecord.year, artist_id: newRecord.artist } })
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async deleteRecord(recordId) {
    try{
      await http.tokenHttp(localStorage.getItem('token')).delete(`/api/v1/records/${recordId}`)
    } catch (e) {
      console.log(e.message)
    }
  },

  async updateRecord(record) {
    try{
      await http.tokenHttp(localStorage.getItem('token')).patch(`/api/v1/records/${record.id}`, { record: { title: record.title, year: record.year, artist_id: record.artist } })
    } catch (e) {
      console.log(e.message)
    }
  }
}