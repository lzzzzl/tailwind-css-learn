<template>
  <div>
    <Suspense>
        <AsyncCityView />
        <template #fallback>
            <p>Loading...</p>
        </template>
    </Suspense>
  </div>
</template>

<script setup>
</script>
