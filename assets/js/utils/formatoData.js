'use strict'

export function formatarDataParaPadraoBrasileiro(dia, mes, ano) {
    const d = String(dia).padStart(2, '0')
    const m = String(mes).padStart(2, '0')
    return `${d}/${m}/${ano}`
}