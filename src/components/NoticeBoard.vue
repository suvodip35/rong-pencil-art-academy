<template>
  <div class="flex flex-col w-full lg:w-1/2">            
    <div class="relative bg-white rounded-3xl shadow-xl border border-amber-200/60 overflow-hidden h-[472px] ring-1 ring-black/5 flex flex-col">
      <!-- Header for the board -->
      <div class="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-2 border-b border-amber-100 flex items-center justify-between z-10 shadow-sm">
        <div class="flex flex-col items-center">
          <span class="block text-xl font-bold">📢 Stay Updated</span>
          <span class="text-sm font-medium text-amber-700">Latest Announcements</span>
        </div>
        <span class="bg-white text-amber-600 text-xs font-bold px-2 py-1 rounded-md border border-amber-200">
          <span v-if="loading">...</span>
          <span v-else>{{ notices.length }} Updates</span>
        </span>
      </div>
      
      <!-- Fade masks -->
      <div class="absolute top-16 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      <div class="absolute bottom-[48px] left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
      
      <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent px-6 py-6 space-y-4">
        <div v-if="loading" class="flex items-center justify-center h-full">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        </div>
        
        <template v-else>
          <a v-for="notice in notices" :key="notice.id" :href="`/notice/view?slug=${notice.slug}`" class="group block p-3 bg-amber-50/40 hover:bg-amber-100/50 rounded-2xl border border-amber-100/60 hover:border-amber-300 transition-all duration-300 relative hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            <h3 class="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors leading-snug">{{ notice.title }}</h3>
            <div class="mt-3 text-sm text-amber-600 font-semibold flex items-center opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
              Read Notice 
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </a>
          
          <div v-if="notices.length === 0" class="text-center text-gray-500 py-8">
            No notices at this time.
          </div>
        </template>
      </div>

      <!-- Footer for the board -->
      <div class="bg-amber-50/50 h-[48px] px-6 border-t border-amber-100 flex justify-center items-center z-10 shrink-0">
        <a href="/notice" class="text-amber-700 hover:text-amber-800 font-semibold flex items-center transition-colors text-sm uppercase tracking-wide">
          View All Notices
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const notices = ref([])
const loading = ref(true)
const BASE_URL = 'https://client-directus.siliconpin.in'

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}/items/notice?filter[status][_eq]=published&sort=-date_created&limit=10`)
    const data = await response.json()
    notices.value = data.data || []
  } catch (error) {
    console.error('Error fetching notices:', error)
  } finally {
    loading.value = false
  }
})
</script>
