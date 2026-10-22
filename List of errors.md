WARNING - THIS LIST OF ERRORS WAS PORTED FROM THE REPOSITORY "testStarter" MOSTLY UNEDITED. It needs to be updated for all the changes I've made while fleshing out the testStarter prototype. I may eventually delete testStarter, since this starter prototype has become a functional

List of errors to be flagged by the ancestor (default) ProjectPaths object:

* Missing data structure: projectConfig
* Missing fields: projectConfig.folder (and each of images, stylesheets, scripts)
* Invalid data: projectConfig.folder's fields include (images, stylesheets, scripts) and are correctly valued
* Unknown project folder: ${category}
     i.e. during call to summon a project folder or resource
* Index file missing in folder ${root}
     i.e. index.html or index.php
* Missing folder: scripts
* Missing folder: stylesheets
* Missing folder: images
