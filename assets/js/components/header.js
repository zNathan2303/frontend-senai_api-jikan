import { mostrarInformacoesAnimeAleatorio, mostrarInformacoesMangaAleatorio } from "../utils/mostrarMaisInformacoes.js"

export function criarHeader() {
    const header = document.querySelector('header')

    const logo = document.createElement('a')
    logo.classList.add('logo')
    logo.href = './index.html'

    const logoImg = document.createElement('img')
    logoImg.src = './assets/img/logo.svg'

    const logoTitulo = document.createElement('span')
    logoTitulo.classList.add('titulo')
    logoTitulo.textContent = 'YourAnimeList'

    logo.append(logoImg)
    logo.append(logoTitulo)
    header.appendChild(logo)

    const menuHamburguer = document.createElement('div')
    menuHamburguer.classList.add('menu-hamburguer')
    menuHamburguer.id = 'menu-hamburguer'

    for (let i = 0; i < 3; i++) {
        const linha = document.createElement('div')
        linha.classList.add('linha')
        menuHamburguer.appendChild(linha)
    }
    header.appendChild(menuHamburguer)

    const menu = document.createElement('menu')

    const categoriaAnimes = document.createElement('div')
    categoriaAnimes.classList.add('categoria')

    const tituloAnimes = document.createElement('p')
    tituloAnimes.classList.add('titulo')
    tituloAnimes.textContent = 'Animes'

    const iconAnimes = document.createElement('img')
    iconAnimes.src = './assets/img/menu-icon.svg'
    iconAnimes.classList.add('icon')

    const subMenuAnimes = document.createElement('div')
    subMenuAnimes.classList.add('sub-menu')

    const linhaAnime = document.createElement('div')
    linhaAnime.classList.add('linha')

    const linkAleatorioAnime = document.createElement('a')
    linkAleatorioAnime.textContent = 'Aleatório'
    linkAleatorioAnime.addEventListener('click', () => {
        mostrarInformacoesAnimeAleatorio()
    })

    const linkMelhoresAnime = document.createElement('a')
    linkMelhoresAnime.href = './melhores-animes.html'
    linkMelhoresAnime.textContent = 'Melhores'

    subMenuAnimes.append(linhaAnime, linkAleatorioAnime, linkMelhoresAnime)
    categoriaAnimes.append(tituloAnimes, iconAnimes, subMenuAnimes)

    const categoriaMangas = document.createElement('div')
    categoriaMangas.classList.add('categoria')

    const tituloMangas = document.createElement('p')
    tituloMangas.classList.add('titulo')
    tituloMangas.textContent = 'Mangás'

    const iconMangas = document.createElement('img')
    iconMangas.src = './assets/img/menu-icon.svg'
    iconMangas.classList.add('icon')

    const subMenuMangas = document.createElement('div')
    subMenuMangas.classList.add('sub-menu')

    const linhaManga = document.createElement('div')
    linhaManga.classList.add('linha')

    const linkAleatorioManga = document.createElement('a')
    linkAleatorioManga.textContent = 'Aleatório'
    linkAleatorioManga.addEventListener('click', () => {
        mostrarInformacoesMangaAleatorio()
    })

    const linkMelhoresManga = document.createElement('a')
    linkMelhoresManga.href = './melhores-mangas.html'
    linkMelhoresManga.textContent = 'Melhores'

    subMenuMangas.append(linhaManga, linkAleatorioManga, linkMelhoresManga)
    categoriaMangas.append(tituloMangas, iconMangas, subMenuMangas)

    menu.append(categoriaAnimes, categoriaMangas)
    header.appendChild(menu)

}