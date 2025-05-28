export function maskNumber(value: number) {
    if (!value || typeof value !== "number") return 0

    const numeroString = value.toString();

    // Separa a parte inteira da parte decimal (se houver)
    const partes = numeroString.split('.');
    const parteInteira = partes[0];
    const parteDecimal = partes.length > 1 ? '.' + partes[1] : '';

    // Adiciona os pontos como separadores de milhar na parte inteira
    const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Junta a parte inteira formatada com a parte decimal (se houver)
    return parteInteiraFormatada + parteDecimal;
}