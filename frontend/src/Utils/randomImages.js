// Using Vite's import.meta.glob to get all images from the Avatar folder
const imageModules = import.meta.glob('@/Avatar/*.{png,jpg,jpeg,avif,webp,gif,svg}', {
  eager: true,
  import: 'default'
});

// Convert to an array of image URLs
const allImages = Object.values(imageModules);

export function getRandomImage() {
  if (allImages.length === 0) {
    console.error('No images found in Avatar folder');
    return ''; // fallback empty string
  }
  const randomIndex = Math.floor(Math.random() * allImages.length);
  return allImages[randomIndex];
}
