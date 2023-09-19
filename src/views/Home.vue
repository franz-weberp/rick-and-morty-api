<template>
  <div>
    <p>
      <input type="text" name="name-character" v-model="characterName">
      <select name="status" v-model="characterStatus">
        <option value="" disabled selected> Status</option>
        <option value="Alive" selected>Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknow">Unknow</option>
      </select>
    </p>
    <br><br>
    <div v-for="(character, index) in listAllCharacters" :key="listAllCharacters.name">
      <img :src="character.image" :alt="character.name" />
      <h2>{{ ((page - 1) * 20) + index }} - {{ character.name }}</h2>
      <p>{{ character.status }} - {{ character.species }}</p>
      <br>
      <p>Last know location:</p>
      <p>{{ character.location.name }}</p> 
      <br>
      <p>First Seen in:</p>
      <p>{{ character.episode[0].name }}</p>
      <br><br>
    </div>
    
    <p>
      <button @click="prevPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </p>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { searchForCharacter } from '@/utils/rickAndMortyAPI/apiService.js'

let page = ref(1)
let totalPages = ref(0)

const listAllCharacters = ref()
const characterName = ref('')
const characterStatus = ref('')
let timeoutId = null

const performSearch = async () => {
  const response = await searchForCharacter(`page: ${page.value}, filter`, { 
    name: characterName.value, status: characterStatus.value 
  })
  listAllCharacters.value = response.characters.results
  totalPages.value = response.characters.info.pages
}

const debounce = () => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(performSearch, 2000)
}

watch([characterName, characterStatus], () => {
  page.value = 1 
  debounce()
})

watch([page], () => { debounce() })

onMounted(async () => { await performSearch() })

const nextPage = () => { if (page.value < totalPages.value) page.value++ }
const prevPage = () => { if (page.value > 1) page.value-- }

</script>

<style lang="scss" scoped>

</style>