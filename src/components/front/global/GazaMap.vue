

<template>
  <svg
    viewBox="0 0 300 300"
    role="img"
    aria-labelledby="mapTitle mapDesc"
    class="text-[6px] max-h-screen"
  >
    <g
      transform="translate(0,300) scale(0.1,-0.1)"
     
      stroke="none"
    >
      <path
        class="fill-black dark:fill-white"
        d="M2020 2673 c-58 -81 -129 -175 -159 -208 -29 -33 -104 -125 -166 -205 -62 -80 -134 -165 -160 -190 -26 -25 -65 -70 -88 -100 -69 -93 -262 -313 -344 -391 -43 -41 -211 -207 -373 -369 l-295 -295 52 -75 c29 -41 66 -92 82 -113 19 -23 35 -62 45 -105 15 -67 125 -434 131 -441 7 -7 117 93 130 119 9 18 58 51 154 104 l140 77 41 82 c40 79 42 81 102 106 79 33 99 65 99 154 0 35 -11 108 -25 165 -14 55 -26 124 -26 153 0 48 6 60 74 163 66 98 104 139 326 351 139 132 257 243 264 247 7 4 41 41 75 82 60 71 83 89 265 209 27 18 81 65 120 106 65 67 71 78 76 123 l6 50 -56 47 c-50 43 -249 204 -338 274 -20 15 -38 27 -41 27 -3 0 -53 -67 -111 -147z m184 74 c34 -29 81 -68 106 -87 25 -19 89 -70 143 -114 95 -78 97 -81 97 -122 0 -37 -5 -46 -39 -74 -22 -17 -49 -45 -60 -63 -11 -18 -39 -44 -63 -57 -24 -13 -61 -38 -83 -55 -22 -17 -60 -44 -84 -59 -24 -16 -108 -92 -185 -170 -78 -77 -229 -224 -336 -326 -168 -159 -207 -201 -277 -305 -98 -142 -98 -145 -53 -335 33 -137 35 -166 19 -223 -9 -35 -17 -42 -82 -72 l-72 -32 -39 -81 c-29 -59 -47 -84 -70 -96 -17 -9 -58 -32 -91 -51 -33 -19 -84 -47 -112 -62 -29 -15 -53 -33 -53 -39 0 -15 -114 -128 -117 -117 -2 5 -25 82 -53 173 -28 91 -60 203 -72 249 -13 51 -30 93 -45 110 -13 14 -47 59 -76 100 l-52 74 130 131 c71 72 141 140 156 151 14 11 64 63 111 115 47 52 134 138 192 190 105 95 294 302 396 435 29 39 86 104 125 145 40 41 110 125 156 185 46 61 113 144 149 185 36 41 109 137 164 213 54 75 101 137 103 137 3 0 33 -24 67 -53z"
      ></path>
    </g>

    <g
      v-for="city in citiesShowInMap"
      :key="city.name"
      class="poi cursor-default"
      tabindex="0"
      :data-key="city.name"
      :transform="`translate(${city.x},${city.y})`"
    >
      <circle
        r="2.5"
        class="fill-red-600 cursor-default pointer-events-none"
      ></circle>
      <text
        x="14"
        y="-6"
        class="font-bold text-[6px] fill-white dark:fill-black cursor-pointer stroke-black dark:stroke-white stroke-[0.5px]" style="paint-order: stroke;"
      >
        {{ city.name }}
      </text>
    </g>
  </svg>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  cities: Array,
});

const citiesExistsInMap = [
  { name: "بيت لاهيا", x: 215, y: 40 },
  { name: "بيت حانون", x: 235, y: 55 },
  { name: "جباليا", x: 190, y: 70 },
  { name: "غزة", x: 167, y: 94 },
  { name: "النصيرات", x: 135, y: 130 },
  { name: "دير البلح", x: 114, y: 161 },
  { name: "المغازي", x: 138, y: 158 },
  { name: "البريج", x: 148, y: 143 },
  { name: "خان يونس", x: 102, y: 191 },
  { name: "رفح", x: 69, y: 224 },
];
const citiesShowInMap = computed(() => {
  if (!props.cities) return [];
  return props.cities
    .map((city) => {
      const found = citiesExistsInMap.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      );
      return found ? found : null;
    })
    .filter((c) => c !== null);
});

const isDark = computed(() =>
  document.documentElement.classList.contains("dark")
);
</script>

<style scoped>
.poi circle {
  cursor: pointer;
}
.poi text {
  pointer-events: none;
}
</style>
