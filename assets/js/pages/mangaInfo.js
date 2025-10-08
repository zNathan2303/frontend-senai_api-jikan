'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'
import { criarHeader } from '../components/header.js'
import { formatarDataParaPadraoBrasileiro } from '../utils/formatoData.js'

criarHeader()
iniciarMenu()

const traducaoStatus = {
    "Finished": "Finalizado",
    "Publishing": "Em publicação",
    "On Hiatus": "Em hiato",
    "Discontinued": "Descontinuado",
    "Not yet published": "Ainda não publicado"
}

function criarManga(manga) {
    const tituloManga = document.getElementById('manga-titulo')
    if (manga.title)
        tituloManga.textContent = manga.title
    else
        tituloManga.textContent = 'Título indisponível'

    const container = document.getElementById('container')

    const capa = document.createElement('img')
    capa.src = manga.images.jpg.image_url

    const popularidadeContainer = document.createElement('div')
    popularidadeContainer.className = 'popularidade'

    const notaContainer = document.createElement('div')
    notaContainer.className = 'nota'

    const notaText = document.createElement('p')
    notaText.textContent = 'Nota'

    const nota = document.createElement('p')
    if (manga.score)
        nota.textContent = manga.score.toFixed(2)
    else
        nota.textContent = '???'

    notaContainer.append(notaText, nota)

    const votosText = document.createElement('p')
    const votos = document.createElement('span')
    if (manga.scored_by)
        votos.textContent = manga.scored_by.toLocaleString('pt-BR')
    else
        votos.textContent = '???'
    votosText.append(votos, ' votos')

    const rankText = document.createElement('p')
    const rank = document.createElement('span')
    if (manga.rank)
        rank.textContent = '#' + manga.rank
    else
        rank.textContent = '???'
    rankText.append('Rank ', rank)

    const popularidadeText = document.createElement('p')
    const popularidade = document.createElement('span')
    if (manga.popularity)
        popularidade.textContent = '#' + manga.popularity
    else
        popularidade.textContent = '???'
    popularidadeText.append('Popularidade ', popularidade)

    const membrosText = document.createElement('p')
    const membros = document.createElement('span')
    if (manga.members)
        membros.textContent = manga.members.toLocaleString('pt-BR')
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
    if (manga.title_english)
        tituloIngles.textContent = manga.title_english
    else
        tituloIngles.textContent = 'Desconhecido'
    tituloInglesText.append('Inglês: ', tituloIngles)

    const tituloJaponesText = document.createElement('p')
    const tituloJapones = document.createElement('span')
    if (manga.title_japanese)
        tituloJapones.textContent = manga.title_japanese
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
    if (manga.type)
        tipo.textContent = manga.type
    else
        tipo.textContent = 'Desconhecido'
    tipoText.append('Tipo: ', tipo)

    const capitulosText = document.createElement('p')
    const capitulos = document.createElement('span')
    if (manga.chapters) {
        capitulos.textContent = manga.chapters
    } else {
        capitulos.textContent = 'Em lançamento'
        if (manga.status == 'Finished')
            capitulos.textContent = 'Desconhecido'
    }
    capitulosText.append('Capítulos: ', capitulos)

    const volumesText = document.createElement('p')
    const volumes = document.createElement('span')
    if (manga.volumes) {
        volumes.textContent = manga.volumes
    } else {
        volumes.textContent = 'Em lançamento'
        if (manga.status == 'Finished')
            volumes.textContent = 'Desconhecido'
    }
    volumesText.append('Volumes: ', volumes)

    const statusText = document.createElement('p')
    const status = document.createElement('span')
    status.textContent = traducaoStatus[manga.status] || manga.status
    statusText.append('Status: ', status)

    const publicacaoText = document.createElement('p')
    const publicacao = document.createElement('span')

    const anoInicio = manga.published.prop.from.year
    if (anoInicio) {
        const diaInicio = manga.published.prop.from.day
        const mesInicio = manga.published.prop.from.month

        const anoFim = manga.published.prop.to.year
        if (anoFim) {
            const diaFim = manga.published.prop.to.day
            const mesFim = manga.published.prop.to.month
            publicacao.textContent =
                `${formatarDataParaPadraoBrasileiro(diaInicio, mesInicio, anoInicio)} até 
                ${formatarDataParaPadraoBrasileiro(diaFim, mesFim, anoFim)}`
        } else {
            publicacao.textContent = `${formatarDataParaPadraoBrasileiro(diaInicio, mesInicio, anoInicio)} até o momento`
            if (manga.status == 'Finished')
                publicacao.textContent = formatarDataParaPadraoBrasileiro(diaInicio, mesInicio, anoInicio)
        }
    } else {
        publicacao.textContent = `Não iniciada`
    }


    publicacaoText.append('Publicação: ', publicacao)

    const generosText = document.createElement('p')
    const generos = document.createElement('span')
    if (manga.genres && manga.genres.length)
        generos.textContent = manga.genres.map(g => g.name).join(', ')
    else
        generos.textContent = 'Desconhecido'
    generosText.append('Gêneros: ', generos)

    const temasText = document.createElement('p')
    const temas = document.createElement('span')
    if (manga.themes && manga.themes.length)
        temas.textContent = manga.themes.map(t => t.name).join(', ')
    else
        temas.textContent = 'Desconhecido'
    temasText.append('Temas: ', temas)

    const publicoAlvoText = document.createElement('p')
    const publicoAlvo = document.createElement('span')
    if (manga.demographics && manga.demographics.length)
        publicoAlvo.textContent = manga.demographics.map(p => p.name).join(', ')
    else
        publicoAlvo.textContent = 'Desconhecido'
    publicoAlvoText.append('Público-alvo: ', publicoAlvo)

    const autoresText = document.createElement('p')
    const autores = document.createElement('span')
    if (manga.authors && manga.authors.length)
        autores.textContent = manga.authors.map(autor => autor.name).join(' | ')
    else
        autores.textContent = 'Desconhecido'
    autoresText.append('Autores: ', autores)

    const linkMyAnimeList = document.createElement('a')
    if (manga.url) {
        linkMyAnimeList.textContent = 'MyAnimeList'
        linkMyAnimeList.href = manga.url
    }

    informacoesContainer.append(informacoes, tipoText, capitulosText, volumesText, statusText,
        publicacaoText, generosText, temasText, publicoAlvoText, autoresText, linkMyAnimeList)

    const sinopseContainer = document.createElement('div')
    sinopseContainer.className = 'sinopse'

    const sinopse = document.createElement('h2')
    sinopse.textContent = 'Sinopse'

    const sinopseContent = document.createElement('p')
    if (manga.synopsis)
        sinopseContent.textContent = manga.synopsis
    else
        sinopseContent.textContent = 'Não fornecido.'

    sinopseContainer.append(sinopse, sinopseContent)

    const informacoesAdicionaisContainer = document.createElement('div')
    informacoesAdicionaisContainer.className = 'informacoes-adicionais'

    const informacoesAdicionais = document.createElement('h2')
    informacoesAdicionais.textContent = 'Informações adicionais'

    const informacoesAdicionaisContent = document.createElement('p')
    if (manga.background)
        informacoesAdicionaisContent.textContent = manga.background
    else
        informacoesAdicionaisContent.textContent = 'Não fornecido.'

    informacoesAdicionaisContainer.append(informacoesAdicionais, informacoesAdicionaisContent)

    const linhaDivisoriaContainer = document.createElement('div')
    linhaDivisoriaContainer.className = 'linha-divisoria-container'

    container.append(capa, linhaDivisoriaContainer, popularidadeContainer, titulosContainer, informacoesContainer, sinopseContainer, informacoesAdicionaisContainer)
}

async function exibirConteudo(id) {
    const data = await obterConteudo(`https://api.jikan.moe/v4/manga/${id}/full`)
    criarManga(data.data)
}

exibirConteudo(sessionStorage.getItem('mangaId'))