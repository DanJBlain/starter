// airlock-engine.js
//
class AirlockEngine {
    constructor(config = {}) {
        // Merge user configurations with sensible defaults
        this.config = {
            attribute: 'data-project-file',
            debug: false,
            ...config
        };
        
        // Calculate the absolute anchor based on where THIS script file is hosted,
        // or fallback to the current page folder.
        const currentScriptSrc = document.currentScript ? document.currentScript.src : '';
        const scriptUrl = currentScriptSrc.length > 0 ? currentScriptSrc : window.location.href;
        
        this.baseUrl = new URL('.', scriptUrl).href;
        
        if (this.config.debug) {
            console.log(`%c[Airlock] Initialized at: ${this.baseUrl}`, 'color: #00bcd4; font-weight: bold;');
        }
    }
    
    // Starts the global watch engine
    start() {
        const attr = this.config.attribute;

        // Core element router
        const resolveElement = (el) => {
            const airlockPath = el.getAttribute(attr);
            if (!airlockPath) return;
            
            let attrName = 'href';
            if (['IMG', 'SCRIPT', 'AUDIO', 'VIDEO', 'IFRAME'].includes(el.tagName)) {
                attrName = 'src';
            }
            
            const currentAttrValue = el.getAttribute(attrName);
            
            // 🛑 FRAMEWORK GUARD
            // If the current attribute doesn't match our raw path, a bundler has taken over.
            if (currentAttrValue && currentAttrValue !== airlockPath) {
                if (this.config.debug) {
                    console.log(
                        `%c[Airlock] Framework detected for <${el.tagName.toLowerCase()}> (${airlockPath}). Stepping aside.`, 
                        'color: #ff9800; font-style: italic;'
                    );
                }
                el.removeAttribute(attr);
                return;
            }
            
            // 🟢 VANILLA ROUTER
            const absoluteUrl = new URL(airlockPath, this.baseUrl).href;
            
            if (this.config.debug) {
                console.log(`[Airlock] Resolved <${el.tagName.toLowerCase()}>: ${airlockPath} ➡️ ${absoluteUrl}`);
            }
            
            el.setAttribute(attrName, absoluteUrl);
            el.removeAttribute(attr);
        };
        
        const scanTree = (targetNode) => {
            if (!targetNode || targetNode.nodeType !== Node.ELEMENT_NODE) return;
            if (targetNode.hasAttribute(attr)) resolveElement(targetNode);
            targetNode.querySelectorAll(`[${attr}]`).forEach(resolveElement);
        };
        
        // Instantiate MutationObserver
        this.observer = new MutationObserver((mutations) => {
            for (let i = 0; i < mutations.length; i++) {
                const addedNodes = mutations[i].addedNodes;
                for (let j = 0; j < addedNodes.length; j++) {
                    scanTree(addedNodes[j]);
                }
            }
        });
        
        // Start streaming interception immediately
        this.observer.observe(document.documentElement, { childList: true, subtree: true });
        
        // Safety fallback sync
        scanTree(document.documentElement);
    }
}

// Attach it to the window object so our HTML bootloader can see it instantly
window.AirlockEngine = AirlockEngine;

/**
 * Sample instantiation of the AirlockEngine class in the HTML file

<head>
    <!-- Other tags in the head element -->

    <!-- Update with actual location of this script on the website -->
    <script src="../scripts/airlock-engine.js"></script>
    
    <script>
        new AirlockEngine({ 
            debug: true,
            attribute: 'data-project-file' // Can be customized per project if desired
        }).start();
    </script>

    <!-- Other tags in the head element -->
</head>

*/
