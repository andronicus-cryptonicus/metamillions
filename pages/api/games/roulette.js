const auth = require('../middleware/auth');

export default async function handler(req, res) {
  const token = auth(req);

  // Check the user is legit
  return res.status(200).send(30);
}
