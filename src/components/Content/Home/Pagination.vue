<template>
  <div class="pagination">
    <ButtonNavigation label="Previous" :isDisabled="isPrevDisabled" :disabled="isPrevDisabled" @change="prevPage" />
    <PageDisplay :page="state.page" :totalPages="infoPage.totalPages" />
    <ButtonNavigation label="Next" :isDisabled="isNextDisabled" :disabled="isNextDisabled" @change="nextPage" />
  </div>
</template>

<script setup>
import { reactive, watchEffect, computed, defineProps, defineEmits } from 'vue'
import PageDisplay from '@components/Content/Home/PageDisplay.vue'
import ButtonNavigation from '@components/Content/Home/ButtonNavigation.vue'

const infoPage = defineProps({ totalPages: Number, currentPage: Number })
const emit = defineEmits(['pageChange'])

let state = reactive({ page: infoPage.currentPage })

watchEffect(() => { state.page = infoPage.currentPage })
watchEffect(() => { emit('pageChange', state.page) })

const nextPage = () => { if (state.page < infoPage.totalPages) { state.page++ } }
const prevPage = () => { if (state.page > 1) state.page-- }

const isNextDisabled = computed(() => state.page >= infoPage.totalPages)
const isPrevDisabled = computed(() => state.page <= 1)
</script>

<style lang="scss" scoped>
.pagination {
  align-items: center;
  background-color: $color-darkgrey;
  color: $color-lightestgrey;
  display: grid;
  grid-row-gap: 24px;
  grid-template: "previous" "display" "next";
  padding: $p-24;
  text-align: center;

  @include responsive($xs-tablet) {
    grid-template: "previous display next" / 2fr 4fr 2fr;
    padding: $p-24 0;
    width: $card-width;
  }

  @include responsive($xs-desktop) { width: calc(($card-width * 2) + 24px); }
  @include responsive($desktop) { width: $card-width; }
}
</style>