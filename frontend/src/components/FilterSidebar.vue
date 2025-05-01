```vue
<template>
  <div class="sidebar">
    <h3>Filters</h3>
    <form @submit.prevent="applyFilters">
      <!-- Skills -->
      <div class="filter-group">
        <label for="skills">Skills (comma-separated)</label>
        <input type="text" id="skills" v-model="filters.skills" placeholder="e.g., Node.js,Express" />
      </div>

      <!-- Purpose -->
      <div class="filter-group">
        <label for="purpose">Purpose</label>
        <input type="text" id="purpose" v-model="filters.purpose" placeholder="e.g., Launch beta version" />
      </div>

      <!-- Tags -->
      <div class="filter-group">
        <label for="tags">Tags (comma-separated)</label>
        <input type="text" id="tags" v-model="filters.tags" placeholder="e.g., API,Backend" />
      </div>

      <!-- Location -->
      <div class="filter-group">
        <label for="location">Location</label>
        <input type="text" id="location" v-model="filters.location" placeholder="e.g., Remote" />
      </div>

      <!-- Team Size -->
      <div class="filter-group">
        <label for="teamSize">Team Size</label>
        <input type="number" id="teamSize" v-model.number="filters.teamSize" min="1" placeholder="e.g., 2" />
      </div>

      <!-- Title -->
      <div class="filter-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="filters.title" placeholder="e.g., Need a Backend Developer" />
      </div>

      <!-- Deadline -->
      <div class="filter-group">
        <label for="deadline">Deadline (on or before)</label>
        <input type="date" id="deadline" v-model="filters.deadline" />
      </div>

      <!-- Upload Date -->
      <div class="filter-group">
        <label for="uploadDate">Upload Date (on or after)</label>
        <input type="date" id="uploadDate" v-model="filters.uploadDate" />
      </div>

      <!-- Apply and Clear Buttons -->
      <div class="filter-actions">
        <button type="submit" class="apply-btn">Apply Filters</button>
        <button type="button" @click="clearFilters" class="clear-btn">Clear</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FilterSidebar',
  data() {
    return {
      filters: {
        skills: '',
        purpose: '',
        tags: '',
        location: '',
        teamSize: null,
        title: '',
        deadline: '',
        uploadDate: ''
      }
    };
  },
  methods: {
    applyFilters() {
      // Emit the filter values to the parent component
      const filterData = { ...this.filters };
      // Convert comma-separated strings to arrays for skills and tags
      if (filterData.skills) filterData.skills = filterData.skills.split(',').map(s => s.trim());
      if (filterData.tags) filterData.tags = filterData.tags.split(',').map(t => t.trim());
      this.$emit('filter-changed', filterData);
    },
    clearFilters() {
      // Reset all filters
      this.filters = {
        skills: '',
        purpose: '',
        tags: '',
        location: '',
        teamSize: null,
        title: '',
        deadline: '',
        uploadDate: ''
      };
      // Emit empty filters to reset the posts
      this.$emit('filter-changed', {});
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-right: 2rem;
  height: calc(100vh - 9rem);
  overflow: hidden;
}

.sidebar h3 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 600;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-group label {
  display: block;
  font-size: 1rem;
  color: #2d3748;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.filter-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #4a5568;
  transition: border-color 0.2s ease;
}

.filter-group input:focus {
  outline: none;
  border-color: #41b883;
  box-shadow: 0 0 0 2px rgba(65, 184, 131, 0.2);
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
}

.apply-btn,
.clear-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.apply-btn {
  background-color: #41b883;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(65, 184, 131, 0.3);
}

.apply-btn:hover {
  background-color: #2ecc71;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.4);
}

.clear-btn {
  background-color: #e2e8f0;
  color: #2d3748;
}

.clear-btn:hover {
  background-color: #cbd5e0;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .sidebar {
    width: 100%;
    margin-right: 0;
    margin-bottom: 2rem;
    height: auto;
  }

  .filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-group label {
    flex: 1 1 100%;
  }

  .filter-group input {
    flex: 1 1 100%;
  }
}

@media (max-width: 768px) {
  .sidebar {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    padding: 0.5rem;
  }

  .filter-group label {
    font-size: 0.95rem;
  }

  .filter-group input {
    font-size: 0.9rem;
  }

  .apply-btn,
  .clear-btn {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}
</style>
```
