function process () {
  //Create HTML code
  var string= "";
  string = "<ul>"
      + "<li>Brick</li>"
      + "<li>Navy</li>"
      + "<li>Peachpuff</li>"
      + "</ul>";

  //Reference <div> element
  myDiv = document.getElementById("myDivElement");

  //Add content
  myDiv.innerHTML = string;

}
