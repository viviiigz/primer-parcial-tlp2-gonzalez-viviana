import { Schema, model } from "mongoose";

// TODO: configurar el virtuals para el populate inverso con assets

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
  },
    {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
    id:false //para desactivar el id q muestra el virtual
  }
);

// Esto permite usar assetModel.findById(id).populate('asset')
CategorySchema.virtual('assets', {
  ref: 'AssetModel', 
  localField: '_id',   
  foreignField: 'categories', 
  justOne: false // indica que puede haber muchos artículos asociados
});

// ! FALTA COMPLETAR ACA

export const CategoryModel = model("Category", CategorySchema);
