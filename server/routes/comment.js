const { auth } = require("../middleware/auth");
const express = require("express");
const app = express.Router();
const _ = require("lodash/core");
const ObjectId = require("mongoose").Types.ObjectId;

//models
const { Post } = require("../models/post");

app.post("/api/addComment", auth, async (req, res) => {
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (err) return res.json({ success: false });
    post.addComment(req.body.author, req.body.body);
  });
  res.send({
    response: true,
  });
});

app.get("/api/comments", (req, res) => {
  let slug = req.query.slug;
  let start = req.query.start;
  slug = slug.split("-").join(" ");
  Post.find({ title: slug })
    .select({
      comments: 1,
    })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      if (doc.length === 0) {
        return res.send(doc);
      }
      // const comments = doc[0].comments.reverse();

      // const result = _.slice(comments, [(start = start)], [(end = start + 5)]);

      res.send(doc[0].comments);
    });
});

app.post("/api/upvoteComment", auth, async (req, res) => {
  let slug = req.body.slug;
  slug = slug.split("-").join(" ");
  Post.findOne({
    title: slug,
  })
    .select({
      comments: {
        $elemMatch: { _id: ObjectId(req.body.id) },
      },
    })
    .exec((err, post) => {
      if (err) return res.json({ success: false });
      post.voteComment(req.user.nickname, 1);
    });
  res.send({
    response: true,
  });
});

app.post("/api/unvoteComment", auth, async (req, res) => {
  let slug = req.body.slug;
  slug = slug.split("-").join(" ");
  Post.findOne({
    title: slug,
  })
    .select({
      comments: {
        $elemMatch: { _id: ObjectId(req.body.id) },
      },
    })
    .exec((err, post) => {
      if (err) return res.json({ success: false });
      post.voteComment(req.user.nickname, 0);
    });
  res.send({
    response: true,
  });
});

app.post("/api/downvoteComment", auth, async (req, res) => {
  let slug = req.body.slug;
  slug = slug.split("-").join(" ");
  Post.findOne({
    title: slug,
  })
    .select({
      comments: {
        $elemMatch: { _id: ObjectId(req.body.id) },
      },
    })
    .exec((err, post) => {
      if (err) return res.json({ success: false });
      post.voteComment(req.user.nickname, -1);
    });
  res.send({
    response: true,
  });
});

app.post("/api/deleteComment", auth, async (req, res) => {
  let slug = req.body.slug;
  slug = slug.split("-").join(" ");
  
  Post.update(
    { title: slug },
    { $pull: { comments: { _id: req.body.id, author: req.user.nickname } } },
    { safe: true }
  ).exec((err, doc) => {
    if (err) return res.json({ response: false, error: err });
    res.send({
      response: true,
    });
  });
});

module.exports = app;
