const { auth } = require("../middleware/auth");
const express = require("express");
const app = express.Router();

//models
const { Post } = require("../models/post");

app.post("/api/addPost", auth, async (req, res) => {
  const { user } = req;

  const data = {
    title: req.body.title,
    author: {
      id: user._id,
      nickname: user.nickname,
    },
    body: req.body.text,
    hidden: false,
    votes: {
      user: user._id,
      vote: 1,
    },
  };

  const post = new Post(data);
  await post.save((err, doc) => {
    if (err) {
      if (err.code === 11000) {
        return res.json({ response: "exist" });
      }
      return res.json({ response: err });
    }
    return res.status(200).json({
      response: true,
      addedPost: doc,
    });
  });
});

app.get("/api/getPosts", (req, res) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  Post.find({ hidden: false })
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .select({
      comments: 0,
    })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

app.get("/api/singlePost", (req, res) => {
  let slug = req.query.slug;
  slug = slug.split("-").join(" ");
  Post.find({ title: slug })
    .select({
      comments: 0,
    })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

app.post("/api/updatePost", auth, async (req, res) => {
  const userId = req.user._id;
  const postId = req.body.id;
  const title = req.body.title;
  const body = req.body.body;
  const getPost = await Post.findOne({ _id: postId, "author.id": userId });

  if (!getPost) {
    return res.json({
      success: false,
      message: "You can not edit this post",
    });
  }

  await Post.findByIdAndUpdate(
    postId,
    {
      title,
      body,
    },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.json({
        success: true,
        doc,
      });
    }
  );
});

app.post("/api/upvote", auth, async (req, res) => {
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (err) return res.json({ success: false });
    post.vote(req.user._id, 1);
  });
  res.send({
    response: true,
  });
});

app.post("/api/downVote", auth, async (req, res) => {
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (err) return res.json({ success: false });
    post.vote(req.user._id, -1);
  });
  res.send({
    response: true,
  });
});

app.post("/api/unvote", auth, async (req, res) => {
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (err) return res.json({ success: false });
    post.vote(req.user._id, 0);
  });
  res.send({
    response: true,
  });
});

app.get("/api/userPost", (req, res) => {
  let slug = req.query.slug;
  Post.find({ "author.nickname": slug })
    .select({
      comments: 0,
    })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

app.post("/api/postSearch", async (req, res) => {
  let slug = req.body.slug;
  const userRegex = new RegExp(slug, "i");
  let data = await Post.find({ title: userRegex })
    .limit(5)
    .select({ title: "1" });
  let result = new Array();
  data.map((item) => {
    result.push({ key: item.title, value: item.title });
  });
  return res.send(result);
});

app.get("/api/feeds", async (req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Post.aggregate([
    {
      $match: {
        "comments.date": {
          $gte: startOfToday,
        },
      },
    },
    {
      $addFields: {
        comments: {
          $filter: {
            input: "$comments",
            cond: {
              $gte: ["$$this.date", startOfToday],
            },
          },
        },
      },
    },
    {
      $addFields: {
        thinking: {
          $size: "$comments",
        },
      },
    },
  ])
    .project({ title: 1, thinking: 1 })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);

      res.send(doc);
    });
});

app.post("/api/deletePost", auth, async (req, res) => {
  Post.findOneAndDelete({ _id: req.body.id, "author.id": req.user._id }).exec(
    (err, doc) => {
      if (err) return res.send(err);
      if (doc) {
        res.send({
          response: true,
        });
      }else{
        res.send({
          response: false,
          message: "You can't delete this thinking"
        });
      }
    }
  );

});

module.exports = app;
