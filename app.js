const calendar =
  document.getElementById("calendar");

const monthYear =
  document.getElementById("monthYear");

let currentDate = new Date();

let selectedDate = null;

const statuses =
  JSON.parse(
    localStorage.getItem("statuses")
  ) || {};

function renderCalendar() {

  calendar.innerHTML = "";

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  monthYear.innerText =
    currentDate.toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric"
      }
    );

  const firstDay =
    new Date(year, month, 1).getDay();

  const totalDays =
    new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {

    const empty =
      document.createElement("div");

    calendar.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {

    const dateKey =
      `${year}-${month + 1}-${day}`;

    const div =
      document.createElement("div");

    div.classList.add("day");

    // DEFAULT AVAILABLE

    if (statuses[dateKey]) {

      div.classList.add(
        statuses[dateKey].status
      );

    } else {

      div.classList.add("available");
    }

    div.innerText = day;

    div.onclick = () => {

      selectedDate = dateKey;

      // PREFILL EXISTING DATA

      if (statuses[dateKey]) {

        document.getElementById(
          "guestName"
        ).value =
          statuses[dateKey].guest || "";

        document.getElementById(
          "advanceAmount"
        ).value =
          statuses[dateKey].advance || "";

        document.getElementById(
          "finalAmount"
        ).value =
          statuses[dateKey].final || "";

        document.getElementById(
          "totalNights"
        ).value =
          statuses[dateKey].nights || "";

      } else {

        document.getElementById(
          "guestName"
        ).value = "";

        document.getElementById(
          "advanceAmount"
        ).value = "";

        document.getElementById(
          "finalAmount"
        ).value = "";

        document.getElementById(
          "totalNights"
        ).value = "";
      }

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

function saveBooking() {

  const guest =
    document.getElementById(
      "guestName"
    ).value;

  const advance =
    document.getElementById(
      "advanceAmount"
    ).value;

  const finalAmount =
    document.getElementById(
      "finalAmount"
    ).value;

  const totalNights =
    parseInt(
      document.getElementById(
        "totalNights"
      ).value
    );

  if (!totalNights || totalNights < 1) {
    return;
  }

  const startDate =
    new Date(selectedDate);

  // BOOK MULTIPLE DAYS

  for (let i = 0; i < totalNights; i++) {

    const bookingDate =
      new Date(startDate);

    bookingDate.setDate(
      startDate.getDate() + i
    );

    const year =
      bookingDate.getFullYear();

    const month =
      bookingDate.getMonth() + 1;

    const day =
      bookingDate.getDate();

    const dateKey =
      `${year}-${month}-${day}`;

    statuses[dateKey] = {

      status: "booked",

      guest: guest,

      advance: advance,

      final: finalAmount,

      nights: totalNights
    };
  }

  localStorage.setItem(
    "statuses",
    JSON.stringify(statuses)
  );

  closePopup();

  renderCalendar();
}

function setStatus(status) {

  statuses[selectedDate] = {
    status: status
  };

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