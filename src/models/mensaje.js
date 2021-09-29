import { Schema, model } from 'mongoose';

const msgCollectionName = 'message';

const messageSchema  = new Schema(
	{
		author: {
			email:    { type: String, required: true, max: 100 },
			nombre:   { type: String, required: true, max: 100 },
			apellido: { type: String, required: true, max: 100 },
			edad:     { type: Number, required: true },
			alias:    { type: String, required: true, max: 100 },
			avatar:   { type: String, required: true, max: 100 },
			fecha:    { type: String, required: true, max: 100 },
			
		},
		mensaje: { type: String, required: true, max: 1000 },
	}
);

export const messageModel = model(msgCollectionName, messageSchema );