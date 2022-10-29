import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation add_post_mutation(
        $body: String!
        $image: String!
        $subrddit_id: ID!
        $title: String!
        $username: String!
    ){
        insertPost(
        body: $body
        image: $image
        subrddit_id:$subrddit_id
        title:$title
        username:$username
        ){
        body
        created_at
        id
        image
        subrddit_id
        title
        username
        }
    }
`;


export const ADD_SUBREDDIT = gql`
    mutation add_subreddit_mutation(
        $topic: String!
    ){
        insertSubreddit(
        topic: $topic
        ){
        created_at
        id
        topic
        }
    }
`;
