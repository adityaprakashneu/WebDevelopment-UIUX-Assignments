//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return (this.mytitle);
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

// code to enable and disable the submit button
const checkboxes = document.querySelectorAll('.checkbox');
const submitButton = document.getElementById('button');

// Disable the submit button initially
submitButton.disabled = true;

// Function to enable the button and change its CSS
function enableButton() {
  submitButton.disabled = false;
  submitButton.style.backgroundColor = 'orange';
  submitButton.style.color = 'white';
  submitButton.style.border = '2px solid orange'
}

// function to toggle row details
function toggleVisibility(divId) {
  const div = document.getElementById(divId);
  if (div.style.display === 'none') {
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
}

// Function to disable the button and reset its CSS
function disableButton() {
  submitButton.disabled = true;
  submitButton.style.backgroundColor = '';
  submitButton.style.color = 'grey';
  submitButton.style.border = '1px solid #d2d2d2'
}

// toggle checkbox and change background color
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.parentElement.parentElement.style.backgroundColor = 'yellow';
        checkbox.parentElement.parentElement.lastElementChild.firstChild.style.display = 'block';
        checkbox.parentElement.parentElement.lastElementChild.previousElementSibling.firstChild.style.display = 'block';
        console.log(checkbox.parentElement.parentElement);
        console.log(checkbox.parentElement.parentElement.lastElementChild);
      } else {

        checkbox.parentElement.parentElement.style.backgroundColor = '';
        checkbox.parentElement.parentElement.lastElementChild.firstChild.style.display = 'none';
        checkbox.parentElement.parentElement.lastElementChild.previousElementSibling.firstChild.style.display = 'none';
      }
    });

    if (atLeastOneChecked) {
      enableButton();
    } else {
      disableButton();
    }
  });
});

// function to add new student
let studentCount = 3; // Initial student count

function addNewStudent() {
  studentCount++;

  // Create a new row with dummy values
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
                <td>
                  <input type="checkbox" class="checkbox"/><br /><br /><img onclick=toggleVisibility("drop${studentCount}") src="down.png" width="25px" />
                </td>
                <td>Student ${studentCount}</td>
                <td>Teacher ${studentCount}</td>
                <td>Approved</td>
                <td>Fall</td>
                <td>TA</td>
                <td>12345</td>
                <td>100%</td>
                <td><button id=edit${studentCount} class="edit" onclick="removeRow(this)">Edit</button></td>
                <td><button class="del" onclick="removeRow(this)">Delete</button></td>
            `;

  console.log(newRow.firstElementChild.firstElementChild);

  const newCheckBox = newRow.firstElementChild.firstElementChild;

  newCheckBox.addEventListener('change', function () {
    const checkboxes = document.querySelectorAll(".checkbox");
    const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    checkboxes.forEach(checkbox => {
      if (newCheckBox.checked) {
        newCheckBox.parentElement.parentElement.style.backgroundColor = 'yellow';
        newCheckBox.parentElement.parentElement.lastElementChild.firstChild.style.display = 'block';
        newCheckBox.parentElement.parentElement.lastElementChild.previousElementSibling.firstChild.style.display = 'block';
        console.log(checkbox.parentElement.parentElement.lastElementChild)
      } else {
        newCheckBox.parentElement.parentElement.style.backgroundColor = '';
        newCheckBox.parentElement.parentElement.lastElementChild.firstChild.style.display = 'none';
        newCheckBox.parentElement.parentElement.lastElementChild.previousElementSibling.firstChild.style.display = 'none';
      }
    });

    if (atLeastOneChecked) {
      enableButton();
    } else {
      disableButton();
    }
  });

  const newRowDetails = document.createElement("tr");
  newRowDetails.setAttribute("id", `drop${studentCount}`);
  newRowDetails.innerHTML = `
                <td colspan="8">
                Advisor:<br /><br />
                Award Details<br />
                Summer 1-2014(TA)<br />
                Budget Number: <br />
                Tuition Number: <br />
                Comments:<br /><br /><br />
                Award Status:<br /><br /><br />
                </td>
            `;

  // Add the new row to the table
  const tableBody = document.querySelector("table#myTable tbody");
  tableBody.appendChild(newRow);
  tableBody.appendChild(newRowDetails)
  newRowDetails.style.display = 'none';

  alert(`Student ${studentCount} Record Added Successfully`);
}

function removeRow(button) {
  // Find the parent row and remove it
  const tbody = document.querySelector("table#myTable tbody");
  const row = button.parentNode.parentNode; // Get the current row to delete

  const nextRow = row.nextElementSibling;
  var student_id = nextRow.id;
  student_id = student_id[student_id.length - 1]
  tbody.removeChild(row);
  tbody.removeChild(nextRow);

  alert(`Student ${student_id} Record Deleted Successfully`);
}
