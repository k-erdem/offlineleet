/* File Structure:
    - Put an event listener on the button
    - Get the current tab
    - Send a message to the webpage/content page
    - Receive a response from the webpage/content page
*/

// Event listener on the button
document.getElementById('downloadButton').addEventListener('click', async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    // Send message to the webpage
    const response = await chrome.tabs.sendMessage(tab.id, {action: "getQuestion"});
    
});

