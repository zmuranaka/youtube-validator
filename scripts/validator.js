"use strict";

/*
File: validator.js
Zachary Muranaka
Allows the user to validate YouTube URLs, either by direct input or randomly
*/

var linkValidity = false;
var invalidCount = 0;
var validCount = 0;
var startHasBeenClicked = false;
var stopHasNotBeenClicked = true;

document.getElementById("validateBtn").addEventListener("click",
function()
{
    checkLinkValidity(document.getElementById("validateTxtBox").value);
});

document.getElementById("startBtn").addEventListener("click",
function()
{
    startHasBeenClicked = true; // The start button was clicked
    stopHasNotBeenClicked = true; // The stop button has not been clicked
    getRandomLink();
});

// Add an event listener to the page so pressing enter calls the getRandomLink() function
window.addEventListener("keyup",
function(e)
{
    if(e.keyCode === 13) // 13 is the keycode for enter
    {
        startHasBeenClicked = true; // Pressing enter is equivalent to clicking start
        stopHasNotBeenClicked = true; // The stop button has not been clicked
        getRandomLink();
    }
});

document.getElementById("stopBtn").addEventListener("click",
function()
{
    startHasBeenClicked = false; // The start button was not clicked
    stopHasNotBeenClicked = false; // The stop button has been clicked
});

document.getElementById("clearBtn").addEventListener("click",
function()
{
    let invalidLinks = document.getElementsByClassName("invalidLink");
    let validLinks = document.getElementsByClassName("validLink");

    // Destroy all invalid links
    while(invalidLinks.length)
    {
        invalidLinks[0].parentNode.removeChild(invalidLinks[0]); // Destroy the first invalidLink
        invalidCount--;
    }

    // Destroy all valid links
    while(validLinks.length)
    {
        validLinks[0].parentNode.removeChild(validLinks[0]); // Destroy the first validLink
        validCount--;
    }

    // Reset the invalidCounter and validCounter
    document.getElementById("invalidCounter").textContent = invalidCount;
    document.getElementById("validCounter").textContent = validCount;
});

/*
 * A YouTube video's URL is https://www.youtube.com/watch?v=xxxxxxxxxxy
 * Where x can be a single character of any of the following:
 * A single dash, 0 to 9, A to Z, an underscore, a to z
 * And y, the last character, can only be one of the following:
 * 0, 4, 8, A, E, I, M, Q, U, Y, c, g, k, o, s, w
 *
 * Source: http://conferences.sigcomm.org/imc/2011/docs/p371.pdf
 */
function getRandomLink()
{   
    let randomChars = "";

    // Fill randomChars with 10 random characters that can be in a YouTube URL
    for(let i = 0; i < 10; i++)
        randomChars += String.fromCharCode(generateAsciiCode()); // Convert from ASCII code to char

    randomChars += generateLastChar(); // End randomChars with one of the valid last chars

    checkLinkValidity(randomChars);
}

// Returns an ASCII code for one of the following: a single dash, 0 to 9, A to Z, an underscore, or a to z
function generateAsciiCode()
{
    let randomNum = Math.floor(Math.random() * 64) + 1; // Generates a random number 1 to 64

    if(randomNum === 1)
        return 45; // ASCII code for single dash
    else if(randomNum >= 2 && randomNum <= 11)
        return randomNum + 46; // ASCII codes for 0 to 9
    else if(randomNum >= 12 && randomNum <= 37)
        return randomNum + 53; // ASCII codes for A to Z
    else if(randomNum === 38)
        return 95; // ASCII code for underscore
    else
        return randomNum + 58; // ASCII code for a to z
}

// Returns a valid last character of a YouTube URL
function generateLastChar()
{
    const lastCharArray = ['0', '4', '8', 'A', 'E', 'I', 'M', 'Q', 'U', 'Y', 'c', 'g', 'k', 'o', 's', 'w'];
    return lastCharArray[Math.floor(Math.random() * 16)]; // Returns a random member of the lastCharArray
}

// Checks if a link is a valid YouTube video URL
function checkLinkValidity(endOfLink)
{
    let startOfLink = "https://www.youtube.com/watch?v="; // Initialize the start of the link

    var thumbnail = getThumbnail(endOfLink);
    thumbnail.onload =
    function()
    {
        /*
         * A valid YouTube URL will have a thumbnail of width 320px and height 180px
         * An invalid YouTube URL will be given a default thumbnail of width 120px and height 90px
         * Therefore, we check the validity of the URL based on the thumbnail YouTube gives it
         */
        linkValidity = this.width === 320 && this.height === 180;
        createNewAnchorElement(startOfLink, endOfLink);
    };
}

// Returns an Image object with the src of the YouTube video's thumbnail
function getThumbnail(characters)
{
    // Create an img with the src of the YouTube URL's thumbnail
    var thumbnail = new Image();
    thumbnail.src = "https://img.youtube.com/vi/" + characters + "/mqdefault.jpg"; // URL of thumbnail

    return thumbnail;
}

// Creates a new anchor element that is appended to the document
function createNewAnchorElement(startOfLink, endOfLink)
{
    if(linkValidity) // The URL is valid
    {
        validCount++;
        var newValidLink = document.createElement("a"); // Create a new anchor element

        // Set the attributes
        newValidLink.href = startOfLink + endOfLink;
        newValidLink.textContent = startOfLink + endOfLink;
        newValidLink.target = "blank";
        newValidLink.classList.add("validLink"); // Give this element the class of "validLink"
        newValidLink.style.float = "left";

        document.getElementById("validLinks").appendChild(newValidLink);
        document.getElementById("validCounter").textContent = validCount; // Update the validCounter
        if(startHasBeenClicked && stopHasNotBeenClicked)
            getRandomLink();
    }
    else // The URL is not valid
    {
        invalidCount++;
        var newInvalidLink = document.createElement("a"); // Create a new anchor element

        // Set the attributes
        newInvalidLink.href = startOfLink + endOfLink;
        newInvalidLink.textContent = startOfLink + endOfLink;
        newInvalidLink.target = "blank";
        newInvalidLink.classList.add("invalidLink"); // Give this element the class of "invalidLink"
        newInvalidLink.style.float = "left";

        document.getElementById("invalidLinks").appendChild(newInvalidLink);
        document.getElementById("invalidCounter").textContent = invalidCount; // Update the invalidCounter
        if(startHasBeenClicked && stopHasNotBeenClicked)
            getRandomLink();
    }
}
