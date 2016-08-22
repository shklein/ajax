//holds instance of XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();

//creates instance
function createXmlHttpRequestObject(){
  //store reference
  var xmlHttp;
  //create object
  try {

    //assume IE7, etc.
    xmlHttp = new XMLHttpRequest();

  } catch (e) {

    //assume IE6, etc.
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
    } catch (e) { }


    }

    //return obj or error
    if (!xmlHttp) {
      alert("Error creating the XMLHttpRequest object.");
    } else {
      return xmlHttp;
    }
  }

    //read a file from the server
    function process() {
      //only continue if xmlHttp isn't void
      if (xmlHttp) {
        //try to connect
        try {
          //initiate reading file from server
          xmlHttp.open("GET", "phptest.php", true);
          xmlHttp.onreadystatechange = handleRequestStateChange;
          xmlHttp.send(null);
        } catch (e) {
          //display Error
          alert("Can't connect to server:\n" + e.toString());

        }
      }
    }

    //state change function
    function handleRequestStateChange() {
      //ready state 4
      if (xmlHttp.readyState == 4) {
        //continue is status is ok
        if (xmlHttp.status == 200) {
          try {
            //do something w/response
            handleServerResponse();
          } catch (e) {
            //display Error
            alert("Error reading the response: " + e.toString());

          }
        }
        else {
          //display status
          alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
        }
      }
    }

    //handles response
    function handleServerResponse() {
      //read message
      var xmlResponse = xmlHttp.responseXML;
      //obtain XML document element
      xmlRoot = xmlResponse.documentElement;
      //obtain arrays w/book info
      titleArray = xmlRoot.getElementsByTagName("title");
      isbnArray = xmlRoot.getElementsByTagName("isbn");
      //generate HTML output
      var html = "";
      //iterate through arrays, create HTML structure
      for (var i=0; i<titleArray.length; i++)
        html += titleArray.item(i).firstChild.data + ", " + isbnArray.item(i).firstChild.data + "<br/>";
        //obtain reference to element on DOM
        myDiv = document.getElementById("myDivElement");
        //display output
        myDiv.innerHTML = "<p>Server says:</p>" + html;
    }
