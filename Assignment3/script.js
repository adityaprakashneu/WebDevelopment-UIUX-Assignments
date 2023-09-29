//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var token = 3;

function addRecord(){
  var table = document.getElementById("myTable");
  var trbody = document.getElementsByTagName("tbody")[0];
  token = token + 1;
  var budget = String(token) + String(token + 1) + String(token + 2) + String(token + 3) + String(token + 4);
  var trNode = document.createElement("tr");
  var tdCheckBoxNode = document.createElement("td");
  tdCheckBoxNode.innerHTML = '<input type="checkbox" onclick="onClickCheckBox(this)" /><br /><br /><img src="down.png" width="25px" onclick="onClickDropDown(this)" />'  

  var tdStudentNode = document.createElement("td");
  tdStudentNode.innerHTML = 'Student '+(token);
  var tdTeacher = document.createElement("td");
  tdTeacher.innerHTML = 'Teacher '+(token);
  var tdAward = document.createElement("td");
  tdAward.innerHTML = 'Approved ' +(token);
  var tdSemester = document.createElement("td");
  tdSemester.innerHTML = 'fall';
  var tdType = document.createElement("td");
  tdType.innerHTML = "TA";
  var tdBudget = document.createElement("td");
  tdBudget.innerHTML = budget;
  var tdPercentage = document.createElement("td");
  tdPercentage.innerHTML = "100%";
  var tdDelete = document.createElement("td");
  tdDelete.innerHTML = '<button id="DeleteRow">Delete</button>' ;
  var tdEdit = document.createElement("td");
  tdEdit.innerHTML = '<button id="EditRow">Delete</button>' ;
  
  trNode.appendChild(tdCheckBoxNode);
  trNode.appendChild(tdStudentNode);
  trNode.appendChild(tdTeacher);
  trNode.appendChild(tdAward);
  trNode.appendChild(tdSemester);
  trNode.appendChild(tdType);
  trNode.appendChild(tdBudget);
  trNode.appendChild(tdPercentage);
  // trNode.appendChild(tdDelete);
  // trNode.appendChild(tdEdit);
  trbody.appendChild(trNode);
  
}

function onClickCheckBox(checkBox){
  var selectedRow = checkBox.parentElement.parentElement;
  // var table = document.getElementsByTagName("thead")[0];
  var headTable = document.getElementById("headTable");
  headTable.innerHTML = '<tr><th><th>STUDENT</th><th>ADVISOR</th><th>AWARD<br />STATUS</th><th>SEMESTER</th><th>TYPE</th><th>BUDGET<br />#</th><th>PERCENTAGE</th></tr>';
  var submitButton = document.getElementById("submitButton");

  if(checkBox.checked==true){
    headTable.innerHTML = '<tr><th><th>STUDENT</th><th>ADVISOR</th><th>AWARD<br />STATUS</th><th>SEMESTER</th><th>TYPE</th><th>BUDGET<br />#</th><th>PERCENTAGE</th><th>DELETE</th><th>EDIT</th></tr>';

      selectedRow.style.backgroundColor="yellow";
      // var deleteButtonHeading = document.createElement("th");
      // deleteButtonHeading.innerHTML = 'DELETE';
      // var editButtonHeading = document.createElement("th");
      // editButtonHeading.innerHTML = 'EDIT';
      // table.appendChild(deleteButtonHeading);
      // table.appendChild(editButtonHeading);
      var deleteButton = document.createElement("td");
      deleteButton.innerHTML = '<button id="deleted" type="button" onclick="onDeleteRow(this)">Delete</button>' 
      var editButton = document.createElement("td");
      editButton.innerHTML = '<button id="edited" type="button" onclick="onEditText(this)">Edit</button>' 
      selectedRow.appendChild(deleteButton);
      selectedRow.appendChild(editButton);
      // trbody.appendChild(trNode);
      // var nextRow = document.createElement("tr");
      submitButton.style.backgroundColor="orange";
  }
  else{
    headTable.innerHTML = '<tr><th><th>STUDENT</th><th>ADVISOR</th><th>AWARD<br />STATUS</th><th>SEMESTER</th><th>TYPE</th><th>BUDGET<br />#</th><th>PERCENTAGE</th></tr>';

      selectedRow.style.backgroundColor="#fff";
      selectedRow.deleteCell(8);
      selectedRow.deleteCell(8);
      submitButton.style.backgroundColor="white";
  }
  console.log(checkBox);
} 

function onDeleteRow(deletedRef){
  var selectedRow = deletedRef.parentElement.parentElement;
  var index = selectedRow.rowIndex
  console.log(selectedRow.rowIndex);
  document.getElementById("myTable").deleteRow(selectedRow.rowIndex);
  alert(index +" has been deleted");
}
function onEditText(editText){
  var selectedRow = deletedRef.parentElement.parentElement;
}
function onClickDropDown(detailsImg){
  var selectedRow = detailsImg.parentElement.parentElement; 
  var newDropTable = '<tr class="dropDownTextArea"><td colspan="8">  Advisor:<br /><br />  Award Details<br />  Summer 1-2014(TA)<br />  Budget Number: <br />  Tuition Number: <br />  Comments:<br /><br /><br />  Award Status:<br /><br /><br /></td></tr>'
  // var detailsRow = document.createElement("tr");
  // detailsRow.innerHTML = 'Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br /></td>'
  // selectedRow.appendChild(detailsRow);
  // console.log(selectedRow);
  // console.log(selectedRow.nextElementChild);
  // console.log(combinationTable);

  console.log(selectedRow);
  var nextRow = selectedRow.nextElementSibling;
  if (nextRow.style.display === "none" || nextRow.style.display === "") {
    nextRow.style.display = "table-row";
    selectedRow.appendChild(newDropTable);
  } else {
      nextRow.style.display = "none";
  }
}

function demo1(clickedImage) {
  var parentRow = clickedImage.parentElement.parentElement;
   // Get the parent row of the clicked image
  var nextRow = parentRow.nextElementSibling; 

  if (nextRow.style.display === "none" || nextRow.style.display === "") {
      nextRow.style.display = "table-row";
  } else {
      nextRow.style.display = "none";
  }
}
