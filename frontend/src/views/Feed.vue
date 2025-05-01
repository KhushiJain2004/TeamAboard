<template>
  <div class="feed-container">
    <div class="sidebar">
      <h3>Filters</h3>
      <ul>
        <li>Remote</li>
        <li>On-site</li>
        <li>Hybrid</li>
      </ul>
      <h3>Categories</h3>
      <ul>
        <li>Development</li>
        <li>Design</li>
        <li>Data Science</li>
      </ul>
    </div>
    <div class="main-content">
      <post-creation @create-post="addPost" />
      <div class="posts-list">
        <div v-for="post in posts" :key="post._id" class="post-card">
          <router-link :to="`/profile/${post.created_by}`" class="post-header">
            <img :src="userAvatar" alt="User Avatar" class="avatar" />
            <div class="post-info">
              <h3>{{ post.created_by }}</h3>
              <p class="date">{{ formatDate(post.createdAt) }}</p>
            </div>
          </router-link>
          <div class="post-content">
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
            <p><strong>Purpose:</strong> {{ post.purpose }}</p>
            <p><strong>Skills:</strong> {{ requiredSkills && post.requiredSkills.join(',') }}</p>
            <p><strong>Location:</strong> {{ post.location }}</p>
            <p><strong>Tags:</strong> {{tags &&  post.tags.join(', ') }}</p>
            <p><strong>Deadline:</strong> {{ formatDate(post.deadline) }}</p>
            <p><strong>Team Size:</strong> {{ post.teamSize }}</p>
          </div>
          <div class="post-actions">
            <button class="apply-btn" @click="openApplyModal(post)">Apply</button>
          </div>
        </div>
      </div>
      <div v-if="posts.length === 0" class="no-posts">
        <p>No posts available. Create one to get started!</p>
      </div>
    </div>
    <div class="news-section">
      <h3>Tech News Updates</h3>
      <div class="news-list">
        <div v-for="news in newsItems" :key="news.id" class="news-card">
          <h4>{{ news.title }}</h4>
          <p>{{ news.summary }}</p>
          <a :href="news.link" target="_blank" class="news-link">Read More</a>
          <p class="news-date">{{ formatDate(news.publishedAt) }}</p>
        </div>
      </div>
      <div v-if="newsItems.length === 0" class="no-news">
        <p>No news available at the moment.</p>
      </div>
    </div>
    <apply-modal v-if="selectedPostId" :post-id="selectedPostId" @close="selectedPostId = null" />
  </div>
</template>

<script>
import avatarImage from '@/assets/images/avatar.jpg';
import ApplyModal from '@/components/ApplyModal.vue';
import PostCreation from '@/components/PostCreation.vue';
import axios from 'axios';
// import { userState } from '../stores/store';

export default {
  name: 'FeedView',
  components: { PostCreation, ApplyModal },
  data() {
    return {
      userAvatar: avatarImage,
      selectedPostId: null,
      newsItems: [],
      posts: [ ],
      filters: {
        location: null,
        category: null,
      }
    };
  },
  mounted() {
    this.fetchNews();
    this.fetchFilteredPosts()
  },
  methods: {
  async fetchFilteredPosts(filters = {}) {
  try {
    const queryParams = new URLSearchParams();

    if (filters.skills && filters.skills.length > 0) {
      queryParams.append('skills', filters.skills.join(','));
    }

    if (filters.tags && filters.tags.length > 0) {
      queryParams.append('tags', filters.tags.join(','));
    }

    if (filters.location) {
      queryParams.append('location', filters.location);
    }

    if (filters.purpose) {
      queryParams.append('purpose', filters.purpose);
    }

    if (filters.teamSize) {
      queryParams.append('teamSize', filters.teamSize);
    }

    if (filters.title) {
      queryParams.append('title', filters.title);
    }

    if (filters.deadline) {
      queryParams.append('deadline', filters.deadline); // format: 'YYYY-MM-DD'
    }

    if (filters.uploadDate) {
      queryParams.append('uploadDate', filters.uploadDate); // format: 'YYYY-MM-DD'
    }

    const response = await axios.get(`http://localhost:4000/api/posts/filter?${queryParams.toString()}`, {
      withCredentials:true
    });
    console.log(response.data.posts)

     this.posts=response.data.posts;

  } catch (error) {
    console.error('Error fetching filtered posts:', error);
    return [];
  }
  },
    async addPost(post) {
      // console.log('Received post in Feed:', post);
      // this.posts.push(post);
      // console.log('Updated posts:', this.posts);
      try {
        const response = await axios.post("http://localhost:4000/api/posts/", {
        tittle: post.title,             
        description: post.description,
        skills: post.requiredSkills || [],
        location: post.location || null,
        deadline: post.deadline || null
    }, { withCredentials: true });
        console.log(response)
      } catch (error) {
        console.log(error)
      }

    },
    formatDate(dateStr) {
  if (!dateStr) return 'N/A'; 
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-GB'); // or 'en-US'

    },
    async openApplyModal(post) {
      try {
        // console.log(post)
        const res=await axios.post(`http://localhost:4000/api/posts/apply/${post.id}`,{
          authorId:post.created_by},{withCredentials:true});
          alert(res.data.message)
      } catch (error) {
        console.log(error)
      }

    },
    async fetchNews() {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            category: 'technology',
            apiKey: apiKey,
            pageSize: 5, // Limit to 5 articles for display
          },
        });
        this.newsItems = response.data.articles.map((article, index) => ({
          id: index + 1,
          title: article.title,
          summary: article.description || 'No summary available.',
          link: article.url,
          publishedAt: article.publishedAt,
        }));
      } catch (error) {
        console.error('Error fetching news:', error);
        this.newsItems = [
          {
            id: 1,
            title: 'Failed to Load News',
            summary: 'Unable to fetch news updates. Please try again later.',
            link: '#',
            publishedAt: new Date().toISOString(),
          },
        ];
      }
    },
  },
};
</script>

<style scoped>
.feed-container {
  display: flex;
  max-width: 90vw;
    height: 80vh;
    margin-left: 8rem;
    margin-bottom: 5rem;
    margin-top: 5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #e6f4ea 0%, #c3e8d1 100%);
    border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }

    .feed-container:hover {
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
    }

    .sidebar {
      width: 250px;
      padding: 1.5rem;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      margin-right: 2rem;
    }

    .main-content {
      flex: 2;
      margin-right: 2rem;
    }

    .news-section {
      flex: 1;
      padding: 1.5rem;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      max-height: 70vh;
      overflow-y: auto;
    }

    .news-section h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .news-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .news-card {
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .news-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .news-card h4 {
      font-size: 1.1rem;
      color: #1a202c;
      margin: 0 0 0.5 defences;
    }

    .news-card p {
      font-size: 0.95rem;
      color: #4a5568;
      margin: 0 0 0.5rem;
      line-height: 1.5;
    }

    .news-link {
      color: #41b883;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .news-link:hover {
      color: #2ecc71;
    }

    .news-date {
      font-size: 0.85rem;
      color: #718096;
      margin-top: 0.5rem;
    }

    .no-news {
      text-align: center;
      padding: 1rem;
      color: #4a5568;
      font-size: 1rem;
    }

    .news-section::-webkit-scrollbar {
      width: 8px;
    }

    .news-section::-webkit-scrollbar-track {
      background: #e6f4ea;
      border-radius: 10px;
    }

    .news-section::-webkit-scrollbar-thumb {
      background-color: #41b883;
      border-radius: 10px;
    }

    .news-section {
      scrollbar-width: thin;
      scrollbar-color: #41b883 #e6f4ea;
    }

    .sidebar h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .sidebar ul {
      list-style: none;
      padding: 0;
    }

    .sidebar li {
      padding: 0.75rem 0;
      color: #4a5568;
      font-size: 1rem;
      cursor: pointer;
      transition: color 0.2s ease, transform 0.2s ease;
    }

    .sidebar li:hover {
      color: #41b883;
      transform: translateX(5px);
    }

    .posts-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .post-card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .post-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    .post-header {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 1rem;
      text-decoration: none;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #41b883;
      transition: border-color 0.3s ease;
    }

    .avatar:hover {
      border-color: #2ecc71;
    }

    .post-info h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
      transition: color 0.2s ease;
    }

    .post-info h3:hover {
      color: #41b883;
    }

    .post-info .date {
      font-size: 0.9rem;
      color: #718096;
      margin: 0.25rem 0 0;
    }

    .post-content {
      margin-bottom: 1.5rem;
    }

    .post-content h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0.75rem 0;
      line-height: 1.3;
    }

    .post-content p {
      margin: 0.5rem 0;
      color: #4a5568;
      line-height: 1.6;
      font-size: 1rem;
    }

    .post-content strong {
      color: #2d3748;
      font-weight: 500;
    }

    .post-actions {
      text-align: right;
    }

    .apply-btn {
      background-color: #41b883;
      color: #ffffff;
      padding: 0.75rem 1.75rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bedre;
      transition: background-color 0.3s ease, transform 0.2s ease;
      box-shadow: 0 2px 6px rgba(65, 184, 131, 0.3);
    }

    .apply-btn:hover {
      background-color: #2ecc71;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(46, 204, 113, 0.4);
    }

    .apply-btn:active {
      transform: translateY(0);
      box-shadow: 0 1px 3px rgba(65, 184, 131, 0.3);
    }

    .no-posts {
      text-align: center;
      padding: 2rem;
      color: #4a5568;
      font-size: 1.1rem;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 1200px) {
      .feed-container {
        max-width: 95vw;
        flex-wrap: wrap;
      }

      .main-content {
        flex: 1 1 100%;
        margin-right: 0;
        margin-bottom: 2rem;
      }

      .news-section {
        flex: 1 1 100%;
        max-height: none;
      }
    }

    @media (max-width: 1024px) {
      .feed-container {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        margin-right: 0;
        margin-bottom: 2rem;
      }

      .sidebar ul {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .sidebar li {
        padding: 0.5rem 1rem;
        background: #f7fafc;
        border-radius: 6px;
      }
    }

    @media (max-width: 768px) {
      .feed-container {
        max-width: 90vw;
        padding: 1rem;
        border-radius: 8px;
      }

      .posts-list {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .post-card {
        padding: 1rem;
      }

      .post-header {
        gap: 1rem;
      }

      .avatar {
        width: 40px;
        height: 40px;
      }

      .post-content h2 {
        font-size: 1.25rem;
      }

      .post-content p {
        font-size: 0.95rem;
      }

      .post-actions {
        text-align: center;
      }

      .apply-btn {
        width: 100%;
        padding: 0.5rem 1rem;
      }

      .news-card h4 {
        font-size: 1rem;
      }

      .news-card p {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .feed-container {
        max-width: 100vw;
        padding: 0.5rem;
      }

      .post-info h3 {
        font-size: 1.1rem;
      }

      .post-info .date {
        font-size: 0.85rem;
      }

      .news-card h4 {
        font-size: 0.95rem;
      }

      .news-card p {
        font-size: 0.85rem;
      }
    }

    .posts-container,
    .feed-container {
      max-height: 70vh;
      overflow-y: auto;
      padding-right: 5px;
      margin-top: 1rem;
    }

    .posts-container,
    .feed-container::-webkit-scrollbar {
      width: 8px;
    }

    .posts-container,
    .feed-container::-webkit-scrollbar-track {
      background: #e6f4ea;
      border-radius: 10px;
    }

    .posts-container,
    .feed-container::-webkit-scrollbar-thumb {
      background-color: #41b883;
      border-radius: 10px;
    }

    .posts-container,
    .feed-container {
  scrollbar-width: thin;
  scrollbar-color: #41b883 #e6f4ea;
}
</style>
