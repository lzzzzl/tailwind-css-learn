<template>
  <div>
    <Suspense>
        <AsyncCityView />
        <template #fallback>
            <CityViewSkelton />
        </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';
import CityViewSkelton from '../components/CityViewSkeleton.vue';
</script>
