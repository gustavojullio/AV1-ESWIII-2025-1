// features/step_definitions/contadorSteps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const assert = require('assert');

let browser;
let page;

// Configuração compartilhada
Given('que estou na página do contador', {timeout: 10000}, async () => {
  browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox'],
    slowMo: 50 // Ajuda a visualizar
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForSelector('#counter-value');
});

// Steps do primeiro cenário
When('eu vejo o contador com valor {string}', async (valor) => {
  const currentValue = await page.$eval('#counter-value', el => el.textContent);
  assert.strictEqual(currentValue, valor);
});

When('eu clico no botão {string}', async (btnText) => {
  const buttonSelector = btnText === 'Clique aqui' ? '#increment-btn' : '#reset-btn';
  await page.click(buttonSelector);
  await new Promise(resolve => setTimeout(resolve, 300)); // Substitui waitForTimeout
});

Then('o contador mostra o valor {string}', async (valorEsperado) => {
  const valorAtual = await page.$eval('#counter-value', el => el.textContent);
  assert.strictEqual(valorAtual, valorEsperado);
  await browser.close();
});

// Steps específicos para o segundo cenário
Given('que o contador já está com valor {string}', async (valorDesejado) => {
  // Clica 3 vezes para chegar no valor desejado
  if (valorDesejado === '3') {
    for (let i = 0; i < 3; i++) {
      await page.click('#increment-btn');
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  const valorAtual = await page.$eval('#counter-value', el => el.textContent);
  assert.strictEqual(valorAtual, valorDesejado);
});