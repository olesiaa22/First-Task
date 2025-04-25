const phoneInput = document.getElementById("phone");
const idNumberInput = document.getElementById("id_number");
const licenceNumberInput = document.getElementById("licence_number");

//correct input for telephone
phoneInput.addEventListener("input", function () {
  let digits = this.value.replace(/\D/g, "");
  let formatted = "";
  if (digits.length > 0) formatted += digits.substring(0, 3);
  if (digits.length > 3) formatted += " " + digits.substring(3, 6);
  if (digits.length > 6) formatted += " " + digits.substring(6, 8);
  if (digits.length > 8) formatted += " " + digits.substring(8, 10);

  this.value = formatted;
});

function allowOnlyDigits(input) {
  input.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
}

allowOnlyDigits(idNumberInput);
allowOnlyDigits(licenceNumberInput);

const authorizedPerson = {
  surname: "Doe",
  name: "John",
  address: "john@example.com",
  phone: "067 321 57 33",
  id_number: "019283746",
  licence_number: "019283746",
};

function fillAuthorizedPersonInputs(person) {
  document.getElementById("surname").value = person.surname;
  document.getElementById("name").value = person.name;
  document.getElementById("address").value = person.address;
  document.getElementById("phone").value = person.phone;
  document.getElementById("id_number").value = person.id_number;
  document.getElementById("licence_number").value = person.licence_number;

  document.getElementById("full-name-user").textContent =
    person.name + " " + person.surname;
}

function openButton(event, tabName) {
  if (event) {
    event.preventDefault();
  }

  if (tabName === "Authorized Persons") {
    location.hash = "#auth";
    fillAuthorizedPersonInputs(authorizedPerson);
  } else if (tabName === "Video Call") {
    location.hash = "#video";
  } else if (tabName === "User Information") {
    location.hash = "#user";
  }

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.remove("active"));
  if (event) {
    event.currentTarget.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (location.hash === "#auth") {
    fillAuthorizedPersonInputs(authorizedPerson);
  }
});
