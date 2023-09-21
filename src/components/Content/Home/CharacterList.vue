<template>
  <div v-for="character in characters" :key="character.id" class="character">
    <CardCharacter 
      :image="character.image"
      :name="character.name"
      :status="character.status"
      :species="character.species"
      :location="character.location.name"
      :firstSeen="character.episode[0].name"
      :icon="getStatusCharacter(character.status)"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CardCharacter from '@components/Content/Home/CardCharacter.vue'

const props = defineProps({
  characters: Array,
  page: Number
})

const getStatusCharacter = (status) => {
  return `-${status.toLowerCase()}`
}
</script>

<style lang="scss" scoped>
.character {
  background: $color-darkblue;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  display: grid;
  grid-gap: 24px;
  grid-template: "image" "info";

  @include responsive($xs-tablet) { 
    grid-template: "image info" / 2fr 10fr;
    height: $card-height;
    width: $card-width;
  }
}
</style>