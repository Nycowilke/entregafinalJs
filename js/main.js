
let pedidoFinal = [];
let subtotalPedido = 0;
let totalPedido = 0;
let pedidoFinalJSON = JSON.stringify(pedidoFinal);
sessionStorage.setItem("pedidoFinal", pedidoFinalJSON);
let subtotalPedidoJSON = JSON.stringify(subtotalPedido);
sessionStorage.setItem("subtotalPedido", subtotalPedidoJSON);


function addToPedido(menuType, id) {
  let menuSearch = menuType.find((element) => element.id === id);
  pedidoFinal.push(menuSearch.nombre);
  subtotalPedido += menuSearch.precio;
  Toastify({
    text: "El producto se agregó a tu pedido!",
    style: {
      background: "linear-gradient(to right, #c4182f, #a2182f)",
    },
  }).showToast();
  pedidoFinalJSON = JSON.stringify(pedidoFinal);
  subtotalPedidoJSON = JSON.stringify(subtotalPedido);
  sessionStorage.setItem("pedidoFinal", pedidoFinalJSON);
  sessionStorage.setItem("subtotalPedido", subtotalPedidoJSON);
}

function createCardsPlatoPrincipal() {
  menuPlatoPrincipal.forEach((element) => {
    let menuCards = document.getElementsByClassName("platoPrincipal");
    let menuItemCard = document.createElement("div");
    menuItemCard.innerHTML = `
    <div class="col-12 text-center">
      <div class="card text-center">
        <div class="card-body">
          <h4 class="card-title"><strong>${element.nombre} - $${element.precio}</strong></h5>
          <img class="menuItem card-img img-fluid" src=${element.img}>
          <br>
          <br>
          <button type="button" class="btn btn-danger" id="add${element.id}">Añadir a mi pedido</button>
        </div>
      </div>
    </div>
    <br>
    `;
    menuCards[0].appendChild(menuItemCard);
    let addItemButton = document.getElementById("add" + element.id);
    addItemButton.addEventListener("click", function () {
      addToPedido(menuPlatoPrincipal, element.id);
    });
  });
}

function createCardsAcompanamiento() {
  menuAcompanamiento.forEach((element) => {
    let menuCards = document.getElementsByClassName("acompanamiento");
    let menuItemCard = document.createElement("div");
    menuItemCard.innerHTML = `
      <div class="col-12 text-center">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title"><strong>${element.nombre} - $${element.precio}</strong></h5>
            <img class="menuItem card-img img-fluid" src=${element.img}>
            <br>
            <br>
            <button type="button" class="btn btn-danger" id="add${element.id}">Añadir a mi pedido</button>
          </div>
        </div>
      </div>
      <br>
      `;
    menuCards[0].appendChild(menuItemCard);
    let addItemButton = document.getElementById("add" + element.id);
    addItemButton.addEventListener("click", function () {
      addToPedido(menuAcompanamiento, element.id);
    });
  });
}

function createCardsBebidas() {
  menuBebidas.forEach((element) => {
    let menuCards = document.getElementsByClassName("bebida");
    let menuItemCard = document.createElement("span");
    menuItemCard.innerHTML = `
      <div class="col-12 text-center">
        <div class="card text-center">
          <div class="card-body">
            <h4 class="card-title"><strong>${element.nombre} - $${element.precio}</strong></h5>
            <img class="menuItem card-img img-fluid" src=${element.img}>
            <br>
            <br>
            <button type="button" class="btn btn-danger" id="add${element.id}">Añadir a mi pedido</button>
          </div>
        </div>
      </div>
      <br>
      `;
    menuCards[0].appendChild(menuItemCard);
    let addItemButton = document.getElementById("add" + element.id);
    addItemButton.addEventListener("click", function () {
      addToPedido(menuBebidas, element.id);
    });
  });
}

createCardsPlatoPrincipal();
createCardsAcompanamiento();
createCardsBebidas();

function showPedido() {
  pedidoFinal = JSON.parse(sessionStorage.getItem("pedidoFinal"));
  subtotalPedido = JSON.parse(sessionStorage.getItem("subtotalPedido"));
  pedidoFinal.length > 0
    ? Swal.fire({
        title: "Pedido Actual",
        html:
          "<u><b>Su pedido actual es:</u></b><br />" +
          pedidoFinal.join("<br />") +
          "<br /><br />El costo final es de: $" +
          subtotalPedido.toString(),
        imageUrl: "/assets/images/logoalert.png",
        imageWidth: 200,
        imageHeight: 200,
        confirmButtonText: "Ok",
        color: "black",
      })
    : Swal.fire({
        title: "Error!",
        text: "Su pedido aún no contiene ningún producto",
        icon: "error",
        confirmButtonText: "Ok",
        color: "black",
      });
}

let buttonVerPedido = document.getElementById("buttonVerPedido");
buttonVerPedido.addEventListener("click", function () {
  showPedido();
});


function clearPedido() {
  pedidoFinal = JSON.parse(sessionStorage.getItem("pedidoFinal"));
  subtotalPedido = JSON.parse(sessionStorage.getItem("subtotalPedido"));
  if (pedidoFinal.length > 0) {
    pedidoFinal.splice(0, pedidoFinal.length);
    subtotalPedido = 0;
    Swal.fire({
      title: "Pedido vaciado!",
      text: "Su pedido ha sido vaciado",
      icon: "success",
      showConfirmButton: false,
      color: "black",
      timer: 2200,
    });
  } else {
    Swal.fire({
      title: "Error!",
      text: "Su pedido aún no contiene ningún producto",
      icon: "error",
      confirmButtonText: "Ok",
      color: "black",
    });
  }
  pedidoFinalJSON = JSON.stringify(pedidoFinal);
  subtotalPedidoJSON = JSON.stringify(subtotalPedido);
  sessionStorage.setItem("pedidoFinal", pedidoFinalJSON);
  sessionStorage.setItem("subtotalPedido", subtotalPedidoJSON);
}

let buttonClearPedido = document.getElementById("buttonClearPedido");
buttonClearPedido.addEventListener("click", function () {
  clearPedido();
});


let pedidoConfirmed = false;
let paymentOptionsExist = false;
let discountDetailsExist = false;

function createPaymOpt() {
  let paymentContainer = document.getElementById("paymentContainer");
  if (paymentOptionsExist) {
    paymentContainer.removeChild(paymentOptions);
    paymentOptionsExist = false;
  } else {
    let paymentOptions = document.createElement("div");
    paymentOptions.setAttribute("id", "payment");
    paymentOptions.className = "col-5";
    paymentOptions.innerHTML = `
          <h2>Elija su método de pago</h2>
          <fieldset class="paymentOptions">
          <div id="paymentOptions">
          </div>
          <button type="button" class="btn btn-success" id="buttonConfirmPago">Confirmar método de pago</button>
          </fieldset>
    `;
    paymentContainer.appendChild(paymentOptions);
    paymentOptionsExist = true;
    getPaymentMethods();
  }
}

let paymentStarted = false;
function confirmPedido() {
  pedidoFinal = JSON.parse(sessionStorage.getItem("pedidoFinal"));
  if (pedidoFinal.length > 0) {
    Swal.fire({
      title: "Pedido Confirmado!",
      html: "Su pedido ha sido confirmado. Elija su método de pago a continuación.<br/><br/>•El pago en efectivo tendrá un 10% de descuento en su pedido final.<br/>•El pago mediante transferencia bancaria tendrá un 5% de descuento en su pedido final.",
      icon: "success",
      confirmButtonText: "Entendido",
      color: "black",
    });

    let pedidoConfirmed = true;

    let startPayment = (event) => {
      return new Promise((resolve, reject) => {
        event ? resolve("Pedido confirmado") : reject("Pedido no confirmado");
      });
    };

    startPayment(pedidoConfirmed)
      .then((response) => {
        createPaymOpt();
        paymentStarted = true;
        startDiscount();
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    Swal.fire({
      title: "Error!",
      text: "Su pedido aún no contiene ningún producto",
      icon: "error",
      confirmButtonText: "Ok",
      color: "black",
    });
  }
}



let valorDescuento;

function calcDescuento() {
  let methodSelected = document.querySelectorAll("input[name='paymentOption']");
  for (const method of methodSelected) {
    if (method.checked) {
      if (document.getElementById("cash").checked) {
        valorDescuento = 10;
      } else if (document.getElementById("transfer").checked) {
        valorDescuento = 5;
      } else {
        valorDescuento = 0;
      }
      totalPedido = parseFloat(
        subtotalPedido * (1 - valorDescuento / 100)
      ).toFixed(2);
    }
  }
}

function createDiscountPrice() {
  let paymentContainer = document.getElementById("paymentContainer");
  if (discountDetailsExist) {
    paymentContainer.removeChild(discountDetails);
    discountDetailsExist = false;
  } else {
    let discountDetails = document.createElement("div");
    discountDetails.setAttribute("id", "discountDetails");
    discountDetails.className = "col-4";
    discountDetails.innerHTML = `
  <h3>Su descuento es de: ${valorDescuento.toString()}%</h3>
  <br />
  <p>El precio final de su pedido (con descuento) es de $${totalPedido.toString()}</p>
  <p>Muchas gracias por su compra!</p>
  <p>Los Pollos Hermanos</p>
    `;
    paymentContainer.appendChild(discountDetails);
    discountDetailsExist = true;
  }
}

async function discount() {
  let getDiscount = async (event) => {
    return new Promise((resolve, reject) => {
      event
        ? resolve("Método de pago confirmado")
        : reject("Método de pago no confirmado");
    });
  };

  try {
    let response = await getDiscount(paymentStarted);
    await calcDescuento();
    await createDiscountPrice();
  } catch (error) {
    alert(error);
  }
}

function startDiscount() {
  let buttonConfirmPago = document.getElementById("buttonConfirmPago");
  buttonConfirmPago.addEventListener("click", function () {
    discount();
  });
}

let buttonConfirmPedido = document.getElementById("buttonConfirmPedido");
buttonConfirmPedido.addEventListener("click", function () {
  confirmPedido();
});

async function getPaymentMethods() {
  let selectPaymentMethod = document.getElementById("paymentOptions");
  let paymentMethodsList = "assets/scripts/json/methods.json";
  await fetch(paymentMethodsList)
    .then((response) => response.json())
    .then((methods) => {
      methods.forEach((method) => {
        selectPaymentMethod.innerHTML += `
          <input type="radio" name="paymentOption" id="${method.id}" value="cash">
          <label for="cash">${method.nombre} - Descuento: ${method.descuento}%</label>
          <br/>
          `;
      });
    })
    .catch((err) => alert(err));
}

