# starter
This repo is meant to be cloned for new website projects, to ease eventual linkage to my portfolio

Less succinctly, but more informatively, I've had trouble in the past where I attempt to display my projects on my Portfolio page, by simply moving the individual project folder to a sub-folder on my Portfolio site and just linking over with an &lt;a&gt; tag to the project's index.html file. It has NOT worked cleanly, because each of the projects have tended to be built assuming they are on the root. Therefore, much more effort has been required to assimilate any projects into my portfolio site

This starter project is meant to put a stop to these difficulties. It can act as the basis for any new project, and already contains functionality to allow me to assimilate the project into my Portfolio, or place it at the root, or place it anywhere, with no more effort than, as suggested: sticking it into a folder and changing a certain link in the index.html file. Due to the flexibility of this approach, the starter can itself act as the basis for the new Portfolio site, too

It has the following expectations:
  * Index.html in the project root: The project root is likely a subfolder on the portfolio site, but the starter project can be the foundation for the Portfolio itself, in the root folder
  * airlock-engine.js: This file can be on the site already or in the project folder itself
  * Link from index.html/php to airlock-engine.js. For example, the following code could be included in the index.html file, in the <head> tag (above the stylesheet call, if applicable)
  ```
    <!-- Synchronously enable the project airlock -->
    <script src="./scripts/airlock-engine.js"></script>
    <script>
        new AirlockEngine({ 
            debug: true,
            attribute: 'data-airlock' // Can be customized per project if desired
        }).start();
    </script>
  ```
  * Links and resources can be linked to by the data-project-file attribute. These should be alongside the regular href or src attribute to ensure safety, whether you're using a build tool or not:
  ```
<!-- A stylesheet -->
<link rel="stylesheet"
    src="./stylesheets/main.css"
    data-airlock="./stylesheets/main.css">

<!-- An image -->
<img src="./images/diagram.png"
    data-airlock="./images/diagram.png"
    width="200px"
    alt="Diagram illustrating the project">

<!-- A link to another page on the site
     (Not required for external links, since these will invariably be absolutely addressed) -->
<a  href="./about.html"
    data-airlock="./about.html">
    About</a>
  ```

The purpose of using the extra data- attribute (which you can rename per project, as desired) in addition to the src/href attribute is to ensure a build tool can freely update the link (for minification or what have you), but if you're not using a build tool, the original src/href attribute properly maintains the link or resource so your website still functions
