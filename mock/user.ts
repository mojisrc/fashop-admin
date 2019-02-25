function login(req, res) {
  const { username, password } = req.body;
  res.json({
    status: 200,
    data: {
      token: `${username}_token`
    },
    message: 'success'
  });
  res.status(200).end();
}

export default {
  'POST /user/login': login,
};
