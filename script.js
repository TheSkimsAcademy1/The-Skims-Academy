
const SHEET_URL = "https://script.google.com/macros/s/AKfycbyUd79ukpwfennqwFYqKk9jD7X_hw7m0yoWoJyjjyxqe9h0QiXobnBR7C6_T7Qr9vw4Zg/exec";

const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {
  admissionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      studentName: admissionForm.elements.studentName.value,
      fatherName: admissionForm.elements.fatherName.value,
      phone: admissionForm.elements.phone.value,
      email: admissionForm.elements.email.value,
      studentClass: admissionForm.elements.studentClass.value
    };

    const message =
      "New Admission Application\n\n" +
      "Student Name: " + data.studentName + "\n" +
      "Father Name: " + data.fatherName + "\n" +
      "Phone: " + data.phone + "\n" +
      "Email: " + data.email + "\n" +
      "Class: " + data.studentClass;

    const whatsappURL =
      "https://wa.me/923046315816?text=" +
      encodeURIComponent(message);

    // WhatsApp open karein
    window.open(whatsappURL, "_blank");

    // Google Sheet mein data bhejein
    fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(data)
    })
    .then(function () {
      alert("Application request bhej di gayi! Google Sheet check karein.");
      admissionForm.reset();
    })
    .catch(function (error) {
      alert("Data bhejne mein masla hua. Dobara koshish karein.");
      console.error(error);
    });
  });
}
