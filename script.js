// Objekt-Array für die Produktliste:
let productlist = [
    {
        'id': '0',
        'name': 'Tiramisu',
        'preparations': 'mit Tomaten und Käse',
        'price': 8.50,
        'amount': 0,
        'totalPrice': function () {
            return this.price * this.amount
        }

    },
    {
        'id': '1',
        'name': 'Pizza Margherita',
        'preparations': 'hausgemacht mit Sahne und Amaretto, ohne Ei',
        'price': 4.90,
        'amount': 0,
        'totalPrice': function () {
            return this.price * this.amount
        }
    },
    {
        'id': '2',
        'name': 'Pizza al Salame',
        'preparations': 'mit Salami',
        'price': 9.90,
        'amount': 0,
        'totalPrice': function () {
            return this.price * this.amount
        }
    },
    {
        'id': '3',
        'name': 'Insalata di Mare',
        'preparations': 'Meeresfrüchtesalat, ohne Dressing',
        'price': 12.90,
        'amount': 0,
        'totalPrice': function () {
            return this.price * this.amount
        }
    },
    {
        'id': '4',
        'name': 'Pizza Diavolo (scharf)',
        'preparations': 'mit Salami, Oliven milder und scharfer Peperoni',
        'price': 9.90,
        'amount': 0,
        'totalPrice': function () {
            return this.price * this.amount
        }
    },
    {
        'id': '5',
        'name': 'Spaghetti alla Bolognese',
        'preparations': 'mit Hackfleischsauce',
        'price': 9.90,
        'amount': 0,
        'totalPrice': function () {
            return this.price * this.amount
        }
    }
]


// Reihenfolge:
let order = [];



// Menu Box erstellen:
function renderMenuBox() {
    let menuBoxContent = document.getElementById('content-menu-box');
    menuBoxContent.innerHTML = '';

    for (let i = 0; i < productlist.length; i++) {
        menuBoxContent.innerHTML += /*html*/`
        <div class="menu-box" onclick="addItemToBasket('${productlist[i].id}')">
            <div class="add-icon-container"><img src="./icons/add-icon.svg" alt=""></div>
            <h1 class="product-headline">${productlist[i].name}</h1>
            <p class="preparation">${productlist[i].preparations}</p>
            <p class="price">${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(productlist[i].price))}<p>
        </div>
        `;
    }
    renderBasket();
}


// Warenkorb rendern:
function renderBasket() {
    let shoppingbasket = document.getElementById('content-basket');
    shoppingbasket.innerHTML = ``;

    if (order.length == 0) {
        shoppingbasket.innerHTML = /*html*/`
        <div class="empty-basket" >
            <img src="./icons/shopping-basket.svg" alt="">
            <p class="infobox1">Fülle deinen Warenkorb</p>
            <p class="infobox2">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen</p>
        </div>`;
    } else {
        for (let i = 0; i < order.length; i++) {
            let product = productlist.find(element => element.id == order[i]);

            shoppingbasket.innerHTML += /*html*/`
             <div class="menu-in-basket">
                 <p class="quantity-in-basket">${product.amount}</p>
                 <p class="product-in-basket">${product.name}</p>
                 <p class="price-in-basket">${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.totalPrice()))}</p>
             </div>
             <div class="change-quantity">
                 <div onclick="addItemToBasket(${product.id})"><img src="./icons/add-icon.svg" alt=""></div>
                 <div onclick="deleteOneItemFromBasket(${product.id})"><img src="./icons/remove-icon.svg" alt=""></div>
             </div>`;
        }
    }

    cashDesk();
}

// Gesamtpreis berechnen:
function calcPrice() {

    let sum = 0;
    productlist.forEach(element => {  // Wir gehen durch das Array "productlist" und für jedes Element das gefunden wird, macht er folgendes:
        sum += element.price * element.amount;
    });

    return sum;
}


// Zwischensumme, Lieferkosten & Gesamt:
function cashDesk() {
    if (order.length > 0) {
        let shoppingbasket = document.getElementById('content-basket');

        shoppingbasket.innerHTML += /*html*/ `
        <div class="subtotal">
            <p>Zwischensumme</p>
            <p>${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(calcPrice()))}</p>
        </div>
        <div class="delivery-costs">
            <p>Lieferkosten</p>
            <p>Kostenlos</p>
        </div>
        <div class="total-price">
            <p>Gesamt</p>
            <p>${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(calcPrice()))}</p>
        </div>`;
    }
}


// Etwas dem Warenkorb hinzufügen und die quantity verändern:
function addItemToBasket(search_id) {
    let index = productlist.findIndex(element => element.id == search_id);

    productlist[index].amount++;

    if (productlist[index].amount == 1) {
        order.push(productlist[index].id);
    }

    renderBasket();
    renderMobileBasket();
    mobileBasketButton()
}


// Einzelnes Item aus dem Warenkorb nehmen:
function deleteOneItemFromBasket(search_id) {
    let index = productlist.findIndex(element => element.id == search_id);

    productlist[index].amount--;

    if (productlist[index].amount == 0) {
        let index_order = order.findIndex(element => element == search_id);
        order.splice(index_order, 1);
    }

    renderBasket();
    renderMobileBasket();
    mobileBasketButton();
}


// Like Icon verändern:
iconLight = true;

function changeLikeIcon() {
    if (iconLight == true) {
        document.getElementById('like-icon').src = `icons/liked-icon.svg`;
        iconLight = false;
    } else {
        document.getElementById('like-icon').src = `icons/like-icon.svg`;
        iconLight = true;
    }
}


// Mobile-Basket:

function showMobileBasket() {
    document.getElementById('mobile-basket-container').classList.add('show-mobile-basket-container');
    renderMobileBasket()
}

function closeMobileBasket() {
    document.getElementById('mobile-basket-container').classList.remove('show-mobile-basket-container');
}

function renderMobileBasket() {
    let shoppingbasket = document.getElementById('mobile-basket-content');
    shoppingbasket.innerHTML = ``;

    if (order.length == 0) {
        shoppingbasket.innerHTML = /*html*/`
        <div class="empty-basket" >
            <img src="./icons/shopping-basket.svg" alt="">
            <p class="infobox1">Fülle deinen Warenkorb</p>
            <p class="infobox2">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen</p>
        </div>`;
    } else {
        for (let i = 0; i < order.length; i++) {
            let product = productlist.find(element => element.id == order[i]);

            shoppingbasket.innerHTML += /*html*/`
             <div class="menu-in-basket">
                 <p class="quantity-in-basket">${product.amount}</p>
                 <p class="product-in-basket">${product.name}</p>
                 <p class="price-in-basket">${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.totalPrice()))}</p>
             </div>
             <div class="change-quantity">
                 <div onclick="addItemToBasket(${product.id})"><img src="./icons/add-icon.svg" alt=""></div>
                 <div onclick="deleteOneItemFromBasket(${product.id})"><img src="./icons/remove-icon.svg" alt=""></div>
             </div>`;
        }
    }

    mobileCashDesk();
}

function mobileCashDesk() {
    if (order.length > 0) {
        let shoppingbasket = document.getElementById('mobile-basket-content');

        shoppingbasket.innerHTML += /*html*/ `
        <div class="subtotal">
            <p>Zwischensumme</p>
            <p>${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(calcPrice()))}</p>
        </div>
        <div class="delivery-costs">
            <p>Lieferkosten</p>
            <p>Kostenlos</p>
        </div>
        <div class="total-price">
            <p>Gesamt</p>
            <p>${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(calcPrice()))}</p>
        </div>`;
    }
}

function mobileBasketButton() {
    let mobileButton = document.getElementById('mobile-button');

    mobileButton.innerHTML = /*html*/`
    <p>Warenkorb (${(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(calcPrice()))})</p>
    `;
}

