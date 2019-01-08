# MongoScrape

# All the News That's Fit to Scrape

## Overview
This application requests the html code from NPR.org using Axios, searches and pulls elements of each story with Cheerio, and stores them into the Mongo Database using Mongoose.  Each article can be saved aside so if all are deleted from the DB, they aren't affected. Each article can hold a note which can be changed or deleted.

## [Deployed on Heroku](https://npr-news-org-scraper.herokuapp.com/)

### Objectives for UT Coding Boot Camp Homework

  1. Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

  * Beyond these requirements, be creative and have fun with this!

### Additional Technologies Used

  1. [express](https://expressjs.com/)
  2. [Handlebars](https://handlebarsjs.com/)
  3. [mongoose](https://mongoosejs.com/)
  4. [cheerio](https://www.npmjs.com/package/cheerio)
  5. [axios](https://www.npmjs.com/package/axios)

### Workflow
  * Landing Page
    * Route to Articles
  * Retrieve Articles
    * Get route
    * HTML to cheerio
    * Article information to DB
    * HTML manipulation on display
  * Saved Articles
    * Get route
    * Asks DB for articles where saved boolean is true
    * Manipulates HTML to display only saved articles
  * Note Button
    * Get route checking database if note exists for article ID
    * Saves note, sends to DB
  * Save Button
    * Changes "saved" booleon to true with a get route
  * Delete Button
    * Removes article from page and DB.
