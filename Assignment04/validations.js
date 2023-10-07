document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = form.querySelector('input[type="Submit"]');
    const firstName = form.querySelector("#firstName");
    const lastName = form.querySelector("#lastName");
    const emailId = form.querySelector("#emailId");
    const phoneNumber = form.querySelector("#phoneNumber");
    const zipcode = form.querySelector("#zipcode");
    const comments = form.querySelector("#comments");
    const sourceCheckboxes = form.querySelectorAll('input[name="source"]');
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const checkboxContainer = document.getElementById("checkboxContainer");


    const selectList = document.createElement("select");
    selectList.id = "drinksSelect";
    selectList.name = "drinks";

    const drinks = ["--Select--", "Water", "Coffee", "Tea", "Soda", "Juice"];
    const drinkOptions = {
        Water: ["Small", "Medium", "Large"],
        Coffee: ["Small", "Medium", "Large"],
        Tea: ["Small", "Medium", "Large"],
        Soda: ["Regular", "Large", "X-Large"],
        Juice: ["Small", "Medium", "Large"],
    };

    drinks.forEach((drink) => {
        const option = document.createElement("option");
        option.value = drink;
        option.text = drink;
        selectList.appendChild(option);
    });

    // Add select list to the document
    form.insertBefore(selectList, submitButton);

    // Function to create checkboxes dynamically based on selected option
    function createCheckboxesForSelectedOption() {
        const selectedOption = selectList.value;
        const checkboxContainer = document.getElementById("checkboxContainer");

        // Clear existing checkboxes
        checkboxContainer.innerHTML = "";

        if (selectedOption !== "") {
            const drinkOptionsForSelected = drinkOptions[selectedOption];

            if (drinkOptionsForSelected) {
                drinkOptionsForSelected.forEach((option) => {
                    const checkboxLabel = document.createElement("label");
                    checkboxLabel.textContent = `${option}`;
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "drinkSize";
                    checkbox.value = option;
                    checkboxLabel.appendChild(checkbox);
                    checkboxContainer.appendChild(checkboxLabel);
                });
            }
        }
    }

    // Add onChange event listener to the select list
    selectList.addEventListener("change", createCheckboxesForSelectedOption);


    // Function to add error message below the field
    function showError(element, message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = message;
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }

    // Function to remove error message
    function removeError(element) {
        const errorDiv = element.parentNode.querySelector(".error-message");
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Function to validate alphanumeric fields
    function validateAlphanumeric(element) {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(element.value);
    }

    // Function to validate phone number
    function validatePhoneNumber(element) {
        const regex = /^\d{3}-\d{3}-\d{4}$/;
        return regex.test(element.value);
    }

    // Function to validate email
    function validateEmail(element) {
        const regex = /^[a-zA-Z0-9._-]+@northeastern.edu$/;
        return regex.test(element.value);
    }

    // Function to validate zipcode
    function validateZipcode(element) {
        const regex = /^\d{6}$/;
        return regex.test(element.value);
    }

    // Function to check if all validations are passed
    function isFormValid() {
        return (
            firstName.value.trim() !== "" &&
            lastName.value.trim() !== "" &&
            emailId.value.trim() !== "" &&
            validateEmail(emailId) &&
            phoneNumber.value.trim() !== "" &&
            validatePhoneNumber(phoneNumber) &&
            zipcode.value.trim() !== "" &&
            comments.value.trim() !== "" &&
            validateZipcode(zipcode)

        );
    }

    // Function to enable or disable submit button based on form validity
    function updateSubmitButtonState() {
        submitButton.disabled = !isFormValid();
    }

    function validateRadioButton() {
        if (!isRadioButtonSelected()) {
            updateValidationMessage("Please select a title.");
            return false;
        }
        updateSubmitButtonState();
        updateValidationMessage("");
        return true;
    }

    // Add event listeners for form fields
    firstName.addEventListener("input", function () {
        removeError(firstName);
        updateSubmitButtonState();
        if (firstName.value.trim() === "") {
            showError(firstName, "First Name is required.");
        } else if (!validateAlphanumeric(firstName)) {
            showError(firstName, "First Name should contain only alphanumeric characters.");
        }
    });

    lastName.addEventListener("input", function () {
        removeError(lastName);
        updateSubmitButtonState();
        if (lastName.value.trim() === "") {
            showError(lastName, "Last Name is required.");
        } else if (!validateAlphanumeric(lastName)) {
            showError(lastName, "Last Name should contain only alphanumeric characters.");
        }
    });

    emailId.addEventListener("input", function () {
        removeError(emailId);
        updateSubmitButtonState();
        if (emailId.value.trim() === "") {
            showError(emailId, "Email Id is required.");
        } else if (!validateEmail(emailId)) {
            showError(emailId, "Invalid Email Id format.");
        }
    });

    phoneNumber.addEventListener("input", function () {
        removeError(phoneNumber);
        updateSubmitButtonState();
        if (phoneNumber.value.trim() === "") {
            showError(phoneNumber, "Phone Number is required.");
        } else if (!validatePhoneNumber(phoneNumber)) {
            showError(phoneNumber, "Invalid Phone Number format.");
        }
    });

    zipcode.addEventListener("input", function () {
        removeError(zipcode);
        updateSubmitButtonState();
        if (zipcode.value.trim() === "") {
            showError(zipcode, "ZipCode is required.");
        } else if (!validateZipcode(zipcode)) {
            showError(zipcode, "Invalid ZipCode format.");
        }
    });

    comments.addEventListener("input", function () {
        removeError(comments);
        updateSubmitButtonState();
        if (comments.value.trim() === "") {
            showError(comments, "Comment is required.");
        }
    });

    radioButtons.forEach((radio) => {
        radio.addEventListener("change", function () {
            isFormValid();
        });
    });

    // Function to validate radio buttons
    function validateRadioButtons() {
        const radioButtons = document.querySelectorAll('input[type="radio"][name="title"]');
        const radioButtonsChecked = Array.from(radioButtons).some((radio) => radio.checked);

        if (!radioButtonsChecked) {
            const errorElement = document.getElementById("radioError");
            errorElement.textContent = "Please select a title.";
            errorElement.style.color = "red";
            return false;
        }

        // Clear the error message if at least one radio button is checked
        const errorElement = document.getElementById("radioError");
        errorElement.textContent = "";
        return true;
    }

    // Add event listener to the radio buttons for validation on change
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", validateRadioButtons);
    });




    // function getFormValues() {
    //     const selectedDrink = selectList.value;

    //     const selectedSizes = [];
    //     const checkboxes = document.querySelectorAll('input[name="drinkSize"]');
    //     checkboxes.forEach((checkbox) => {
    //       if (checkbox.checked) {
    //         selectedSizes.push(checkbox.value);
    //       }
    //     });

    //     // Create a table to display the form data
    //     const table = document.createElement("table");
    //     const thead = document.createElement("thead");
    //     const tbody = document.createElement("tbody");

    //     // Define the table headers
    //     const headers = [
    //       "Title",
    //       "First Name",
    //       "Last Name",
    //       "Email Id",
    //       "Phone Number",
    //       "ZipCode",
    //       "Comments",
    //       "Source",
    //       "Drinks",
    //       "Sizes",
    //     ];

    //     // Create table header cells
    //     const headerRow = document.createElement("tr");
    //     headers.forEach((headerText) => {
    //       const th = document.createElement("th");
    //       th.textContent = headerText;
    //       headerRow.appendChild(th);
    //     });
    //     thead.appendChild(headerRow);

    //     // Create table data cells with the form data
    //     const rowData = [
    //       form.querySelector('input[name="title"]:checked').value,
    //       firstName.value,
    //       lastName.value,
    //       emailId.value,
    //       phoneNumber.value,
    //       zipcode.value,
    //       comments.value,
    //       Array.from(sourceCheckboxes)
    //         .filter((checkbox) => checkbox.checked)
    //         .map((checkbox) => checkbox.value)
    //         .join(", "), // Combining multiple sources into a single string
    //       selectedDrink,
    //       selectedSizes.join(", "), // Combining selected sizes into a single string
    //     ];

    //     const dataRow = document.createElement("tr");
    //     rowData.forEach((data) => {
    //       const td = document.createElement("td");
    //       td.textContent = data;
    //       dataRow.appendChild(td);
    //     });
    //     tbody.appendChild(dataRow);

    //     table.appendChild(thead);
    //     table.appendChild(tbody);

    //     // Append the table to the document
    //     document.body.appendChild(table);

    //     // Disable the submit button
    //     submitButton.disabled = true;
    //     form.reset();
    //     // Here, you can perform other actions, such as sending the data to a server or processing it locally.
    //   }





    // Create the table, table body, and table header
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    const thead = document.createElement("thead");

    // Define the table headers
    const headers = [
        "Title",
        "First Name",
        "Last Name",
        "Email Id",
        "Phone Number",
        "ZipCode",
        "Comments",
        "Source",
        "Drinks",
        "Sizes",
    ];

    // Create table header cells
    const headerRow = document.createElement("tr");
    headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Append the table to the document
    document.body.appendChild(table);

    // Function to fetch and append submitted row data to the table
    function appendRowToTable() {
        // Fetch selected values from the form
        const selectedDrink = selectList.value;

        const selectedSizes = [];
        const checkboxes = document.querySelectorAll('input[name="drinkSize"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedSizes.push(checkbox.value);
            }
        });

        // Create table data cells with the form data
        const rowData = [
            form.querySelector('input[name="title"]:checked').value,
            firstName.value,
            lastName.value,
            emailId.value,
            phoneNumber.value,
            zipcode.value,
            comments.value,
            Array.from(sourceCheckboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value)
                .join(", "), // Combining multiple sources into a single string
            selectedDrink,
            selectedSizes.join(", "), // Combining selected sizes into a single string
        ];

        const dataRow = document.createElement("tr");
        rowData.forEach((data) => {
            const td = document.createElement("td");
            td.textContent = data;
            dataRow.appendChild(td);
        });
        tbody.appendChild(dataRow);

        // Append the table body to the table
        table.appendChild(tbody);
    }










    // Add submit event listener for the form
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check if all validations are passed
        if (isFormValid()) {
            // Create a table with form data
            // const table = document.createElement("table");
            // const tbody = document.createElement("tbody");

            // const fields = [
            //     { label: "Title", value: form.querySelector('input[name="title"]:checked').value },
            //     { label: "First Name", value: firstName.value },
            //     { label: "Last Name", value: lastName.value },
            //     { label: "Email Id", value: emailId.value },
            //     { label: "Phone Number", value: phoneNumber.value },
            //     { label: "ZipCode", value: zipcode.value },
            //     { label: "Comments", value: comments.value },
            // ];

            // sourceCheckboxes.forEach(function (checkbox) {
            //     if (checkbox.checked) {
            //         const textInput = checkbox.parentNode.querySelector('input[type="text"]');
            //         if (textInput) {
            //             fields.push({ label: "Source", value: checkbox.value });
            //         }
            //     }
            // });

            // const selectedDrink = selectList.value;

            // const selectedSizes = [];
            // const checkboxes = document.querySelectorAll('input[name="drinkSize"]');
            // checkboxes.forEach((checkbox) => {
            //     if (checkbox.checked) {
            //         selectedSizes.push(checkbox.value);
            //     }
            // });

            // fields.push({ label: "Drinks" , value: selectedDrink });
            // fields.push({ label: "Sizes" , value: selectedSizes });
            // // You can use the selected values as needed
            // console.log("Selected Drink:", selectedDrink);
            // console.log("Selected Sizes:", selectedSizes);


            // fields.forEach(function (field) {
            //     const row = document.createElement("tr");
            //     const labelCell = document.createElement("td");
            //     labelCell.textContent = field.label;
            //     const valueCell = document.createElement("td");
            //     valueCell.textContent = field.value;
            //     row.appendChild(labelCell);
            //     row.appendChild(valueCell);
            //     tbody.appendChild(row);
            // });

            // table.appendChild(tbody);
            // document.body.appendChild(table);

            // submitButton.disabled = true
            // // Clear form fields

            appendRowToTable();
            form.reset();
            submitButton.disabled = true

            // getFormValues();

        } else {
            // Display error messages for invalid fields
            if (firstName.value.trim() === "") {
                showError(firstName, "First Name is required.");
            } else if (!validateAlphanumeric(firstName)) {
                showError(firstName, "First Name should contain only alphanumeric characters.");
            }
            if (lastName.value.trim() === "") {
                showError(lastName, "Last Name is required.");
            } else if (!validateAlphanumeric(lastName)) {
                showError(lastName, "Last Name should contain only alphanumeric characters.");
            }
            if (emailId.value.trim() === "") {
                showError(emailId, "Email Id is required.");
            } else if (!validateEmail(emailId)) {
                showError(emailId, "Invalid Email Id format.");
            }
            if (phoneNumber.value.trim() === "") {
                showError(phoneNumber, "Phone Number is required.");
            } else if (!validatePhoneNumber(phoneNumber)) {
                showError(phoneNumber, "Invalid Phone Number format.");
            }
            if (zipcode.value.trim() === "") {
                showError(zipcode, "ZipCode is required.");
            } else if (!validateZipcode(zipcode)) {
                showError(zipcode, "Invalid ZipCode format.");
            }
            if (comments.value.trim() === "") {
                showError(comments, "Comment is required.");
            } else if (!validateZipcode(comments)) {
                showError(comments, "Comment ZipCode format.");
            }
        }
    });
});
