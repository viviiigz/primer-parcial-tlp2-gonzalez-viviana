export const registerValidation = [
    //validar ell campo username
    body('username')
    .trim()
    .notEmpty().withMessage('El username es obligatorio')
    .isLength({min: 3, max: 20}).withMessage('El username debe contener entre 3 y 20 caracteres')
    .custom(async(value)=>{
        const user = await UserModel.findOne({ username: value});
        if (user) {
            throw new Error('El username ya está en uso')
        }
    }),
    //vañidar el email
    body('email')
    .trim()
    .isEmail().withMessage('El formato del email no es válido')
    .normalizeEmail()
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error('El email ya está en uso');
      }
    }),

    //validar el password
    body('password')
    .isLength({min :8}).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe tener al menos una mayúscula, una minúscula y un número'),

    //validar el role
    body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Rol inválido, solo puede ser "admin" o "user"')

  // TODO: completar las validaciones para el registro
];

export const loginValidation = [
  // TODO: completar las validaciones para el login
];
