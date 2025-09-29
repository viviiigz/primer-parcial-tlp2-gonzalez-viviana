import { validationResult } from "express-validator";
import { signToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role, profile } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
      profile: {
        employee_number: profile.employee_number,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
      },
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user: newUser.username,
    });
    // TODO: crear usuario con password hasheada y profile embebido
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      email: email,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        msg: "El email o la contraseña no coinciden",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }
    const token = signToken({
      id: user._id,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const userConProfile = await UserModel.findById(userId).select("-password");

    if (!userConProfile) {
      return res.status(404).json({
        message: "Usuario asociado al token no encontrado en la base de datos.",
      });
    }
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json(userConProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
   try {
    res.clearCookie("token");
    return res.json({
      msg: "Logout exitoso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};