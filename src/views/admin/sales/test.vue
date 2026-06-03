<template>
    <div>
      <div class="category-tabs">
        <button 
          v-for="(category, index) in categories" 
          :key="index"
          :class="{ 'active': activeCategory === category }"
          @click="changeCategory(category)"
        >
          {{ category }}
        </button>
      </div>
      <div class="category-content">
        <div v-if="activeCategory === 'Category1'">Content for Category 1</div>
        <div v-else-if="activeCategory === 'Category2'">Content for Category 2</div>
        <div v-else-if="activeCategory === 'Category3'">Content for Category 3</div>
        <!-- Add more categories as needed -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: ['Category1', 'Category2', 'Category3'], // Add more categories as needed
        activeCategory: 'Category1', // Set default active category
      };
    },
    methods: {
      changeCategory(category) {
        this.activeCategory = category;
      },
    },
  };
  </script>
  
  <style>
  .category-tabs {
    display: flex;
  }
  
  .category-tabs button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
  .category-tabs button.active {
    background-color: #ccc;
  }
  
  .category-content {
    margin-top: 20px;
  }
  </style>