import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri:"http://localhost:5001/api/idolized-hydra",
    // uri: "https://gonzalez.stepzen.net/api/idolized-hydra/__graphql",
    header: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
    },
    cache: new InMemoryCache(),
});

export default client;