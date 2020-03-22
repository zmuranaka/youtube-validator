# YouTube URL Validator

## What is this Project?

This project is a web application that can check whether a YouTube URL is valid (it leads to a real video) or not. The user can enter the URL manually, or they can generate random URLs.

## How do I use the Website?

You can enter a URL manually in the text box labeled 'Validate by Direct Input'. Since all YouTube video URLs start with 'https://www.youtube.com/watch?v=', that is already provided for you. All you need to enter is the 11-character string that comes after that. If the URL is valid, it will appear under the 'Valid URLs' section. Otherwise, it will appear under the 'Invalid URLs' section. If you do not want to enter URLs manually, you can click the 'Start' button labeled 'Validate Randomly Generated URLs', and it will generate random YouTube URLs for you and automatically validate them. However, if you use this method, you are *extremely unlikely* to see it create a valid URL (see below for the explanation). You can click the 'Stop' button to stop it from creating random URLs. Finally, you can click the 'Clear' button to clear the 'Invalid URLs' and 'Valid URLs' sections.

## Why is Creating URLs Randomly So Unlikely to Create a Valid URL?

The explanation for this requires us understanding how a YouTube video's URL is constructed. Basically, every youtube video URL begins with 'https://www.youtube.com/watch?v=', and then has a string of 11 characters. Of these 11 characters, the first ten can be any of the following: any capital or lowercase letter, any digit, a single dash, or an underscore. In total, this is 64 different characters. Therefore, out of just these 10 characters, there are 64^10 different combinations, which is approximately 1.153 \* 10^18. However, there is also an 11th character, which can only be one of the following: '0', '4', '8', 'A', 'E', 'I', 'M', 'Q', 'U', 'Y', 'c', 'g', 'k', 'o', 's', or 'w' ([Source](http://conferences.sigcomm.org/imc/2011/docs/p371.pdf)). This gives us 16 more combinations, making the total number of combinations of the 11 characters 1.153 \* 10^18 \* 16, or approximately 1.845 \* 10^19. To put how large this number is in perspective, if you were to generate 1 billion random URLs, you would have generated only about 0.00000000005421 of the total URLs available.

## Directories:

images  
&nbsp;&nbsp;&nbsp;&nbsp;This folder contains the social media logos.  
scripts  
&nbsp;&nbsp;&nbsp;&nbsp;This folder contains the JavaScript that creates and validates the YouTube URLs.  
styles  
&nbsp;&nbsp;&nbsp;&nbsp;This folder contains the stylesheet for the website.

## Sources:

I got the GitHub logo from [GitHub](https://github.com/logos) and I created the mail and link logos in Adobe Photoshop.  
Websites that helped me create the project:  
http://conferences.sigcomm.org/imc/2011/docs/p371.pdf  
&nbsp;&nbsp;&nbsp;&nbsp;This research paper describes the correct format of a YouTube video URL. This was very helpful because many sources incorrectly believed that all 11 characters at the end of a YouTube URL are the same, when in reality the last character is unique.  
https://gist.github.com/tonY1883/a3b85925081688de569b779b4657439b  
&nbsp;&nbsp;&nbsp;&nbsp;This trick from GitHub user tonY1883 gave me the idea of how to validate a YouTube URL with plain JavaScript.  
https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp  
&nbsp;&nbsp;&nbsp;&nbsp;W3Schools was very helpful when I was checking that my syntax was correct and as a general reference. For example, the webpage I linked helped me figure out how to call a function when the user presses the 'enter' key.

## Author:

Zachary Muranaka  
&nbsp;&nbsp;&nbsp;&nbsp;zacharymuranaka@mail.weber.edu  
&nbsp;&nbsp;&nbsp;&nbsp;http://icarus.cs.weber.edu/~zm83483/
