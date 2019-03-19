function login(req, res) {
  const { username, password } = req.body;
  res.json({
    code: 0,
    result: {
      access_token: `${username}_token`
    },
    msg: 'success'
  });
  res.status(200).end();
}

export default {
  'POST /admin/member/login': login,
};
