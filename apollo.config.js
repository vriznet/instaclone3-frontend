module.exports = {
  client: {
    service: {
      name: 'instaclone3-backend',
      url: 'http://localhost:4000/graphql',
    },
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
  },
};
