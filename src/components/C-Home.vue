<template>
  <div class="container -search">
    <CharacterSearch @search="updateSearchParams"/>
  </div>

  <div class="container -character">
    <div class="character-list" v-if="listAllCharacters && listAllCharacters.length">
      <CharacterList :characters="listAllCharacters" :page="page" />
    </div>
    <div v-else class="empty -text">{{ messageNoCharacter }}</div>
  </div>

  <div class="container -pagination">
    <Pagination @pageChange="changePage" :totalPages="totalPages" :currentPage="page" class="pagination"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { searchForCharacter } from '@/utils/rickAndMortyAPI/apiService.js'
import { noCharacter as messageNoCharacter } from '@utils/messages/messages.js'
import CharacterSearch from '@components/Content/Home/CharacterSearch.vue'
import CharacterList from '@components/Content/Home/CharacterList.vue'
import Pagination from '@components/Content/Home/Pagination.vue'

let page = ref(1)
let totalPages = ref(0)
let searchParams = ref({ name: '', status: '' })

const listAllCharacters = ref()
let timeoutId = null
const timeSearch = 300

onMounted(async () => { await performSearch() })

const performSearch = async () => {
  clearTimeout(timeoutId)

  const response = await searchForCharacter(`page: ${page.value}, filter`, searchParams.value)
  listAllCharacters.value = response.characters.results 
  totalPages.value = response.characters.info.pages || 1
}

const debounce = (func) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(func, timeSearch)
}

const changePage = (nextPage) => {
  page.value = nextPage
  debounce(performSearch)
}

const updateSearchParams = (newSearchParams) => {
  page.value = 1
  searchParams.value = newSearchParams
  debounce(performSearch)
}
</script>

<style lang="scss" scoped>
.container {
  @include responsive($xs-tablet){
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.-character { background: $color-grey; }
.-search, .-pagination { background: $color-darkgrey; }

.character-list {
  display: grid;
  grid-template: "character" "character";
  grid-gap: 24px;
  padding: $p-24;

  @include responsive($xs-tablet) { justify-content: center; }

  @include responsive($xs-desktop) {
    grid-template: "character" / 6fr 6fr;
    padding: $p-24;
  }

  @include responsive($desktop) { grid-template: "character" / 4fr 4fr 4fr; }
}

.empty {
  @include font-bold;
  color: white;
  font-size: $font-size-xl;
  margin: 110px 24px;

  @include responsive($xs-tablet) {
    font-size: $font-size-xxl;
    margin: 110px;
  }
}
</style>