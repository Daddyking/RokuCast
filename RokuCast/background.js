chrome.runtime.onMessage.addListener(function (msg)
{
    if (msg.type == "open")
    {
        openApp(msg);
    }
});

function openApp(msg)
{
    if (localStorage["ipAddress"] != undefined)
    {
        chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},
        function(tabs)
        {
            var ip = localStorage["ipAddress"];
            var title = tabs[0].title;
            var favIconURL = tabs[0].favIconUrl;
            console.log(tabs);
            console.log(title);
            console.log(favIconURL);

            var url = "http://" + ip + ":8060/input/1598?t=v" + "&u=" + encodeURIComponent(msg.sentLink) + "&videoName=" + encodeURIComponent(title) + "&k=" + encodeURIComponent(favIconURL) + "&videoFormat=mp4";
            var method = "POST";
            var postData = "";
            var async = true;

            var request = new XMLHttpRequest();
            request.open(method, url, async);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(postData);
        })
    }
    else
    {
        alert('Please set your roku ip in options page');
    }

   
}
