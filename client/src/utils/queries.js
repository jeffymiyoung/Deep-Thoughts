// Imports
import { gql } from '@apollo/client';

// Query Thought Export
export const QUERY_THOUGHTS = gql`
    query thoughts($username: String) {
        thoughts(username: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username 
                reactionBody
            }
        }
    }
`;