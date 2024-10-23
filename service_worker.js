/*
    This file is the service worker.
    It's not related to the web directly.
    Service worker will be used to create & download a Jupyer NB.
*/

/*  Event Handlers in service workers should be declared at the top of the script ! */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    // If we get a create notebook message
    if (request.action === "createNotebook"){

        // Create a notebook
        const notebook = createNB(request); // belki undefined olmasinin sebebi bunun isminin ayni olmasi?
        const blob = new Blob([JSON.stringify(notebook, null, 2)], { type: 'application/json' });

        const url = 'data:application/x-ipynb+json;base64,' + btoa(JSON.stringify(notebook, null, 2));

        chrome.downloads.download({
            url: url,
            filename: `LeetCodeExtension/${request.title}.ipynb`
        }, () => {
            sendResponse({
                success: true,
                nb: notebook
            });
        });
        
        return true; // Indicate we will send response asynchronously
    }

});

function createNB(req){
    const notebook = {
        cells: [
          {
            cell_type: "markdown",
            metadata: {},
            source: [`# ${req.title}`, req.data]
          },
          {
            cell_type: "code",
            execution_count: null,
            metadata: {},
            outputs: [],
            source: ["# Your code here\n"]
          }
        ],
        metadata: {
            kernel: {
                name: "python3",
                language: "python"
            },
            language_info: {
                name: "python",
                version: "3.8.5"
            }
        },
        nbformat: 4,
        nbformat_minor: 4
    };
    return notebook;
}