'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'
import { ordenarPorRankCrescente } from '../utils/sort.js'
import { criarHeader } from '../components/header.js'
import { mostrarMaisInformacoesManga } from "../utils/mostrarMaisInformacoes.js"

criarHeader()
iniciarMenu()

function criarCards(data) {
    const mangas = data.sort(ordenarPorRankCrescente)

    const cards = document.getElementById('cards')

    const quantidadeDeCards = cards.children.length

    for (let i = 0; i < mangas.length; i++) {
        const manga = mangas[i]
        const card = document.createElement('div')
        card.className = 'card'
        card.addEventListener('click', () => {
            mostrarMaisInformacoesManga(manga.mal_id)
        })

        const imagem = document.createElement('img')
        imagem.className = 'capa'
        imagem.src = manga.images.jpg.image_url

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
        nota.textContent = manga.score

        const titulo = document.createElement('p')
        titulo.className = 'titulo'
        titulo.textContent = manga.title

        const info = document.createElement('div')
        info.className = 'info'

        const membros = document.createElement('span')
        membros.textContent = manga.members.toLocaleString('pt-BR')

        const membrosText = document.createElement('p')
        membrosText.append('Salvo por ')
        membrosText.append(membros)
        membrosText.append(' pessoas')

        const favoritos = document.createElement('span')
        favoritos.textContent = manga.favorites.toLocaleString('pt-BR')

        const favoritosText = document.createElement('p')
        favoritosText.append(favoritos)
        favoritosText.append(' pessoas favoritaram')

        const publicacao = document.createElement('p')
        const diaInicio = manga.published.prop.from.day
        const mesInicio = manga.published.prop.from.month
        const anoInicio = manga.published.prop.from.year

        const diaFim = manga.published.prop.to.day
        const mesFim = manga.published.prop.to.month
        const anoFim = manga.published.prop.to.year

        if (anoFim)
            publicacao.textContent = `${diaInicio}/${mesInicio}/${anoInicio} - ${diaFim}/${mesFim}/${anoFim}`
        else
            publicacao.textContent = `${diaInicio}/${mesInicio}/${anoInicio} - atualmente`

        score.append(icon, nota)
        rankText.append(rank)
        avaliacao.append(rankText, score)
        info.append(membrosText, favoritosText, publicacao)
        card.append(imagem, avaliacao, titulo, info)

        cards.append(card)
    }
}

async function exibirConteudo(pagina) {
    const botao = document.getElementById('button-more')
    botao.dataset.pagina = pagina

    const data = await obterConteudo(`https://api.jikan.moe/v4/top/manga?limit=10&page=${pagina}`)
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