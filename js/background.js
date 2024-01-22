// Constants for particle animation
const PARTICLE_NUM = 400;
const PARTICLE_BASE_RADIUS = 0.30;
const FL = 500;
const DEFAULT_SPEED = 2;
const BOOST_SPEED = 200;

// Variables for canvas and animation
let canvas, canvasWidth, canvasHeight, context;
let centerX, centerY, mouseX, mouseY;
let speed = DEFAULT_SPEED;
let targetSpeed = DEFAULT_SPEED;
const particles = [];

// Toggle button for dark mode
const modeToggle = document.getElementById("mode-toggle");
let isDarkMode = false;

// Event listener for dark mode toggle
modeToggle.addEventListener("change", function () {
  // Toggle dark mode state
  isDarkMode = !isDarkMode;
  // Update canvas style
  updateCanvasStyle();
  // Restart the animation loop
  loop();
});

// Event listener when the window loads
window.addEventListener("load", function () {
  // Get the canvas element
  canvas = document.getElementById("c");

  function onWindowResize() {
    canvasWidth = canvas.width = window.innerWidth * 0.98;
    canvasHeight = canvas.height = window.innerHeight * 1.9;
    centerX = canvasWidth * 0.5;
    centerY = canvasHeight * 0.5;
    context = canvas.getContext("2d");
    // Set initial canvas style
    updateCanvasStyle();
  
    // Add any additional logic related to camera or renderer here
  }
  
  // Add resize event listener
  window.addEventListener("resize", onWindowResize);
  
  // Initialize canvas size and style
  onWindowResize();
  

  mouseX = centerX;
  mouseY = centerY;

  // Initialize particles and their positions
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles[i] = randomizeParticle(new Particle());
    particles[i].z -= 500 * Math.random();
  }

  // Event listener for mouse movement
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Event listener for mouse click
  document.addEventListener("mousedown", function () {
    targetSpeed = BOOST_SPEED;
  });

  // Event listener for mouse release
  document.addEventListener("mouseup", function () {
    targetSpeed = DEFAULT_SPEED;
  });

  // Animation loop
  setInterval(loop, 1000 / 60);
});

// Function to update canvas style based on dark mode
function updateCanvasStyle() {
  context.save();
  if (isDarkMode) {
    context.fillStyle = "rgb(0, 0, 0)"; // White particles, black canvas
  } else {
    context.fillStyle = "rgb(255, 255, 255)"; // Black particles, white canvas
  }
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.restore();
}

// Animation loop
function loop() {
    context.save();
    if (isDarkMode) {
      context.fillStyle = "rgb(0, 0, 0)"; // Black background
      context.strokeStyle = "rgb(255, 255, 255)"; // White particles
    } else {
      context.fillStyle = "rgb(255, 255, 255)"; // White background
      context.strokeStyle = "rgb(0, 0, 0)"; // Black particles
    }
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

     // Instead of setting context.fillStyle for particles, set context.strokeStyle
  context.strokeStyle = isDarkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";

  speed += (targetSpeed - speed) * 0.01;

  let p;
  let cx, cy;
  let rx, ry;
  let f, x, y, r;
  let pf, px, py, pr;
  let a, a1, a2;

  const halfPi = Math.PI * 0.5;

  context.beginPath();
  for (let i = 0; i < PARTICLE_NUM; i++) {
    p = particles[i];

    p.pastZ = p.z;
    p.z -= speed;

    if (p.z <= 0) {
      randomizeParticle(p);
      continue;
    }

    cx = centerX - (mouseX - centerX) * 1.25;
    cy = centerY - (mouseY - centerY) * 1.25;

    rx = p.x - cx;
    ry = p.y - cy;

    f = FL / p.z;
    x = cx + rx * f;
    y = cy + ry * f;
    r = PARTICLE_BASE_RADIUS * f;

    pf = FL / p.pastZ;
    px = cx + rx * pf;
    py = cy + ry * pf;
    pr = PARTICLE_BASE_RADIUS * pf;

    a = Math.atan2(py - y, px - x);
    a1 = a + halfPi;
    a2 = a - halfPi;

    context.moveTo(px + pr * Math.cos(a1), py + pr * Math.sin(a1));
    context.arc(px, py, pr, a1, a2, true);
    context.lineTo(x + r * Math.cos(a2), y + r * Math.sin(a2));
    context.arc(x, y, r, a2, a1, true);
    context.closePath();
  }
  context.fill();
  context.stroke(); // Stroke the particles
}

// Function to randomize particle positions
function randomizeParticle(p) {
  p.x = Math.random() * canvasWidth;
  p.y = Math.random() * canvasHeight;
  p.z = Math.random() * 1500 + 500;
  return p;
}

// Particle constructor
function Particle(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.pastZ = 0;
}

// Event listener for window load
window.addEventListener("load", function () {

  // Get the dark mode preference from local storage
  const darkModePreference = localStorage.getItem("darkMode");

  // Set initial dark mode state based on the preference
  if (darkModePreference === "true") {
    isDarkMode = true;
    // Ensure the mode toggle is checked
    modeToggle.checked = true;
  }
  // Apply the dark mode to the body
  document.body.classList.toggle("dark-mode", isDarkMode);

  // Event listener for mode toggle
  modeToggle.addEventListener("change", function () {
    // Toggle the class on the body element
    document.body.classList.toggle("dark-mode", modeToggle.checked);
    // Update the dark mode preference in local storage
    localStorage.setItem("darkMode", modeToggle.checked);
  });

});

// Get the dark mode preference from local storage
const darkModePreference = localStorage.getItem("darkMode");

// Set initial dark mode state based on the preference
if (darkModePreference === "true") {
  isDarkMode = true;
  // Ensure the mode toggle is checked
  modeToggle.checked = true;
}
// Apply the dark mode to the body
document.body.classList.toggle("dark-mode", isDarkMode);

// Event listener for mode toggle
modeToggle.addEventListener("change", function () {
  // Toggle the class on the body element
  document.body.classList.toggle("dark-mode", modeToggle.checked);
  // Update the dark mode preference in local storage
  localStorage.setItem("darkMode", modeToggle.checked);
});

// Function to check system theme preference
function checkSystemTheme() {
  // Dark mode auto-detection based on system theme
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Automatically enable dark mode if system theme is dark
    isDarkMode = true;
    document.body.classList.add("dark-mode");
    modeToggle.checked = true;
  }
}

// Call the function to check system theme preference
checkSystemTheme();
// Event listener for window load
window.addEventListener("load", function () {

  // Get the dark mode preference from local storage
  const darkModePreference = localStorage.getItem("darkMode");

  // Set initial dark mode state based on the preference
  if (darkModePreference === "true") {
    isDarkMode = true;
    // Ensure the mode toggle is checked
    modeToggle.checked = true;
  } else if (darkModePreference === "false") {
    isDarkMode = false;
    // Ensure the mode toggle is unchecked
    modeToggle.checked = false;
  }
  // Apply the dark mode to the body
  document.body.classList.toggle("dark-mode", isDarkMode);
});
