'use strict'

document.getElementById('menu-hamburguer').addEventListener('click', () => {
    document.getElementById('menu-hamburguer').classList.toggle('ativo')
    document.querySelector('menu').classList.toggle('ativo')
})
