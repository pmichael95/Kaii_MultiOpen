/*
 :: SIMPLE CHROME EXTENSION TO OPEN SEVERAL WEB PAGES AT THE CLICK OF A BUTTON!

 :: Created & finalized on September 24th, 2016.

 :: All rights reserved to Mrinal Saha for tutorial.

 :: Re-created by Philip M. 

 :: Developed by following initial tutorial & finalizing it on my own.
*/

/**
  FUNCTION: loadLinks
  PARAMS: None
  PURPOSE: Loads preset links (from the textarea of popup.html) into separate new tabs.
**/
function loadLinks() {
  //Get the URLs from the textarea labeled 'links'
  var links = document.getElementById('links').value.split('\n');
 
    //Loop through the extracted elements to get each URL
    for(var i=0; i<links.length; i++){

      //Clean up the URLs by removing whitespaces
      newURL = links[i].replace(/\s/g, '');

      //If the URLs are valid, we open them
      if(newURL != '') {
         chrome.tabs.create({
         "url": newURL, 
         "selected": false
         }); 
         //By default, tabs aren't selected
      }
     
      //If no URL is put into the textarea, we replace content with the error message
      else {
         document.getElementById('links').innerHTML = "No value specified";
      }
    }
}

/**
  FUNCTION: saveLinks
  PARAMS: None
  PURPOSE: From the text area, save the user input to chrome's storage.
**/
function saveLinks() {
    //We fetch the links from the textarea in order to save them
    var links = document.getElementById('links').value.split('\n');
    var urls = ""; //What we are going to be saving, by default it's empty
    
    //Loop through the entirety of the links to get the URLs
    for (i=0; i<links.length; i++) {
      //If input was valid (this is done after processing the URLs in loadLinks)
      //Then add it to storage
      if(links[i] != ' ') {
         urls += links[i] + '\n';
         localStorage['links'] = urls;
      }
    }
 }
  
//Since JS executes normally prior to the HTML being loaded
//We need to use the DOMContentLoaded to make sure this runs AFTER the HTML is loaded.
document.addEventListener('DOMContentLoaded', function () {
  //This event listener is for when the button is clicked and runs 'loadLinks'
  document.getElementById('button').addEventListener('click', loadLinks);
  
  //This event listener is for when the button is clicked, and this time we run 'saveLinks'
  document.getElementById('button').addEventListener('click', saveLinks);
  //Reload the URLs into the browser itself
   var urlLinks = localStorage['links'];
   if (!urlLinks) {
     return; //If it does exist, we do nothing because it was loaded, and thus terminate
   }
   //Otherwise, we set the values accordingly
   document.getElementById('links').value = urlLinks;


});
