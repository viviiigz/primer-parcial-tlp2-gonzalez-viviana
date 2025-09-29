import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    profile: {
      employee_number: {
        type: String,
        unique: true,
        required: true,
      },
      first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50,
      },
      last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50,
      },
      phone: {
        type: String,
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    // ! FALTA COMPLETAR ACA
  },
   {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
    id:false //para desactivar el id q muestra el virtual

  }

);

UserSchema.virtual("assets", {
  ref: "AssetModel",
  localField: "_id",
  foreignField: "responsible",
  justOne: false,
});

// ! FALTA COMPLETAR ACA

export const UserModel = model("User", UserSchema);
