fillCards();

//Recuperation Produit API
function listProduit() {
    return listProduit = fetch("http://localhost:3000/api/products")
        .then(reponse => reponse.json())
        .catch((err) => {
            document.querySelector(".title").innerHTML = "<h1>erreur 404</h1>";
            console.log("Erreur 404, sur ressource API:" + err);
        });

}

//Creating and filling Card product
function fillCards() {
    let result = listProduit()
        .then(function (returnAPI) {
            const products = returnAPI;

            for (let product in products) {

                //Insert "a" into the product
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = 'product.html?id=' + returnAPI[product]._id;

                //Insert Article Element
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                //Insert Img
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = returnAPI[product].imageUrl;
                productImg.alt = returnAPI[product].altTxt;

                //Insert Title
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = returnAPI[product].name;

                //Insert Description
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = returnAPI[product].description;

            }
        })
        .catch(function (error) {
            return error;
        });
}