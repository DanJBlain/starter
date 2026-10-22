/* scripts/project-config.js */


export class ProjectConfig {
    // Base project folder
    #root = new URL("../", import.meta.url);

    // Base folders present in all Starter projects
    #folders = {
        root: "",
        images: "images",
        scripts: "scripts",
        stylesheets: "stylesheets"
    };

    // Construct the configuration object
    constructor(root, folderList) {
        this.#root = root;
        this.#folders = {
            ...this.#folders,
            ...folderList
        };
    }

    // Construct a URL for a file in one of the standard folders
    folder(category, filename) {
        if (category === "") {category="root";}

        const folder = this.#folders[category];

        if (folder === undefined) {throw new Error(`Unknown project folder: ${category}`);}

        const directory = folder
            ? new URL(`${folder}/`, this.#root)
            : this.#root;

        return new URL(filename, directory).href;
    }

    // Construct a URL for a file at the project root
    root(filename = "") {
        return new URL(filename, this.#root).href;
    }

    // Construct the URL of the site home
    static home() {
        return new URL("../", import.meta.url).href;
    }
}


// Parse the calling HTML file to link the project's folders
export function initializeProjectPaths(projectRoot, folderList = {}) {

    // Ensure it's a function (classes are functions under the hood)
    const projectConfig = new ProjectConfig(projectRoot, folderList);
    
    document.querySelectorAll("[data-project-file]")
        .forEach(element => {
            const specification = element.dataset.projectFile;
            const separator = specification.indexOf(":");
            const category = (separator === -1) ? "" : specification.slice(0, separator);
            const filename = specification.slice(separator + 1);
            const url = projectConfig.folder(category, filename);

            if (element instanceof HTMLLinkElement) {
                element.href = url;
            } else if (element instanceof HTMLImageElement) {
                element.src = url;
            } else if (element instanceof HTMLAnchorElement) {
                element.href = url;
            }
        });
}


// Parse the calling HTML file to link the project's folders
export function applyProjectPaths(projectConfig) {
    if (!(projectConfig instanceof ProjectConfig)) {
        throw new TypeError(
            "applyProjectPaths failed: expected an instantiated ProjectConfig object"
        );
    }

    document.querySelectorAll("[data-project-file]")
        .forEach(element => {
            const specification = element.dataset.projectFile;
            const separator = specification.indexOf(":");

            const category = (separator === -1)
                ? ""
                : specification.slice(0, separator);

            const filename = (separator === -1)
                ? specification
                : specification.slice(separator + 1);

            const url = projectConfig.folder(category, filename);

            if (
                element instanceof HTMLLinkElement ||
                element instanceof HTMLAnchorElement
            ) {
                element.href = url;
            } else if (element instanceof HTMLImageElement) {
                element.src = url;
            }
        });
}

/**
 * Sample instantiation of the ProjectConfig class
 * Generally you won't do this without adding new folders, since the "import" call will
 * by itself contain functionality for the {scripts, stylesheets, images} folders.

// For a more complicated project configuration, import the project-config.js object from host/scripts to host/projects/myProject/scripts/project-config.js
import { projectConfig } from "../../../scripts/project-config.js";

const myProjectConfig extends ProjectConfig {
    // Construct the configuration object
    constructor(folderList=this.#folders) {
        this.#folders = {
            ...super.folders,
            ...folderList
        }
    }
);

config = new myProjectConfig({
        sounds: "WAVs",
        php: "scripts/php"
    });

// Instead of extending, you may call the initializeProjectPaths() method from a script block of the HTML index.html file
    <script type="module">
        import {
            initializeProjectPaths
        } from "./scripts/project-config.js";

        initializeProjectPaths({});
    </script>
*/