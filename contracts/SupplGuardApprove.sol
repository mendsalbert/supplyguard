// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract SupplyChain {
    struct Order {
        uint256 id;
        address buyer;
        string productName;
        uint256 quantity;
        uint256 totalPrice;
        bool approved;
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
        string imageUrl;
    }

    mapping(uint256 => Product) public products;

    mapping(uint256 => Order) public orders;

    event OrderPlaced(uint256 orderId, address buyer, string productName, uint256 quantity, uint256 totalPrice);
    event OrderApproved(uint256 orderId);

    function addProduct(uint256 productId, string memory name, uint256 price, uint256 quantity, string memory imageUrl) public {
        require(products[productId].id == 0, "Product already exists");
        products[productId] = Product(productId, name, price, quantity, imageUrl);
    }

    function placeOrder(uint256 orderId, uint256 productId, uint256 quantity) public {
        require(products[productId].id != 0, "Product does not exist");
        require(quantity <= products[productId].quantity, "Insufficient product quantity");

        uint256 totalPrice = products[productId].price * quantity;
        orders[orderId] = Order(orderId, msg.sender, products[productId].name, quantity, totalPrice, false);
        emit OrderPlaced(orderId, msg.sender, products[productId].name, quantity, totalPrice);
    }

    function approveOrder(uint256 orderId) public {
        require(orders[orderId].id != 0, "Order does not exist");
        require(!orders[orderId].approved, "Order already approved");


        orders[orderId].approved = true;
        emit OrderApproved(orderId);
    }
}
