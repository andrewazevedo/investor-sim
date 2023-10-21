const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let saveFile = 1;

let file = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18, 
    stocks: []
};

let file1 = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18, 
    stocks: []
}

let file2 = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18,
    stocks: []
}

let file3 = {
    balance: 10000,
    salary: 1000,
    month: 0,
    year: 2023,
    age: 18,
    stocks: []
}

function setSaveFile(save) {
    saveFile = save;
    saveGame();
}

function saveGame() {
    if (saveFile === 1) {
        localStorage.setItem("saveFile", saveFile.toString());
        localStorage.setItem("file1", JSON.stringify(file));
        localStorage.setItem("file2", JSON.stringify(file2));
        localStorage.setItem("file3", JSON.stringify(file3));
    } else if (saveFile === 2) {
        localStorage.setItem("saveFile", saveFile.toString());
        localStorage.setItem("file1", JSON.stringify(file1));
        localStorage.setItem("file2", JSON.stringify(file));
        localStorage.setItem("file3", JSON.stringify(file3));
    } else if (saveFile === 3) {
        localStorage.setItem("saveFile", saveFile.toString());
        localStorage.setItem("file1", JSON.stringify(file1));
        localStorage.setItem("file2", JSON.stringify(file2));
        localStorage.setItem("file3", JSON.stringify(file));
    }
}

function loadGame() {
    saveFile = Number(localStorage.getItem("saveFile"));
    file1 = JSON.parse(localStorage.getItem("file1"));
    file2 = JSON.parse(localStorage.getItem("file2"));
    file3 = JSON.parse(localStorage.getItem("file3"));
    if (saveFile === 1) {
        file = file1;
    } else if (saveFile === 2) {
        file = file2;
    } else if (saveFile === 3) {
        file = file3;
    }
    updateScreen();
}

function deleteSaveFile() {
    save = Number(localStorage.getItem("saveFile"));
    if (save === 1) {
        file1.balance = 10000;
        file1.salary = 1000;
        file1.month = 0;
        file1.year = 2023;
        file1.age = 18;
        file1.stocks = [];
        saveGame();
    } else if (save === 2) {
        file2 = {
            balance: 10000,
            salary: 1000,
            month: 0,
            year: 2023,
            age: 18
        }
        saveGame();
    } else if (save === 3) {
        file3 = {
            balance: 10000,
            salary: 1000,
            month: 0,
            year: 2023,
            age: 18
        }
        saveGame();
    }
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
}

loadGame();