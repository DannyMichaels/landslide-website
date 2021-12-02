import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this album'],
    },

    imgUrl: {
      type: String,
      required: [true, 'Please provide a image for this album'],
    },

    description: {
      type: String,
      required: false,
    },

    recordLabel: {
      type: String,
      required: false,
    },

    songs: {
      type: [
        {
          _song: {
            ref: 'Song',
            type: mongoose.Schema.Types.ObjectId,
          },
        },
      ],
      default: [],
    },

    artist: {
      type: String,
      default: 'Landslide',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);
