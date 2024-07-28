const mongoose = require('mongoose');
const axios = require('axios');
const Article = require('./database/articles');

async function fetchAndStoreArticles() {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
        const articles = response.data.articles;

        if (response.data.status === "ok" && articles.length > 0) {
            for (const article of articles) {
                const newArticle = new Article({
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    publishedAt: article.publishedAt,
                    source: article.source.name,
                });

                // Save article to the database
                await newArticle.save();
                console.log(`Article saved: ${article.title}`);            

                return articles;
            }
        } else {
            console.log('No articles found or error in response:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

module.exports = fetchAndStoreArticles;