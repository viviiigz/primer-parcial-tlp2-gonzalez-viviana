import { Router } from "express";
import {
  login,
  logout,
  getProfile,
  register,
} from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../middlewares/validations/auth.validations.js";

import {authMiddleware} from "../middlewares/auth.middleware.js"

export const authRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes (si fuera necesario)

// * registrar un usuario (publico)
authRoutes.post("/auth/register",registerValidation ,register);

// * loguearse (publico)
authRoutes.post("/auth/login",loginValidation,login);

// * obtener perfil (usuario autenticado)
authRoutes.get("/auth/profile", getProfile);

// * cerrar sesión (usuario autenticado)
authRoutes.post("/auth/logout", logout);
