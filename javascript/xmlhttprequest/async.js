//holds an instance of XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();

//creates an XMLHttpRequest instance
function createXmlHttpRequestObject()
{
  //will store reference to object
  var xmlHttp;
  //create object
  try {
    //assume IE7 or newer/modern
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    //assume IE6 or older
    try
    {
      xmlHttp = new ActiveXObject ("Microsoft.XMLHttp");
    }
    catch (e) { }
  }
    //return created object or error message
    if (!xmlHttp)
      alert("Error creating the XMLHttpRequest object.");
   else
      return xmlHttp;
    }


    //performs server request, assigns callback function
    function process()
    {
      //only continue with valid xmlHttp object
      if (xmlHttp)
      {
        //connect to server
        try {
          //initiate reading the async.txt file from the server
          xmlHttp.open("GET", "async.txt", true);
          xmlHttp.onreadystatechange = handleRequestStateChange;
          xmlHttp.send(null);

          //change cursor to "busy"
          document.body.style.cursor = "wait";
        }
        //display error in case of failure
        catch (e) {
          alert("Can't connect to server:\n" + e.toString());

          //revert "busy" to normal
          document.body.style.cursor = "default";
        }

        }
      }

    //function that handles response
    function handleRequestStateChange()
    {
      //obtain reference to <div> element
      myDiv = document.getElementById("myDivElement");
      //display status
      if (xmlHttp.readyState == 1) {

        myDiv.innerHTML += "Request status: 1 (loading) <br/ >";

      } else if (xmlHttp.readyState == 2) {

        myDiv.innerHTML += "Request status: 2 (loaded) <br/ >";
      } else if (xmlHttp.readyState == 3) {

        myDiv.innerHTML += "Request status: 3 (interactive) <br/ >";
      }
      //server response
      else if (xmlHttp.readyState == 4) {

        //revert "busy" to normal
        document.body.style.cursor = "default";
        //read response only if "OK"
        if (xmlHttp.status == 200) {
          try {
            //read message from server
            response = xmlHttp.responseText;
            //display message
            myDiv.innerHTML +=
             "Request status: 4 (complete). Server said: <br/ >";
             myDiv.innerHTML += response;
          } catch (e) {
            //display error message
            alert("Error reading the response: " + e.toString());
          }
        }
        else {
          //display status
          alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
          //revert "busy" to normal
          document.body.style.cursor = "default";
        }
      }
    }
