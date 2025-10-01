'use strict'

document.getElementById('menu-hamburguer').addEventListener('click', () => {
    document.getElementById('menu-hamburguer').classList.toggle('ativo')
    document.querySelector('menu').classList.toggle('ativo')
    document.querySelector('body').classList.toggle('menu-ativo')
})

async function obterConteudo(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function criarCards(secao, data) {
    const section = document.getElementById(secao)

    const cards = document.createElement('div')
    cards.className = 'cards'

    for (let i = 0; i < data.data.length; i++) {
        const card = document.createElement('div')
        const imagem = document.createElement('img')
        const titulo = document.createElement('p')

        card.className = 'card'
        imagem.src = data.data[i].images.jpg.image_url
        titulo.textContent = data.data[i].title

        card.append(imagem, titulo)
        cards.append(card)
    }

    section.append(cards)
}

async function exibirConteudos() {
    const animesDaTemporadaAtual = await obterConteudo('https://api.jikan.moe/v4/seasons/now?sfw')
    criarCards('animes-temporada-atual', animesDaTemporadaAtual)

    const animesDaProximaTemporada = await obterConteudo('https://api.jikan.moe/v4/seasons/upcoming?sfw')
    criarCards('animes-proxima-temporada', animesDaProximaTemporada)
}

exibirConteudos()