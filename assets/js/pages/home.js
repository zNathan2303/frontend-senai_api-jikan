'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'
import { criarHeader } from '../components/header.js'
import { mostrarMaisInformacoesAnime } from "../utils/mostrarMaisInformacoes.js"

criarHeader()
iniciarMenu()

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

        card.addEventListener('click', () => {
            mostrarMaisInformacoesAnime(data.data[i].mal_id)
        })
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

