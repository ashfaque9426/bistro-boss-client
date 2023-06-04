/**
 * 1. install stripe and react stripe js
 * 2. create a checkout form with card element (card element contains: card number, expiration date, cvs, zip code)(client side)
 * 3. create account on stripe and get the PK(PublishableKey)
 * 4. get card information
 * 5. create a payment method
 * 6. use test card to test payment
 * 7. on the server side: install stripe
 * npm install --save stripe
 * 8. create a payment intent api with payment method types: ["card"](server side)
 * make sure you privide amount in cents (multiply price with 100)(server side)
 * 9. call payment intent api  to get client secret and store it in a state(client side)
 * 10. use stripe.confirmCardPayment api with client secret card info provide user name and email
 * 11. display confirem card success and error
 * 13. do things after payment update card and other set state and other stuffs.
 */