import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = (user, createTokenSecret, refreshTokenSecret) => {
  const token = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    createTokenSecret,
    {
      expiresIn: '1h',
    },
  );

  const refreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    refreshTokenSecret,
    {
      expiresIn: '7d',
    },
  );

  return {
    token,
    refreshToken,
  };
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let userId = null;

  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  const REFRESH_TOKEN_SECRET = `${user.password}${SECRET}`;

  try {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch (err) {
    return {};
  }

  const {
    token: newToken,
    refreshToken: newRefreshToken,
  } = createTokens(user, SECRET, REFRESH_TOKEN_SECRET);

  return {
    user,
    token: newToken,
    refreshToken: newRefreshToken,
  };
};

export const tryLogin = async (
  email,
  password,
  models,
  SECRET,
) => {
  const user = await models.User.findOne({ where: { email }, raw: true });
  const error = {
    ok: false,
    errors: [{
      path: 'login',
      message: 'Invalid email or password',
    }],
  };

  if (!user) {
    return error;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return error;
  }

  const REFRESH_TOKEN_SECRET = `${user.password}${SECRET}`;

  const { token, refreshToken } = createTokens(user, SECRET, REFRESH_TOKEN_SECRET);

  return {
    ok: true,
    token,
    refreshToken,
  };
};
