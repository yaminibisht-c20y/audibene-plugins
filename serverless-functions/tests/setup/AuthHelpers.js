const axios = require('axios').default;

async function getAuth0Token() {
  const authTokenUrl = process.env.AUTH0_ACCESS_TOKEN_URI;
  const authTokenPayload = {
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  };
  return axios
    .post(authTokenUrl, authTokenPayload, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response) => response.data.access_token)
    .catch((e) => {
      console.error(e);
      return 'invalid';
    });
}

module.exports = {
  getAuth0Token,
};
