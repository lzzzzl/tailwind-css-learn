<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="search for a city or state" class="py-2 px-1 w-full bg-transparent border-b
      focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="searchResults">
        <p v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p v-if="!searchError && searchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li v-for="searchResult in searchResults" :key="searchResult.id" class="py-2 cursor-pointer"
            @click="previewCity(searchResult)">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { CityCardSkeleton } from "../components/CityCardSkeleton.vue";
import { CityList } from "../components/CityList.vue";

const router = useRouter();
const previewCity = (searchResult) => {
  console.log(searchResult)
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: 'cityView',
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.lat,
      lng: searchResult.geometry.lng,
      preview: true
    }
  })
}

const searchQuery = ref("");
const searchResults = ref(null);
const searchError = ref(null);
const queryTimeout = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value != "") {
      try {
        const result = await axios.get(`http://localhost:3000/weather?q=${searchQuery.value}`)
        if (Array.isArray(result.data) && result.data.length > 0) {
          searchResults.value = result.data;
        }
      } catch {
        searchError.value = true;
      }
      return
    }
    searchResults.value = null;
  }, 300)
};

</script>
