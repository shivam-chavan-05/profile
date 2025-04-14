import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

document.addEventListener('DOMContentLoaded', function () {
  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Create a dynamic geometry
  const baseSize = Math.min(window.innerWidth, window.innerHeight) / 500; // Responsive size based on screen dimensions
  let detailLevel = 0; // Initial detail level
  const geometry = new THREE.IcosahedronGeometry(baseSize, detailLevel);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3B82F6,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Position the camera
  camera.position.z = 3;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate the model on the y-axis
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
  animate();

  // Change geometry on left and right clicks
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      // Left click: Increase complexity
      detailLevel = Math.min(detailLevel + 1, 5); // Limit detail level to 5
    } else if (event.button === 2) {
      // Right click: Decrease complexity
      detailLevel = Math.max(detailLevel - 1, 0); // Limit detail level to 0
    }

    // Update geometry
    mesh.geometry.dispose(); // Dispose of the old geometry
    mesh.geometry = new THREE.IcosahedronGeometry(baseSize, detailLevel); // Create a new geometry
  });

  // Prevent context menu on right-click
  document.addEventListener('contextmenu', (event) => event.preventDefault());

  // // Move the model with the cursor
  // document.addEventListener('mousemove', (event) => {
  //   const x = (event.clientX / window.innerWidth) * 2 - 1;
  //   const y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   mesh.rotation.x = y * 0.5;
  //   mesh.rotation.y += x * 0.05;
  // });

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update base size and geometry on resize
    const newBaseSize = Math.min(window.innerWidth, window.innerHeight) / 500;
    mesh.geometry.dispose();
    mesh.geometry = new THREE.IcosahedronGeometry(newBaseSize, detailLevel);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const textElement = document.getElementById('dynamic-text');
  const textArray = [
    'Data Analyst',
    'Data Scientist',
    'ML Engineer',
    'AI Engineer',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
  ];
  let textIndex = 0;

  function updateText() {
    textElement.textContent = textArray[textIndex];
    textIndex = (textIndex + 1) % textArray.length; // Loop back to the first text
  }

  // Update text every 3 seconds
  updateText(); // Set initial text
  setInterval(updateText, 3000);
});

document.addEventListener('DOMContentLoaded', function () {
  const skillItems = document.querySelectorAll('.skill-item');
  const skillsPerRow = Math.min(7, Math.floor(window.innerWidth / 150)); // Show up to 7 skills per row
  let currentStartIndex = 0;

  function updateSkills() {
    // Hide all skills
    skillItems.forEach((item) => {
      item.style.display = 'none';
    });

    // Show the next set of skills
    for (let i = 0; i < skillsPerRow; i++) {
      const index = (currentStartIndex + i) % skillItems.length; // Loop back to the start if needed
      skillItems[index].style.display = 'flex';
    }

    // Move to the next set of skills
    currentStartIndex = (currentStartIndex + skillsPerRow) % skillItems.length;
  }

  // Initialize the skills display
  updateSkills();
  setInterval(updateSkills, 3000); // Change skills every 3 seconds

  // Update skills on window resize
  window.addEventListener('resize', () => {
    currentStartIndex = 0; // Reset to the first set of skills
    updateSkills();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  // Toggle the menu on hamburger click
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); // Show/hide the menu
    menuToggle.classList.toggle('open'); // Animate the hamburger icon
  });

  // Close the menu when a link is clicked
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      menu.classList.remove('show');
      menuToggle.classList.remove('open');
    }
  });

  // Hide/show navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      navbar.classList.add('hidden'); // Hide navbar when scrolling down
    } else {
      navbar.classList.remove('hidden'); // Show navbar when scrolling up
    }
    lastScrollY = window.scrollY;
  });
});


