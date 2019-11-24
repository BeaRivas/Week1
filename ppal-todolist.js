//
let visibleFormList = true;
const task1 = {
  idTask: 0,
  dateTask: new Date(),
  nameTask: "",
  assigneeTask: "",
  statusTas: false,
}
const assigneeList = [];
assigneeList.push('Alice', 'Frank', 'John', 'Mary');

const statusList = [];
statusList.push('Pending', 'Done');

const orderList = [];
orderList.push('desc', 'asc');
let taskTemporaly = ['test'];

window.onload = function () {
function Person(){
this.name= "Ale";
this.lastName="Rivas";
console.log(this)

}

  let pickerStatus;
  varPerson= new Person(); 

  assigneeList.forEach(function (element) {
    document.querySelector("#selectAssignee").innerHTML += `<option value="${element}">${element}</option>`
  });

  statusList.forEach(function (element) {
    document.querySelector("#selectStatus").innerHTML += `<option value="${element}">${element}</option>`
  });
  document.querySelector("#selectStatus").addEventListener("change", function (e) {
    sortByStatus(e.target.value);
  })
  orderList.forEach(function (element) {
    document.querySelector("#selectSort").innerHTML += `<option value="${element}">${element}</option>`
  });
  document.querySelector("#selectSort").addEventListener("change", function (e) {
    sortByDate(e.target.value);
  })

  activateFilters();

  //document.querySelector("#saveTask").onclick(MouseEvent) = addTask(e);
  document.querySelector("#saveTask").onclick = addTask;

  if (localStorage.getItem("task") == null) {
    localStorage.setItem("task", "[]");
  }

  //load items in List using function setInList
  taskTemporaly = JSON.parse(localStorage.getItem("task"));
  taskTemporaly.forEach(function (element) {
    setInList(element);

  });
  document.querySelector("#textFilter").addEventListener("keyup", function (e) {
    filterItem(e.target.value)
  })

}

const addTask = function addTaskToList(e) {
  e.preventDefault()

  if (validateTask()) {

    const idTaskAdd = calculateIdTask();
    const dateTaskAdd = new Date();
    const nameTaskAdd = document.querySelector("#textName").value;
    const assignTaskAdd = document.querySelector("#selectAssignee").value;
    const statusTaskAdd = false;


    const taskAdd = {
      idTaskAdd,
      dateTaskAdd,
      nameTaskAdd,
      assignTaskAdd,
      statusTaskAdd,
    }
    //const taskTemporaly = JSON.parse(localStorage.getItem("task"));
    taskTemporaly.push(taskAdd);

    localStorage.setItem('task', JSON.stringify(taskTemporaly));


    //clean list

    document.querySelector("#listItems").innerHTML = "";

    taskTemporaly.forEach(function (element) {
      setInList(element);

    });


    e.preventDefault()
  }
}
//function to load items in List
function setInList(e) {
  const template = `
  <li class="${e.statusTaskAdd ? 'done' : ''}">
      <div>
        <div id="nameTask">${e.idTaskAdd + " " + e.nameTaskAdd}</div>
        <div id="dateTask"> ${e.dateTaskAdd} </div>
        <div id="assignTask"> ${e.assignTaskAdd} </div>
        <div>
          <br>
          <button class="button1" id="doneTask" onclick="editTask(event,${e.idTaskAdd})"> <span>Status</span></button>
          <button class="button2" id="delTask" onclick="deleteIdTask(event,${e.idTaskAdd})"><span>Delete</span></button>
        </div>
      </div>
    </li>
  `
  document.querySelector("#listItems").innerHTML += template;
}

//validate input nameTask
function validateTask() {
  const x = document.forms["formList"]["textName"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
  return true;
}

function calculateIdTask() {
  const taskInLocal = JSON.parse(localStorage.getItem("task"));
  const idMaxId = taskInLocal.map((x) => x.idTaskAdd)
  if (idMaxId == undefined || idMaxId.length == 0) {
    return 1;
  } else {
    return Math.max(...idMaxId) + 1
  }
  return 0;
}

function deleteIdTask(e, idDelete) {
  e.preventDefault()
  if (window.confirm("Do you want to delete this task?")) {
    const taskInLocal = JSON.parse(localStorage.getItem("task"));
    const nArray = taskInLocal.filter((x) => x.idTaskAdd != idDelete)
    localStorage.setItem("task", JSON.stringify(nArray));
    document.querySelector("#listItems").innerHTML = "";
    nArray.forEach(function (element) {
      setInList(element);
    });
  }
}

function activateFilters() {
  visibleFormList = !visibleFormList;
  if (!visibleFormList) {
    document.querySelector("#formList").classList.add("visible")
  }
  else {
    document.querySelector("#formList").classList.remove("visible")
  }
}

function editTask(e, idEdit) {
  e.preventDefault()

  const taskInLocal = JSON.parse(localStorage.getItem("task"));
  console.log(idEdit)
  const nArray = taskInLocal.filter((x) => x.idTaskAdd != idEdit)
  const arrayId = taskInLocal.find((x) => x.idTaskAdd == idEdit)
  arrayId.statusTaskAdd = !arrayId.statusTaskAdd;
  nArray.push(arrayId);
  taskTemporaly = nArray

  localStorage.setItem("task", JSON.stringify(nArray));
  document.querySelector("#listItems").innerHTML = "";

  nArray.forEach(function (element) {
    setInList(element);
  });

}

function setDefaultList() {
  localStorage.setItem("task", JSON.stringify(taskTemporaly));
  document.querySelector("#listItems").innerHTML = "";

  taskTemporaly.forEach(function (element) {
    setInList(element);
  });
}

function setNewList(newList) {
  localStorage.setItem("task", JSON.stringify(newList));
  document.querySelector("#listItems").innerHTML = "";

  newList.forEach(function (element) {
    setInList(element);
  });
}

//sort and filter functions
function sortByStatus(filter) {
  if (filter == "Done") {
    this.pickerStatus = true;
  }
  else {
    if (filter == "Pending") {
      this.pickerStatus = false;
    } else {
      // console.log("There is no selection");
      setDefaultList();
      return;
    }
  }

  setDefaultList();
  taskTemporalyx = JSON.parse(localStorage.getItem("task"));
  this.filteredItems = Object.assign([], this.taskTemporalyx).filter(
    item => item.statusTaskAdd == this.pickerStatus);
  setNewList(filteredItems);
}

//sort by date
function sortByDate(filter) {

  let resOrder = filter
  setDefaultList();
  taskTemporaly1 = JSON.parse(localStorage.getItem("task"));

  if (resOrder == "asc") {

    this.filteredItems1 = this.taskTemporaly1.sort((a, b) => {
      a.date = new Date(a.dateTaskAdd);
      b.date = new Date(b.dateTaskAdd);

      return a.date.getTime() - b.date.getTime();
    });
  }
  else if (resOrder == "desc") {

    this.filteredItems1 = this.taskTemporaly1.sort((a, b) => {
      a.date = new Date(a.dateTaskAdd);
      b.date = new Date(b.dateTaskAdd);

      return b.date.getTime() - a.date.getTime();
    });
  } else {

    setDefaultList();

  }

}

//filter by name in task
function filterItem(value) {
  if (value == "") {
    //  console.log("default")
    setDefaultList();
  } // when nothing has typed
  let filteredItems = Object.assign([], taskTemporaly).filter(
    item => item.nameTaskAdd.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
  setNewList(filteredItems);

}

