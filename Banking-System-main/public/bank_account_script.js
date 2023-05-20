// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

window.onload = function () {
    
    // Firebase configurations so website can access and update database
    const firebaseConfig = {
        apiKey: "AIzaSyBcY-uhUF5f3Yf7xZc-zO1KXkdmS77vXgw",
        authDomain: "cosc-480.firebaseapp.com",
        projectId: "cosc-480",
        storageBucket: "cosc-480.appspot.com",
        messagingSenderId: "146585095339",
        appId: "1:146585095339:web:4008f6e14116a311793bee",
        measurementId: "G-MGZD63796T",
    };

    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    // Get UID from URL
    const params = new URLSearchParams(window.location.search);
    const uid = params.get("uid");

    const btnDeposit = document.getElementById("btnDeposit");
    const btnDepositChecking = document.getElementById("btnDepositChecking");
    const btnDepositSavings = document.getElementById("btnDepositSavings");

    const depositFields = document.getElementById("depositFields");

    const btnWithdraw = document.getElementById("btnWithdraw");
    const btnWithdrawChecking = document.getElementById("btnWithdrawChecking");
    const btnWithdrawSavings = document.getElementById("btnWithdrawSavings");

    const withdrawalFields = document.getElementById("withdrawalFields");

    const checkingWithdrawalInput =
        document.getElementById("checkingWithdrawal");
    const savingsWithdrawalInput = document.getElementById("savingsWithdrawal");

    const checkingBalanceLabel = document.getElementById("checkingBalance");
    const savingsBalanceLabel = document.getElementById("savingsBalance");

    const checkingDepositInput = document.getElementById("checkingDeposit");
    const savingsDepositInput = document.getElementById("savingsDeposit");

    const btnTransfer = document.getElementById("btnTransfer");
    const btnTransferCheckingToSavings = document.getElementById(
        "btnTransferCheckingToSavings"
    );
    const btnTransferSavingsToChecking = document.getElementById(
        "btnTransferSavingsToChecking"
    );

    const transferFields = document.getElementById("transferFields");

    const checkingTransferInput = document.getElementById("checkingTransfer");
    const savingsTransferInput = document.getElementById("savingsTransfer");

    // Toggle visibility of depositFields when btnDeposit is clicked
    btnDeposit.addEventListener("click", function () {
        if (
            depositFields.style.display === "none" ||
            depositFields.style.display === ""
        ) {
            depositFields.style.display = "block"; // Show depositFields
        } else {
            depositFields.style.display = "none"; // Hide depositFields
        }
    });

    // Handle deposit functionality for checking account
    btnDepositChecking.addEventListener("click", function () {
        let currentBalance = parseInt(
            checkingBalanceLabel.textContent.replace("$", "")
        );
        let depositAmount = parseInt(checkingDepositInput.value);

        if (isNaN(depositAmount)) {
            alert("Invalid deposit amount");
            return;
        }

        let newBalance = currentBalance + depositAmount;
        checkingBalanceLabel.textContent = `$${newBalance}`; // Update checkingBalanceLabel

        checkingDepositInput.value = ""; // Clear checkingDepositInput
    });

    // Handle deposit functionality for savings account
    btnDepositSavings.addEventListener("click", function () {
        let currentBalance = parseInt(
            savingsBalanceLabel.textContent.replace("$", "")
        );
        let depositAmount = parseInt(savingsDepositInput.value);

        if (isNaN(depositAmount)) {
            alert("Invalid deposit amount");
            return;
        }

        let newBalance = currentBalance + depositAmount;
        savingsBalanceLabel.textContent = `$${newBalance}`; // Update savingsBalanceLabel

        savingsDepositInput.value = ""; // Clear savingsDepositInput
    });

    // Toggle visibility of withdrawalFields when btnWithdraw is clicked
    btnWithdraw.addEventListener("click", function () {
        if (
            withdrawalFields.style.display === "none" ||
            withdrawalFields.style.display === ""
        ) {
            withdrawalFields.style.display = "block"; // Show withdrawalFields
        } else {
            withdrawalFields.style.display = "none"; // Hide withdrawalFields
        }
    });

    // Handle withdrawal functionality for checking account
    btnWithdrawChecking.addEventListener("click", function () {
        let currentBalance = parseInt(
            checkingBalanceLabel.textContent.replace("$", "")
        );
        let withdrawalAmount = parseInt(checkingWithdrawalInput.value);

        if (isNaN(withdrawalAmount)) {
            alert("Invalid withdrawal amount");
            return;
        }

        if (withdrawalAmount > currentBalance) {
            alert("Insufficient funds in Checking");
            return;
        }

        let newBalance = currentBalance - withdrawalAmount;
        checkingBalanceLabel.textContent = `$${newBalance}`; // Update checkingBalanceLabel

        checkingWithdrawalInput.value = ""; // Clear checkingWithdrawalInput
    });

    // Handle withdrawal functionality for savings account
    btnWithdrawSavings.addEventListener("click", function () {
        let currentBalance = parseInt(
            savingsBalanceLabel.textContent.replace("$", "")
        );
        let withdrawalAmount = parseInt(savingsWithdrawalInput.value);

        if (isNaN(withdrawalAmount)) {
            alert("Invalid withdrawal amount");
            return;
        }

        if (withdrawalAmount > currentBalance) {
            alert("Insufficient funds in Savings");
            return;
        }

        let newBalance = currentBalance - withdrawalAmount;
        savingsBalanceLabel.textContent = `$${newBalance}`; // Update savingsBalanceLabel

        savingsWithdrawalInput.value = ""; // Clear savingsWithdrawalInput
    });

    // Toggle visibility of transferFields when btnTransfer is clicked
    btnTransfer.addEventListener("click", function () {
        if (
            transferFields.style.display === "none" ||
            transferFields.style.display === ""
        ) {
            transferFields.style.display = "block"; // Show transferFields
        } else {
            transferFields.style.display = "none"; // Hide transferFields
        }
    });

    // Handle transfer from checking account to savings account
    btnTransferCheckingToSavings.addEventListener("click", function () {
        let checkingBalance = parseInt(
            checkingBalanceLabel.textContent.replace("$", "")
        );
        let transferAmount = parseInt(checkingTransferInput.value);

        if (isNaN(transferAmount)) {
            alert("Invalid transfer amount");
            return;
        }

        if (transferAmount > checkingBalance) {
            alert("Insufficient funds in Checking");
            return;
        }

        let savingsBalance = parseInt(
            savingsBalanceLabel.textContent.replace("$", "")
        );
        let newCheckingBalance = checkingBalance - transferAmount;
        let newSavingsBalance = savingsBalance + transferAmount;

        checkingBalanceLabel.textContent = `$${newCheckingBalance}`; // Update checkingBalanceLabel
        savingsBalanceLabel.textContent = `$${newSavingsBalance}`; // Update savingsBalanceLabel

        checkingTransferInput.value = ""; // Clear checkingTransferInput
    });

    // Handle transfer from savings account to checking account
    btnTransferSavingsToChecking.addEventListener("click", function () {
        let savingsBalance = parseInt(
            savingsBalanceLabel.textContent.replace("$", "")
        );
        let transferAmount = parseInt(savingsTransferInput.value);

        if (isNaN(transferAmount)) {
            alert("Invalid transfer amount");
            return;
        }

        if (transferAmount > savingsBalance) {
            alert("Insufficient funds in Savings");
            return;
        }

        let checkingBalance = parseInt(
            checkingBalanceLabel.textContent.replace("$", "")
        );
        let newSavingsBalance = savingsBalance - transferAmount;
        let newCheckingBalance = checkingBalance + transferAmount;

        savingsBalanceLabel.textContent = `$${newSavingsBalance}`; // Update savingsBalanceLabel
        checkingBalanceLabel.textContent = `$${newCheckingBalance}`; // Update checkingBalanceLabel

        savingsTransferInput.value = ""; // Clear savingsTransferInput
    });

    // Redirect to crypto.html when btnCrypto is clicked
    const btnCrypto = document.getElementById("btnCrypto");

    btnCrypto.addEventListener("click", function () {
        window.location.href = "crypto.html"; // Navigate to crypto.html
    });

    const btnSave = document.getElementById("btnSave");

    // Add click event listener to btnSave button
    btnSave.addEventListener("click", function () {
        let cBalance = checkingBalanceLabel.textContent.replace("$", "");
        let sBalance = savingsBalanceLabel.textContent.replace("$", "");
        saveFinancialData(cBalance, sBalance);
    });

    // Save the financial data
    function saveFinancialData(checkingBalance, savingsBalance) {
        db.collection("financial")
            .doc(uid)
            .set({
                checking: checkingBalance,
                savings: savingsBalance,
            })
            .then(() => console.log("Financial data saved!"))
            .catch((error) => console.error("Error writing document: ", error));
    }

    // Read the financial data
    function getFinancialData() {
        var docRef = db.collection("financial").doc(uid);

        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    var data = doc.data();
                    console.log("Checking balance: ", data.checking);
                    console.log("Savings balance: ", data.savings);
                    checkingBalanceLabel.textContent = `$${data.checking}`; // Update checkingBalanceLabel
                    savingsBalanceLabel.textContent = `$${data.savings}`; // Update savingsBalanceLabel
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    getFinancialData(); // Retrieve financial data when the script is executed
};
