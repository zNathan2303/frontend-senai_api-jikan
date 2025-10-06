'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'
import { criarHeader } from '../components/header.js'

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
    tituloManga.textContent = manga.title

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
    nota.textContent = manga.score

    notaContainer.append(notaText, nota)

    const votosText = document.createElement('p')
    const votos = document.createElement('span')
    votos.textContent = manga.scored_by.toLocaleString('pt-BR')
    votosText.append(votos, ' votos')

    const rankText = document.createElement('p')
    const rank = document.createElement('span')
    rank.textContent = '#' + manga.rank
    rankText.append('Rank ', rank)

    const popularidadeText = document.createElement('p')
    const popularidade = document.createElement('span')
    popularidade.textContent = '#' + manga.popularity
    popularidadeText.append('Popularidade ', popularidade)

    const membrosText = document.createElement('p')
    const membros = document.createElement('span')
    membros.textContent = manga.members.toLocaleString('pt-BR')
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
    tituloIngles.textContent = manga.title_english
    tituloInglesText.append('Inglês: ', tituloIngles)

    const tituloJaponesText = document.createElement('p')
    const tituloJapones = document.createElement('span')
    tituloJapones.textContent = manga.title_japanese
    tituloJaponesText.append('Japonês: ', tituloJapones)

    titulosContainer.append(titulos, tituloInglesText, tituloJaponesText)

    const informacoesContainer = document.createElement('div')
    informacoesContainer.className = 'informacoes'

    const informacoes = document.createElement('h2')
    informacoes.textContent = 'Informações'

    const tipoText = document.createElement('p')
    const tipo = document.createElement('span')
    tipo.textContent = manga.type
    tipoText.append('Tipo: ', tipo)

    const capitulosText = document.createElement('p')
    const capitulos = document.createElement('span')
    if (manga.chapters)
        capitulos.textContent = manga.chapters
    else
        capitulos.textContent = 'Em lançamento'
    capitulosText.append('Capítulos: ', capitulos)

    const volumesText = document.createElement('p')
    const volumes = document.createElement('span')
    if (manga.volumes)
        volumes.textContent = manga.volumes
    else
        volumes.textContent = 'Em lançamento'

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
            publicacao.textContent = `${diaInicio}/${mesInicio}/${anoInicio} até ${diaFim}/${mesFim}/${anoFim}`
        } else {
            publicacao.textContent = `${diaInicio}/${mesInicio}/${anoInicio} até o momento`
        }
    } else {
        publicacao.textContent = `Não iniciada`
    }

    publicacaoText.append('Publicação: ', publicacao)

    const generosText = document.createElement('p')
    const generos = document.createElement('span')
    generos.textContent = manga.genres.map(g => g.name).join(', ')
    generosText.append('Gêneros: ', generos)

    const temasText = document.createElement('p')
    const temas = document.createElement('span')
    temas.textContent = manga.themes.map(t => t.name).join(', ')
    temasText.append('Temas: ', temas)

    const publicoAlvoText = document.createElement('p')
    const publicoAlvo = document.createElement('span')
    publicoAlvo.textContent = manga.demographics.map(p => p.name).join(', ')
    publicoAlvoText.append('Público-alvo: ', publicoAlvo)

    const autoresText = document.createElement('p')
    const autores = document.createElement('span')
    autores.textContent = manga.authors.map(autor => autor.name).join(' | ')
    autoresText.append('Autores: ', autores)

    const linkMyAnimeList = document.createElement('a')
    linkMyAnimeList.textContent = 'MyAnimeList'
    linkMyAnimeList.href = manga.url

    informacoesContainer.append(informacoes, tipoText, capitulosText, volumesText, statusText,
        publicacaoText, generosText, temasText, publicoAlvoText, autoresText, linkMyAnimeList)

    const sinopseContainer = document.createElement('div')
    sinopseContainer.className = 'sinopse'

    const sinopse = document.createElement('h2')
    sinopse.textContent = 'Sinopse'

    const sinopseContent = document.createElement('p')
    sinopseContent.textContent = manga.synopsis

    sinopseContainer.append(sinopse, sinopseContent)

    const informacoesAdicionaisContainer = document.createElement('div')
    informacoesAdicionaisContainer.className = 'informacoes-adicionais'

    const informacoesAdicionais = document.createElement('h2')
    informacoesAdicionais.textContent = 'Informações adicionais'

    const informacoesAdicionaisContent = document.createElement('p')
    informacoesAdicionaisContent.textContent = manga.background

    informacoesAdicionaisContainer.append(informacoesAdicionais, informacoesAdicionaisContent)

    const linhaDivisoriaContainer = document.createElement('div')
    linhaDivisoriaContainer.className = 'linha-divisoria-container'

    container.append(capa, linhaDivisoriaContainer, popularidadeContainer, titulosContainer, informacoesContainer, sinopseContainer, informacoesAdicionaisContainer)
}

async function exibirConteudo(id) {
    const data = await obterConteudo(`https://api.jikan.moe/v4/manga/${id}/full`)
    criarManga(data.data)
}

exibirConteudo(2)