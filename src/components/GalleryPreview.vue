<template>
  <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
    <div class="col-span-2 row-span-2 bg-gray-200 rounded-2xl h-80 sm:h-96"></div>
    <div v-for="i in 4" :key="i" class="bg-gray-200 rounded-2xl h-40 sm:h-48"></div>
  </div>

  <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div 
      v-for="(artwork, index) in randomArtworks" 
      :key="artwork.id || index"
      :class="[
        index === 0 ? 'col-span-2 row-span-2' : '',
        'relative rounded-2xl overflow-hidden group min-h-[160px] bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300'
      ]"
    >
      <img 
        :src="`https://client-directus.siliconpin.in/assets/${artwork.image}?width=600&quality=80`" 
        :alt="artwork.title ? artwork.title : artwork.program ? artwork.program : 'Artwork'" 
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-6">
        <span v-if="artwork.title" class="text-white font-semibold text-lg drop-shadow">{{ artwork.title }}</span>
        <span v-if="artwork.artist" class="text-white/80 text-sm">{{ artwork.artist }}</span>
        <span v-if="artwork.category" class="text-amber-300 text-xs mt-1 font-medium">{{ artwork.category }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const BASE_URL = 'https://client-directus.siliconpin.in';
const randomArtworks = ref([]);
const loading = ref(true);

const fetchAndRandomizeArtworks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/items/gallery?filter[status][_eq]=published`);
    const data = await response.json();
    const items = data.data || [];
    // Randomly shuffle items and pick 5
    randomArtworks.value = [...items].sort(() => Math.random() - 0.5).slice(0, 5);
  } catch (err) {
    console.error('Error fetching gallery preview:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAndRandomizeArtworks();
});
</script>
