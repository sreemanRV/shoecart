const cart = document.getElementById("cart-logo");
const cartList = document.getElementById("addtocart");
const cartClose = document.getElementById("cart-close-logo");

cart.addEventListener("click",openCart);

function openCart(){
    cartList.classList.add("addtocart-active");
};

cartClose.addEventListener("click",closeCart);
function closeCart(){
    cartList.classList.remove("addtocart-active");
};
document.addEventListener("DOMContentLoaded",loadShoes);
function loadShoes(){
    loadContent();
}
function loadContent(){
const removeCart = document.getElementsByClassName("fa-regular fa-trash-can");
for(i=0; i< removeCart.length; i++) {
    const removebutton = removeCart[i];
    removebutton.addEventListener("click",cartRemove);
}
const addCartBtn = document.querySelectorAll(".addtocart-btn");
for(i=0; i< addCartBtn.length; i++) {
    const addbutton = addCartBtn[ i];
    addbutton.addEventListener('click',addCart);
}
let qtyElement = document.querySelectorAll(".cart-qty");
qtyElement.forEach((input)=>{
    input.addEventListener("change",changeQty);
});
      const addToCartButtons = document.querySelectorAll('.addtocart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
updateTotal();

}
let itemList = [];

function changeQty(){
    if(isNaN(this.value)||this.value<1){
        this.value=1;
    }
}

function cartRemove(event){
    const buttonClick = event.target;
    if(confirm("Do you want to remove this item from your cart")){
        let title = this.parentElement.querySelector(".shoe-detail").innerHTML;
        itemList = itemList.filter(elt=>elt.title!==title);
    buttonClick.parentElement.parentElement.remove();
    loadContent();
}
}

function addCart(event){
    const button =  event.target;
    const cartbox = button.parentElement;
    let title = cartbox.querySelector(".product-title").innerHTML;
    let price = cartbox.querySelector(".price").innerHTML;
    let imgsrc = cartbox.querySelector(".product-img").src;
    cartCreation(title,price,imgsrc);
   let newProduct={title,price,imgsrc};

 if(itemList.find((el)=>el.title===newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }
 else{
 }

    loadContent();
    updateCartCount();
}

function cartCreation(title,price,imgsrc){
     let element = document.createElement("div");
    let cartBasket = document.getElementsByClassName("cart-content")[0];
    let cartrow = `<div class="cart-box">
                    <img src="${imgsrc}" class="cart-img"/>
                    <div class="detail-box">
                        <div class="shoe-detail">${title}</div>
                        <div class="price-box">
                            <div class="cart-price">${price}</div>
                                <div class="cart-amt"></div>
                        </div>
                        <input type="number" value="1" class="cart-qty" style="width: 1.5rem;" >
                    </div>
                    <i class="fa-regular fa-trash-can" id="remove-cart"></i>
                </div>`;
    element.innerHTML = cartrow;
    cartBasket.append(element);
    loadContent();
}

function updateTotal(){
  const cartItems=document.getElementsByClassName('cart-content')[0];
   const cartRow = cartItems.getElementsByClassName("cart-box");
   total = 0;
   for(i=0;i < cartRow.length; i++){
       const cartRows = cartRow[i];
       const price = cartRows.getElementsByClassName("cart-price")[0];
      const quantity = cartRows.getElementsByClassName("cart-qty")[0];
      const totalprice = parseFloat(price.innerText.replace("₹",""));
      const totalquantity = quantity.value;
      total+=(totalprice*totalquantity);
  }
document.getElementsByClassName("total-price")[0].innerText= "Rs."+total;


        
  }
 let cartCount = 0;

        function updateCartCount() {
            document.getElementById('cart-count').textContent = cartCount;
        }
       function addToCart() {
            cartCount++;
            updateCartCount();
        } 
