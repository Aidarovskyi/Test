import { products } from "./products.js";
function getQuantityFromUser() {
  const input = prompt("Сколько карточек отобразить? От 1 до 5");
  const quantity = parseInt(input);
  if (!isNaN(quantity) && quantity >= 1 && quantity <= 5) {
    return quantity;
  }
  alert("Некорректный ввод. Будут показаны все 5 карточек.");
  return 5;
}
function renderCards(cardsArray) {
  const template = document.getElementById("product-template");
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  const count = getQuantityFromUser();
  const limitedCards = cardsArray.slice(0, count);
  limitedCards.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector(".product-img");
    img.src = `images/${product.img}.png`;
    img.alt = product.name;

    clone.querySelector(".product-category").textContent = product.category;
    clone.querySelector(".product-name").textContent = product.name;
     clone.querySelector(".product-description").textContent = product.description;

    const compositionList = clone.querySelector(".product-composition-list");
    product.composition.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.classList.add("composition-item");
      compositionList.appendChild(li);
    });
    const priceElem = clone.querySelector(".price-value");
    priceElem.textContent = `${product.price.toLocaleString()} ₽`;
    container.appendChild(clone);
  });
}
const productDescriptionsMap = products.reduce((acc, product) => {
  acc[product.name] = product.description;
  return acc;
}, {});
console.log("Словарь описаний:", productDescriptionsMap);
renderCards(products);