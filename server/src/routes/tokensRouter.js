const { Router } = require('express');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../config/cookiesConfig');

const tokensRouter = Router();

tokensRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });
  res
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .status(200)
    .json({ accessToken, user: res.locals.user });
});

module.exports = tokensRouter;
