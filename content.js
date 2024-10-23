// retrieve the question text from web page
// Edit this function to properly format the question. (If necessary - title, question text etc)
function getQuestionBody() {
    return document.querySelector("div[data-track-load='description_content']").textContent.replace(/\u00A0/g, ' ').trim();
}

function getTitle(){
    return document.querySelector('.text-title-large a').textContent.trim();
}

// Create the message receiveng end
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    if(request.action === "getQuestion"){

        qtitle = getTitle();
        description = getQuestionBody();

        // Now send a message to a background worker.
        // Background worker will create & download jupyter
        chrome.runtime.sendMessage({
            action: "createNotebook",
            data: description,
            title: qtitle,
        }).then(workerResponse => {
            console.log('Worker Response:', workerResponse);
        }).catch(error => {
            console.error('Error from service worker:', error);
        });
        
        return true; // Indicate we will send response asynchronously

    }
})