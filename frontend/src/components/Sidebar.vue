<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/home" active-class="active">
            <img src="@/assets/images/home.gif" alt="Home" />
          </router-link>
        </li>
        <li>
          <router-link to="/feed" active-class="active">
            <img src="@/assets/images/activity-feed.gif" alt="Feed" />
          </router-link>
        </li>
        <li>
          <router-link to="/friends-and-mentors" active-class="active">
            <img src="@/assets/images/follow.gif" alt="Documents" />
          </router-link>
        </li>
        <li>
          <router-link to="/chat" active-class="active">
            <img src="@/assets/images/notification.gif" alt="Chat" />
          </router-link>
        </li>
        <li>
          <router-link to="/edit-profile" active-class="active">
            <img src="@/assets/images/information.gif" alt="Settings" />
          </router-link>
        </li>
        <li>
          <router-link to="/login" active-class="active">
            <img src="@/assets/images/logout.gif" alt="Logout" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>

<style scoped>
.sidebar {
  width: 80px;
  background-color: #f7fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}


nav ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

nav ul li {
  margin: 5rem 0;
  text-align: center;
}

nav ul li a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 0.5rem;
  color: #718096;
  text-decoration: none;
  position: relative;
}

nav ul li a.active {
  background-color: #e2e8f0;
  border-radius: 8px;
}

nav ul li a img {
  width: 80%;
  height: 50%;

}

nav ul li a:hover {
  background-color: #edf2f7;
  border-radius: 8px;
}

/* Add a red dot for the chat icon */
nav ul li:nth-child(3) a::after {
  content: '';
  position: absolute;
  top: 5px;
  right: 15px;
  width: 8px;
  height: 8px;
  background-color: #ff4d4f;
  border-radius: 50%;
}
</style>
