

window.onload = function () {
  let salary;
  let year;
  let days;
  let result;

}

  function validateSalary() {
   salary = document.getElementById("inputSalary").value;
    if (this.salary <= 0) {
      alert("Salary must be greater than 0")
      return;
    }
    year = document.getElementById("inputYears").value;
    if (this.year < 0 || this.year > 35) {
      alert("Year must be between 0 to 35")
      return;
    }
    days = document.getElementById("inputDays").value;
    if (this.days < 0 || this.days > 365) {
      alert("Days must be between 1 to 365")
      return;
    }

    this.calculateBonus();
  }


function calculateBonus() {
  salary = document.getElementById("inputSalary").value;
  year = document.getElementById("inputYears").value;
  days = document.getElementById("inputDays").value;


  if (this.year < 1) {
    document.getElementById("inputBonus").value = ((this.days * (this.salary / 2)) / 365).toFixed(2);
    return;
  }

  if (this.year >= 1 && this.year <= 3) {
    document.getElementById("inputBonus").value = ((this.days * (this.salary / 2)) / 365).toFixed(2);
    return;
  }

  if (this.year >= 3 && this.year <= 10) {
    document.getElementById("inputBonus").value= ((19 * (this.salary / 30))).toFixed(2);
    return;
  }

  if (this.year >= 10 && this.year <= 35) {
    document.getElementById("inputBonus").value= ((21 * (this.salary / 30))).toFixed(2);
    return;
  }
 
}