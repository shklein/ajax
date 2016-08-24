// XmlHttp constructor can receive request settings:
// url - the server url
// contentType - request content type
// type - request type (default is GET)
// data - optional request parameters
// async - whether the request is asynchronous (default is true)
// showErrors - display errors
// complete - the callback function to call when the request
// completes
  function XmlHttp(settings)
  {
    //store the settings object in a class property
    this.settings = settings;

    //override default settings with those received as parameter
    //default url points to current page
    var url = location.href;
    if(settings.url)
      url = settings.url;

    //default content type is type for forms
    var contentType = "application/x-www-form-urlencoded";
    if (settings.contentType)
      contentType = settings.contentType;

  //by default request is done through GET
  var type = "GET";
  if (settings.type)
    type = settings.type;

  //by default there are no parameters sent
  var data = null;
  if (settings.data)
    {
      data = settings.data;
      //if we through GET we can properly adjust the URL
      if (type == "GET")
        url = url + "?" + data;
    }

    //by default the postback is asynchronous
    var async = true;
    if (settings.async)
      async = settings.async;

    //by default show all infrastructure errors
    var showErrors = true;
    if (settings.showErrors)
      showErrors = settings.showErrors;

    //create XmlHttpRequest object
    var xhr = XmlHttp.create();

    //set the postback properties
    xhr.open(type, url, async);
    xhr.onreadystatechange = onreadystatechange;
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.send(data);

    //the function that displays errors
    function displayError(message)
    {
      //ignore errors if showErrors is false
      if (showErrors)
      {
        //display error message
        alert("Error encountered: \n" + message);
      }
    }

    //reads server response
    function readResponse()
    {
      try
      {
        //retrieve response content type
        var contentType = xhr.getResponseHeader("Content-Type");
        //build the json object if response has one
        if (contentType == "application/json")
        {
          response = JSON.parse(xhr.responseText);
        }
        //get the DOM element if response is XML
        else if (contentType == "text/xml")
        {
          response = xhr.responseXml;
        }
        //by default get response as text
        else
          {
            response = xhr.responseText;
          }
          //call the callback function if any
          if (settings.complete)
            settings.complete (xhr, response, xhr.status);

      }
      catch (e)
      {
        displayError(e.toString());
      }

    }
    //called when the request state changes
    function onreadystatechange()
    {
      //when readyState is 4, read server response
      if (xhr.readyState == 4)
      {
        //continue only if HTTP status is "ok"
        if (xhr.status == 200)
        {
          try
          {
            //read response from server
            readResponse();
          }
          catch (e)
          {
            //display error message
            displayError(e.toString());
          }
        }
        else
        {
          //display error message
          displayError(xhr.statusText);
        }
      }
    }
  }

  //static method that returns a new XmlHttpRequest object
  XmlHttp.create = function()
  {
    //will store reference to the XmlHttpRequest object
    var xmlHttp;
    //create the XmlHttpRequest object
    try
    {
      //assume IE7 or newer or other modern browsers
      xmlHttp = new XMLHttpRequest();
    }
    catch (e)
    {
      //assume IE6 or older
      try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
      }
      catch (e) { }
    }
    //return the created object or display an error message
    if (!xmlHttp)
      alert("Error creating the XmlHttpRequest object.");
    else
      return xmlHttp;
  }
