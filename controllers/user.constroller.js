const db = require("../models");
const { ReS, ReF } = require("../utils/util.service");
const uuidv4 = require("uuid").v4;
const createUser = async (req, res) => {
  try {
    address = req.body.address;
    password = req.body.password;
    if (!address) {
      return ReF(res, 200, "Missing address");
    }
    action = await db.User.create({
      address: address,
      token: uuidv4(),
      password: password,
    });

    if (action) {
      return ReS(res, 200, action);
    }
    return ReF(res, 200, "create false");
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
const getUserByAddress = async (req, res) => {
  try {
    address = req.query.address;
    if (!address) {
      return ReF(res, 200, "Missing address");
    }
    action = await db.User.findOne({
      where: { address: address },
      attributes: { exclude: ["password"] },
    });

    if (action) {
      return ReS(res, 200, action);
    }
    return ReF(res, 200, "Can not user");
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const loginSocial = async (req, res) => {
  try {
    address = req.body.address;
    typeSocial = req.body.typeSocial;
    if (!address || !typeSocial) {
      return ReF(res, 200, "Missing input");
    }
    user = await db.User.findOne({
      where: { address: address },
    });
    if (!user) {
      return ReF(res, 200, "Can not user");
    }

    switch (typeSocial) {
      case "twitter":
        action = await db.User.update(
          { twitterId: "123456", twitterUsername: "huan Lai" },
          {
            where: { id: user.id },
          }
        );
        return ReS(res, 200, action);
      case "discord":
        action = await db.User.update(
          { discordId: "12456" },
          {
            where: { id: user.id },
          }
        );
        return ReS(res, 200, action);
      case "telegram":
        action = await db.User.update(
          { telegramId: "12456" },
          {
            where: { id: user.id },
          }
        );
        return ReS(res, 200, action);
      default:
        return ReF(res, 200, "type error");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const verifySocial = async (req, res) => {
  try {
    address = req.body.address;
    typeSocial = req.body.typeSocial;
    if (!address || !typeSocial) {
      return ReF(res, 200, "Missing input");
    }
    user = await db.User.findOne({
      where: { address: address },
    });

    if (!user) {
      return ReF(res, 200, "Can not user");
    }
    social = await db.Social.findOne({
      where: { user_id: user.id },
    });

    switch (typeSocial) {
      case "twitter":
        if (user.twitterId) {
          if (social) {
            action = await db.Social.update(
              { joinTwitter: true },
              {
                where: { user_id: user.id },
              }
            );
            return ReS(res, 200, action);
          } else {
            action = await db.Social.create({
              user_id: user.id,
              joinTwitter: true,
            });
            return ReS(res, 200, action);
          }
        } else {
          return ReF(res, 200, "Twitter can not login");
        }
      case "discord":
        if (user.discordId) {
          if (social) {
            action = await db.Social.update(
              { joinVibxDiscord: true },
              {
                where: { user_id: user.id },
              }
            );
            return ReS(res, 200, action);
          } else {
            action = await db.Social.create({
              user_id: user.id,
              joinVibxDiscord: true,
            });
            return ReS(res, 200, action);
          }
        } else {
          return ReF(res, 200, "Twitter can not login");
        }
      case "telegram":
        if (user.telegramId) {
          if (social) {
            action = await db.Social.update(
              { joinChannelTelegram: true },
              {
                where: { user_id: user.id },
              }
            );
            return ReS(res, 200, action);
          } else {
            action = await db.Social.create({
              user_id: user.id,
              joinChannelTelegram: true,
            });
            return ReS(res, 200, action);
          }
        } else {
          return ReF(res, 200, "Twitter can not login");
        }
      default:
        return ReF(res, 200, "type error");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const getSocialByAddress = async (req, res) => {
  try {
    address = req.query.address;
    if (!address) {
      return ReF(res, 200, "Missing address");
    }
    user = await db.User.findOne({
      where: { address: address },
    });
    if (!user) {
      return ReF(res, 200, "Can not user");
    }
    action = await db.Social.findOne({
      where: { user_id: user.id },
    });

    if (action) {
      return ReS(res, 200, action);
    }
    return ReF(res, 200, "Can not Social");
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
module.exports = {
  createUser,
  getUserByAddress,
  loginSocial,
  verifySocial,
  getSocialByAddress,
};
