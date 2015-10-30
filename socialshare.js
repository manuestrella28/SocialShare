var SocialShare = SocialShare || {};

$(document).ready(function() {
  "use strict";

  (function(app) {

    //siteUrl set to the applications root directory; modify for paths to assets as needed;
    var siteUrl = window.location.href;

    var shareServices = {
      "twitter": shareTwitter,
      "facebook": shareFacebook,
      "linkedin": shareLinkedin
    };

    function shareTwitter(options) {
      var shareAddress = "http://twitter.com/intent/tweet?";
      options = options || {};

      //Reference: https://dev.twitter.com/web/tweet-button/parameters
      var paramProto = {
        "text": "text=", //Optional; Pre-populated UTF-8 and URL-encoded Tweet text.;
        "url": "url=", //Optional; A fully-qualified URL with a HTTP or HTTPS scheme, URL-encoded.
        "hashtags": "hashtags=", //Optional; comma-separated list of hashtag values without the preceding # character.
        "via": "via=", //Optional; A Twitter username to associate with the Tweet
        "related": "related=" //Optional; Suggest additional Twitter usernames related to the Tweet as comma-separated values...a URL-encoded comma and text after the username;
      };

      //auto-populate url if not explicitly provided
      if (!options.url) {
        options.url = siteUrl;
      } else {
        options.url = siteUrl + options.url;
      }

      //get array of query params;
      var params = getQueryStringArray(options, paramProto);

      //get complete share url;
      var shareUrl = getShareUrl(shareAddress, params);
      return shareUrl;
    }

    function shareFacebook(options) {
      var shareAddress = "http://www.facebook.com/sharer.php?";
      options = options || {};

      //The Facebook Sharer only accepts one GET parameter: "u" for the URL;
      var paramProto = {
        "u": "u="
      };

      //check for required params
      if (!options.u) {
        options.u = siteUrl;
      } else {
        options.u = siteUrl + options.u;
      }

      //get array of query params;
      var params = getQueryStringArray(options, paramProto);

      //get complete share url;
      var shareUrl = getShareUrl(shareAddress, params);
      return shareUrl;
    }

    function shareLinkedin(options) {
      var shareAddress = "http://www.linkedin.com/shareArticle?";
      options = options || {};

      //Reference: https://developer.linkedin.com/docs/share-on-linkedin
      //@ the "Customize URL" section
      var paramProto = {
        "url": "url=", //Required; The url-encoded URL of the page that you wish to share.
        "mini": "mini=", //Required; A required argument who"s value must always be:  true
        "title": "title=", //Optional; The url-encoded title value that you wish you use.
        "summary": "summary=", //Optional; The url-encoded description that you wish you use.
        "source": "source=" //The url-encoded source of the content (e.g. your website or application name).
      };

      //check for required params;
      if (!options.url) {
        options.url = siteUrl;
      } else {
        options.url = siteUrl + options.url;
      }

      if (!options.mini || options.mini !== "true") {
        options.mini = "true";
      }

      //get array of query params;
      var params = getQueryStringArray(options, paramProto);

      //get complete share url
      var shareUrl = getShareUrl(shareAddress, params);
      return shareUrl;
    }

    function getQueryStringArray(paramOptions, paramProto) {
      var params = [];
      paramOptions = paramOptions || {};

      for (var param in paramOptions) {
        if (paramProto.hasOwnProperty(param)) {
          var queryStr = paramProto[param] + encodeURIComponent(paramOptions[param]);
          params.push(queryStr);
        }
      }
      console.log('paramOptions', paramOptions);
      console.log('params', params);
      return params;
    }

    function getShareUrl(shareAddress, queryStringArray) {
      queryStringArray = queryStringArray || [];
      return queryStringArray.length ? (shareAddress + queryStringArray.join("&")) : shareAddress;
    }

    function share(serviceType, paramOptions) {
      if (!shareServices[serviceType]) {
        throw new Error("Share service not defined");
      }

      var shareUrl = shareServices[serviceType](paramOptions);
      console.log('shareUrl', shareUrl);
      showPopup(shareUrl);
      return this;
    }

    function showPopup(shareUrl) {
      var width = 575;
      var height = 443;
      var left = ($(window).width() - width) / 2;
      var top = ($(window).height() - height) / 2;
      var url = shareUrl;
      var opts = "status=1" +
        ",width=" + width +
        ",height=" + height +
        ",top=" + top +
        ",left=" + left;

      window.open(url, "socialPopup", opts);

      return false;
    }

    (function init() {
      var shareServiceNames = Object.keys(shareServices);
      var prefix = "share";
      //multiple class selector string
      var mcs = shareClasses(prefix, shareServiceNames)(true);
      //share classnames array
      var scn = shareClasses(prefix, shareServiceNames)(false);

      function shareClasses(classPrefix, classNames) {
        classNames = $.map(classNames, function(item, index) {
          return (classPrefix + "-" + item);
        });

        return function(classSelector) {
          if (classSelector) {
            var cs = $.map(classNames, function(item, index) {
              return ("." + item);
            });
            return cs.join(", ");
          } else {
            return classNames;
          }
        };
      }

      $(mcs).on("click", initShare);

      function initShare(e) {
        //set parameter options
        var attrs = Array.prototype.slice.call($(this)[0].attributes);
        var paramOptions = {};

        $.each(attrs, function(index, item) {
          var attrName = item.name;
          var attrValue = item.value;

          if (attrName.indexOf((prefix + "-")) === 0) {
            var param = attrName.split("-")[1];
            paramOptions[param] = attrValue;
          }
        });

        //set social service type
        var hasClass = function(className) {
          return $(this).hasClass(className);
        };
        var hasShareService = scn.filter(hasClass.bind(this));

        //should only have one share service
        if (hasShareService.length === 1) {
          var serviceType = hasShareService[0].split("-")[1];
          share(serviceType, paramOptions);
        }
      }
    })();

    var api = {
      share: share
    };

    //extend api methods
    app = $.extend(app, api);
    return app;

  })(SocialShare);
});
