<template>
  <div class="image-container">
    <img :src="props.image" :alt="props.name" class="image"/>
  </div>
  <div class="info">
    <div class="character-name">
      <p class="bold">{{ props.name }}</p>
      <p class="sub">
        <span class="icon" :class="icon"></span>{{ props.status }} - {{ props.species }}
      </p>
    </div>
    <div class="location">
      <p class="title">{{ lastLocation }}</p>
      <p class="sub">{{ props.location }}</p>
    </div> 
    <div class="location">
      <p class="title">{{ firstLocation }}</p>
      <p class="sub">{{ props.firstSeen }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { lastLocation, firstLocation } from '@utils/messages/messages.js'

const props = defineProps({
  image: String,
  name: String,
  status: String,
  species: String,
  location: String,
  firstSeen: String,
  icon: String
})
</script>

<style lang="scss" scoped>
.image-container {
  height: auto;
  @include responsive($xs-tablet) { height: $card-height; }
}

.image {
  border-radius: 8px 8px 0 0;
  max-height: 300px;
  object-position: center center;
  object-fit: cover;
  width: 100%;

  @include responsive($xs-tablet) { 
    border-radius: 8px 0 0 8px;
    max-height: $card-height;
    width: 200px;
  }
}

.info {
  padding: 0 24px;

  @include responsive($xs-tablet) { 
    height: calc($card-height - 32px);
    padding: 16px 16px 16px 0;
  }

  & .icon {
    border-radius: 50%;
    height: 9px;
    margin-right: 6px;
    width: 9px;
  }

  & .-alive { background: $color-green; }
  & .-dead { background: $color-red; }
  & .-unknown { background: $color-lightestgrey; }

  > .character-name { margin: 0 0 8px 0; }

  & .bold {
    @include font-bold;
    color: $color-whiteegg;
    font-size: $font-size-xl;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 25ch;
  }

  > .location {
    margin: 24px 0;
    @include responsive($xs-tablet) { margin: 16px 0; }

    > .title {
      @include font-regular;
      color: $color-lightgrey;
      font-size: $font-size-xxs;
    }
  }

  & .sub {
      @include font-regular;
      align-items: center;
      color: $color-white;
      display: flex;
      font-size: $font-size-sm;
      text-transform: capitalize;
    }

}
</style>