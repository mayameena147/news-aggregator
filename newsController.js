const fetchAndStoreArticles = require("./fetchArticles");
const User = require('./database/userModel');
const Article = require('./database/articles');

async function getNews(req, res) {
    try {
        const news = await fetchAndStoreArticles();
        res.status(200).send({news: news});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching news articles.');
    }
};

// Function to mark an article as read by a user
async function markArticleAsRead(req, res) {
    try {   
            let user = req.body.user
            if (!user.readArticles.includes(req.params.id)) {
                user.readArticles.push(req.params.id);
                await user.save();
                res.status(200).send(`Article ${req.params.id} marked as read for user ${user.name}`);
            } else {
                res.status(200).send(`Article ${req.params.id} is already marked as read for user ${user.name}`);
            }
    } catch (error) {
        res.status(500).send('Error marking article as read:', error);
    }
}

// Function to mark an article as favorite by a user
async function markArticleAsFavorite(req, res) {
    try {
        let user = req.body.user
         if (!user.favoriteArticles.includes(req.params.id)) {
            user.favoriteArticles.push(req.params.id);
            await user.save();
            res.status(200).send(`Article ${req.params.id} marked as favorite for user ${user.name}`);
        } else {
            res.status(200).send(`Article ${req.params.id} is already marked as favorite for user ${user.name}`);
        }
    } catch (error) {
        res.status(500).send('Error marking article as favorite:', error);
    }
}

const getReadNews = async (req, res) => {
    try {
        const readArticleIds = req.body.user.read;
        const articles = await Article.find({
            _id: { $in: readArticleIds } 
        });

        res.json(articles);
    } catch (err) {
        console.error('Error fetching articles:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

async function getFavoriteNews(req, res) {
    try {
        // Fetch articles where the article's ID is in req.user.read
        const favoriteArticleIds = req.body.user.read;

        const articles = await Article.find({
            _id: { $in: favoriteArticleIds } 
        });

        res.json(articles);
    } catch (err) {
        console.error('Error fetching articles:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {getNews, markArticleAsRead, markArticleAsFavorite, getReadNews, getFavoriteNews};