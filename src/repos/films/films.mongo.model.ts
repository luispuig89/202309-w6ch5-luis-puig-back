import { Schema, model } from 'mongoose';
import { Film } from '../../entities/film';

const filmsSchema = new Schema<Film>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  director: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

filmsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FilmModel = model('Film', filmsSchema, 'films');
