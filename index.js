import { authorizedPerson } from "./authorized_person.js";

const phoneInput = document.getElementById("phone");
const idNumberInput = document.getElementById("id_number");
const licenceNumberInput = document.getElementById("licence_number");

//correct input for phone number
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

// inputs utils
function fillInputs(person) {
  if (!person) return;

  document.getElementById("surname").value = person.surname ?? "";
  document.getElementById("name").value = person.name ?? "";
  document.getElementById("email-address").value = person.address ?? "";
  document.getElementById("phone").value = person.phone ?? "";
  document.getElementById("id_number").value = person.id_number ?? "";
  document.getElementById("licence_number").value = person.licence_number ?? "";

  document.getElementById("full-name-user").textContent =
    person.name + " " + person.surname ?? "";
}

function clearInputs() {
  document.getElementById("surname").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email-address").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("id_number").value = "";
  document.getElementById("licence_number").value = "";
}

// change tab logic
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    const tabId = tab.getAttribute("id");

    // fill inputs based on the clicked tab
    if (tabId === "authorized-tab") {
      fillInputs(authorizedPerson.albert);

      // update query params
      const url = new URL(window.location.href);
      url.searchParams.set("user", "albert");
      window.history.pushState(null, "", url.toString());
    } else {
      clearInputs();

      // clear query params
      const url = new URL(window.location.href);
      url.searchParams.delete("user");
      window.history.pushState(null, "", url.toString());
    }

    // update tabs styles
    tabs.forEach((t) => {
      if (t === tab) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });
  });
});

// url params logic
const params = new URLSearchParams(window.location.search);
const username = params.get("user");
const person = authorizedPerson[username];

if (username && person) {
  tabs.forEach((tab) => {
    // make authorized tab active
    if (tab.getAttribute("id") === "authorized-tab") {
      tab.classList.add("active");

      // update search params
      const url = new URL(window.location.href);
      url.searchParams.set("user", username);
      window.history.pushState(null, "", url.toString());

      // fill inputs
      fillInputs(authorizedPerson[username]);
    } else {
      tab.classList.remove("active");
    }
  });
}
