'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'
import { ordenarPorRankCrescente } from '../utils/sort.js'

iniciarMenu()

async function criarCards(data) {
    const mangas = data.sort(ordenarPorRankCrescente)

    const cards = document.getElementById('cards')

    mangas.forEach(manga => {
        const card = document.createElement('div')
        card.className = 'card'

        const imagem = document.createElement('img')
        imagem.className = 'capa'
        imagem.src = manga.images.jpg.image_url

        const avaliacao = document.createElement('div')
        avaliacao.className = 'avaliacao'

        const rankText = document.createElement('p')
        rankText.className = 'rank'
        rankText.textContent = 'Rank '

        const rank = document.createElement('span')
        rank.textContent = '#' + manga.rank

        const score = document.createElement('div')
        score.className = 'score'

        const icon = document.createElement('img')
        icon.className = 'icon'
        icon.src = './assets/img/score-icon.svg'

        const nota = document.createElement('p')
        nota.className = 'nota'
        nota.textContent = manga.score

        const titulo = document.createElement('p')
        titulo.className = 'titulo'
        titulo.textContent = manga.title

        score.append(icon, nota)
        rankText.append(rank)
        avaliacao.append(rankText, score)
        card.append(imagem, avaliacao, titulo)

        cards.append(card)
    })
}

async function exibirConteudo(pagina) {
    const data = await obterConteudo(`https://api.jikan.moe/v4/top/manga?limit=10&page=${pagina}`)
    criarCards(data.data)

    const botao = document.getElementById('button-more')

    botao.dataset.pagina = pagina

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