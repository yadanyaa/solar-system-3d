// Импорты Three.js и зависимостей
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

// Основные переменные
let scene, camera, renderer, controls;
const textureLoader = new THREE.TextureLoader();
const planets = new Map();
let starField;

// Создание звездного поля
function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        map: createStarTexture(),
        blending: THREE.AdditiveBlending
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 1000;
        const y = (Math.random() - 0.5) * 1000;
        const z = (Math.random() - 0.5) * 1000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
}

// Создание текстуры для звезд
function createStarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Создание солнечной короны
function createSunCorona() {
    const coronaGeometry = new THREE.PlaneGeometry(30, 30);
    const coronaMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec2 vUv;
            
            float noise(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
            
            void main() {
                vec2 center = vUv - 0.5;
                float dist = length(center);
                float alpha = smoothstep(0.5, 0.2, dist);
                float noise = noise(center + time);
                vec3 color = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.8, 0.0), noise);
                gl_FragColor = vec4(color, alpha * (1.0 - dist * 2.0));
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });

    const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
    corona.lookAt(camera.position);
    planets.get('sun').add(corona);
    return corona;
}

// Инициализация сцены
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2, 300);
    scene.add(sunLight);

    createStarField();
    createPlanets();
    const corona = createSunCorona();

    // Добавляем обработчики событий для планет
    document.querySelectorAll('.planet-item').forEach(item => {
        item.addEventListener('click', () => {
            const planetName = item.dataset.planet;
            focusOnPlanet(planetName);
            showPlanetInfo(planetName);
        });
    });

    window.addEventListener('resize', onWindowResize, false);
}

// Фокус камеры на планете
function focusOnPlanet(planetName) {
    const planet = planets.get(planetName);
    if (!planet) return;

    const distance = planetName === 'sun' ? 20 : 10;
    const targetPosition = new THREE.Vector3();
    planet.getWorldPosition(targetPosition);

    const offset = new THREE.Vector3(distance, distance/2, distance);
    const targetCameraPosition = targetPosition.clone().add(offset);

    new TWEEN.Tween(camera.position)
        .to(targetCameraPosition, 2000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();

    new TWEEN.Tween(controls.target)
        .to(targetPosition, 2000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
}

function createPlanets() {
    // Солнце
    const sunTexture = textureLoader.load('textures/sun.jpg');
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        map: sunTexture,
        emissive: 0xffff00,
        emissiveIntensity: 0.5
    });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), sunMaterial);
    scene.add(sun);
    planets.set('sun', sun);

    // Массив данных о планетах
    const planetData = [
        { 
            name: 'mercury', 
            size: 0.383, 
            distance: 8, 
            texture: 'textures/mercury.jpg',
            type: 'Планета',
            description: 'Меркурий — самая близкая к Солнцу планета Солнечной системы.',
            parameters: {
                mass: '3,3022×10^23 кг',
                diameter: '4879,4 км',
                temperature: '-173°C',
                rotation: '58,6 земных суток'
            },
            facts: [
                'Меркурий — самая маленькая планета Солнечной системы.',
                'Меркурий имеет очень тонкую атмосферу.',
                'Меркурий имеет большое железное ядро.'
            ]
        },
        { 
            name: 'venus', 
            size: 0.949, 
            distance: 12, 
            texture: 'textures/venus.jpg',
            type: 'Планета',
            description: 'Венера — вторая планета от Солнца и шестая по размеру планета Солнечной системы.',
            parameters: {
                mass: '4,8695×10^24 кг',
                diameter: '12103,6 км',
                temperature: '462°C',
                rotation: '243 земных суток'
            },
            facts: [
                'Венера — самая горячая планета Солнечной системы.',
                'Венера имеет очень плотную атмосферу.',
                'Венера имеет множество вулканов.'
            ]
        },
        { 
            name: 'earth', 
            size: 1, 
            distance: 16, 
            texture: 'textures/earth.jpg',
            type: 'Планета',
            description: 'Земля — третья планета от Солнца и пятая по размеру планета Солнечной системы.',
            parameters: {
                mass: '5,9723×10^24 кг',
                diameter: '12756 км',
                temperature: '15°C',
                rotation: '24 часа'
            },
            facts: [
                'Земля — единственная известная планета с жизнью.',
                'Земля имеет большое количество воды.',
                'Земля имеет атмосферу, состоящую из 78% азота и 21% кислорода.'
            ]
        },
        { 
            name: 'mars', 
            size: 0.532, 
            distance: 20, 
            texture: 'textures/mars.jpg',
            type: 'Планета',
            description: 'Марс — четвёртая планета от Солнца и седьмая по размеру планета Солнечной системы.',
            parameters: {
                mass: '6,4171×10^23 кг',
                diameter: '6794 км',
                temperature: '-67°C',
                rotation: '24,6 часа'
            },
            facts: [
                'Марс — имеет самые высокие вулканы в Солнечной системе.',
                'Марс — имеет самые длинные каньоны в Солнечной системе.',
                'Марс — имеет тонкую атмосферу.'
            ]
        },
        { 
            name: 'jupiter', 
            size: 11.209, 
            distance: 28, 
            texture: 'textures/jupiter.jpg',
            type: 'Газовый гигант',
            description: 'Юпитер — пятая планета от Солнца и самая большая планета Солнечной системы.',
            parameters: {
                mass: '1,8986×10^27 кг',
                diameter: '142984 км',
                temperature: '-150°C',
                rotation: '9,9 часов'
            },
            facts: [
                'Юпитер — самая большая планета Солнечной системы.',
                'Юпитер — имеет самую мощную атмосферу в Солнечной системе.',
                'Юпитер — имеет множество спутников.'
            ]
        },
        { 
            name: 'saturn', 
            size: 9.449, 
            distance: 36, 
            texture: 'textures/saturn.jpg',
            type: 'Газовый гигант',
            description: 'Сатурн — шестая планета от Солнца и вторая по размеру планета Солнечной системы.',
            parameters: {
                mass: '5,6846×10^26 кг',
                diameter: '116460 км',
                temperature: '-178°C',
                rotation: '10,5 часов'
            },
            facts: [
                'Сатурн — известен своими кольцами.',
                'Сатурн — имеет самую низкую плотность среди планет Солнечной системы.',
                'Сатурн — имеет множество спутников.'
            ]
        },
        { 
            name: 'uranus', 
            size: 4.007, 
            distance: 44, 
            texture: 'textures/uranus.jpg',
            type: 'Ледяной гигант',
            description: 'Уран — седьмая планета от Солнца и третья по размеру планета Солнечной системы.',
            parameters: {
                mass: '8,6810×10^25 кг',
                diameter: '50724 км',
                temperature: '-216°C',
                rotation: '17,9 часов'
            },
            facts: [
                'Уран — имеет самую наклонную ось вращения среди планет Солнечной системы.',
                'Уран — имеет тонкую атмосферу.',
                'Уран — имеет множество спутников.'
            ]
        },
        { 
            name: 'neptune', 
            size: 3.883, 
            distance: 52, 
            texture: 'textures/neptune.jpg',
            type: 'Ледяной гигант',
            description: 'Нептун — восьмая планета от Солнца и четвертая по размеру планета Солнечной системы.',
            parameters: {
                mass: '1,0243×10^26 кг',
                diameter: '49528 км',
                temperature: '-224°C',
                rotation: '18,1 часа'
            },
            facts: [
                'Нептун — имеет самую сильную ветерную систему в Солнечной системе.',
                'Нептун — имеет тонкую атмосферу.',
                'Нептун — имеет множество спутников.'
            ]
        },
        { 
            name: 'pluto', 
            size: 0.18, 
            distance: 60, 
            texture: 'textures/pluto.jpg',
            type: 'Карликовая планета',
            description: 'Плутон — карликовая планета в поясе Койпера.',
            parameters: {
                mass: '1,305×10^22 кг',
                diameter: '2374 км',
                temperature: '-233°C',
                rotation: '6,4 суток'
            },
            facts: [
                'Плутон — имеет очень тонкую атмосферу.',
                'Плутон — имеет пять спутников.',
                'Плутон — имеет очень холодную поверхность.'
            ]
        }
    ];

    planetData.forEach(data => {
        const texture = textureLoader.load(data.texture);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            metalness: 0.1,
            roughness: 0.8
        });
        
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(data.size, 32, 32),
            material
        );
        
        planet.position.x = data.distance;
        scene.add(planet);
        planets.set(data.name, planet);

        // Добавление орбиты с градиентом
        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 128);
        const orbitMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color(0x666666) },
                color2: { value: new THREE.Color(0x222222) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec2 vUv;
                void main() {
                    gl_FragColor = vec4(mix(color1, color2, vUv.x), 0.2);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);
    });
}

// Функция для отображения информации о планете
function showPlanetInfo(planetName) {
    const planet = planetData.find(data => data.name === planetName);
    if (!planet) return;

    const infoPanel = document.querySelector('.planet-info');
    infoPanel.querySelector('h2').textContent = planet.name.toUpperCase();
    
    // Заполняем вкладки информацией
    document.getElementById('general').innerHTML = `
        <h3>${planet.type}</h3>
        <p>${planet.description}</p>
    `;

    document.getElementById('parameters').innerHTML = `
        <div class="parameter">
            <label>Mass:</label>
            <span>${planet.parameters.mass}</span>
        </div>
        <div class="parameter">
            <label>Diameter:</label>
            <span>${planet.parameters.diameter}</span>
        </div>
        <div class="parameter">
            <label>Temperature:</label>
            <span>${planet.parameters.temperature}</span>
        </div>
        <div class="parameter">
            <label>Rotation:</label>
            <span>${planet.parameters.rotation}</span>
        </div>
    `;

    document.getElementById('facts').innerHTML = `
        <ul>
            ${planet.facts.map(fact => `<li>${fact}</li>`).join('')}
        </ul>
    `;

    // Показываем панель
    infoPanel.classList.add('active');
}

// Добавляем обработчики событий
document.querySelectorAll('.planet-item').forEach(item => {
    item.addEventListener('click', () => {
        const planetName = item.dataset.planet;
        focusOnPlanet(planetName);
        showPlanetInfo(planetName);
    });
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.planet-info').classList.remove('active');
});

// Обработка вкладок
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех вкладок
        document.querySelectorAll('.tab-btn').forEach(btn => 
            btn.classList.remove('active')
        );
        document.querySelectorAll('.tab-pane').forEach(pane => 
            pane.classList.remove('active')
        );
        
        // Добавляем активный класс выбранной вкладке
        button.classList.add('active');
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Обновление звездного поля
    if (starField) {
        starField.rotation.y += 0.0001;
    }

    // Обновление солнечной короны
    const corona = planets.get('sun').children[0];
    if (corona && corona.material.uniforms) {
        corona.material.uniforms.time.value += 0.01;
        corona.lookAt(camera.position);
    }

    // Вращение планет
    planets.forEach((planet, name) => {
        if (name !== 'sun') {
            const time = Date.now() * 0.0001;
            const distance = planet.position.length();
            planet.position.x = Math.cos(time * (1 / distance) * 5) * distance;
            planet.position.z = Math.sin(time * (1 / distance) * 5) * distance;
            planet.rotation.y += 0.01 / (distance * 0.1);
        }
    });

    TWEEN.update();
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
