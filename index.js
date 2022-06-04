import fs from 'fs';
import axios from 'axios';
import pdfKit from 'pdfkit';

const pdf = new pdfKit;

async function buscarEstados() {
  let texto = ' Estados Brasileiros \n\n';
  const { data: estados } = await axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  estados.forEach(estado => {
    texto += estado.nome + ' (' + estado.sigla + ') - ';
    texto += estado.regiao.nome + ' \n\n ';
  });
  escrever(texto);
}

function escrever(texto) {
  pdf.fontSize('13').text(texto, { align: 'center'});
  pdf.pipe(fs.createWriteStream('arquivo.pdf'));
  pdf.end();
}

buscarEstados();