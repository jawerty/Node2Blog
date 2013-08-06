var rss = require("rss"),
    blogConfig = require("./../config/blogConfig"),
    postCache = require("./../cache/postCache");

//Refreshing the feed every 10 minutes (in
var RSS_REFRESH_TIME_IN_MILLIS = 60 * 10 * 1000;
var feedLastRefreshTime = null;
var lastProducedXMLFeed = null;


exports.getRss = function(req, res){
    //TODO: This is actually inefficient. Instead register for an event that is fired upon PostCache update and only then refresh the feed
    var now = new Date();
    if(!feedLastRefreshTime || now.getTime() - feedLastRefreshTime.getTime() >= RSS_REFRESH_TIME_IN_MILLIS){
        var feed = new rss({
            title: blogConfig.title,
            description: blogConfig.subTitle,
            feed_url: blogConfig.siteUrl + "rss.xml",
            site_url: blogConfig.siteUrl,
            image_url: blogConfig.iconUrl,
            author: blogConfig.author
        });

        var posts = postCache.get();
        posts.forEach(function(post){
            var dateOnly = post.date.toDateString();
            feed.item({
                title: post.title,
                description: post.content,
                url: blogConfig.siteUrl + "post" + "/" + post._id + "/" + post.friendly_link_title,
                date: dateOnly
            });
        });

        lastProducedXMLFeed = feed.xml();
        feedLastRefreshTime = now;
    }

    res.send(lastProducedXMLFeed);
};