import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { planetData } from './planetData.js';

let scene, camera, renderer, controls;
const planets = {};
const orbits = {};

// Константы для размеров и расстояний
const PLANET_SCALE = {
    sun: 50,
    mercury: 3.8,
    venus: 9.5,
    earth: 10,
    mars: 5.3,
    jupiter: 30,
    saturn: 25,
    uranus: 15,
    neptune: 14.5,
    pluto: 2.5
};

const ORBIT_DISTANCES = {
    mercury: 80,
    venus: 120,
    earth: 160,
    mars: 200,
    jupiter: 280,
    saturn: 350,
    uranus: 420,
    neptune: 490,
    pluto: 550
};

function init() {
    // Создаем сцену
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Настраиваем камеру
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 300;
    camera.position.y = 100;

    // Создаем рендерер
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Добавляем контроллер орбиты
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
    scene.add(pointLight);

    createPlanets();
    createStarField();
    animate();

    // Обработчик изменения размера окна
    window.addEventListener('resize', onWindowResize, false);
}

function createPlanets() {
    // Загружаем текстуры
    const textureLoader = new THREE.TextureLoader();

    // Создаем Солнце
    const sunGeometry = new THREE.SphereGeometry(PLANET_SCALE.sun, 32, 32);
    const sunTexture = textureLoader.load('textures/sun.jpg');
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    planets.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(planets.sun);

    // Создаем остальные планеты
    Object.entries(planetData).forEach(([name, data]) => {
        if (name === 'sun') return; // Пропускаем солнце, так как оно уже создано

        // Создаем планету
        const geometry = new THREE.SphereGeometry(PLANET_SCALE[name], 32, 32);
        const texture = textureLoader.load(`textures/${name}.jpg`);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            metalness: 0.1,
            roughness: 0.8
        });
        
        planets[name] = new THREE.Mesh(geometry, material);
        
        // Создаем орбиту
        const orbitGeometry = new THREE.RingGeometry(ORBIT_DISTANCES[name], ORBIT_DISTANCES[name] + 0.1, 128);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x666666,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        orbits[name] = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbits[name].rotation.x = Math.PI / 2;
        scene.add(orbits[name]);
        scene.add(planets[name]);
    });
}

function createStarField() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.5,
        sizeAttenuation: false
    });

    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

function updatePlanetPositions(time) {
    Object.entries(planets).forEach(([name, planet]) => {
        if (name === 'sun') return;

        const orbit = ORBIT_DISTANCES[name];
        const speed = 1 / Math.sqrt(orbit); // Скорость обратно пропорциональна корню расстояния
        
        planet.position.x = Math.cos(time * speed) * orbit;
        planet.position.z = Math.sin(time * speed) * orbit;
        
        // Вращение планет вокруг своей оси
        planet.rotation.y += 0.01 / Math.sqrt(orbit);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.0001;
    updatePlanetPositions(time);
    
    controls.update();
    renderer.render(scene, camera);
}

// Функция для сброса камеры в начальное положение
function resetCamera() {
    camera.position.set(0, 100, 300);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
}

// Функция для фокусировки на планете
function focusOnPlanet(planetName) {
    const planet = planets[planetName];
    if (planet) {
        const distance = PLANET_SCALE[planetName] * 5;
        camera.position.set(
            planet.position.x + distance,
            distance / 2,
            planet.position.z + distance
        );
        controls.target.copy(planet.position);
        controls.update();
    }
}

// Экспортируем необходимые функции
export { init, resetCamera, focusOnPlanet };
