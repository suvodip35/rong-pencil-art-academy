<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
      <p class="text-gray-500">Loading notices...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
      <p class="text-red-600 text-lg">Failed to load notices. Please try again later.</p>
    </div>

    <!-- Loaded State -->
    <template v-else>
      <template v-if="notices.length > 0">
        <article v-for="notice in notices" :key="notice.id" class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 border border-gray-100">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 class="text-2xl font-bold text-gray-900">
              <a :href="`/notice/view?slug=${notice.slug}`" class="hover:text-amber-600 transition-colors">
                {{ notice.title }}
              </a>
            </h2>
            <time class="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit whitespace-nowrap">
              {{ formatDate(notice.date_created) }}
            </time>
          </div>
          <a 
            :href="`/notice/view?slug=${notice.slug}`"
            class="inline-flex items-center font-semibold text-white bg-amber-600 hover:bg-amber-700 px-5 py-2.5 rounded-xl transition-all"
          >
            Read Full Notice
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </article>
      </template>

      <!-- Empty State -->
      <div v-else class="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-gray-500 text-lg">No notices available at the moment.</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const notices = ref([])
const loading = ref(true)
const error = ref(false)
const BASE_URL = 'https://client-directus.siliconpin.in'

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}/items/notice?filter[status][_eq]=published&sort=-date_created`)
    const data = await response.json()
    notices.value = data.data || []
  } catch (err) {
    console.error('Error fetching notices:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>
