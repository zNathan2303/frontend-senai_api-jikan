'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'
import { ordenarPorRankCrescente } from '../utils/sort.js'
import { criarHeader } from '../components/header.js'
import { mostrarMaisInformacoesAnime } from "../utils/mostrarMaisInformacoes.js"

criarHeader()
iniciarMenu()

function criarCards(data) {
    const animes = data.sort(ordenarPorRankCrescente)

    const cards = document.getElementById('cards')

    const temporadas = {
        winter: "Inverno",
        spring: "Primavera",
        summer: "Verão",
        fall: "Outono"
    }

    const quantidadeDeCards = cards.children.length

    for (let i = 0; i < animes.length; i++) {
        const anime = animes[i]
        const card = document.createElement('div')
        card.className = 'card'
        card.addEventListener('click', () => {
            mostrarMaisInformacoesAnime(anime.mal_id)
        })

        const imagem = document.createElement('img')
        imagem.className = 'capa'
        imagem.src = anime.images.jpg.image_url

        const avaliacao = document.createElement('div')
        avaliacao.className = 'avaliacao'

        const rankText = document.createElement('p')
        rankText.className = 'rank'
        rankText.textContent = 'Rank '

        const rank = document.createElement('span')
        if (quantidadeDeCards)
            rank.textContent = '#' + (quantidadeDeCards + i + 1)
        else
            rank.textContent = '#' + (i + 1)

        const score = document.createElement('div')
        score.className = 'score'

        const icon = document.createElement('img')
        icon.className = 'icon'
        icon.src = './assets/img/score-icon.svg'

        const nota = document.createElement('p')
        nota.className = 'nota'
        nota.textContent = anime.score

        const titulo = document.createElement('p')
        titulo.className = 'titulo'
        titulo.textContent = anime.title

        const info = document.createElement('div')
        info.className = 'info'

        const membros = document.createElement('span')
        membros.textContent = anime.members.toLocaleString('pt-BR')

        const membrosText = document.createElement('p')
        membrosText.append('Salvo por ')
        membrosText.append(membros)
        membrosText.append(' pessoas')

        const favoritos = document.createElement('span')
        favoritos.textContent = anime.favorites.toLocaleString('pt-BR')

        const favoritosText = document.createElement('p')
        favoritosText.append(favoritos)
        favoritosText.append(' pessoas favoritaram')

        const lancamento = document.createElement('p')

        if (anime.year)
            lancamento.textContent = `Lançamento: ${temporadas[anime.season]} de ${anime.year}`
        else
            lancamento.textContent = `Lançamento: Indisponível`

        score.append(icon, nota)
        rankText.append(rank)
        avaliacao.append(rankText, score)
        info.append(membrosText, favoritosText, lancamento)
        card.append(imagem, avaliacao, titulo, info)

        cards.append(card)
    }
}

async function exibirConteudo(pagina) {
    const botao = document.getElementById('button-more')
    botao.dataset.pagina = pagina

    const data = await obterConteudo(`https://api.jikan.moe/v4/top/anime?sfw&limit=10&page=${pagina}`)
    criarCards(data.data)

    if (data.pagination.has_next_page)
        botao.classList.add('habilitado')
    else
        botao.classList.remove('habilitado')
}

document.getElementById('button-more').addEventListener('click', () => {
    if (document.getElementById('button-more').classList.contains('habilitado')) {
        const paginaAtual = parseInt(document.getElementById('button-more').dataset.pagina)
        exibirConteudo(paginaAtual + 1)
    }
})

exibirConteudo(1)