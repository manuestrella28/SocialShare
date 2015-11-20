$(document).ready(function() {
  $('.share-button').on('click', function(event) {

    var $button = $(this);
    
    //facebook button
    if ($button.hasClass('fb') && !$button.hasClass('share-facebook')) {
      
      //call share api
      SocialShare.share('facebook');
    }
    
    //twitter button
    if ($button.hasClass('tw') && !$button.hasClass('share-twitter')) {

      var paramOptions = {
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
        title: 'Check out SocialShare',
        summary: 'Create social network sharer URLs with ease. Thanks for checking out SocialShare!'
      };

      //call share api
      SocialShare.share('linkedin', paramOptions);
    }

    //google plus button
    if ($button.hasClass('gp') && !$button.hasClass('share-googleplus')) {

      //call share api
      SocialShare.share('googleplus');
    }
  });
});
