<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Art & Craft Sale</h1>
      <p class="text-xl text-gray-600 mb-6">Purchase unique artworks and support our artists</p>

      <div class="inline-flex flex-col items-center bg-amber-50 rounded-2xl p-4 border border-amber-200 shadow-sm">
        <p class="text-sm font-semibold text-amber-800 mb-3">For Direct Communication & Inquiries:</p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="tel:+918926391059" class="flex items-center text-amber-700 hover:text-amber-900 font-bold bg-white px-4 py-2 rounded-lg border border-amber-300 shadow-sm transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            +91 8926391059
          </a>
          <a href="tel:+918609657661" class="flex items-center text-amber-700 hover:text-amber-900 font-bold bg-white px-4 py-2 rounded-lg border border-amber-300 shadow-sm transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            +91 8609657661
          </a>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>

    <div v-else-if="error" class="text-center text-red-600 py-10">
      Failed to load artworks. Please try again later.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="artwork in artworks" 
        :key="artwork.id"
        class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" 
        @click="openWhatsApp(artwork)"
      >
        <div class="relative">
          <img
            :src="`https://client-directus.siliconpin.in/assets/${artwork.img}`"
            :alt="artwork.name"
            class="w-full h-64 object-cover"
          />
          <div v-if="artwork.sold_status === 'sold_out'" class="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span class="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">Sold Out</span>
          </div>
          <div v-if="artwork.sold_status === 'available'" class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Available
          </div>
        </div>
        
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ artwork.name }}</h3>
          <p class="text-gray-600 mb-1">by <span class="font-semibold">{{ artwork.artist }}</span> • {{ artwork.type }}</p>
          <p class="text-sm text-gray-500 mb-3" v-if="artwork.medium || artwork.size">
            <span v-if="artwork.medium">Medium: {{ artwork.medium }}</span>
            <span v-if="artwork.medium && artwork.size"> | </span>
            <span v-if="artwork.size">Size: {{ artwork.size }}</span>
          </p>
          <p class="text-gray-600 mb-3" v-else></p>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-2xl font-bold text-amber-600">₹{{ artwork.price }}</span>
              <span class="text-gray-400 line-through ml-2">₹{{ (artwork.price * 1.10).toFixed(2) }}</span>
            </div>
            <a v-if="artwork.sold_status === 'available'" :href="getWhatsAppUrl(artwork)" @click.stop class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const whatsappNumber = "918926391059";
const artworks = ref([]);
const loading = ref(true);
const error = ref(false);

const fetchArtworks = async () => {
  try {
    const response = await fetch('https://client-directus.siliconpin.in/items/sale_art_craft?filter[status][_eq]=published&sort=-date_created');
    const data = await response.json();
    artworks.value = data.data || [];
  } catch (err) {
    console.error("Error fetching artworks:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const getWhatsAppUrl = (artwork) => {
  const nameSlug = artwork.name ? artwork.name.toLowerCase() : '';
  let messageDetails = `Object ID: ${nameSlug + "-" + (artwork.size || '') + "-" + artwork.id}\nName: ${artwork.name}\nArtist: ${artwork.artist}\nType: ${artwork.type}`;
  if (artwork.medium) messageDetails += `\nMedium: ${artwork.medium}`;
  if (artwork.size) messageDetails += `\nSize: ${artwork.size}`;
  messageDetails += `\nPrice: ₹${artwork.price}\nImage: https://client-directus.siliconpin.in/assets/${artwork.img}`;
  
  const message = encodeURIComponent(`Hi, I'm interested in purchasing this artwork:\n\n${messageDetails}\n\nPlease provide more details about availability and payment options.`);
  return `https://wa.me/${whatsappNumber}?text=${message}`;
};

const openWhatsApp = (artwork) => {
  if (artwork.sold_status === 'available') {
    window.open(getWhatsAppUrl(artwork), '_blank');
  }
};

onMounted(() => {
  fetchArtworks();
});
</script>
