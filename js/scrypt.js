"use strict"

const productNameInput = document.querySelector('#name');
const productPriceInput = document.querySelector('#price');
const productAmountInput = document.querySelector('#amount');
const productAddButton = document.querySelector('.inputs__submit');

const productOutput = document.querySelector('.output');
const productOutputAllSum = document.querySelector('.bot__allsum');
const productOutputAllSumValue = document.querySelector('.total p');

function addProduct() {
    var name = productNameInput.value;
    var price = productPriceInput.value;
    var amount = productAmountInput.value;

    if (name == '') { name = 'Забыл?'; }
    if (price == '') { price = 5; }
    if (amount == '') { amount = 1; }

    var sum = price * amount;
    productOutput.innerHTML +=
        `<div class="output__line">
	<div class="output__item">${name}</div>
	<div class="output__item">${price}</div>
	<div class="output__item">${amount}</div>
	<div class="output__item">${sum}</div>
	<button class="output__item output__item_button">Удалить</button>
	</div>`
    productNameInput.value = '';
    productPriceInput.value = '';
    productAmountInput.value = '';
    hideAllSum()
    doubleClickEdit()
}

function deleteProduct(aim) {
    if (aim.target.classList.contains('output__item_button')) {
        delete aim.target.parentNode;
        aim.target.parentNode.remove();
    }
    hideAllSum()
}

productAddButton.addEventListener('click', addProduct);
productOutput.addEventListener('click', deleteProduct);

function hideAllSum() {
    if (productOutput.children.length > 0) {
        productOutputAllSum.classList.remove('_hide');
    } else {
        productOutputAllSum.classList.add('_hide');
    }
    productOutputAllSumValue.innerHTML = `${allSumValue()} $`;
}

productOutput.addEventListener('dblclick', function (e) {
    if (e.target == productOutput.children) {
        console.log('dbl child')
    }
})


function doubleClickEdit() {
    for (let item of productOutput.children) {
        for (let j of item.children) {
            j.addEventListener('dblclick', function (e) {
                if (e.target == item.children[3] || e.target == item.children[4]) {
                    e.preventDefault()
                } else {
                    j.innerHTML = `<input  type="text" class="edit__input" value="${j.innerHTML}">`
                    const editInput = j.querySelector('.edit__input');
                    editInput.addEventListener('keyup', function (e) {
                        if (e.key == 'Enter') {
                            j.innerHTML = editInput.value;
                            var sum = item.children[1].innerHTML * item.children[2].innerHTML;
                            item.children[3].innerHTML = sum;
                            productOutputAllSumValue.innerHTML = `${allSumValue()} $`;
                        }
                    })
                }
            })
        }
    }
}

function allSumValue() {
    var totalSum = 0;
    for (let k of productOutput.children) {
        totalSum += Number(k.children[3].textContent);
    }
    return totalSum;
}
