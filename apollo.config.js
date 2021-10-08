module.exports = {
  client: {
    service: {
      name: 'instaclone3-backend',
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://na-instaclone-3.herokuapp.com/graphql/'
          : 'http://localhost:4000/graphql',
    },
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
  },
};
