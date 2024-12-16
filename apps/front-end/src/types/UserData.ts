export type UserData = {
    id: string,
    favourite_cities: string[]
}

export type PostFavouriteCity = {
    city: string,
    value: boolean
};

export type PatchFavouriteCity = {
    id: string,
    data: PostFavouriteCity
};


export type UserCookie = {
    id: string
};

export type RegisUserProp = {
    username: string,
    password: string
}

export type RegisUserErrorProp = {
    username: string[],
    password: string[]
};

export type RegisUserErrorApiProp = {
    message: string[];
}