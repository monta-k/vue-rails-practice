import axios from 'axios'

export default {
  async getAllArtists() {
    try{
      const getAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      const response = await getAxios.get('http://localhost:3000/api/v1/artists/')
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async addArtist(artistName) {
    try {
      const postAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      const response = await postAxios.post('http://localhost:3000/api/v1/artists/', { artist: { name: artistName }})
      return response.data
    } catch (e) {
      console.log(e.message)
    } 
  },

  async deleteArtist(artistId) {
    try {
      const deleteAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      const response = await deleteAxios.delete(`http://localhost:3000/api/v1/artists/${artistId}`)
      return response.data
    } catch (e) {
      console.log(e.message)
    }
  },

  async updateArtist(artist) {
    try {
      const patchAxios = axios.create({ headers: { Authorization: localStorage.getItem('token') } })
      await patchAxios.patch(`http://localhost:3000/api/v1/artists/${artist.id}`, { artist: { name: artist.name } })
    } catch (e) {
      console.log(e.message)
    }
  }
}