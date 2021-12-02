import mongoose from 'mongoose';
import Album from './Album';

const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this song'],
    },

    imgUrl: {
      type: String,
      required: [true, 'Please provide a image for this song'],
    },

    description: {
      type: String,
      required: false,
    },

    _album: {
      required: false,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },

    isSingle: {
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Song || mongoose.model('Song', SongSchema);
