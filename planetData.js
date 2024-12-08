export const planetData = {
    sun: {
        name: 'SUN',
        type: 'Star',
        description: 'The Sun is the star at the center of the Solar System.',
        parameters: {
            mass: '1.989 × 10^30 kg',
            diameter: '1,392,684 km',
            temperature: '5,778 K (surface)',
            rotation: '27 Earth days'
        },
        facts: [
            'The Sun contains 99.86% of the Solar System\'s mass',
            'The Sun\'s surface temperature is about 10,000 Fahrenheit',
            'The Sun is actually white, not yellow'
        ]
    },
    mercury: {
        name: 'MERCURY',
        type: 'Terrestrial Planet',
        description: 'Mercury is the smallest and innermost planet in the Solar System.',
        parameters: {
            mass: '3.285 × 10^23 kg',
            diameter: '4,879 km',
            temperature: '-180°C to 430°C',
            rotation: '59 Earth days'
        },
        facts: [
            'Mercury has no moons',
            'Mercury is the fastest planet',
            'Mercury has the most eccentric orbit'
        ]
    },
    venus: {
        name: 'VENUS',
        type: 'Terrestrial Planet',
        description: 'Venus is the second planet from the Sun and the hottest planet in our solar system.',
        parameters: {
            mass: '4.867 × 10^24 kg',
            diameter: '12,104 km',
            temperature: '462°C',
            rotation: '243 Earth days'
        },
        facts: [
            'Venus rotates backwards',
            'Venus has the longest day of any planet',
            'Venus is the hottest planet'
        ]
    },
    earth: {
        name: 'EARTH',
        type: 'Terrestrial Planet',
        description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life.',
        parameters: {
            mass: '5.972 × 10^24 kg',
            diameter: '12,742 km',
            temperature: '-88°C to 58°C',
            rotation: '24 hours'
        },
        facts: [
            'Earth is the only planet not named after a god',
            'Earth is the only planet known to have life',
            'Earth has one natural satellite - the Moon'
        ]
    },
    mars: {
        name: 'MARS',
        type: 'Terrestrial Planet',
        description: 'Mars is the fourth planet from the Sun and is often called the Red Planet.',
        parameters: {
            mass: '6.39 × 10^23 kg',
            diameter: '6,779 km',
            temperature: '-140°C to 20°C',
            rotation: '24 hours 37 minutes'
        },
        facts: [
            'Mars has the largest volcano in the solar system',
            'Mars has two moons',
            'Mars has the largest dust storms in the solar system'
        ]
    },
    jupiter: {
        name: 'JUPITER',
        type: 'Gas Giant',
        description: 'Jupiter is the fifth planet from the Sun and the largest planet in our Solar System.',
        parameters: {
            mass: '1.898 × 10^27 kg',
            diameter: '139,820 km',
            temperature: '-110°C',
            rotation: '10 hours'
        },
        facts: [
            'Jupiter has the shortest day of any planet',
            'Jupiter has the Great Red Spot',
            'Jupiter has at least 79 moons'
        ]
    },
    saturn: {
        name: 'SATURN',
        type: 'Gas Giant',
        description: 'Saturn is the sixth planet from the Sun and is famous for its rings.',
        parameters: {
            mass: '5.683 × 10^26 kg',
            diameter: '116,460 km',
            temperature: '-140°C',
            rotation: '10.7 hours'
        },
        facts: [
            'Saturn has the most extensive rings in the solar system',
            'Saturn has 82 confirmed moons',
            'Saturn is the least dense planet'
        ]
    },
    uranus: {
        name: 'URANUS',
        type: 'Ice Giant',
        description: 'Uranus is the seventh planet from the Sun and rotates on its side.',
        parameters: {
            mass: '8.681 × 10^25 kg',
            diameter: '50,724 km',
            temperature: '-195°C',
            rotation: '17 hours 14 minutes'
        },
        facts: [
            'Uranus rotates on its side',
            'Uranus has 27 known moons',
            'Uranus is the coldest planet in the solar system'
        ]
    },
    neptune: {
        name: 'NEPTUNE',
        type: 'Ice Giant',
        description: 'Neptune is the eighth planet from the Sun and the windiest planet in our Solar System.',
        parameters: {
            mass: '1.024 × 10^26 kg',
            diameter: '49,244 km',
            temperature: '-200°C',
            rotation: '16 hours'
        },
        facts: [
            'Neptune has the strongest winds in the solar system',
            'Neptune has 14 known moons',
            'Neptune has only been visited by one spacecraft'
        ]
    },
    pluto: {
        name: 'PLUTO',
        type: 'Dwarf Planet',
        description: 'Pluto is a dwarf planet in the Kuiper belt.',
        parameters: {
            mass: '1.303 × 10^22 kg',
            diameter: '2,377 km',
            temperature: '-230°C',
            rotation: '6.4 Earth days'
        },
        facts: [
            'Pluto was once considered the ninth planet',
            'Pluto has 5 known moons',
            'Pluto is smaller than Earth\'s moon'
        ]
    }
};
