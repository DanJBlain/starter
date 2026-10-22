# starter
WARNING - THIS README WAS PORTED FROM THE REPOSITORY "testStarter" MOSTLY UNEDITED. It needs to be updated for all the changes I've made while fleshing out the testStarter prototype. I may eventually delete testStarter, since this starter prototype has become a functional

What is this repo? A starter, meant to be cloned for new website projects, to ease eventual linkage from my portfolio

Less succinctly, but more informatively, I've had trouble in the past where I attempt to link my Portfolio page to my individual project pages contained in sub-folders, because each of the projects have tended to be built assuming they are on the root. Therefore, much more effort is required to assimilate it into my portfolio site, beyond just building the project, sticking it into a subfolder, and changing a link here or there

This starter project is meant to put a stop to these difficulties. It can act as the basis for any new project, and already contains functionality to allow me to assimilate the project into my Portfolio site, or place it at the root, or place it anywhere, with no more effort than, as suggested: sticking it into a folder and changing certain links in some files. Due to the flexibility of this approach, the starter can itself act as the basis for the new Portfolio site, too

It has the following outline:
  * Entry point in the subfolder root: an index file named either index.html, or if the project depends upon PHP, index.php
  * config/project-config.js: a configuration folder including, most importantly, the project-config.js file defining the project's folder structure. For example:
  ```
export const project Config = {
  folders: {
    pages: "Pages",
    sounds: "WAVs",
    etc.
  }
};
 ```
  * Default folders:
    * images: "Images",             \\ a folder for images and picture resources
    * scripts: "scripts",           \\ a folder for scripts, written in JavaScript
    * stylesheets: "stylesheets",   \\ a folder for CSS stylesheets to control the visual appearance of the site
    * scripts/path-utils.js:        \\ a path utility, in particular, a JavaScript object for constructing URLs and referring to paths within the project in a manner that avoids the project builder from having to know the actual path
  * Resources and other folders can be linked to by a Javascript method, though the project builder will want to include most or all folders in the original projectConfig object. For example, a project builder want to have scripts/js and scripts/php for scripts in different languages  The StarterProject will use the following convention in HTML files to link project source files. In particular, the link to the file or resource will be an HTML attribute called "data-project-file" containing one of the default folders (images, stylesheets, or scripts) or user-defined folders (in the project-config.js file):
  ```
<!-- An image -->
<img data-project-file="images:diagram.png"
  alt="Project diagram">

<!-- A stylesheet -->
<link rel="stylesheet"
  data-project-file="stylesheets:main.css">

<!-- A link to another page -->
<a data-project-file="pages:introduction.html">
  Introduction
</a>
```

This convention will require each HTML page to run a small script, such as shown below, to convert all of the relative to links to actual paths, where the "initializeProjectPaths()" function will be defined in scripts/path-utils.js:
```
<script type="module">
  import {initializeProjectPaths} from "./Scripts/path-utils.js";
  initializeProjectPaths();
</script>
```
