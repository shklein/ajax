function process () {
  //create <p> element
  oP = document.createElement("p");

  //create "hello"
  oHelloText = document.createTextNode
  ("Here's a cool list of colors for you.");

  //ad text node to <p>
  oP.appendChild(oHelloText);

  //create <ul>
  oUl = document.createElement("ul");

  //create <ui> + text node
  oLiBrick = document.createElement("li");
  oBrick = document.createTextNode("Brick");
  oLiBrick.appendChild(oBrick);

  oLiNavy = document.createElement("li");
  oNavy = document.createTextNode("Navy");
  oLiNavy.appendChild(oNavy);

  oLiPeachpuff = document.createElement("li");
  oPeachpuff = document.createTextNode("Peachpuff");
  oLiPeachpuff.appendChild(oPeachpuff);

  //add <ui> elements to <ul>
  oUl.appendChild(oLiBrick);
  oUl.appendChild(oLiNavy);
  oUl.appendChild(oPeachpuff);

  //reference <div>
  myDiv = document.getElementById("myDivElement");

  //add content
  myDiv.appendChild(oHelloText);
  myDiv.appendChild(oUl);

}
