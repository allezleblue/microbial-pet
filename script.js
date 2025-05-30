let petData = {
  name: "Mochi",
  color: "#ffb6c1",
  shape: "circle",
  background: "#fff0f5",
  size: 1.0
};

// Load from localStorage if it exists
if (localStorage.getItem("petData")) {
  petData = JSON.parse(localStorage.getItem("petData"));
  applyPetData();
}

// Function to apply settings to the pet
function applyPetData() {
  document.getElementById("pet").style.backgroundColor = petData.color;
  document.body.style.backgroundColor = petData.background;
  document.getElementById("pet-name").innerText = petData.name;
  document.getElementById("pet").style.borderRadius = petData.shape === "circle" ? "50%" : "10%";
  document.getElementById("pet").style.transform = `scale(${petData.size})`;
}

// Example: Save data when name is changed
function updateName(newName) {
  petData.name = newName;
  localStorage.setItem("petData", JSON.stringify(petData));
  applyPetData();
}
const pet = document.getElementById("pet");
const petName = document.getElementById("petName");
let size = 80;

document.getElementById("nameInput").addEventListener("input", e => {
  petName.textContent = e.target.value || "Microbby";
});

document.getElementById("shapeSelect").addEventListener("change", e => {
  updateShape(e.target.value);
});

document.getElementById("colorPicker").addEventListener("input", e => {
  pet.style.backgroundColor = e.target.value;
});

document.getElementById("bgPicker").addEventListener("input", e => {
  document.body.style.backgroundColor = e.target.value;
});

function updateShape(shape) {
  pet.className = shape;
}

// Feeding makes pet grow and heart float
function feedPet() {
  size += 5;
  pet.style.width = size + "px";
  pet.style.height = size + "px";

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = Math.random() * 150 + 50 + "px";
  heart.style.top = "100px";

  document.getElementById("dish").appendChild(heart);
  setTimeout(() => heart.remove(), 1500);
}
function shrinkPet() {
  size = Math.max(40, size - 5); // Don't go below 40px
  pet.style.width = size + "px";
  pet.style.height = size + "px";
  setInterval(() => {
  if (size > 80) shrinkPet();
}, 5000); // Shrinks only if over base size

}

// Eye tracking
document.addEventListener("mousemove", e => {
  const eyes = document.querySelectorAll(".eye");
  eyes.forEach(eye => {
    const rect = eye.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const angle = Math.atan2(dy, dx);
    const offset = 2;
    eye.style.transform = `translate(${Math.cos(angle)*offset}px, ${Math.sin(angle)*offset}px)`;
  });
});
