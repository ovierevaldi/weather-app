export type UserData = {
    id: string,
    favourite_cities: string[]
}

export type PostFavouriteCity = {
    id?: string,
    city: string,
    value: boolean
}