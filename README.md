## 🟦 PowerSpot — Front-End

Front-end desenvolvido em React, responsável por toda a interface do usuário, exibição de pontos de energia (PowerSpots), autenticação via JWT e integração com Google Maps (API JavaScript nativa).

📌 Índice

Sobre o Projeto

Tecnologias

Estrutura de Pastas

Componentes

Autenticação com JWT

Rotas Protegidas

Google Maps

Como Rodar o Projeto

Variáveis de Ambiente

Scripts Disponíveis

🚀 Sobre o Projeto

O PowerSpot é uma aplicação web que permite visualizar pontos de energia distribuídos pelo mapa, acessar detalhes, criar conta, fazer login e interagir com o sistema.
Este repositório contém apenas o Front-end, construído com foco em modularidade, reusabilidade e organização.

⚠️ Atenção: O projeto ainda está em desenvolvimento. Futuramente ele será hospedado em um site de produção, mas atualmente roda apenas localmente para testes e desenvolvimento.

## 🧰 Tecnologias

React + Vite

React Router DOM

JWT (JSON Web Token)

Google Maps JavaScript API (sem React Maps)

CSS modularizado por componente

Fetch API

Context API (estado global de autenticação)

## 📁 Estrutura do Projeto

A estrutura segue o padrão: **cada componente possui sua própria pasta com `.jsx` + `.css`**.

```bash
PowerSpot/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Api/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── Articles/
│   │   ├── Card/
│   │   ├── Contacts/
│   │   ├── Footer/
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   ├── Header/
│   │   │   ├── Header.css
│   │   │   └── Header.jsx
│   │   ├── InfoSection/
│   │   ├── Loading/
│   │   ├── Main/
│   │   │   ├── Main.css
│   │   │   └── Main.jsx
│   │   ├── Map/
│   │   │   ├── ChargerMarker/
│   │   │   │   ├── ChargerMarker.css
│   │   │   │   └── ChargerMarker.jsx
│   │   │   ├── Map.css
│   │   │   └── Map.jsx
│   │   ├── Popup/
│   │   │   ├── PopupLogin/
│   │   │   │   ├── PopupLogin.css
│   │   │   │   └── PopupLogin.jsx
│   │   │   ├── Popup.css
│   │   │   └── Popup.jsx
│   │   └── Register/
│   ├── env/
│   ├── images/
│   ├── App.jsx
│   └── main.jsx
├── styles/
│   ├── blocks/
│   │   ├── page.css
│   │   └── index.css
│   └── vendor/
├── fonts/
│   ├── Outfit-VariableFont...
│   └── fonts.css
├── .editorconfig
├── .env
├── .gitignore
├── .prettierrc
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

```

## 🗺️ Google Maps

Funcionalidades:

Estilização personalizada via styles

Marcadores customizados

Eventos nativos (click, idle, etc.)

Controle total pelo JS puro da API

Exemplo simplificado:

useEffect(() => {
const map = new window.google.maps.Map(mapRef.current, {
zoom: 13,
center: { lat: -23.55, lng: -46.63 },
styles: customMapStyle
});

new window.google.maps.Marker({
position: { lat: -23.55, lng: -46.63 },
map,
icon: "/marker.svg"
});
}, []);

## 🔧 Variáveis de Ambiente

Crie um arquivo .env na raiz contendo:

VITE_API_URL=https://seu-backend.com
VITE_GOOGLE_MAPS_KEY=SUA_GOOGLE_MAPS_API_KEY
