<template>
  <header class="sticky top-0 z-40 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 shadow-md">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <a href="/" class="flex items-center">
            <img src="/assets/logos/rong-pencil-logo-croped-resized.png" alt="Rong Pencil Art Academy" class="h-12 w-auto" />
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1 text-xs sm:text-xs lg:text-base">
          <a href="/" class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors font-medium">Home</a>
          <a href="/gallery" class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors font-medium">Gallery</a>

          <!-- Artist Dropdown -->
          <div class="relative group">
            <button class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors flex items-center font-medium">
              Artist
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div class="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="/artist/senior" class="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-t-lg">Senior Artist</a>
              <a href="/artist/junior" class="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600">Junior Artist</a>
              <a href="/artist/guest" class="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-b-lg">Guest Artist</a>
            </div>
          </div>

          <!-- Teacher Dropdown -->
          <div class="relative group">
            <button class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors flex items-center font-medium">
              Teacher
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div class="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="/teacher/school" class="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-t-lg">School Teacher</a>
              <a href="/teacher/community" class="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-b-lg">Community Teacher</a>
            </div>
          </div>

          <!-- Student Dropdown -->
          <div class="relative group">
            <button class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors flex items-center font-medium">
              Student
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div class="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="/student/junior" class="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg">Junior Student</a>
            </div>
          </div>

          <a href="/exhibition" class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors font-medium">Exhibition</a>
          <a href="/painting" class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors font-medium">Painting</a>
          <a href="/photography" class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors font-medium">Photography</a>
          <a href="/sale" class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors font-medium">Art Sale</a>
          <a href="/admission" class="hidden lg:block bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors font-medium hover:bg-amber-700">Admission</a>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 hover:text-amber-600 hover:bg-amber-50 p-2 rounded-lg">
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4 bg-white border-t border-gray-200">
        <a href="/" class="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg">Home</a>
        <a href="/gallery" class="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg">Gallery</a>

        <!-- Artist Dropdown -->
        <div class="px-4 py-2">
          <button @click="toggleArtistMenu" class="flex items-center justify-between w-full text-gray-700 font-semibold py-2">
            <span>Artist</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': artistMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-if="artistMenuOpen" class="ml-4 mt-2">
            <a href="/artist/senior" class="block text-gray-600 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg">Senior Artist</a>
            <a href="/artist/junior" class="block text-gray-600 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg">Junior Artist</a>
            <a href="/artist/guest" class="block text-gray-600 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg">Guest Artist</a>
          </div>
        </div>

        <!-- Teacher Dropdown -->
        <div class="px-4 py-2">
          <button @click="toggleTeacherMenu" class="flex items-center justify-between w-full text-gray-700 font-semibold py-2">
            <span>Teacher</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': teacherMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-if="teacherMenuOpen" class="ml-4 mt-2">
            <a href="/teacher/school" class="block text-gray-600 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg">School Teacher</a>
            <a href="/teacher/community" class="block text-gray-600 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg">Community Teacher</a>
          </div>
        </div>

        <!-- Student Dropdown -->
        <div class="px-4 py-2">
          <button @click="toggleStudentMenu" class="flex items-center justify-between w-full text-gray-700 font-semibold py-2">
            <span>Student</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': studentMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-if="studentMenuOpen" class="ml-4 mt-2">
            <a href="/student/junior" class="block text-gray-600 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg">Junior Student</a>
          </div>
        </div>

        <a href="/exhibition" class="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg">Exhibition</a>
        <a href="/painting" class="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg">Painting</a>
        <a href="/photography" class="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg">Photography</a>
        <a href="/sale" class="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg">Art Sale</a>
        <a href="/admission" class="block bg-amber-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-amber-700">Admission</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
const artistMenuOpen = ref(false);
const teacherMenuOpen = ref(false);
const studentMenuOpen = ref(false);

const toggleArtistMenu = () => {
  artistMenuOpen.value = !artistMenuOpen.value;
};

const toggleTeacherMenu = () => {
  teacherMenuOpen.value = !teacherMenuOpen.value;
};

const toggleStudentMenu = () => {
  studentMenuOpen.value = !studentMenuOpen.value;
};
</script>