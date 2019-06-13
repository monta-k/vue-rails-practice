<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new record</h3>
    <form action="" @submit.prevent="addRecord()">
      <div class="mb-6">
        <label for="record_title" class="label">Title</label>
        <input
          id="record_title"
          class="input"
          autofocus autocomplete="off"
          placeholder="Type a record name"
          v-model="newRecord.title" />
      </div>

      <div class="mb-6">
        <label for="record_year" class="label">Year</label>
        <input
          id="record_year"
          class="input"
          autofocus autocomplete="off"
          placeholder="Year"
          v-model="newRecord.year"
        />
       </div>

      <div class="mb-6">
        <label for="artist" class="label">Artist</label>
        <select id="artist" class="select" v-model="newRecord.artist">
          <option disabled value="">Select an artist</option>
          <option :value="artist.id" v-for="artist in artists" :key="artist.id">{{ artist.name }}</option>
        </select>
        <p class="pt-4">Don't see an artist? <router-link class="text-grey-darker underline" to="/artists">Create one</router-link></p>
       </div>

      <input type="submit" value="Add Record" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 items-center justify-center" />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="record in records" :key="record.id" :record="record">

        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex justify-between flex-wrap pr-4">
            <p class="block font-mono font-semibold flex items-center">
              <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 24 24" width="24" height="24"><title>record vinyl</title><path d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" ></path></svg>
              {{ record.title }} &mdash; {{ record.year }}
            </p>
            <p class="block font-mono font-semibold">{{ getArtist(record) }}</p>
          </div>
          <button class="bg-transparent text-sm hover:bg-blue text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
          @click.prevent="editRecord(record)">Edit</button>

          <button class="bg-transparent text-sm hover:bg-red text-red no-underline font-bold py-2 px-4 rounded border border-red"
         @click.prevent="removeRecord(record)">Delete</button>
        </div>

        <div v-if="record == editedRecord">
          <form action="" @submit.prevent="updateRecord(record)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">

              <div class="mb-6">
                <label class="label">Title</label>
                <input class="input" v-model="record.title" />
              </div>

              <div class="mb-6">
                <label class="label">Year</label>
                <input class="input" v-model="record.year" />
              </div>

              <div class="mb-6">
                <label class="label">Artist</label>
                <select id="artist" class="select" v-model="record.artist">
                  <option :value="artist.id" v-for="artist in artists" :key="artist.id">{{ artist.name }}</option>
                </select>
              </div>

              <input type="submit" value="Update" class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Record from '../modules/record'
import Artist from '../modules/artist'

export default {
  name: 'Records',
  data () {
    return {
      artists: [],
      records: [],
      newRecord: [],
      error: '',
      editedRecord: ''
    }
  },
  async mounted() {
    this.records = await Record.getAllRecords()
    this.artists = await Artist.getAllArtists()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getArtist (record) {
      const recordArtistValues = this.artists.filter(artist => artist.id === record.artist_id)
      let artist

      recordArtistValues.forEach(function (element) {
        artist = element.name
      })

      return artist
    },
    async addRecord () {
      if (!this.newRecord) {
        return
      }
      const data = await Record.addRecord(this.newRecord)
      this.records.push(data)
      this.newRecord = ''
    },
    async removeRecord (record) {
      await Record.deleteRecord(record.id)
      this.records.splice(this.records.indexOf(record), 1)
    },
    editRecord (record) {
      this.editedRecord = record
    },
    updateRecord (record) {
      this.editedRecord = ''
      Record.updateRecord(record)
    }
  }
}
</script>