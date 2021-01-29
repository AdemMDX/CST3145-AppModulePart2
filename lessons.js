Vue.component('cartItems', {
    template: '\
      <li>\
        {{ title }}\
        <button v-on:click="$emit(\'remove\')">Remove</button>\
      </li>\
    ',
    props: ['title']
  })

let webstore = new Vue({
    el: '#app'
}) //app id

let newwebstore2 = new Vue({
    el: '#app2',
    data: {
        sitename: 'After School Club',
        products: products,
        cart: [
        ],
        showProduct: true,
        order: {
            firstname: '',
            lastname: '',
            address: '',
            city: '',
            sort: 'None',
            zip: '',
            gift: '',
            method: 'home',
            sendGift: 'Send as a gift',
            dontSendGift: 'Do not send as gift',
            phone: '',
            ascending: 'Asc',
        },
        sort: {
            None: 'None',
            Price: 'Price',
            Alphabetically: 'Alphabetically',
        },
        items: [],
        },

    methods: {
        addToCart(product) {

                this.cart.push(product.id);
        },

        addNewitem (product) 
            {
            this.items.push(product.title + ' ' + product.price)
          },

        showCheckout () {
            this.showProduct = this.showProduct ? false : true;
        },
        showSubmit () {
            if(this.order.firstname == '' || this.order.lastname == '' || this.order.phone == '') {
                alert("No Input")
            }
            else {
            alert('Order Submitted!')
            }
        },
        onlyLetter(e) {
            let char = String.fromCharCode(e.keyCode); 
            // Get user input letters
            if(/^[A-Za-z]+$/.test(char)) return true; 
            // check letters
            else e.preventDefault(); 
            // if it isn't letters, dont add
            //prevent it if not
          },
          canAddToCart (product) {
            return product.availableInventory > this.cartCount
            (product.title + ' ' + product.price)
        },
          cartCount(id) {
              let count = 0;
              for(let i=0; i <this.items.length; i++) {
                  if (this.items[i] === id) count++;
              }
              return count;
          },
          removeProduct (product){
            this.cart.splice(product.id);
        },
    },
    computed: {
        
        cartItemCount() {
            return this.items.length;
        },
        /*
        canAddToCart: function () {
            return product.availableInventory > this.cartItemCount;
        },
        
        canAddToCart2: function () {
            return this.english.availableInventory > this.cartItemCount;
        },
        */
       
        canGoToCheckout: function () {
            return 1 <= this.cartItemCount;
        },
        checkName: function () {
            return this.order.firstname == '' || this.order.lastname == '' || this.order.phone == '';
        },
        sortedProducts() {
            //comparison

            //if user selects price
            if (this.order.sort === 'Price') {
                //if its ascending
                if (this.order.ascending === 'Asc') {
                function compare(a, b) {
                    if (a.price > b.price) return 1;
                    if (a.price < b.price) return -1;
                    return 0;
                }
                return this.products.sort(compare);
                }
                else {
                    //if its descending
                function compare(a, b) {
                    if (a.price < b.price) return 1;
                    if (a.price > b.price) return -1;
                    return 0;
                }
                return this.products.sort(compare);
                }
            }
            //end of price choice

            //sort Alphabetically
            else if (this.order.sort === 'Alphabetically'){
                if (this.order.ascending === 'Asc') {
                    //if its ascending
                    function compare(a, b) {				//#B
                      if(a.title.toLowerCase() < b.title.toLowerCase())
                        return -1;
                      if(a.title.toLowerCase() > b.title.toLowerCase())
                        return 1;
                      return 0;
                    }
                    return this.products.sort(compare);	
                           }	       //#C
                    else {
                        //if its descending
                        function compare(a, b) {				//#B
                            if(a.title.toLowerCase() > b.title.toLowerCase())
                              return -1;
                            if(a.title.toLowerCase() < b.title.toLowerCase())
                              return 1;
                            return 0;
                          }
                          return this.products.sort(compare);	
                    }
            }
            // end of sort Alphabetically

            //No sort
            else if (this.order.sort === 'None') {
                function compare(a, b) {
                    if (a.id > b.id) return 1;
                    if (a.id < b.id) return -1;
                    return 0;
                }
                return this.products.sort(compare);
            }
            //end of no sort

            //if user doesn't select anything
            else {
                return true;
            }
        },
        noSort () {
            if (this.order.sort === 'None') {
                return false;
            }
            else {
                return true;
            }
        },
    }//end of computed
})//app2 id