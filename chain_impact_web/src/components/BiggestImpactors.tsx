import { useEffect, useState } from "react";
import { Joke } from "../models/Joke";
import { useGetRandomJoke } from "../repositories/JokesRepository";

export default function BiggestImpactors(_props: any) {

    const joke = useGetRandomJoke("https://official-joke-api.appspot.com/random_joke");

    return (
        <div>
            {
                joke ? (
                    <>
                        <h4>Joke of the day:</h4>
                            {joke?.setup}
                            {joke?.punchline}
                    </>
                ) : (
                    <>
                        <h4>Loading joke...</h4>
                    </>
                )
            }
        </div>
    );
}