<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="search for a city or state" class="py-2 px-1 w-full bg-transparent border-b
      focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="searchResults">
        <li v-for="searchResult in searchResults" :key="searchResult.id" class="py-2 cursor-pointer">
          {{ searchResult.place_name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const searchQuery = ref("");
const searchResults = ref(null);
const queryTimeout = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value != "") {
      const result = await axios.get(`http://localhost:3000/weather?q=${searchQuery.value}`)
      let firstDataFeatures = null;
      if (Array.isArray(result.data) && result.data.length > 0) {
        searchResults.value = result.data;
        console.log(result.data)
        return
      }
    }
    searchResults.value = null;
  }, 300)
};

</script>
