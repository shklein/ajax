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


    //initiates a server request to send numbers typed by user,
    //sets callback function to read server response
    function process()
    {
      //only continue with valid xmlHttp object
      if (xmlHttp)
      {
        //connect to server
        try {
          //get two values entered by user
          var firstNumber = document.getElementById("firstNumber").value;
          var secondNumber = document.getElementById("secondNumber").value;

          //create params string
          var params = "firstNumber=" + firstNumber + "&secondNumber=" + secondNumber;

          //initiate async HTTP request
          xmlHttp.open("GET", "divide.php?" + params, true);
          xmlHttp.onreadystatechange = handleRequestStateChange;
          xmlHttp.send(null);
        }
        //display error in case of failure
        catch (e) {
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
//handles the response received from the server
function handleServerResponse () {
  //retrieve server response packaged as an XML DOM object
  var xmlResponse = xmlHttp.responseXML;

  //catching server-side errors
  if (!xmlResponse || !xmlResponse.documentElement)
    throw("Invalid XML structure:\n" + xmlHttp.responseText);

  //catching server-side errors (Firefox)
  var rootNodeName = xmlResponse.documentElement.nodeName;
    if (rootNodeName == "parsererror")
      throw("Invalid XML structure:\n" + xmlHttp.responseText);

  //getting the root element (document element)
  xmlRoot = xmlResponse.documentElement;

  //testing that we received the XML document expected
  if (rootNodeName != "response" || !xmlRoot.firstChild)
    throw("Invalid XML structure:\n" + xmlHttp.responseText);

//the value we need to display is the child of the root <response> element
  responseText = xmlRoot.firstChild.data;

//display the user message
myDiv = document.getElementById("myDivElement");
myDiv.innerHTML = "Server says the answer is: " + responseText;

}
