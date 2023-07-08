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
            <p>
                Feels like
                {{ Math.round(weatherData.feels_like) }} &deg;
            </p>
            <p class="capitalize">
                {{ weatherData.description }}
            </p>
            <i class="fa-solid fa-cloud text-6xl"></i>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- Hourly Weather-->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">Hourly Weather</h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(hourData.currentTime).toLocaleTimeString(
                                    "en-us",
                                    {
                                        hour: "numeric",
                                    }
                                )
                            }}
                        </p>
                        <i class="fa-solid fa-cloud-bolt text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- Weekly Weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">7 Day Forecast</h2>
                <div v-for="day in weatherData.hourly" :key="day.dt" class="flex items-center">
                    <p class="flex-1">
                        {{
                            new Date(day.dt * 24 * 60 * 60 * 1000).toLocaleDateString(
                                "en-us",
                                {
                                    weekday: "long"
                                }
                            )
                        }}
                    </p>
                    <i class="fa-solid fa-cloud-rain text-2xl"></i>
                    <div class="flex gap-2 flex-1 justify-end">
                        <p>H: {{ Math.round(day.temp.max) }}</p>
                        <p>L: {{ Math.round(day.temp.min) }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
            @click="removeCity">
            <i class="fa-solid fa-trash"></i>
            <p>Remove City</p>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(`http://localhost:3000/weather?lat=${route.query.lat}`);
        weatherData.data.currentTime = new Date().getTime();
        weatherData.data.temperature = 81;
        weatherData.data.feels_like = 85;
        weatherData.data.description = "Scattered Clouds";
        weatherData.data.hourly = [
            {
                "dt": "1",
                "currentTime": new Date().getTime() - 3600000 * 9,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "2",
                "currentTime": new Date().getTime() - 3600000 * 8,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "3",
                "currentTime": new Date().getTime() - 3600000 * 7,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "4",
                "currentTime": new Date().getTime() - 3600000 * 6,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "5",
                "currentTime": new Date().getTime() - 3600000 * 5,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "6",
                "currentTime": new Date().getTime() - 3600000 * 4,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "7",
                "currentTime": new Date().getTime() - 3600000 * 3,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "8",
                "currentTime": new Date().getTime() - 3600000 * 2,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "9",
                "currentTime": new Date().getTime() - 3600000 * 1,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            },
            {
                "dt": "10",
                "currentTime": new Date().getTime() - 3600000 * 0,
                "temp": {
                    "max": 45,
                    "min": 25
                }
            }
        ]
        console.log(weatherData.data.hourly)

        return weatherData.data
    } catch (err) {
        console.log(err);
    }
}
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'));
    const updatedCities = cities.filter(
        (city) => city.id !== route.query.id
    );
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    router.push({ name: "home" });
};
</script>

<style lang="scss" scoped></style>