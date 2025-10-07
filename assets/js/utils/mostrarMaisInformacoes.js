'use strict'

export function mostrarMaisInformacoesAnime(id) {
    sessionStorage.setItem('animeId', id)
    window.location.href = 'anime-info.html'
}

export function mostrarMaisInformacoesManga(id) {
    sessionStorage.setItem('mangaId', id)
    window.location.href = 'manga-info.html'
}