'use strict'

document.getElementById('menu-hamburguer').addEventListener('click', () => {
    document.getElementById('menu-hamburguer').classList.toggle('ativo')
    document.querySelector('menu').classList.toggle('ativo')
})

async function obterConteudo(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data.data
}

async function criarCards(secao, dados) {
    const section = document.getElementById(secao)

    const cards = document.createElement('div')
    cards.className = 'cards'

    for (let i = 0; i < dados.length; i++) {
        const card = document.createElement('div')
        const imagem = document.createElement('img')
        const titulo = document.createElement('p')

        card.className = 'card'
        imagem.src = dados[i].images.jpg.image_url
        titulo.textContent = dados[i].title

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