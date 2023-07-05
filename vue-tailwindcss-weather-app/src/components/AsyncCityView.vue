<template>
    <div>

    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(`http://localhost:3000/weather?lat=${route.query.lat}`)
        const now = new Date();
        const formattedDate = now.toLocaleDateString('zh-CN') + ' ' + now.toLocaleTimeString('zh-CN');

        weatherData.currentTime = formattedDate;

        return weatherData
    } catch (err) {
        console.log(err);
    }
}
const weatherData = await getWeatherData();
console.log(weatherData);
</script>

<style lang="scss" scoped></style>