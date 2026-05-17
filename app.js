// STEP 5: DATA STRUCTURE - Arrays & Objects//
let events = [
  {
    id: 1,
    title: "AI Bootcamp",
    category: "Technology",
    seats: 30,
    registered: 12,
  },
  {
    id: 2,
    title: "Science Fair",
    category: "Science",
    seats: 50,
    registered: 20,
  },
  {
    id: 3,
    title: "Art Exhibition",
    category: "Arts",
    seats: 40,
    registered: 5,
  },
];
// ============================================
// STEP 8: ADD EVENT FORM + VALIDATION
// ============================================

document.getElementById("add-event-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const title = document.getElementById("event-title").value.trim();
  const category = document.getElementById("event-category").value.trim();
  const seats = parseInt(document.getElementById("event-seats").value);
  const errorMsg = document.getElementById("form-error");

  // ---- VALIDATION ----
  if (!title) {
    errorMsg.textContent = "⚠️ Please enter an event title.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (!category) {
    errorMsg.textContent = "⚠️ Please select a category.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (!seats || seats < 1 || isNaN(seats)) {
    errorMsg.textContent = "⚠️ Please enter a valid number of seats (minimum 1).";
    errorMsg.classList.remove("hidden");
    return;
  }

  // ---- CLEAR ERROR ----
  errorMsg.textContent = "";
  errorMsg.classList.add("hidden");

  // ---- CREATE NEW EVENT OBJECT ----
  const newEvent = {
    id: Date.now(),
    title: title,
    category: category,
    seats: seats,
    registered: 0,
  };

  // ---- ADD TO ARRAY using push() ----
  events.push(newEvent);

  // ---- SAVE & RENDER ----
  saveToLocalStorage();
  renderEvents();

  // ---- CLEAR FORM FIELDS ----
  document.getElementById("event-title").value = "";
  document.getElementById("event-category").value = "";
  document.getElementById("event-seats").value = "";
});
renderEvents();

// ============================================
// STEP 9: SEARCH FUNCTIONALITY
// ============================================

document.getElementById("search-input").addEventListener("keyup", function () {
  const searchValue = this.value.trim().toLowerCase();

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchValue) ||
      event.category.toLowerCase().includes(searchValue)
    );
  });

  renderEvents(filteredEvents);
});
// STEP 6: DOM MANIPULATION - Render Events //

function renderEvents(filteredEvents = events) {
  const container = document.getElementById("events-container");
  container.innerHTML = "";

  filteredEvents.forEach((event) => {
    const remaining = event.seats - event.registered;
    const isFull = remaining === 0;

    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow p-6 flex flex-col gap-3 hover:shadow-lg transition duration-200";

    card.innerHTML = `
      <div class="flex justify-between items-center">
        <h4 class="text-lg font-bold text-gray-800">${event.title}</h4>
        <span class="text-xs bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full">${event.category}</span>
      </div>

      <div class="text-sm text-gray-500 flex flex-col gap-1">
        <p>🪑 Total Seats: <span class="font-semibold text-gray-700">${event.seats}</span></p>
        <p>✅ Registered: <span class="font-semibold text-green-600">${event.registered}</span></p>
        <p>🔖 Remaining: <span class="font-semibold ${isFull ? "text-red-500" : "text-yellow-500"}">${remaining}</span></p>
      </div>

      ${isFull ? '<p class="text-red-500 text-xs font-semibold text-center">Event is Full</p>' : ""}

      <div class="flex gap-3 mt-2">
        <button
          onclick="registerEvent(${event.id})"
          class="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 rounded-lg transition duration-200 ${isFull ? "opacity-50 cursor-not-allowed" : ""}"
          ${isFull ? "disabled" : ""}
        >
          Register
        </button>
        <button
          onclick="cancelEvent(${event.id})"
          class="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 rounded-lg transition duration-200"
        >
          Cancel
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  updateStats();
}

// ============================================
// STEP 7: REGISTER FOR AN EVENT
// ============================================

function registerEvent(id) {
  const event = events.find((e) => e.id === id);

  if (!event) return;

  if (event.registered >= event.seats) {
    alert("Sorry, this event is fully booked!");
    return;
  }

  event.registered++;
  saveToLocalStorage();
  renderEvents();
}

// CANCEL A REGISTRATION

function cancelEvent(id) {
  const event = events.find((e) => e.id === id);

  if (!event) return;

  if (event.registered === 0) {
    alert("No registrations to cancel for this event!");
    return;
  }

  event.registered--;
  saveToLocalStorage();
  renderEvents();
}

//UPDATE STATISTICS using reduce()//

function updateStats() {
  const totalEvents = events.length;

  const totalRegistered = events.reduce((sum, event) => {
    return sum + event.registered;
  }, 0);

  const totalRemaining = events.reduce((sum, event) => {
    return sum + (event.seats - event.registered);
  }, 0);

  document.getElementById("stat-total-events").textContent = totalEvents;
  document.getElementById("stat-total-registered").textContent = totalRegistered;
  document.getElementById("stat-total-seats").textContent = totalRemaining;
}