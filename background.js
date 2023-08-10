var PARTICLE_NUM = 400;
var PARTICLE_BASE_RADIUS = 0.2;
var FL = 500;
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

var canvas;
var canvasWidth, canvasHeight;
var context;
var centerX, centerY;
var mouseX, mouseY;
var speed = DEFAULT_SPEED;
var targetSpeed = DEFAULT_SPEED;
var particles = [];
var modeToggle = document.getElementById('mode-toggle');
var isDarkMode = false;

modeToggle.addEventListener('change', function() {
    isDarkMode = !isDarkMode;
    updateCanvasStyle();
    loop();
});

window.addEventListener('load', function() {
    canvas = document.getElementById('c');
    
    var resize = function() {
        canvasWidth  = canvas.width = window.innerWidth * 0.989;
        canvasHeight = canvas.height = window.innerHeight * 1.9;
        centerX = canvasWidth * 0.5;
        centerY = canvasHeight * 0.5;
        context = canvas.getContext('2d');
        updateCanvasStyle(); // Set initial canvas style
    };
    
    document.addEventListener('resize', resize);
    resize();
    
    mouseX = centerX;
    mouseY = centerY;
    
    for (var i = 0, p; i < PARTICLE_NUM; i++) {
        particles[i] = randomizeParticle(new Particle());
        particles[i].z -= 500 * Math.random();
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, false);
    
    document.addEventListener('mousedown', function(e) {
        targetSpeed = BOOST_SPEED;
    }, false);
    
    document.addEventListener('mouseup', function(d) {
        targetSpeed = DEFAULT_SPEED;
    }, false);
    
    setInterval(loop, 1000 / 60);
}, false);

function updateCanvasStyle() {
    context.save();
    if (isDarkMode) {
        context.fillStyle = 'rgb(255, 255, 255)'; // White particles, black canvas
    } else {
        context.fillStyle = 'rgb(0, 0, 0)'; // Black particles, white canvas
    }
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();
}

function loop() {
    context.save();
    if (isDarkMode) {
        context.fillStyle = 'rgb(0, 0, 0)'; // Black particles
    } else {
        context.fillStyle = 'rgb(255, 255, 255)'; // White particles
    }
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    speed += (targetSpeed - speed) * 0.01;
    
    var p;
    var cx, cy;
    var rx, ry;
    var f, x, y, r;
    var pf, px, py, pr;
    var a, a1, a2;
    
    var halfPi = Math.PI * 0.5;
    var atan2  = Math.atan2;
    var cos    = Math.cos;
    var sin    = Math.sin;
    
    context.beginPath();
    for (var i = 0; i < PARTICLE_NUM; i++) {
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
        
        a  = atan2(py - y, px - x);
        a1 = a + halfPi;
        a2 = a - halfPi;
        
        context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
        context.arc(px, py, pr, a1, a2, true);
        context.lineTo(x + r * cos(a2), y + r * sin(a2));
        context.arc(x, y, r, a2, a1, true);
        context.closePath();

        // Draw particles based on isDarkMode
        if (isDarkMode) {
            context.fillStyle = 'rgb(255, 255, 255)'; // White particles
        } else {
            context.fillStyle = 'rgb(0, 0, 0)'; // Black particles
        }
    }
    context.fill();
}

function randomizeParticle(p) {
    p.x = Math.random() * canvasWidth;
    p.y = Math.random() * canvasHeight;
    p.z = Math.random() * 1500 + 500;
    return p;
}

/**
 * Particle
 */
function Particle(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
}

window.addEventListener('load', function() {
    // ... (existing code)

    var toggleMode = document.getElementById('mode-toggle');
    
    modeToggle.addEventListener('change', function() {
        var darkMode = modeToggle.checked;

        // Toggle the class on the <body> element
        document.body.classList.toggle('dark-mode', darkMode);
        document.body.classList.toggle('light-mode', !darkMode);
    });

    // ... (rest of the existing code)
}, false);
