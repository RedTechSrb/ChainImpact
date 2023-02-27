import { useEffect, useState } from "react";
import { Joke } from "../models/Joke";
import axios from 'axios';

export function useGetRandomJoke(url: string) {
    const [joke, setJoke] = useState< Joke | null >(null);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                const jokeData = response.data as Joke;
                setJoke(jokeData)
            })
    }, [url])

    return joke;
}