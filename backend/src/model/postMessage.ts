import mongoose from "mongoose";
interface post {
  title: string;
  message: string;
  name: string;
  creator: string;
  selectedFile: string;
  comments: string[];
   

  likes: {
    type: [string];
    default: [];
  };

  createdAt: {
    type: Date;
  };
}

const postSchema = new mongoose.Schema<post>({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
  },
  selectedFile: {
    type: String,
    // required: true,
  },
  likes: {
    type: [String],
    default: [],
  },

  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Post = mongoose.model("postSchema", postSchema);
export default Post;
