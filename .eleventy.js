const MarkdownIt = require("markdown-it");


let mdOptions = {
    html: true,
    breaks: true,
    linkify: true
};

const mdRenderer = MarkdownIt(mdOptions);

module.exports = function (eleventyConfig) {

    eleventyConfig.addFilter("md", function (content) {
        return mdRenderer.render(content);
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat("dd LLLL yyyy");
    });

    eleventyConfig.addWatchTarget("./**/*.(js|css)");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("manifest.json");
    eleventyConfig.addPassthroughCopy("favicon.svg");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");

    eleventyConfig.addCollection("sortAlphabetically", function (collection) {
        return collection.getFilteredByTag('post').sort(function (a, b) {
            return a.data.title - b.data.title;
        });
    });
}