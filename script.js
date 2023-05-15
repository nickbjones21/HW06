// let visitorArray = [];

// let Visit = function(visitorFName, visitorLName, taskType, visitPriority) {
//     this.fName = visitorFName;
//     this.lName = visitorLNAme;
//     this.type = visitType;
//     this.priority = visitPriority;
//     this.done = false;
//     this.timeAdded = Date.now();

//     if (this.priority === "High") this.priorityNumber = 1;
//     else if (this.priority === "Medium") this.priorityNumber = 2;
//     else this.priorityNumber = 3;
// }

// // prepush visitors
// visitors.push(new Visit("Don", "Johnson", "Appointment", "Medium"));


// document.addEventListener("DOMContentLoaded", function (event) {
//     document.getElementById("getStartedBtn").addEventListener("click", goToAddPage);
//     document.getElementById("getStartedBtn2").addEventListener("click", goToAddPage);
//     document.getElementById("addVisitorBtn").addEventListener("click", createArrayObj);
//     document.getElementById("deleteVisitorBtn").addEventListener("click", deleteDoneTasks);

//     // regenerate table whenever sort/filter settings change
//     let regenDisplayElements = Array.from(document.getElementsByClassName("regenDisplay"));
//     regenDisplayElements.forEach(element => element.addEventListener("change", displayTasks));
// });

// $(document).ready(function(){
//     /*event listenr for visit type, sets priority to high
//     when visit type is an emergency.*/
//     $('visitType').on('change', function(){
//         if ($(this).val() === 'Emergency'){
//             $('#visitPriority').val('High');
//         }
//     })
// });


// $(document).on("pagebeforeshow", "#DisplayPage", function (event) { 
//     displayTasks();
// });

// function goToAddPage() {
//     window.location = "#AddPage";
// }

// function createArrayObj() {
//     let visitorFName = document.getElementById("visitorFName");
//     let visitorLName = document.getElementById("visitorLName").value;
//     let taskType = document.getElementById("visitType").value;
//     let visitPriority = document.getElementById("visitPriority").value;

//     if (visitorFName === ""){
//         document.getElementById("alert_message").innerHTML = "This field cannot be blank.";
//         visitorFName.focus();
//         return;
//     } else if (visitorLName === ""){
//         document.getElementById("alert_message").innerHTML = "This field cannot be blank."
//         visitorLName.focus();
//     } else {
//         document.getElementById("alert_message").innerHTML = "";
        
//         //push to task array
//         let visit = new Visit(visitorFName, visitorLName, visitPriority);
//         visitors.push(task);

//         /*displays task added successfully so I know it actually
//         ran the function and added to the array properly.*/
//         let successMessage = document.getElementById("successMessage");
//         successMessage.innerHTML = "Visit added successfully!";
//         //timeout for sucess message (2.0 seconds)
//         setTimeout(() => {
//             successMessage.innerHTML = '';  
//         }, 2000);

//         visitorName.value = "";
//         visitorName.focus();
//     }
// }

// function deleteDoneTasks() {
//     visitors = visitors.filter(task => !task.done);
//     displayTasks();
// }

// function displayTasks() {
//     if (visitors.length > 0) {
//         // create table, hide get started button, show delete done task button
//         let processedTaskList = processTaskList();
//         createTaskTable(processedTaskList);
//         document.getElementById("getStartedBtn2").style = "display: none";
//         document.getElementById("deleteVisitorBtn").style = "display: block";
//     } else {
//         // replace table with empty message, show get started button, hide delete done task button
//         document.getElementById("table").innerHTML = "Uh oh, you don't have anyone in your visitor list yet. Try adding someone.";
//         document.getElementById("getStartedBtn2").style = "display: block";
//         document.getElementById("deleteVisitorBtn").style = "display: none";
//     }
// }

// function processTaskList() {
//     // Filter task list
//     let allowedTypes = Array.from(document.getElementsByClassName("filterTypeSetting")).filter(checkbox => checkbox.checked).map(checkedBoxes => checkedBoxes.value);
//     let allowedPriorities = Array.from(document.getElementsByClassName("filterPrioritySetting")).filter(checkbox => checkbox.checked).map(checkedBoxes => checkedBoxes.value);
    
//     let filteredTasks = visitors.filter(task => {
//         let passesTypeCheck = allowedTypes.length === 0 || allowedTypes.includes(task.type);
//         let passesPriorityCheck = allowedPriorities.length === 0 || allowedPriorities.includes(task.priority);

//         return passesTypeCheck && passesPriorityCheck;
//     });

//     // Sort task list
//     let sortProperty = document.getElementById("sortSetting").value;
//     let sortAscending = document.getElementById("sortAscendingCheckBox").checked;
//     let sortedTasks = Array.from(filteredTasks);
//     sortedTasks.sort((taskA, taskB) => {
//         let propA = taskA[sortProperty];
//         let propB = taskB[sortProperty];
        
//         let sortValue;
//         if (typeof propA === "string") {
//             sortValue = propA.localeCompare(propB);
//         } else if (typeof propA === "number") {
//             sortValue = propA - propB;
//         }

//         if (sortAscending) {
//             return sortValue;
//         } else {
//             return -sortValue;
//         }
//     });

//     return sortedTasks;
// }

// function createTaskTable(processedTaskList) {
//     let table = document.getElementById("table");

//     //Start by clearing the table
//     table.innerHTML = "";

//     //For creating the header rows
//     let headerRow = document.createElement("tr"); //table row

//     //for header of name col
//     let nameHeader = document.createElement("th"); //table header
//     nameHeader.innerHTML = "Name";
//     headerRow.appendChild(nameHeader);

//     //for header of type col
//     let typeHeader = document.createElement("th");
//     typeHeader.innerHTML = "Type";
//     headerRow.appendChild(typeHeader);

//     //for header of priority col
//     let priorityHeader = document.createElement("th");
//     priorityHeader.innerHTML = "Priority";
//     headerRow.appendChild(priorityHeader);

//     //for header of done col
//     let doneHeader = document.createElement("th");
//     doneHeader.innerHTML = "Done";
//     headerRow.appendChild(doneHeader);

//     table.appendChild(headerRow);

//     //setting up rows for each task item in array
//     processedTaskList.forEach(task => {
//         let row = document.createElement("tr");

//         //for name col
//         let nameCell = document.createElement("td");
//         nameCell.innerHTML = task.name;
//         row.appendChild(nameCell);

//         //for type col
//         let typeCell = document.createElement("td");
//         typeCell.innerHTML = task.type;
//         row.appendChild(typeCell);

//         //for priority col
//         let priorityCell = document.createElement("td");
//         priorityCell.innerHTML = task.priority;
//         row.appendChild(priorityCell);

//         //for done col
//         let doneCell = document.createElement("td"); 
//         let doneCheckbox = document.createElement("input");
//         doneCheckbox.type = "checkbox";
//         doneCheckbox.checked = task.done;
//         doneCheckbox.addEventListener("change", function(){
//             task.done = this.checked;
//         });

//         doneCell.appendChild(doneCheckbox);
//         row.appendChild(doneCell);

//         table.appendChild(row);
//     });
// }

let visitorArray = [];

function createVisit() {
    
    let visitor_FName = document.getElementById("visitorFName").value;
    let visitor_LName = document.getElementById("visitorLName").value;
    let visit_Type = document.getElementById("visitType").value;
    let visit_Priority = document.getElementById("visitPriority").value;
  
    if (visitor_FName === ""){
        document.getElementById("alert_messageF").innerHTML = "This field cannot be blank.";
        document.getElementById("visitorFName").focus();
        return;
    } else {
        document.getElementById("alert_messageF").innerHTML = "";
    }
  
    if (visitor_LName === ""){
        document.getElementById("alert_messageL").innerHTML = "This field cannot be blank.";
        document.getElementById("visitorLName").focus();
        return;
    } else {
        document.getElementById("alert_messageL").innerHTML = "";
    }
    

    
      let visitorObject = {
        firstName: visitor_FName,
        lastName: visitor_LName,
        type: visit_Type,
        priority: visit_Priority
      };
  
      visitorArray.push(visitorObject);
      $("#successMessage").text("Visitor added successfully!");

      //for clearning input fields fname and lname
      document.getElementById("visitorFName").value = "";
      document.getElementById("visitorLName").value = "";

      //create a unique id for each item in the array
      visitorArray.forEach(function(item, index) {
        item.id = Date.now() + index;
      });
}

document.getElementById("addVisitorBtn").addEventListener("click", createVisit);

function createList(){
    let arrayItems = "";
    for (let i = 0; i < visitorArray.length; i++){
        let visitor = visitorArray[i];
        let arrayItem = "<li>" + visitor.firstName + " " + visitor.lastName + " - " + visitor.type + " - " + visitor.priority + "</li>";
        arrayItems += arrayItem;
    }
    return arrayItems;
}

//display visitor list
function showVisitorList(){
    let visitorList = document.getElementById("visitorList");
    visitorList.innerHTML = createList();
    visitorList.style.display = "block";
}

$(document).on("pagebeforeshow", "#DisplayPage", function() {
    if (visitorArray.length > 0) {
      showVisitorList();
    }
  });