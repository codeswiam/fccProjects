let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById('cash');
const form = document.getElementById('form');
const changeDue = document.getElementById('change-due');

const showChangeDue = (status, change) => {
    changeDue.textContent = `Status: ${status}`;
    if (change.length > 0) {
        change.forEach((elt) => {
            changeDue.textContent += ` ${elt[0]}: $${elt[1]}`;
        });
    }
}

const checkCashRegister = (price, cash, cid) => {
    let change = parseFloat((cash - price).toFixed(2));
    let cids = parseFloat(cid.reduce((sum, val) => sum + val[1], 0).toFixed(2));
    cid.reverse();
    if (change === cids) {
        showChangeDue("CLOSED", cid.reverse().filter(element => parseFloat(element[1]) != 0));
        return;
    } else if (cids > change) {
        let currency = [
            ["PENNY", 0.01],
            ["NICKEL", 0.05],
            ["DIME", 0.1],
            ["QUARTER", 0.25],
            ["ONE", 1],
            ["FIVE", 5],
            ["TEN", 10],
            ["TWENTY", 20],
            ["ONE HUNDRED", 100]
        ].reverse()

        let toreturn = [] // the array to be returned at the end
        let j = 0 // counter for how many elements are in this array

        for (let i = 0; i < cid.length; i++) {
            toreturn.push([cid[i][0], 0]);

            let toremove = currency[i][1];
            while ((change >= toremove) && (toremove <= cid[i][1])) {
                toreturn[j][1] += toremove;
                cid[i][1] -= toremove;
                change = (change - toremove).toFixed(2);
            }
            j++;
            if (change == 0) break;
        }

        // if we're here it means that we found the change needed
        if (change == 0) {
            // we have to remove the elts equal to 0
            showChangeDue("OPEN", toreturn.filter(element => parseFloat(element[1]) != 0))
            return;
        }
    }
    showChangeDue("INSUFFICIENT_FUNDS", []);
}

const calculateChange = () => {
    if (!cashInput.value) {
        alert("Please specify a valid cash number");
        return;
    }

    let cash = parseFloat(cashInput.value);
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cash === price) {
        changeDue.textContent =  "No change due - customer paid with exact cash";
    } else {
        checkCashRegister(price, cash, cid);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateChange();
})

