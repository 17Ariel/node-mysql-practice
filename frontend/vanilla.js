const content = document.querySelector("#content");
const getUserButton = document.querySelector("#getUser");
const maleUserButton = document.querySelector("#maleUser");
const femaleUserButton = document.querySelector("#femaleUser");
const createUserButton = document.querySelector("#createUser");
const updateButton = document.querySelector("#update");

getUserButton.addEventListener("click", getUsers);
maleUserButton.addEventListener("click", filterMaleUser);
femaleUserButton.addEventListener("click", filterFemaleUser);
createUserButton.addEventListener("submit", createUser);
updateButton.addEventListener("click", updateUser);
function getUsers() {
  let result = "";
  fetch("http://localhost:3000/api/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.map((user) => {
        result += `<li>${user.fullname} <a href='javascript:void(0)' id='deletebtn' onclick='deleteUser(${user.id})'>Delete</a> <a href='javascript:void(0)' onclick='editUser(${user.id})'>Edit</a></li>`;
      });
      content.innerHTML = result;
    })
    .catch((err) => console.log(err));
}

function filterMaleUser() {
  let result = "";
  fetch("http://localhost:3000/api/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const userData = data.filter((datas) => datas.gender === "Male");
      userData.map((user) => {
        result += `<li>${user.fullname} <a href='javascript:void(0)' id='deletebtn' onclick='deleteUser(${user.id})'>Delete</a> <a href='javascript:void(0)' onclick='editUser(${user.id})'>Edit</a></li>`;
        content.innerHTML = result;
      });
    })
    .catch((err) => console.log(err));
}

function filterFemaleUser() {
  let result = "";
  fetch("http://localhost:3000/api/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const userData = data.filter((datas) => datas.gender === "Female");
      userData.map((user) => {
        result += `<li>${user.fullname} <a href='javascript:void(0)' id='deletebtn' onclick='deleteUser(${user.id})'>Delete</a> <a href='javascript:void(0)' onclick='editUser(${user.id})'>Edit</a></li>`;
        content.innerHTML = result;
      });
    })
    .catch((err) => console.log(err));
}

function createUser(e) {
  e.preventDefault();
  let fullname = document.querySelector("#fullname").value;
  let address = document.querySelector("#address").value;
  let gender = document.querySelector("#gender").value;

  if (fullname == "" || address == "" || gender == "") {
    alert("Please Complete!");
  } else {
    let arrayData = { fullname, address, gender };
    console.log(arrayData);

    fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(arrayData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    clearFields();
  }
}

function clearFields() {
  document.querySelector("#fullname").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#gender").value = "";
}

function deleteUser(id) {
  let forms = { id };
  fetch("http://localhost:3000/api/users", {
    method: "DELETE",
    body: JSON.stringify(forms),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((res) => alert(res))
    .catch((err) => console.log(err));
}

function editUser(id) {
  fetch(`http://localhost:3000/api/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      (document.querySelector("#fullname").value = data[0].fullname),
        (document.querySelector("#address").value = data[0].address),
        (document.querySelector("#gender").value = data[0].gender);
    });
}

function editUser(id) {
  fetch(`http://localhost:3000/api/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      (document.querySelector("#fullname").value = data[0].fullname),
        (document.querySelector("#address").value = data[0].address),
        (document.querySelector("#gender").value = data[0].gender),
        (document.querySelector("#id").value = data[0].id);
    });
  hideBtn();
}

function updateUser() {
  let id = document.querySelector("#id").value;
  let fullname = document.querySelector("#fullname").value;
  let address = document.querySelector("#address").value;
  let gender = document.querySelector("#gender").value;

  if (fullname == "" || address == "" || gender == "") {
    alert("Please Complete!");
  } else {
    let arrayData = { fullname, address, gender, id };
    console.log(arrayData);

    fetch("http://localhost:3000/api/users", {
      method: "PUT",
      body: JSON.stringify(arrayData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    clearFields();
    displayBtn();
  }
}

function hideBtn() {
  document.querySelector("#submit").style.display = "none";
  document.querySelector("#update").style.display = "block";
}

function displayBtn() {
  document.querySelector("#update").style.display = "none";
  document.querySelector("#submit").style.display = "block";
}
const getData = document.querySelector("#getData");

getData.addEventListener("keyup", () => {
  let inputs = document.querySelector("#getData").value;

  fetch("http://localhost:3000/api/users/fullname", {
    method: "POST",
    body: inputs,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
