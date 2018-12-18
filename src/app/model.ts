//interface codes here

export interface People {
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: string[],
    species: string[],
    vehicles: string[],
    starships: string[],
}

export interface Planet {
    name: string
    rotation_period: number
    orbital_period: number
    diameter: number
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
    residents: string[]
    films: string[]
}

export interface Film {
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    characters: string[]
    planets: string[]
    starship: string[]
    vehicle: string[]
    species: string[]
}

export interface Species {
    name: string
    classification: string
    designation: string
    average_height: number
    skin_colors: string
    hair_colors: string
    eye_colors: string
    average_lifespan: number
    homeworld: string
    language: string
    people: string[]
    films: string[]
}

export interface Vehicle {
    name: string
    model: string
    manufacturer: string
    cost_in_credits: number
    length: number
    max_atmosphering_speed: number
    crew: number
    passengers: number
    cargo_capacity: number
    consumables: string
    vehicle_class: string
    pilots: string[]
    films: string[]
}

export interface Starship {
    "name": "Executor",
    "model": "Executor-class star dreadnought",
    "manufacturer": "Kuat Drive Yards, Fondor Shipyards",
    "cost_in_credits": "1143350000",
    "length": "19000",
    "max_atmosphering_speed": "n/a",
    "crew": "279144",
    "passengers": "38000",
    "cargo_capacity": "250000000",
    "consumables": "6 years",
    "hyperdrive_rating": "2.0",
    "MGLT": "40",
    "starship_class": "Star dreadnought",
    pilots: string[],
    "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/3/"
    ],
}
