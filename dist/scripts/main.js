$(document).ready(function() {
  $('.share-button').on('click', function(event) {

    var $button = $(this);
    
    //facebook button
    if ($button.hasClass('fb') && !$button.hasClass('share-facebook')) {
      var paramOptions = {
        u: 'dist/'
      };
      //call share api
      SocialShare.share('facebook', paramOptions);
    }
    
    //twitter button
    if ($button.hasClass('tw') && !$button.hasClass('share-twitter')) {

      var paramOptions = {
        url: 'dist/',
        text: 'Check out SocialShare',
        hashtags: 'socialshare, tooling',
        via: 'emailnitram'
      };

      //call share api
      SocialShare.share('twitter', paramOptions);
    }
    
    //linkedin button
    if ($button.hasClass('li') && !$button.hasClass('share-linkedin')) {

      var paramOptions = {
        url: 'dist/',
        title: 'Check out SocialShare',
        summary: 'Create social network sharer URLs with ease. Thanks for checking out SocialShare!'
      };

      //call share api
      SocialShare.share('linkedin', paramOptions);
    }
  });
});
