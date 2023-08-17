const bcrypt = require("bcrypt");
const authController = require("../services/auth.service");
const db = require("../models");
const speakeasy = require("speakeasy");
const emailExistence = require("email-existence");
const { findOneUser, findOneUserEmail } = require("../dao/customer.dao");
const { findOneStaff } = require("../dao/staff.dao");
const { ReS, ReE, to } = require("../utils/util.service");
const semail = require("../utils/mailer");
const {
  ContentActiveAccount_vi,
  ContentActiveAccountOTP,
} = require("../template/email");
const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));

exports.loginCustomer = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone || !password)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });

    const customer = await findOneUser(phone);

    const response = await authController.loginService(req.body);
    const token = response.token;
    const mgs = response.msg;
    if (response.success === true) {
      return res.status(200).json({
        success: true,
        token,
        data: customer,
      });
    } else {
      return res.status(200).json({
        success: false,
        mgs,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

/// login Staff
exports.loginStaff = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone || !password)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });

    const customer = await findOneStaff(phone);

    const response = await authController.loginServiceStaff(req.body);
    const token = response.token;
    const mgs = response.msg;
    if (response.success === true) {
      return res.status(200).json({
        success: true,
        token,
        data: customer,
      });
    } else {
      return res.status(400).json({
        success: false,
        mgs,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// register Customer

exports.register = async (req, res) => {
  try {
    const { password, fullname, email, phone, roleId, address } = req.body;
    if (!password || !fullname || !email || !phone)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });
    const response = await authController.registerService(req.body);
    //check eamil có tồn tại không

    if (response.success === true) {
      if (!email) {
        return res.status(404).json({
          success: false,
          msg: "Not Found",
        });
      } else {
        // emailExistence.check(email, async (error, resmail) => {
        //   if (error) {
        //     return ReE(res, "Email không tồn tại", 200, 1000);
        //   }
        //   if (!resmail) {
        //     return ReE(res, "Email không tồn tại", 200, 1000);
        //   } else {
        //     let [err, da] = await to(
        //       sendMail({
        //         to: email,
        //         subject: "Thông báo hệ thống",
        //         body: ContentActiveAccount_vi(fullname),
        //       })
        //     );
        //     if (err) return ReE(res, err, 200, 1000);
        //   }
        // });
        to(
          semail.sendMail({
            to: email,
            subject: "Thông báo hệ thống",
            body: ContentActiveAccount_vi(fullname),
          })
        );
      }

      return res.status(200).json({
        success: true,
        response,
        message: "Gửi mail thành công, vui lòng kiểm tra email",
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Error Register",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// register Staff

exports.registerStaff = async (req, res) => {
  const {
    password,
    fullname,
    email,
    phone,
    roleId,
    address,
    gender,
    birthday,
  } = req.body;
  try {
    if (
      !password ||
      !fullname ||
      !email ||
      !phone ||
      !roleId ||
      !address ||
      !gender ||
      !birthday
    )
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });
    const response = await authController.registerServiceStaff(req.body);

    if (response.success === true) {
      // if (!email) {
      //   return res.status(404).json({
      //     success: false,
      //     msg: "Not Found",
      //   });
      // } else {
      //   emailExistence.check(email, async (error, resmail) => {
      //     if (!resmail) {
      //       return ReE(res, "Email không tồn tại", 200, 1000);
      //     } else {
      //       let [err, da] = await to(
      //         sendMail({
      //           to: email,
      //           subject: "Thông báo hệ thống",
      //           body: ContentActiveAccount_vi(fullname),
      //         })
      //       );
      //       if (err) return ReE(res, err, 200, 1000);
      //     }
      //   });
      // }
      to(
        semail.sendMail({
          to: email,
          subject: "Thông báo hệ thống",
          body: ContentActiveAccount_vi(fullname),
        })
      );
      return res.status(200).json({
        success: true,
        response,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Error Register",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findOneUserEmail(email);

    if (user) {
      // Tạo một mã OTP ngẫu nhiên sử dụng thư viện speakeasy
      const secret = speakeasy.generateSecret({ length: 6 });
      const token = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
      });
      //check eamil có tồn tại không

      if (!email) {
        return res.status(404).json({
          success: false,
          msg: "Not Found",
        });
      } else {
        to(
          semail.sendMail({
            to: email,
            subject: "Kích hoạt tài khoản",
            body: ContentActiveAccountOTP(user.fullname, token),
          })
        );
        return ReS(
          res,
          {
            token: secret.base32,
          },
          200
        );
      }
      // });
      // }
    } else {
      return ReE(res, error);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};

exports.VerifyOTP = (req, res) => {
  const token = req.body.token;
  const otp = req.body.otp;

  // Kiểm tra tính hợp lệ của email và token ở đây

  // Kiểm tra tính hợp lệ của mã OTP
  const verified = speakeasy.totp.verify({
    secret: token,
    encoding: "base32",
    token: otp,
    window: 6,
  });

  if (verified) {
    // Mã OTP đúng, tạo tài khoản mới ở đây
    res.send({ success: true });
  } else {
    // Mã OTP sai
    res.send({ success: false });
  }
};
exports.ResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    //check eamil có tồn tại không

    if (!email) {
      return res.status(404).json({
        success: false,
        msg: "Not Found",
      });
    } else {
      const checkEmail = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (!checkEmail) {
        return res.status(200).json({
          success: false,
          msg: "Không có tài khoản nào có Email này!",
        });
      }
      const secret = speakeasy.generateSecret({ length: 6 });
      const token = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
      });
      // emailExistence.check(email, async (error, resmail) => {
      //   if (!resmail) {
      //     return ReE(res, "mail không tồn tại", 200, 1000);
      //   } else {
      //     let [err, da] = await to(
      //       sendMail({
      //         to: email,
      //         subject: "Subject Active Account",
      //         body: token,
      //       })
      //     );
      //     if (err) return ReE(res, err, 200, 1000);
      to(
        semail.sendMail({
          to: email,
          subject: "Subject Active Account",
          body: token,
        })
      );
      try {
        const updatePassword = await db.User.update(
          { password: hashPassword(token) },
          {
            where: { email: email },
          }
        );
        if (updatePassword) {
          return ReS(
            res,
            {
              msg: "mk mới của bạn đã được gửi về mail của bạn",
            },
            200
          );
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: -1,
          msg: "khong thay đổi được mật khâuw" + error,
        });
      }
    }
    // });
    // }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: -1,
      msg: "Fail at auth controller: " + err,
    });
  }
};
