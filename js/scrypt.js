"use strict"

const productNameInput = document.querySelector('#name');
const productPriceInput = document.querySelector('#price');
const productAmountInput = document.querySelector('#amount');
const productAddButton = document.querySelector('.inputs__submit');
const productOutput = document.querySelector('.output');
const productOutputAllSum = document.querySelector('.bot__allsum');
const productOutputAllSumValue = document.querySelector('.total p');
/*--------------Добавить товар в список-----------------*/
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
    hideAllSum() //Общая сумма
    doubleClickEdit() //Двойной клик для изменения. Функция ниже
}
/*--------------Удалить товар из списка-----------------*/
function deleteProduct(aim) {
    if (aim.target.classList.contains('output__item_button')) {
        delete aim.target.parentNode;
        aim.target.parentNode.remove();
    }
    hideAllSum() //Общая сумма
}
/*--------------Клик по добавить, удалить-----------------*/
productAddButton.addEventListener('click', addProduct);
productOutput.addEventListener('click', deleteProduct);
/*--------------Спрятать или показать общую сумму + подсчитывание-----------------*/
function hideAllSum() {
    if (productOutput.children.length > 0) {
        productOutputAllSum.classList.remove('_hide');
    } else {
        productOutputAllSum.classList.add('_hide');
    }
    productOutputAllSumValue.innerHTML = `${allSumValue()} $`; //Функция которая считает значение
}
/*--------------Двойной клик по строке для ее изменения-----------------*/
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
/*--------------Возвращает общую сумму пробегаясь по всем продуктам-----------------*/
function allSumValue() {
    var totalSum = 0;
    for (let k of productOutput.children) {
        totalSum += Number(k.children[3].textContent);
    }
    return totalSum;
}
