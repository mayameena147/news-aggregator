const express = require("express");
const newsRouter = express.Router();
const authMiddleware = require("./../authMiddleware");
const { getNews, getReadNews, getFavoriteNews, markArticleAsRead, markArticleAsFavorite} = require("../newsController");

newsRouter.get("/", authMiddleware, getNews);
newsRouter.post("/:id/read", authMiddleware, markArticleAsRead);
newsRouter.post("/:id/favorite", authMiddleware, markArticleAsFavorite);
newsRouter.get("/read", authMiddleware, getReadNews);
newsRouter.get("/favorite", authMiddleware, getFavoriteNews);

module.exports = newsRouter;