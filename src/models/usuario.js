import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    
  });

export default model('Usuario', UsuarioSchema);