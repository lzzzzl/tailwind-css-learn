<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>You are currently previewing this city, click the "+" icon to start tracking this city.</p>
        </div>
        <!-- Weather Overview-->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
            <p class="text-sm mb-12">
                {{
                    new Date(weatherData.currentTime).toLocaleDateString(
                        "en-us",
                        {
                            weekday: "short",
                            day: "2-digit",
                            month: "long",
                        }
                    )
                }}
                {{
                    new Date(weatherData.currentTime).toLocaleTimeString(
                        "en-us",
                        {
                            timeStyle: "short",
                        }
                    )
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(weatherData.temperature) }} &deg;
            </p>
            <div class="text-center">
                <p>
                    Feels like
                    {{ Math.round(weatherData.feels_like) }} &deg;
                </p>
                <p class="capitalize">
                    {{ weatherData.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(`http://localhost:3000/weather?lat=${route.query.lat}`);
        weatherData.data.currentTime = new Date().getTime();
        weatherData.data.temperature = 81;
        weatherData.data.feels_like = 85;
        weatherData.data.description = "Scattered Clouds";


        return weatherData.data
    } catch (err) {
        console.log(err);
    }
}
const weatherData = await getWeatherData();
</script>

<style lang="scss" scoped></style>