const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let saveFile = 0;
let selectedStock = 0;
let amount = 0;

let defaultStocks = {
    stock1: {name: "Stock #1", price: 10, change: "+0"},
    stock2: {name: "Stock #2", price: 30, change: "+0"},
    stock3: {name: "Stock #3", price: 1000, change: "+0"}
}

let stocks = {
    stock1: {name: "Stock #1", price: 10, change: "+0"},
    stock2: {name: "Stock #2", price: 30, change: "+0"},
    stock3: {name: "Stock #3", price: 1000, change: "+0"}
}

let defaultFile = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18, 
    stocks: {
        stock1: {owned: 0, totalSpent: 0, roi: "+0"},
        stock2: {owned: 0, totalSpent: 0, roi: "+0"}, 
        stock3: {owned: 0, totalSpent: 0, roi: "+0"}
    }
}

let file = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18, 
    stocks: {}
};

function setSaveFile(save) {
    if (localStorage.getItem("file1") === null) {
        localStorage.setItem("file1", JSON.stringify(defaultFile));
    }
    if (localStorage.getItem("file2") === null) {
        localStorage.setItem("file2", JSON.stringify(defaultFile));
    }
    if (localStorage.getItem("file3") === null) {
        localStorage.setItem("file3", JSON.stringify(defaultFile));
    }
    localStorage.setItem("saveFile", save);
}

function saveGame() {
    saveFile = Number(localStorage.getItem("saveFile"));
    localStorage.setItem("selectedStock", selectedStock.toString());
    localStorage.setItem("stocks", JSON.stringify(stocks));
    if (saveFile === 1) {
        localStorage.setItem("file1", JSON.stringify(file));
    } else if (saveFile === 2) {
        localStorage.setItem("file2", JSON.stringify(file));
    } else if (saveFile === 3) {
        localStorage.setItem("file3", JSON.stringify(file));
    }   
}

function loadGame() {
    saveFile = Number(localStorage.getItem("saveFile"));
    selectedStock = Number(localStorage.getItem("selectedStock"));
    stocks = JSON.parse(localStorage.getItem("stocks"));
    if (saveFile === 1) {
        file = JSON.parse(localStorage.getItem("file1"));
    } else if (saveFile === 2) {
        file = JSON.parse(localStorage.getItem("file2"));
    } else if (saveFile === 3) {
        file = JSON.parse(localStorage.getItem("file3"));
    }
    updateScreen();
}

function deleteSaveFile() {
    save = Number(localStorage.getItem("saveFile"));
    if (save === 1) {
        localStorage.setItem("file1", JSON.stringify(defaultFile));
    } else if (save === 2) {
        localStorage.setItem("file2", JSON.stringify(defaultFile));
    } else if (save === 3) {
        localStorage.setItem("file3", JSON.stringify(defaultFile));
    }
    localStorage.setItem("stocks", JSON.stringify(defaultStocks));
}

function simulate() {
    loadGame();
    file.balance += file.salary;
    if (file.month < 11) {
        file.month += 1;
    } else {
        file.month = 0;
        file.year += 1;
        file.age += 1;
    } 
    changeStockPrice();
    saveGame();
    updateScreen();   
}

function updateScreen() {
    if (document.getElementsByClassName("date")) {
        let elements = document.getElementsByClassName("date");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = months[file.month] + " " + file.year;
        }
    }
    if (document.getElementsByClassName("balance")) {
        let elements = document.getElementsByClassName("balance");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "$" + file.balance;
        }
    }
    if (document.getElementsByClassName("age")) {
        let elements = document.getElementsByClassName("age");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.age + " Years Old";
        }
    }
    if (document.getElementsByClassName("salary")) {
        let elements = document.getElementsByClassName("salary");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "$" + file.salary;
        }
    }
    if (document.getElementsByClassName("stock-title")) {
        let elements = document.getElementsByClassName("stock-title");
        for (let i = 0; i < elements.length; i++) {
            if (selectedStock === 1) {
                elements[i].innerHTML = stocks.stock1.name;
            } else if (selectedStock === 2) {
                elements[i].innerHTML = stocks.stock2.name;
            } else if (selectedStock === 3) {
                elements[i].innerHTML = stocks.stock3.name;
            }
             
        }
    }
    if (document.getElementsByClassName("owned-stock")) {
        let elements = document.getElementsByClassName("owned-stock");
        for (let i = 0; i < elements.length; i++) {
            if (selectedStock === 1) {
                elements[i].innerHTML = file.stocks.stock1.owned;
            } else if (selectedStock === 2) {
                elements[i].innerHTML = file.stocks.stock2.owned;
            } else if (selectedStock === 3) {
                elements[i].innerHTML = file.stocks.stock3.owned;
            }

        }
    }
    if (document.getElementsByClassName("stock-price")) {
        let elements = document.getElementsByClassName("stock-price") 
        for (let i = 0; i < elements.length; i++) {
            if (selectedStock === 1) {
                elements[i].innerHTML = stocks.stock1.price;
            } else if (selectedStock === 2) {
                elements[i].innerHTML = stocks.stock2.price;
            } else if (selectedStock === 3) {
                elements[i].innerHTML = stocks.stock3.price;
            }
        }
    }
    if (document.getElementsByClassName("stock-1-amount")) {
        let elements = document.getElementsByClassName("stock-1-amount");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.stocks.stock1.owned;
        }
    }
    if (document.getElementsByClassName("stock-2-amount")) {
        let elements = document.getElementsByClassName("stock-2-amount");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.stocks.stock2.owned;
        }
    }
    if (document.getElementsByClassName("stock-3-amount")) {
        let elements = document.getElementsByClassName("stock-3-amount");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.stocks.stock3.owned;
        }
    }
    if (document.getElementsByClassName("stock-1-price")) {
        let elements = document.getElementsByClassName("stock-1-price");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "$" + stocks.stock1.price;
        }
    }
    if (document.getElementsByClassName("stock-2-price")) {
        let elements = document.getElementsByClassName("stock-2-price");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "$" + stocks.stock2.price;
        }
    }
    if (document.getElementsByClassName("stock-3-price")) {
        let elements = document.getElementsByClassName("stock-3-price");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "$" + stocks.stock3.price;
        }
    }
    if (document.getElementsByClassName("ROI-1")) {
        let elements = document.getElementsByClassName("ROI-1");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.stocks.stock1.roi;
        }
    }
    if (document.getElementsByClassName("ROI-2")) {
        let elements = document.getElementsByClassName("ROI-2");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.stocks.stock2.roi;
        }
    }
    if (document.getElementsByClassName("ROI-3")) {
        let elements = document.getElementsByClassName("ROI-3");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.stocks.stock3.roi;
        }
    }
    if (document.getElementsByClassName("stock-1-change")) {
        let elements = document.getElementsByClassName("stock-1-change");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = stocks.stock1.change;
        }
    }
    if (document.getElementsByClassName("stock-2-change")) {
        let elements = document.getElementsByClassName("stock-2-change");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = stocks.stock2.change;
        }
    }
    if (document.getElementsByClassName("stock-3-change")) {
        let elements = document.getElementsByClassName("stock-3-change");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = stocks.stock3.change;
        }
    }
    if (document.getElementsByClassName("stock-amount")) {
        let elements = document.getElementsByClassName("stock-amount");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = amount;
        }
    }
}

function setAmount(increment) {
    if (increment > 0) {
        amount += increment;
    } else if (amount + increment >= 0) {
        amount += increment;
    }
    updateScreen();
}

function setMaxAmount(action) {
    let stock = JSON.parse(localStorage.getItem("selectedStock"));
    if (action > 0) {
        if (stock === 1) {
            amount = Math.floor(file.balance / stocks.stock1.price);
        } else if (stock === 2) {
            amount = Math.floor(file.balance / stocks.stock2.price);
        } else if (stock === 3) {
            amount = Math.floor(file.balance / stocks.stock3.price);
        }
    } else {
        if (stock === 1) {
            amount = Math.floor(file.stocks.stock1.owned);
        } else if (stock === 2) {
            amount = Math.floor(file.stocks.stock1.owned);
        } else if (stock === 3) {
            amount = Math.floor(file.stocks.stock1.owned);
        }
    }
    updateScreen();
}

function selectStock(stock) {
    selectedStock = stock;
    saveGame();
}

function buyStock() {
    let selectedStock = JSON.parse(localStorage.getItem("selectedStock"));
    if (selectedStock === 1) {
        if (amount * stocks.stock1.price <= file.balance) {
            file.stocks.stock1.owned += amount;
            file.balance -= amount * stocks.stock1.price;
            file.stocks.stock1.totalSpent += amount * stocks.stock1.price;
            amount = 0;
        }
    } else if (selectedStock === 2) {
        if(amount * stocks.stock2.price <= file.balance) {
            file.stocks.stock2.owned += amount;
            file.balance -= amount * stocks.stock2.price;
            file.stocks.stock2.totalSpent += amount * stocks.stock2.price;
            amount = 0;
        }
    } else if (selectedStock === 3) {
        if(amount * stocks.stock3.price <= file.balance) {
            file.stocks.stock3.owned += amount;
            file.balance -= amount * stocks.stock3.price;
            file.stocks.stock3.totalSpent += amount * stocks.stock3.price;
            amount = 0;
        }
    }
    saveGame();
    updateScreen();
}

function sellStock() {
    let selectedStock = JSON.parse(localStorage.getItem("selectedStock"));
    if (selectedStock === 1) {
        if (amount <= file.stocks.stock1.owned) {
            file.stocks.stock1.owned -= amount;
            file.balance += amount * stocks.stock1.price;
            amount = 0;
        }
    } else if (selectedStock === 2) {
        if (amount <= file.stocks.stock2.owned) {
            file.stocks.stock2.owned -= amount;
            file.balance += amount * stocks.stock2.price;
            amount = 0;
        }
    } else if (selectedStock === 3) {
        if (amount <= file.stocks.stock3.owned) {
            file.stocks.stock3.owned -= amount;
            file.balance += amount * stocks.stock3.price;
            amount = 0;
        }
    }
    saveGame();
    updateScreen();
}

function changeStockPrice() {
    let priceChange1 = Math.round(Math.random());
    let priceChange2 = Math.round(Math.random());
    let priceChange3 = Math.round(Math.random());
    let priceChangeAmount1 = Math.floor(Math.random() * (10 - 1) + 1);
    let priceChangeAmount2 = Math.floor(Math.random() * (30 - 1) + 1);
    let priceChangeAmount3 = Math.floor(Math.random() * (100 - 1) + 1);
    if (priceChange1 === 1) {
        stocks.stock1.change = "+" + priceChangeAmount1;
        stocks.stock1.price += priceChangeAmount1;
    } else {
        if (stocks.stock1.price - priceChangeAmount1 > 0) {
            stocks.stock1.change = "-" + priceChangeAmount1;
            stocks.stock1.price -= priceChangeAmount1;
        } else {
            stocks.stock1.change = "-" + stocks.stock1.price;
            stocks.stock1.price = 0;
        }
    }
    if (priceChange2 === 1) {
        stocks.stock2.change = "+" + priceChangeAmount2;
        stocks.stock2.price += priceChangeAmount2;
    } else {
        if (stocks.stock2.price - priceChangeAmount2 > 0) {
            stocks.stock2.change = "-" + priceChangeAmount2;
            stocks.stock2.price -= priceChangeAmount2;
        } else {
            stocks.stock2.change = "-" + stocks.stock2.price;
            stocks.stock2.price = 0;
        }
    }
    if (priceChange3 === 1) {
        stocks.stock3.change = "+" + priceChangeAmount3;
        stocks.stock3.price += priceChangeAmount3;
    } else {
        if (stocks.stock3.price - priceChangeAmount3 > 0) {
            stocks.stock3.change = "-" + priceChangeAmount3;
            stocks.stock3.price -= priceChangeAmount3;
        } else {
            stocks.stock3.change = "-" + stocks.stock3.price;
            stocks.stock3.price = 0;
        }
    }
    let roi1;
    let roi2;
    let roi3;

    if (file.stocks.stock1.totalSpent > 0) {
        roi1 = ((((file.stocks.stock1.owned) * (stocks.stock1.price)) - file.stocks.stock1.totalSpent) / file.stocks.stock1.totalSpent) * 100;
    } else {
        roi1 = 0;
    }
    if (file.stocks.stock2.totalSpent > 0) {
        roi2 = ((((file.stocks.stock2.owned) * (stocks.stock2.price)) - file.stocks.stock2.totalSpent) / file.stocks.stock2.totalSpent) * 100;
    } else {
        roi2 = 0;
    }
    if (file.stocks.stock3.totalSpent > 0) {
        roi3 = ((((file.stocks.stock3.owned) * (stocks.stock3.price)) - file.stocks.stock3.totalSpent) / file.stocks.stock3.totalSpent) * 100;
    } else {
        roi3 = 0;
    }
    if (roi1 >= 0) {
        file.stocks.stock1.roi = "+" + roi1 + "%"
    } else {
        file.stocks.stock1.roi = roi1 + "%"
    }
    if (roi2 >= 0) {
        file.stocks.stock2.roi = "+" + roi2 + "%"
    } else {
        file.stocks.stock2.roi = roi2 + "%"
    }
    if (roi3 >= 0) {
        file.stocks.stock3.roi = "+" + roi3 + "%"
    } else {
        file.stocks.stock3.roi = roi3 + "%"
    }
    saveGame();
}

loadGame();