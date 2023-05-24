import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const items = document.getElementById("items");
const modal = document.getElementById("modal");
const paymentForm = document.getElementById("payment-form");
const ordersSection = document.getElementById("orders-section");

let orders = [];

function renderMenuItems() {
  let html = "";
  menuArray.forEach((item) => {
    html += `
      <div class="menu-item">
        <span class="img-item">${item.emoji}</span>
        <div class="menu-item-description">
          <h2>${item.name}</h2>
          <p>${item.ingredients.join(", ")}</p>
          <span>$${item.price}</span>
        </div>
        <button class="add-btn" data-item-id="${item.id}">+</button>
      </div>
    `;
  });
  items.innerHTML = html;
}

renderMenuItems();

items.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    handleOrderClick(e.target.dataset.itemId);
  }
});

ordersSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    handleRemoveOrderClick(e.target.dataset.orderId);
    } else if (e.target.id === "complete-btn") {
    modal.style.display = "flex";
  }
});

document.getElementById("modal-close-btn").addEventListener("click", () => {
  handleModalClick();
});

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  handleModalClick();
  ordersSection.innerHTML = `<p class="success">Thanks, ${name}! Your order is on its way!</p>`;
});

function handleRemoveOrderClick(orderId) {
  orders = orders.filter((order) => order.id !== orderId);
  renderOrders();
}

function handleOrderClick(itemId) {
  const item = menuArray.find((menuItem) => menuItem.id == itemId);
  orders.push({
    id: uuidv4(),
    name: item.name,
    price: item.price,
  });
  renderOrders();
}

function renderOrders() {
  if (orders.length === 0) {
    ordersSection.innerHTML = "";
    return;
  }

  let ordersHtml = "<h3>Your order</h3>";
  let totalPrice = 0;

  orders.forEach((item) => {
    totalPrice += item.price;
    ordersHtml += `
      <div class="order">
        <p>${item.name}<small class="remove-item" data-order-id="${item.id}">remove</small></p>
        <span>$${item.price}</span>
      </div>
    `;
  });

 ordersHtml += `<hr><div class="total"><h4>Total price:</h4><span class="total-price">$${totalPrice}</span></div><button id="complete-btn">Complete order</button>`;

ordersSection.innerHTML = ordersHtml;
}

function handleModalClick() {
modal.style.display = "none";
document.getElementById("name").value = "";
document.getElementById("card").value = "";
document.getElementById("cvv").value = "";
}