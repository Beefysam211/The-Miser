document.addEventListener('DOMContentLoaded',function(){const images=document.querySelectorAll('img[src$=".webp"]');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const img=entry.target;img.src=img.dataset.src;observer.unobserve(img)}})},{rootMargin:'100px 0px'});images.forEach(img=>{const src=img.src;img.dataset.src=src;img.src='';observer.observe(img)})})