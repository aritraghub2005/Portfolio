// Initialize GSAP ScrollTo plugin
gsap.registerPlugin(ScrollToPlugin);

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true
});

// Typed.js for Dynamic Hero Headline
new Typed("#typed", {
  strings: ["I'm a Developer.", "I Create Experiences.", "Welcome to My World."],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});

// GSAP Animation for Hero Content
gsap.from(".hero-content", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power3.out"
});

// Dynamic title effect
document.addEventListener('DOMContentLoaded', function() {
  const dynamicTitle = document.getElementById('dynamic-title');
  const titles = ["ARi's Universe", "Developer Space", "Digital Playground", "Code Cosmos"];
  let currentIndex = 0;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % titles.length;
    dynamicTitle.style.opacity = 0;
    
    setTimeout(() => {
      dynamicTitle.textContent = titles[currentIndex];
      dynamicTitle.style.opacity = 1;
    }, 500);
  }, 3000);
  
  // Mouse move parallax effect
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    gsap.to('.floating-tech img', {
      x: x * 30 - 15,
      y: y * 30 - 15,
      duration: 2,
      ease: 'power2.out'
    });
    
    gsap.to('.terminal-container', {
      x: x * 20 - 10,
      y: y * 20 - 10,
      duration: 1,
      ease: 'power2.out'
    });
  });
});

// Terminal Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = terminalInput.value.trim().toLowerCase();
    terminalOutput.innerHTML += `<div>> ${command}</div>`;
    
    // Command Logic
    if (command === 'help') {
      terminalOutput.innerHTML += `
        <div>Available commands:</div>
        <div>- 'projects' : Jump to projects</div>
        <div>- 'contact'  : Scroll to contact form</div>
        <div>- 'clear'    : Clean the terminal</div>
        <div>- 'about'    : Learn about me</div>
        <div>- 'social'   : View my social links</div>
      `;
    } else if (command === 'projects') {
      gsap.to(window, { scrollTo: "#projects", duration: 1 });
      terminalOutput.innerHTML += `<div>Navigating to Projects section...</div>`;
    } else if (command === 'contact') {
      gsap.to(window, { scrollTo: "#contact", duration: 1 });
      terminalOutput.innerHTML += `<div>Navigating to Contact section...</div>`;
    } else if (command === 'about') {
      gsap.to(window, { scrollTo: "#about", duration: 1 });
      terminalOutput.innerHTML += `<div>Navigating to About section...</div>`;
    } else if (command === 'social') {
      terminalOutput.innerHTML += `
        <div>My Social Links:</div>
        <div>- LinkedIn: <a href="https://www.linkedin.com/in/aritra-jana-5597a9277/" target="_blank" style="color: #FFD700;">linkedin.com/aritra-jana</a></div>
        <div>- GitHub: <a href="https://github.com/aritraghub2005" target="_blank" style="color: #FFD700;">github.com/aritraghub2005</a></div>
        <div>- Instagram: <a href="https://www.instagram.com/aritra_ari_697/" target="_blank" style="color: #FFD700;">@aritra_ari_697</a></div>
      `;
    } else if (command === 'clear') {
      terminalOutput.innerHTML = '';
    } else {
      terminalOutput.innerHTML += `<div>Command not found. Type 'help' for available commands.</div>`;
    }
    
    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

// Production-Ready Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Disable button during submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch('https://your-backend-api.com/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(`Thank you, ${formData.get('name')}! ${data.message || 'Your message has been sent.'}`);
    form.reset();
  } catch (error) {
    console.error('Form submission error:', error);
    alert('There was an error sending your message. Please try again later or contact me directly at my email.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// Mobile Navigation Toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// Skills Orb Interaction with Three.js
document.addEventListener('DOMContentLoaded', function() {
  const orbContainer = document.getElementById('skills-orb');
  if (!orbContainer) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  });
  renderer.setSize(orbContainer.offsetWidth, orbContainer.offsetHeight);
  orbContainer.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Main sphere
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x30004f,
    transparent: true,
    opacity: 0.8,
    shininess: 100,
    specular: 0xffffff
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Skill points
  const skillPoints = [];
  const radius = 1.5; // Adjust radius for better visibility
  
  const skills = [
    { name: "Java", img: "java.png", description: "Java is a high-level, class-based, object-oriented programming language." },
    { name: "Python", img: "python.png", description: "Python is an interpreted, high-level, general-purpose programming language." },
    { name: "JavaScript", img: "js.png", description: "JavaScript is a programming language that enables interactive web pages." },
    { name: "HTML5", img: "html.png", description: "HTML5 is the latest version of Hypertext Markup Language." },
    { name: "CSS3", img: "css.png", description: "CSS3 is the latest evolution of the Cascading Style Sheets language." },
    { name: "Three.js", img: "threejs.png", description: "Three.js is a JavaScript library that makes it easy to create 3D graphics." }
  ];

  // Create skill icons
  skills.forEach((skill, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    
    // Create icon
    const texture = new THREE.TextureLoader().load(`icons/${skill.img}`);
    const iconMaterial = new THREE.MeshBasicMaterial({ 
      map: texture,
      transparent: true
    });
    const iconGeometry = new THREE.PlaneGeometry(0.3, 0.3);
    const icon = new THREE.Mesh(iconGeometry, iconMaterial);
    
    icon.position.set(x, y, z);
    icon.lookAt(camera.position);
    scene.add(icon);
    skillPoints.push({ icon, description: skill.description });
  });

  camera.position.z = 3;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01; // Rotate the sphere
    renderer.render(scene, camera);
  }
  animate();

  // Hover effect for icons
  skillPoints.forEach((point) => {
    point.icon.userData = { description: point.description }; // Store description in userData

    point.icon.on('mouseover', () => {
      gsap.to(point.icon.scale, { x: 1.5, y: 1.5, duration: 0.3 }); // Scale up icon
      displayDescription(point.icon.userData.description);
    });

    point.icon.on('mouseout', () => {
      gsap.to(point.icon.scale, { x: 1, y: 1, duration: 0.3 }); // Scale down icon
      hideDescription();
    });
  });

  // Function to display description
  function displayDescription(description) {
    const descriptionElement = document.getElementById('description');
    descriptionElement.innerText = description;
    descriptionElement.style.opacity = 1; // Show description
  }

  // Function to hide description
  function hideDescription() {
    const descriptionElement = document.getElementById('description');
    descriptionElement.style.opacity = 0; // Hide description
  }
});

