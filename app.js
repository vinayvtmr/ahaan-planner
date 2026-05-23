const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

let currentDate = new Date();
let selectedDate = null;

const statuses = JSON.parse(localStorage.getItem("statuses")) || {};

function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.innerText =
    currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric"
    });

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {

    const dateKey = `${year}-${month + 1}-${day}`;

    const div = document.createElement("div");

    div.classList.add("day");

    // Default Available
    if (statuses[dateKey]) {
      div.classList.add(statuses[dateKey]);
    } else {
      div.classList.add("available");
    }

    div.innerText = day;

    div.onclick = () => {
      selectedDate = dateKey;
      openPopup();
    };

    calendar.appendChild(div);
  }
}

function openPopup() {
  document
    .getElementById("popup")
    .classList.remove("hidden");
}

function closePopup() {
  document
    .getElementById("popup")
    .classList.add("hidden");
}

function setStatus(status) {

  statuses[selectedDate] = status;

  localStorage.setItem(
    "statuses",
    JSON.stringify(statuses)
  );

  closePopup();

  renderCalendar();
}

function clearStatus() {

  delete statuses[selectedDate];

  localStorage.setItem(
    "statuses",
    JSON.stringify(statuses)
  );

  closePopup();

  renderCalendar();
}

document
  .getElementById("prevMonth")
  .onclick = () => {

    currentDate.setMonth(
      currentDate.getMonth() - 1
    );

    renderCalendar();
};

document
  .getElementById("nextMonth")
  .onclick = () => {

    currentDate.setMonth(
      currentDate.getMonth() + 1
    );

    renderCalendar();
};

renderCalendar();