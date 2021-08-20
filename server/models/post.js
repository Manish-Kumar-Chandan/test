const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: 1,
      index: true,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      nickname: String,
    },
    body: {
      type: String,
      required: true,
    },
    comments: [
      {
        author: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        date: { type: Date, default: Date.now },
        votes: [{ user: String, vote: Number, _id: false }],
      },
    ],
    date: { type: Date, default: Date.now },
    hidden: {
      type: Boolean,
      default: false,
    },
    votes: [{ user: Schema.Types.ObjectId, vote: Number, _id: false }],
  },
  { timestamps: true }
);

postSchema.methods.vote = function (user, vote) {
  const existingVote = this.votes.find((item) => item.user.equals(user));
  if (existingVote) {
    // reset score
    // this.score -= existingVote.vote;
    if (vote === 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      // change vote
      this.score += vote;
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
  }

  return this.save();
};

postSchema.methods.voteComment = function (user, vote) {
  const votes = this.comments[0].votes;
  const existingVote = votes.find((item) => {
    return item.user === user ? item : false;
  });
  if (existingVote) {
    if (vote === 0) {
      // remove vote
      votes.pull(existingVote);
    } else {
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    votes.push({ user, vote });
  }

  return this.save();
};

postSchema.methods.addComment = function (author, body) {
  this.comments.push({ author, body });
  return this.save();
};

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
