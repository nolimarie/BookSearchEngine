import gql from 'gql';

export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
          bookId
          authors
          title
          description
          image
          link
        }
      }
    }
  `;