import { reactive } from 'vue';
import axios from 'axios';

export const userState = reactive({
  user: null,
  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  },
});

const fetchUser = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/user', {
      withCredentials: true
    });
    if (res.data.success) {
      // console.log(res.data.user)
      userState.setUser(res.data.user); 
    } else {
      userState.clearUser();
    }
  } catch (error) {
    console.warn('Failed to fetch user:', error);
    userState.clearUser();
  }
};

fetchUser();