<template>
  <div class="max-w-4xl mx-auto py-12 px-4 min-h-screen">
    <!-- Back Button -->
    <a href="/notice" class="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium mb-8 transition-colors">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Back to Notice Board
    </a>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
      <p class="text-gray-500">Loading notice...</p>
    </div>

    <!-- Error/Not Found State -->
    <div v-else-if="error || !notice" class="text-center py-20">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Notice Not Found</h1>
      <p class="text-gray-600 mb-8">The notice you are looking for does not exist or has been removed.</p>
      <a href="/notice" class="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium">Return to Notice Board</a>
    </div>

    <!-- Notice Content -->
    <article v-else class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-100 px-8 py-10">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-amber-600 text-sm font-bold mb-6 shadow-sm border border-amber-100/50">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {{ formatDate(notice.date_created) }}
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{{ notice.title }}</h1>
      </div>

      <!-- Content -->
      <div class="p-8 md:p-12 prose prose-amber max-w-none prose-lg" v-html="notice.content">
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const notice = ref(null)
const loading = ref(true)
const error = ref(false)
const BASE_URL = 'https://client-directus.siliconpin.in'

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get('slug')

  if (!slug) {
    loading.value = false
    error.value = true
    return
  }

  try {
    const response = await fetch(`${BASE_URL}/items/notice?filter[slug][_eq]=${slug}&limit=1`)
    const data = await response.json()
    if (data.data && data.data.length > 0) {
      notice.value = data.data[0]
      // Try to update document title if possible
      document.title = `${notice.value.title} - Rong Pencil Art Academy`
    } else {
      error.value = true
    }
  } catch (err) {
    console.error('Error fetching notice:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>
