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

renderEvents();
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