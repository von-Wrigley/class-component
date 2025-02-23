import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface Person {
    count: number;
    next: string;
    previous: null;
    results: DeatilesPerson[];
  }
  interface DeatilesPerson {
    birth_year?: string;
    created?: string;
    edited?: string;
    eye_color?: string;
    films?: string[];
    gender?: string;
    hair_color?: string;
    height?: string;
    homeworld?: string;
    mass?: string;
    name?: string;
    skin_color?: string;
    species?: string[];
    starships?: string[];
    url?: string;
    vehicles?: string[];
  }

  
export const starWarsApi = createApi({
    reducerPath: 'starWarsApi',
    baseQuery: fetchBaseQuery({baseUrl: "https://swapi.dev/api/"}),
    endpoints: (builder) => ({
      getPeople: builder.query<Person, number>({
        query: (pageNumber=1)=> `people/?page=${pageNumber}`
      }),
 
 
    
    })


}

)

export const {useGetPeopleQuery} = starWarsApi

