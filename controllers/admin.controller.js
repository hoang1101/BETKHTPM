const db = require("../models");
const { ReE, ReS } = require("../utils/util.service");

exports.editProfileByAdmin = async (req, res) => {
  try {
    const { id, fullname, email, phone, address, gender, birthday, roleId } =
      req.body;
    const ktphone = await CheckPhone(phone);
    const ktemail = await CheckEmail(email);
    if (ktphone) {
      return ReF(res, 400, "So dien thoai bi trung !");
    } else if (ktemail) {
      return ReF(res, 400, "Email bi trung !");
    } else {
      const user = await db.Staff.update(
        {
          fullname: fullname,
          gender: gender,
          email: email,
          phone: phone,
          birthday: birthday,
          address: address,
          roleId: roleId,
        },
        {
          where: { id: id },
        }
      );
      if (user) {
        return ReS(res, 200, "Cap nhat thanh cong");
      } else {
        return ReF(res, 400, "That bai");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};
