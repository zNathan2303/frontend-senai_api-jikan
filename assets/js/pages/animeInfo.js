'use strict'

import { iniciarMenu } from '../components/menu.js'
import { obterConteudo } from '../utils/fetchData.js'

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
    tituloAnime.textContent = anime.title

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
    nota.textContent = anime.score

    notaContainer.append(notaText, nota)

    const votosText = document.createElement('p')
    const votos = document.createElement('span')
    votos.textContent = anime.scored_by.toLocaleString('pt-BR')
    votosText.append(votos, ' votos')

    const rankText = document.createElement('p')
    const rank = document.createElement('span')
    rank.textContent = '#' + anime.rank
    rankText.append('Rank ', rank)

    const popularidadeText = document.createElement('p')
    const popularidade = document.createElement('span')
    popularidade.textContent = '#' + anime.popularity
    popularidadeText.append('Popularidade ', popularidade)

    const membrosText = document.createElement('p')
    const membros = document.createElement('span')
    membros.textContent = anime.members.toLocaleString('pt-BR')
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
    tituloIngles.textContent = anime.title_english
    tituloInglesText.append('Inglês: ', tituloIngles)

    const tituloJaponesText = document.createElement('p')
    const tituloJapones = document.createElement('span')
    tituloJapones.textContent = anime.title_japanese
    tituloJaponesText.append('Japonês: ', tituloJapones)

    titulosContainer.append(titulos, tituloInglesText, tituloJaponesText)

    const informacoesContainer = document.createElement('div')
    informacoesContainer.className = 'informacoes'

    const informacoes = document.createElement('h2')
    informacoes.textContent = 'Informações'

    const tipoText = document.createElement('p')
    const tipo = document.createElement('span')
    tipo.textContent = anime.type
    tipoText.append('Tipo: ', tipo)

    const fonteText = document.createElement('p')
    const fonte = document.createElement('span')
    fonte.textContent = anime.source
    fonteText.append('Fonte: ', fonte)

    const episodiosText = document.createElement('p')
    const episodios = document.createElement('span')
    episodios.textContent = anime.episodes
    episodiosText.append('Episódios: ', episodios)

    const duracaoText = document.createElement('p')
    const duracao = document.createElement('span')
    duracao.textContent = anime.duration
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
            lancamento.textContent = `${diaInicio}/${mesInicio}/${anoInicio} até ${diaFim}/${mesFim}/${anoFim}`
        } else {
            lancamento.textContent = `${diaInicio}/${mesInicio}/${anoInicio} até o momento`
        }
    } else {
        lancamento.textContent = `Não iniciado`
    }

    lancamentoText.append('Lançamento: ', lancamento)

    const generosText = document.createElement('p')
    const generos = document.createElement('span')
    generos.textContent = anime.genres.map(g => g.name).join(', ')
    generosText.append('Gêneros: ', generos)

    const temasText = document.createElement('p')
    const temas = document.createElement('span')
    temas.textContent = anime.themes.map(t => t.name).join(', ')
    temasText.append('Temas: ', temas)

    const publicoAlvoText = document.createElement('p')
    const publicoAlvo = document.createElement('span')
    publicoAlvo.textContent = anime.demographics.map(p => p.name).join(', ')
    publicoAlvoText.append('Público-alvo: ', publicoAlvo)

    const estudioText = document.createElement('p')
    const estudio = document.createElement('span')
    estudio.textContent = anime.studios.map(e => e.name).join(' | ')
    estudioText.append('Estúdio: ', estudio)

    const linkMyAnimeList = document.createElement('a')
    linkMyAnimeList.textContent = 'MyAnimeList'
    linkMyAnimeList.href = anime.url

    informacoesContainer.append(informacoes, tipoText, fonteText, episodiosText, duracaoText, statusText,
        lancamentoText, generosText, temasText, publicoAlvoText, estudioText, linkMyAnimeList)

    const sinopseContainer = document.createElement('div')
    sinopseContainer.className = 'sinopse'

    const sinopse = document.createElement('h2')
    sinopse.textContent = 'Sinopse'

    const sinopseContent = document.createElement('p')
    sinopseContent.textContent = anime.synopsis

    sinopseContainer.append(sinopse, sinopseContent)

    const informacoesAdicionaisContainer = document.createElement('div')
    informacoesAdicionaisContainer.className = 'informacoes-adicionais'

    const informacoesAdicionais = document.createElement('h2')
    informacoesAdicionais.textContent = 'Informações adicionais'

    const informacoesAdicionaisContent = document.createElement('p')
    informacoesAdicionaisContent.textContent = anime.background

    informacoesAdicionaisContainer.append(informacoesAdicionais, informacoesAdicionaisContent)

    const linhaDivisoriaContainer = document.createElement('div')
    linhaDivisoriaContainer.className = 'linha-divisoria-container'

    container.append(capa, linhaDivisoriaContainer, popularidadeContainer, titulosContainer, informacoesContainer, sinopseContainer, informacoesAdicionaisContainer)
}

async function exibirConteudo(id) {
    const data = await obterConteudo(`https://api.jikan.moe/v4/anime/${id}/full`)
    criarAnime(data.data)
}

exibirConteudo(52991)