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
    name: string
    model: string
    manufacturer: string
    cost_in_credits: number
    length: number
    max_atmosphering_speed: string
    crew: number
    passengers: number
    cargo_capacity: number
    consumables: string
    hyperdrive_rating: number
    MGLT: number
    starship_class: string
    pilots: string[]
    films: string[]
}
