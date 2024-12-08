import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let planets = {};
let orbitLines = {};
let rotationSpeed = 1;

// Константы для размеров и расстояний
const SCALE_FACTOR = 1000;
const ORBIT_SEGMENTS = 64;
const STAR_COUNT = 10000;

// Текстуры планет
const textureLoader = new THREE.TextureLoader();
const planetTextures = {
    sun: 'textures/2k_sun.jpg',
    mercury: 'textures/2k_mercury.jpg',
    venus: 'textures/2k_venus.jpg',
    earth: 'textures/2k_earth.jpg',
    mars: 'textures/2k_mars.jpg',
    jupiter: 'textures/2k_jupiter.jpg',
    saturn: 'textures/2k_saturn.jpg',
    uranus: 'textures/2k_uranus.jpg',
    neptune: 'textures/2k_neptune.jpg',
    pluto: 'textures/2k_pluto.jpg'
};

// Размеры планет (не в масштабе для лучшей визуализации)
const planetSizes = {
    sun: 50,
    mercury: 10,
    venus: 15,
    earth: 15,
    mars: 12,
    jupiter: 40,
    saturn: 35,
    uranus: 25,
    neptune: 24,
    pluto: 8
};

// Расстояния от Солнца (в условных единицах)
const planetDistances = {
    sun: 0,
    mercury: 100,
    venus: 150,
    earth: 200,
    mars: 250,
    jupiter: 350,
    saturn: 450,
    uranus: 550,
    neptune: 650,
    pluto: 750
};

// Скорости вращения планет
const planetRotationSpeeds = {
    sun: 0.001,
    mercury: 0.005,
    venus: -0.004,
    earth: 0.004,
    mars: 0.003,
    jupiter: 0.002,
    saturn: 0.002,
    uranus: 0.001,
    neptune: 0.001,
    pluto: 0.001
};

export function init() {
    // Создаем сцену
    scene = new THREE.Scene();
    
    // Настраиваем камеру
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.z = 500;
    camera.position.y = 200;
    
    // Создаем рендерер
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Добавляем управление орбитой
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Создаем звездное небо
    createStarField();
    
    // Создаем планеты
    Object.keys(planetTextures).forEach(planetName => {
        createPlanet(planetName);
    });
    
    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 2, 1000);
    scene.add(sunLight);
    
    // Запускаем анимацию
    animate();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', onWindowResize, false);
    
    // Обработчик изменения скорости вращения
    document.getElementById('rotation-speed').addEventListener('input', (e) => {
        rotationSpeed = parseFloat(e.target.value);
    });
}

function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });
    
    const starVertices = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function createPlanet(planetName) {
    const geometry = new THREE.SphereGeometry(planetSizes[planetName], 32, 32);
    
    textureLoader.load(planetTextures[planetName], (texture) => {
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 5
        });
        
        const planet = new THREE.Mesh(geometry, material);
        
        // Располагаем планету на орбите
        planet.position.x = planetDistances[planetName];
        
        planets[planetName] = planet;
        scene.add(planet);
        
        // Создаем орбиту
        if (planetName !== 'sun') {
            const orbitGeometry = new THREE.BufferGeometry();
            const orbitMaterial = new THREE.LineBasicMaterial({
                color: 0x666666,
                transparent: true,
                opacity: 0.3
            });
            
            const orbitPoints = [];
            for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
                const angle = (i / ORBIT_SEGMENTS) * Math.PI * 2;
                const x = Math.cos(angle) * planetDistances[planetName];
                const z = Math.sin(angle) * planetDistances[planetName];
                orbitPoints.push(new THREE.Vector3(x, 0, z));
            }
            
            orbitGeometry.setFromPoints(orbitPoints);
            const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
            orbitLines[planetName] = orbitLine;
            scene.add(orbitLine);
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    // Вращаем планеты
    Object.keys(planets).forEach(planetName => {
        const planet = planets[planetName];
        if (planet) {
            // Вращение вокруг своей оси
            planet.rotation.y += planetRotationSpeeds[planetName] * rotationSpeed;
            
            // Вращение вокруг Солнца
            if (planetName !== 'sun') {
                const angle = Date.now() * 0.001 * planetRotationSpeeds[planetName] * rotationSpeed;
                planet.position.x = Math.cos(angle) * planetDistances[planetName];
                planet.position.z = Math.sin(angle) * planetDistances[planetName];
            }
        }
    });
    
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function resetCamera() {
    camera.position.set(0, 200, 500);
    camera.lookAt(0, 0, 0);
    controls.reset();
}

export function focusOnPlanet(planetName) {
    const planet = planets[planetName];
    if (planet) {
        const distance = planetSizes[planetName] * 5;
        const position = new THREE.Vector3();
        planet.getWorldPosition(position);
        
        // Анимируем перемещение камеры
        const startPosition = camera.position.clone();
        const targetPosition = position.clone().add(new THREE.Vector3(distance, distance/2, distance));
        
        const startLookAt = controls.target.clone();
        const endLookAt = position.clone();
        
        const duration = 1000; // миллисекунды
        const startTime = Date.now();
        
        function updateCamera() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Используем плавную функцию перехода
            const easeProgress = 1 - Math.cos((progress * Math.PI) / 2);
            
            camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
            controls.target.lerpVectors(startLookAt, endLookAt, easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(updateCamera);
            }
        }
        
        updateCamera();
    }
}
