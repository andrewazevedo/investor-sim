const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let saveFile = 0;
let selectedStock = 0;

let stocks = {
    stock1: {name: "Stock #1"},
    stock2: {name: "Stock #2"},
    stock3: {name: "Stock #3"}
}

let defaultFile = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18, 
    stocks: []
}

let file = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18, 
    stocks: []
};

function setSaveFile(save) {
    if (localStorage.length === 0) {
        localStorage.setItem("file1", JSON.stringify(defaultFile));
        localStorage.setItem("file2", JSON.stringify(defaultFile));
        localStorage.setItem("file3", JSON.stringify(defaultFile));
        localStorage.setItem("saveFile", save);
    } else {
        localStorage.setItem("saveFile", save);
    }
    
}

function saveGame() {
    saveFile = Number(localStorage.getItem("saveFile"));
    localStorage.setItem("selectedStock", selectedStock.toString());
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
    saveGame();
    updateScreen();   
}

function updateScreen() {
    if (document.getElementsByClassName("date")) {
        let elements = document.getElementsByClassName("date");
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = months[file.month] + " " + file.year;
        }
    }
    if (document.getElementsByClassName("balance")) {
        let elements = document.getElementsByClassName("balance");
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "Balance: $" + file.balance;
        }
    }
    if (document.getElementsByClassName("age")) {
        let elements = document.getElementsByClassName("age");
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = file.age + " Years Old";
        }
    }
    if (document.getElementsByClassName("salary")) {
        let elements = document.getElementsByClassName("salary");
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "Monthly Salary: $" + file.salary;
        }
    }
    if (document.getElementsByClassName("stock-title")) {
        let elements = document.getElementsByClassName("stock-title");
        for (var i = 0; i < elements.length; i++) {
            if (selectedStock === 1) {
                elements[i].innerHTML = stocks.stock1.name;
            } else if (selectedStock === 2) {
                elements[i].innerHTML = stocks.stock2.name;
            } else if (selectedStock === 3) {
                elements[i].innerHTML = stocks.stock3.name;
            }
             
        }
    }
}

function selectStock(stock) {
    selectedStock = stock;
}

loadGame();