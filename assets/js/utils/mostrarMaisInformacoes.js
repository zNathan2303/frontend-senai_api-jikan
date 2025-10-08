'use strict'

import { obterConteudo } from "./fetchData.js"

export function mostrarMaisInformacoesAnime(id) {
    sessionStorage.setItem('animeId', id)
    window.location.href = 'anime-info.html'
}

export function mostrarMaisInformacoesManga(id) {
    sessionStorage.setItem('mangaId', id)
    window.location.href = 'manga-info.html'
}

export async function mostrarInformacoesAnimeAleatorio() {
    const animeAleatorio = await obterConteudo('https://api.jikan.moe/v4/random/anime?sfw')
    const tipo = animeAleatorio.data.type
    if (tipo == 'Music' || tipo == 'CM' || tipo == 'PV') {
        mostrarInformacoesAnimeAleatorio()
    } else {
        sessionStorage.setItem('animeId', parseInt(animeAleatorio.data.mal_id))
        window.location.href = 'anime-info.html'
    }
}

export async function mostrarInformacoesMangaAleatorio() {
    const mangaAleatorio = await obterConteudo('https://api.jikan.moe/v4/random/manga?sfw')
    sessionStorage.setItem('mangaId', parseInt(mangaAleatorio.data.mal_id))
    window.location.href = 'manga-info.html'
}