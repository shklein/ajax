//change table style to style 1
function setStyle1 () {
  //reference elements
  oTable = document.getElementById("table");
  oTableHead = document.getElementById("tableHead");
  oTableFirstLine = document.getElementById("tableFirstLine");
  oTableSecondLine = document.getElementById("tableSecondLine");

  //set styles
  oTable.className = "Table1";
  oTableHead.className = "TableHead1";
  oTableFirstLine.className = "TableContent1";
  oTableSecondLine.className = "TableContent1";


}

function setStyle2 () {
  oTable = document.getElementById("table");
  oTableHead = document.getElementById("tableHead");
  oTableFirstLine = document.getElementById("tableFirstLine");
  oTableSecondLine = document.getElementById("tableSecondLine");

  oTable.className = "Table2";
  oTableHead.className = "TableHead2";
  oTableFirstLine.className = "TableContent2";
  oTableSecondLine.className = "TableContent2";


}
