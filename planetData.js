export const planetData = {
    sun: {
        name: "Sun",
        type: "Star",
        description: "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
        facts: [
            "The Sun accounts for 99.86% of the Solar System's mass",
            "The Sun's core can reach temperatures of 15 million °C",
            "Light from the Sun takes about 8 minutes to reach Earth"
        ],
        parameters: {
            mass: "1.989 × 10^30 kg",
            diameter: "1,392,684 km",
            temperature: "5,500°C (surface)",
            rotation: "27 Earth days"
        }
    },
    mercury: {
        name: "Mercury",
        type: "Terrestrial planet",
        description: "Mercury is the smallest and innermost planet in the Solar System. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets.",
        facts: [
            "Mercury has no moons",
            "It has the most eccentric orbit of all planets",
            "Despite being closest to the Sun, Venus is actually hotter"
        ],
        parameters: {
            mass: "3.285 × 10^23 kg",
            diameter: "4,879 km",
            temperature: "-180°C to 430°C",
            rotation: "59 Earth days"
        }
    },
    venus: {
        name: "Venus",
        type: "Terrestrial planet",
        description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's one of the four inner, terrestrial planets.",
        facts: [
            "Venus rotates backwards compared to most planets",
            "It's the hottest planet in our solar system",
            "A day on Venus is longer than its year"
        ],
        parameters: {
            mass: "4.867 × 10^24 kg",
            diameter: "12,104 km",
            temperature: "462°C (average)",
            rotation: "243 Earth days"
        }
    },
    earth: {
        name: "Earth",
        type: "Terrestrial planet",
        description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is the largest of the Solar System's four terrestrial planets.",
        facts: [
            "Earth is the only planet not named after a god",
            "The Earth's core is as hot as the Sun's surface",
            "70% of the Earth's surface is covered in water"
        ],
        parameters: {
            mass: "5.972 × 10^24 kg",
            diameter: "12,742 km",
            temperature: "15°C (average)",
            rotation: "24 hours"
        }
    },
    mars: {
        name: "Mars",
        type: "Terrestrial planet",
        description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often called the 'Red Planet'.",
        facts: [
            "Mars has the largest volcano in the Solar System",
            "Mars has two moons: Phobos and Deimos",
            "Mars experiences frequent dust storms"
        ],
        parameters: {
            mass: "6.39 × 10^23 kg",
            diameter: "6,779 km",
            temperature: "-63°C (average)",
            rotation: "24 hours 37 minutes"
        }
    },
    jupiter: {
        name: "Jupiter",
        type: "Gas giant",
        description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.",
        facts: [
            "Jupiter has the shortest day of all planets",
            "The Great Red Spot is a giant storm that has lasted hundreds of years",
            "Jupiter has at least 79 moons"
        ],
        parameters: {
            mass: "1.898 × 10^27 kg",
            diameter: "139,820 km",
            temperature: "-110°C (cloud top)",
            rotation: "10 hours"
        }
    },
    saturn: {
        name: "Saturn",
        type: "Gas giant",
        description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine and a half times that of Earth.",
        facts: [
            "Saturn's rings are made mostly of ice and rock",
            "Saturn has 82 confirmed moons",
            "Saturn is the least dense planet in the Solar System"
        ],
        parameters: {
            mass: "5.683 × 10^26 kg",
            diameter: "116,460 km",
            temperature: "-140°C (average)",
            rotation: "10.7 hours"
        }
    },
    uranus: {
        name: "Uranus",
        type: "Ice giant",
        description: "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
        facts: [
            "Uranus rotates on its side",
            "It was the first planet discovered with a telescope",
            "Uranus has 27 known moons"
        ],
        parameters: {
            mass: "8.681 × 10^25 kg",
            diameter: "50,724 km",
            temperature: "-195°C (average)",
            rotation: "17 hours"
        }
    },
    neptune: {
        name: "Neptune",
        type: "Ice giant",
        description: "Neptune is the eighth and farthest known Solar planet from the Sun. It is the fourth-largest planet by diameter and the third-most-massive planet.",
        facts: [
            "Neptune has the strongest winds in the Solar System",
            "It has 14 known moons",
            "Neptune takes 165 Earth years to orbit the Sun"
        ],
        parameters: {
            mass: "1.024 × 10^26 kg",
            diameter: "49,244 km",
            temperature: "-214°C (average)",
            rotation: "16 hours"
        }
    },
    pluto: {
        name: "Pluto",
        type: "Dwarf planet",
        description: "Pluto is a dwarf planet in the Kuiper belt. It was the first and largest Kuiper belt object to be discovered.",
        facts: [
            "Pluto was reclassified as a dwarf planet in 2006",
            "It has 5 known moons",
            "Pluto is smaller than Earth's moon"
        ],
        parameters: {
            mass: "1.303 × 10^22 kg",
            diameter: "2,377 km",
            temperature: "-230°C (average)",
            rotation: "6.4 Earth days"
        }
    }
};
