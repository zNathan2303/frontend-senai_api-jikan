'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'
import { criarHeader } from '../components/header.js'
import { formatarDataParaPadraoBrasileiro } from '../utils/formatoData.js'

criarHeader()
iniciarMenu()

function criarAnime(anime) {

    const statusTraducao = {
        "Currently Airing": "Em exibição",
        "Finished Airing": "Finalizado",
        "Not yet aired": "Ainda não exibido",
        "On Hiatus": "Em hiato",
        "Cancelled": "Cancelado"
    }

    const tituloAnime = document.getElementById('anime-titulo')
    if (anime.title)
        tituloAnime.textContent = anime.title
    else
        tituloAnime.textContent = 'Título indisponível'

    const container = document.getElementById('container')

    const capa = document.createElement('img')
    capa.src = anime.images.jpg.image_url

    const popularidadeContainer = document.createElement('div')
    popularidadeContainer.className = 'popularidade'

    const notaContainer = document.createElement('div')
    notaContainer.className = 'nota'

    const notaText = document.createElement('p')
    notaText.textContent = 'Nota'

    const nota = document.createElement('p')
    if (anime.score)
        nota.textContent = anime.score.toFixed(2)
    else
        nota.textContent = '???'

    notaContainer.append(notaText, nota)

    const votosText = document.createElement('p')
    const votos = document.createElement('span')
    if (anime.scored_by)
        votos.textContent = anime.scored_by.toLocaleString('pt-BR')
    else
        votos.textContent = '???'

    votosText.append(votos, ' votos')

    const rankText = document.createElement('p')
    const rank = document.createElement('span')
    if (anime.rank)
        rank.textContent = '#' + anime.rank
    else
        rank.textContent = '???'
    rankText.append('Rank ', rank)

    const popularidadeText = document.createElement('p')
    const popularidade = document.createElement('span')
    if (anime.popularity)
        popularidade.textContent = '#' + anime.popularity
    else
        popularidade.textContent = '???'
    popularidadeText.append('Popularidade ', popularidade)

    const membrosText = document.createElement('p')
    const membros = document.createElement('span')
    if (anime.members)
        membros.textContent = anime.members.toLocaleString('pt-BR')
    else
        membros.textContent = '???'
    membrosText.append(membros, ' membros')

    const linhaDivisoriaPopularidade = document.createElement('div')
    linhaDivisoriaPopularidade.className = 'linha-divisoria-popularidade'

    popularidadeContainer.append(notaContainer, votosText, linhaDivisoriaPopularidade, rankText, popularidadeText, membrosText)

    const titulosContainer = document.createElement('div')
    titulosContainer.className = 'titulos'

    const titulos = document.createElement('h2')
    titulos.textContent = 'Títulos alternativos'

    const tituloInglesText = document.createElement('p')
    const tituloIngles = document.createElement('span')
    if (anime.title_english)
        tituloIngles.textContent = anime.title_english
    else
        tituloIngles.textContent = 'Desconhecido'
    tituloInglesText.append('Inglês: ', tituloIngles)

    const tituloJaponesText = document.createElement('p')
    const tituloJapones = document.createElement('span')
    if (anime.title_japanese)
        tituloJapones.textContent = anime.title_japanese
    else
        tituloJapones.textContent = 'Desconhecido'
    tituloJaponesText.append('Japonês: ', tituloJapones)

    titulosContainer.append(titulos, tituloInglesText, tituloJaponesText)

    const informacoesContainer = document.createElement('div')
    informacoesContainer.className = 'informacoes'

    const informacoes = document.createElement('h2')
    informacoes.textContent = 'Informações'

    const tipoText = document.createElement('p')
    const tipo = document.createElement('span')
    if (anime.type)
        tipo.textContent = anime.type
    else
        tipo.textContent = 'Desconhecido'
    tipoText.append('Tipo: ', tipo)

    const fonteText = document.createElement('p')
    const fonte = document.createElement('span')
    if (anime.source)
        fonte.textContent = anime.source
    else
        fonte.textContent = 'Desconhecido'
    fonteText.append('Fonte: ', fonte)

    const episodiosText = document.createElement('p')
    const episodios = document.createElement('span')
    if (anime.episodes)
        episodios.textContent = anime.episodes
    else
        episodios.textContent = 'Desconhecido'
    episodiosText.append('Episódios: ', episodios)

    const duracaoText = document.createElement('p')
    const duracao = document.createElement('span')
    if (anime.duration == 'Unknown')
        duracao.textContent = 'Desconhecido'
    else if (anime.duration)
        duracao.textContent = anime.duration
    else
        duracao.textContent = 'Desconhecido'
    duracaoText.append('Duração: ', duracao)

    const statusText = document.createElement('p')
    const status = document.createElement('span')
    status.textContent = statusTraducao[anime.status] || anime.status
    statusText.append('Status: ', status)

    const lancamentoText = document.createElement('p')
    const lancamento = document.createElement('span')

    const anoInicio = anime.aired.prop.from.year
    if (anoInicio) {
        const diaInicio = anime.aired.prop.from.day
        const mesInicio = anime.aired.prop.from.month

        const anoFim = anime.aired.prop.to.year
        if (anoFim) {
            const diaFim = anime.aired.prop.to.day
            const mesFim = anime.aired.prop.to.month
            lancamento.textContent =
                `${formatarDataParaPadraoBrasileiro(diaInicio, mesInicio, anoInicio)} até 
                ${formatarDataParaPadraoBrasileiro(diaFim, mesFim, anoFim)}`
        } else {
            lancamento.textContent = formatarDataParaPadraoBrasileiro(diaInicio, mesInicio, anoInicio)
        }
    } else {
        lancamento.textContent = `Desconhecido`
    }

    lancamentoText.append('Lançamento: ', lancamento)

    const generosText = document.createElement('p')
    const generos = document.createElement('span')
    if (anime.genres && anime.genres.length)
        generos.textContent = anime.genres.map(g => g.name).join(', ')
    else
        generos.textContent = 'Desconhecido'
    generosText.append('Gêneros: ', generos)

    const temasText = document.createElement('p')
    const temas = document.createElement('span')
    if (anime.themes && anime.themes.length)
        temas.textContent = anime.themes.map(t => t.name).join(', ')
    else
        temas.textContent = 'Desconhecido'
    temasText.append('Temas: ', temas)

    const publicoAlvoText = document.createElement('p')
    const publicoAlvo = document.createElement('span')
    if (anime.demographics && anime.demographics.length)
        publicoAlvo.textContent = anime.demographics.map(p => p.name).join(', ')
    else
        publicoAlvo.textContent = 'Desconhecido'
    publicoAlvoText.append('Público-alvo: ', publicoAlvo)

    const estudioText = document.createElement('p')
    const estudio = document.createElement('span')
    if (anime.studios && anime.studios.length)
        estudio.textContent = anime.studios.map(e => e.name).join(' | ')
    else
        estudio.textContent = 'Desconhecido'
    estudioText.append('Estúdio: ', estudio)

    const linkMyAnimeList = document.createElement('a')
    if (anime.url) {
        linkMyAnimeList.textContent = 'MyAnimeList'
        linkMyAnimeList.href = anime.url
    }

    informacoesContainer.append(informacoes, tipoText, fonteText, episodiosText, duracaoText, statusText,
        lancamentoText, generosText, temasText, publicoAlvoText, estudioText, linkMyAnimeList)

    const sinopseContainer = document.createElement('div')
    sinopseContainer.className = 'sinopse'

    const sinopse = document.createElement('h2')
    sinopse.textContent = 'Sinopse'

    const sinopseContent = document.createElement('p')
    if (anime.synopsis)
        sinopseContent.textContent = anime.synopsis
    else
        sinopseContent.textContent = 'Não fornecido.'

    sinopseContainer.append(sinopse, sinopseContent)

    const informacoesAdicionaisContainer = document.createElement('div')
    informacoesAdicionaisContainer.className = 'informacoes-adicionais'

    const informacoesAdicionais = document.createElement('h2')
    informacoesAdicionais.textContent = 'Informações adicionais'

    const informacoesAdicionaisContent = document.createElement('p')
    if (anime.background)
        informacoesAdicionaisContent.textContent = anime.background
    else
        informacoesAdicionaisContent.textContent = 'Não fornecido.'

    informacoesAdicionaisContainer.append(informacoesAdicionais, informacoesAdicionaisContent)

    const linhaDivisoriaContainer = document.createElement('div')
    linhaDivisoriaContainer.className = 'linha-divisoria-container'

    container.append(capa, linhaDivisoriaContainer, popularidadeContainer, titulosContainer, informacoesContainer, sinopseContainer, informacoesAdicionaisContainer)
}

async function exibirConteudo(id) {
    const data = await obterConteudo(`https://api.jikan.moe/v4/anime/${id}/full`)
    criarAnime(data.data)
}

exibirConteudo(sessionStorage.getItem('animeId'))