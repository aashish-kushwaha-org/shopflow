## CartItem: snapshot vs live-reference for price/name

**context:**
When creating a CartItem model there was requirement like how a CartItem will look like whether do need to recreate the fields which a product will have or we should somehow reuse products properties. Because CartItem will be a product itself with less/more fields. Now the problem was if cart item refer the product properties and if user added one product & during the checkout products price gets increased by the admin then CartItem products price will also get increased which is not a fair scenario for user. Hence we should not have these fields as live reference instead these should be the snapshot of the moment when user added the product to cart.
live reference field should be live because we need to have the same id for product and CartItem product otherwise it'll be difficult to track which item got added to the Cart.

**Decision:**
Hence we'll use the snapshot field for the price & name & for id we'll use the live reference

**Alternatives:** Reference Product.price/name live via the product's id alone — rejected due to the checkout fairness/legal issue described above.

**Consequences**: By using this approach it will be easier for us to maintain history of orders & will be fair for users as well

---

## User/Order: embedded orders[] vs normalized userId foreign key

**context**:
While designing the Users model there was requirement to store the orders of the users. We wanted to design a model in such a way that User & Order will be loosely coupled.

**Decision:**
Hence we followed the normalized design we've added userId field inside Order model so that this will ac as the foreign key in the Order model.

**Alternatives:**
One option was to embed the order[] inside User model but in the future if the user is deleted then all the orders will also be deleted but we didn't wanted to delete order because to maintain the history of orders.

**Consequences:**
By following this normalized design we can have loosely coupled models which will resolve the issue of this user deletion independently while maintaining the orders history.

---

## OrderStatus: literal vs enum

**Context:**
There was requirement of creating a model OrderStatus which will have possible values like (pending, in-transit, out-for-delivery, delivered, cancelled). There were multiple ways for this like (enum vs literal union)

**Decision:**
We've implemented this model using the literal union notation because literal union will be a plain string instead of numbers (in case of enum). If we've these strings & from API we'll be getting order status is form of string only like 'delivered', 'cancelled' then it will be easier for us to compare in the code. Instead of creating a mapper function in case of enum which will map numbers to status value.

**Alternatives:**
Define enum with the values

**Consequences:**
Enum in the TS will be resolved at the runtime which will increase the js file size because at the compile time these are not the types which will get strip of. Additionally we'll require an additional mapper function to have this number -> string mapping. Literal union will be plain strings which will make the comparison process faster & will align perfectly with the API fields.
