# social-share-tool

The Social Share module helps share content via social network URLs.
You can compose social network share URLs in two way:

1. [Imperatively with Javascript](#UsageJavascript)
2. [Declaratively with HTML](#UsageHTML)

##Dependencies
- [jQuery](https://jquery.com/)

##Install
1. Install [Bower](http://bower.io "see instructions") and run `bower install`
2. Include script in the index.html `<script src="social-share-tool.js"></script>`

##Supported Social Netorks
- [Facebook](https://developers.facebook.com/docs/sharing)
- [Twitter](https://dev.twitter.com/web/tweet-button/web-intent)
- [Linkedin](https://developer.linkedin.com/docs/share-on-linkedin)

##Usage
###Javascript
```javascript
$("#sharebutton").on("click", function() {
    SocialShare.share("twitter", {
        url: "share-page.html",
        text: "Check out this webpage",
        hashtags: "SocialShareTool, Tooling",
        via: "emailmartin"
      });
});
```

####API

**share** | SocialShare.share(social-service-name, [options])

#####Arguments:

| **social-service-name** | **options** | **Reference**                                                                                        |   |   |
|-------------------------|-------------|------------------------------------------------------------------------------------------------------|---|---|
| `"facebook"`            | u           |                                                                                                      |   |   |
| `"twitter"`             | text        | [Twitter Parameters](https://dev.twitter.com/web/tweet-button/parameters)                            |   |   |
|                         | url         |                                                                                                      |   |   |
|                         | hashtags    |                                                                                                      |   |   |
|                         | via         |                                                                                                      |   |   |
|                         | related     |                                                                                                      |   |   |
| `"linkedin"`            | url         | [LinkedIn Sharing](https://developer.linkedin.com/docs/share-on-linkedin) Click on "Custom URL" tab. |   |   |
|                         | mini        |                                                                                                      |   |   |
|                         | title       |                                                                                                      |   |   |
|                         | summary     |                                                                                                      |   |   |
|                         | source      |                                                                                                      |   |   |

###HTML
```html
<a href="javacsript:void(0);" share-url="share-page.html" share-text="Check out this webpage" share-hashtags="SocialShareTool, Tooling" class="share-twitter">
  <span>Twitter Share Button<span>
</a>
```
