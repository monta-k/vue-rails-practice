import http from './http'

export default {
  async getAllArtists() {
    try{
      const response = await http.tokenHttp(localStorage.getItem('token')).get('/api/v1/artists/')
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async addArtist(artistName) {
    try {
      const response = await http.tokenHttp(localStorage.getItem('token')).post('/api/v1/artists/', { artist: { name: artistName }})
      return response.data
    } catch (e) {
      console.log(e.message)
    } 
  },

  async deleteArtist(artistId) {
    try {
      const response = await http.tokenHttp(localStorage.getItem('token')).delete(`/api/v1/artists/${artistId}`)
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async updateArtist(artist) {
    try {
      await http.tokenHttp(localStorage.getItem('token')).patch(`/api/v1/artists/${artist.id}`, { artist: { name: artist.name } })
    } catch (e) {
      console.log(e.message)
    }
  }
}