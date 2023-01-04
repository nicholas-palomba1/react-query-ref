import React from 'react'; 
import { useQuery } from 'react-query';
import axios from 'axios'; 

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const RQSuperHeroesPage = () => {
    // two parameters: unique key that identify the query, function that returns a promise ( the get request ), cache time is the secret third property (measured in milliseconds) of the secret third object parameter (ex. cacheTime: 5000)
    const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
        'super-heroes', 
        fetchSuperHeroes,
        {
            staleTime: 300000,
            refetchOnMount: true,
            // refetchOnWindowFocus: true == this is the default setting for data fetching, when using react query it will always refresh and syncrhonise the window with the updated remote data 
            // refetchInterval: 20000 == this will cause the rq to re fetch the data every 20 seconds, this can be adjusted for your needs
            // refetchIntervalInBackground: true == will refetch constantly update data even when window in question isn't in focus
            enabled: false
        }
    )

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
           <h2>RQ Super Heroes Page</h2>
           <button onClick={refetch}>Fetch Heroes</button>
           {
               data?.data.map((hero)=> {
                return <div key={hero.name}>{hero.name}</div>
               })
           }

        </div>
    )
}

export default RQSuperHeroesPage