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
