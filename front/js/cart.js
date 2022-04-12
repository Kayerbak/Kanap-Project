//Init LocalStorage
let productStorage = JSON.parse(localStorage.getItem("product"));
let cartValue = document.querySelector("#cart__items");

console.table(productStorage);

//Checking the Cart
function checkCart() {
    if (productStorage === null || productStorage == 0) {
        cartValue.innerHTML = "<p>Votre Panier est vide</p>";
    } else {
        for (let product in productStorage) {
            let productArticle = document.createElement("product");
            document.querySelector("#cart__items").appendChild(productArticle);

            //Filling Cart product object
            productArticle.innerHTML = `
            <article class="cart__item" data-id="${productStorage[product].idProduit}" data-color="${productStorage[product].couleurProduit}">
                <div class="cart__item__img">
                    <img src="${productStorage[product].imgProduit}" alt="${productStorage[product].altTxtProduit}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${productStorage[product].nomProduit}</h2>
                        <p>${productStorage[product].couleurProduit}</p>
                        <p>${productStorage[product].prixProduit} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productStorage[product].quantiteProduit}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
            `
        }
    }
}
checkCart();

//Edit Quantity for Product
function modifyQuantity() {
    let quantityItem = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < quantityItem.length; i++) {
        quantityItem[i].addEventListener("change", (event) => {

            let quantity = productStorage[i].quantiteProduit;
            let quantityItemValue = quantityItem.valueAsNumber;


        })

    }
}

//Get Total for Quantity and Price
function allTotals() {
    //get Quantity
    let quantite = document.getElementsByClassName('itemQuantity');
    let quantiteLength = quantite.length;
    totalQuantite = 0;

    //Calcul Total Quantity
    for (let i = 0; i < quantiteLength; i++) {
        totalQuantite += quantite[i].valueAsNumber;
    }
    //show Total Quantity Product
    document.getElementById('totalQuantity').innerHTML = totalQuantite;

    //Total Price
    totalPrice = 0;

    //Calcul Total Porducts Price
    for (let i = 0; i < quantiteLength; i++) {
        totalPrice += (quantite[i].valueAsNumber * productStorage[i].prixProduit);
    }

    //Show Total Price
    document.getElementById('totalPrice').innerHTML = totalPrice;
}
allTotals();


//modify quantity
function modifyQuantity() {
    let modifQuantity = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < modifQuantity.length; i++) {
        modifQuantity[i].addEventListener("change", (event) => {
            event.preventDefault();

            let productModif = productStorage[i].quantiteProduit;
            let modifQuantityValue = modifQuantity[i].valueAsNumber;

            const result = productStorage.find((el) => el.modifQuantityValue !== productModif);

            result.quantiteProduit = modifQuantityValue;
            productStorage[i].quantiteProduit = result.quantiteProduit;

            localStorage.setItem("product", JSON.stringify(productStorage));

            //refresh Url
            location.reload();
        })
    }
}
modifyQuantity();

//Delete product
function deleteProduct() {
    let btn_delete = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btn_delete.length; i++) {
        btn_delete[i].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productStorage[i].idProduit;
            let colorDelete = productStorage[i].couleurProduit;

            productStorage = productStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);

            localStorage.setItem("product", JSON.stringify(productStorage));

            //Alerte when product is Deleted
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();


//Get Form
function getForm() {
    //get the DOM form
    let form = document.querySelector(".cart__order__form");

    //Create RegExp
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let charRegEx = new RegExp("^[a-zA-Z ,.'-]+$");

    //Change Name
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //change Lastname
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });

    //change address
    form.address.addEventListener('change', function () {
        validAddress(this);
    });

    //change city
    form.city.addEventListener('change', function () {
        validCity(this);
    });

    //change mail
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

}
getForm();

//Send the Form
function postForm() {
    const btn_commander = document.getElementById("order");

    //Event on button
    btn_commander.addEventListener("click", (event) => {

        //get Info from Form
        let inputName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputAddress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputMail = document.getElementById("email");

    })
}
postForm();