let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productPriceError = document.getElementById("product-price-error");
const amount = document.getElementById("amount");
const depenseValue = document.getElementById("depense-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;
console.log("totalAmountButton",totalAmountButton);
// Partie Budget
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //input vide ou negative
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    // Budget
    amount.innerHTML = tempAmount;
    // Balance
    balanceValue.innerText = tempAmount - depenseValue.innerText;
    // Input Box
    totalAmount.value = "";
  }
});

//Fonction pour desactiver,editer, supprimer un bouton
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//fonction pour modifier la liste des elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentDepense = depenseValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  depenseValue.innerText =
    parseInt(currentDepense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Fonction pour creer des listes
const listCreator = (depenseName, depenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${depenseName}</p><p class="amount">${depenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Fonction pour ajouter des depenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Depenses
  let depense = parseInt(userAmount.value);
  //Depense total (existant + nouveau)
  let sum = parseInt(depenseValue.innerText) + depense;
  depenseValue.innerText = sum;
  //balance total(budget -depense total)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //inputs vides
  productTitle.value = "";
  userAmount.value = "";
});
