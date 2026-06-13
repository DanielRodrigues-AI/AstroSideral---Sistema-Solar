# AstroSideral — Explorador Interativo do Sistema Solar

O AstroSideral é uma aplicação web interativa que simula o Sistema Solar em tempo real, com órbitas dinâmicas, câmera livre, eventos espaciais e visualização detalhada dos planetas.

O projeto foi convertido para uma arquitetura 100% estática, utilizando apenas HTML, CSS, JavaScript e JSON, sendo totalmente compatível com GitHub Pages sem necessidade de backend.

O sistema executa inteiramente no navegador, com animações baseadas em requestAnimationFrame, manipulação direta do DOM e dados carregados a partir de arquivos JSON locais.

---

## Funcionalidades

O projeto implementa simulação orbital contínua dos planetas com velocidades relativas simplificadas, mantendo uma representação visual do Sistema Solar.

Possui sistema de câmera interativa com movimentação por arraste (pan) e zoom via scroll, permitindo navegação livre pelo espaço.

Inclui controle de tempo do universo, permitindo pausar a simulação ou acelerar sua velocidade em diferentes níveis.

Há geração dinâmica de eventos espaciais como meteoros, cometas e estrelas cadentes, independentes da lógica orbital principal.

O usuário pode interagir com os planetas e o Sol para visualizar um painel de informações detalhadas e uma visualização expandida em formato de “dome” tecnológico.

Todos os dados planetários são carregados de forma estática através de um arquivo JSON local, eliminando completamente a necessidade de backend.

---

## Estrutura do projeto

frontend/
index.html

assets/
css/
style.css

js/
app.js
camera-control.js
time-control.js
space-events.js
asteroid-control.js

data/
planets.json

---

## Tecnologias utilizadas

O frontend é construído com HTML5 para estruturação da interface, CSS3 para estilização, animações e efeitos visuais, e JavaScript (ES6+) para toda a lógica de simulação e interação.

As animações utilizam Web Animations API e requestAnimationFrame para garantir fluidez.

Os dados são armazenados em JSON estático, substituindo completamente o backend PHP anterior.

---

## Execução do projeto

O projeto pode ser executado localmente utilizando qualquer servidor HTTP simples, como Live Server no VS Code ou servidores como XAMPP apenas para servir os arquivos estáticos.

Também pode ser publicado diretamente no GitHub Pages.

Para isso, basta enviar o repositório, habilitar GitHub Pages e definir a pasta frontend como diretório raiz do site.

---

## Arquitetura do sistema

O arquivo app.js controla a simulação principal das órbitas e a interação com os corpos celestes.

O arquivo camera-control.js gerencia o sistema de navegação espacial com pan e zoom.

O arquivo time-control.js controla o estado global do universo, incluindo pausa e velocidade da simulação.

O arquivo space-events.js é responsável pela geração de eventos visuais como meteoros e cometas.

O arquivo asteroid-control.js controla a ativação e desativação desses eventos.

O arquivo planets.json fornece todos os dados necessários para renderização dos planetas.

Não existe mais qualquer dependência de backend ou servidor dinâmico.

---

## Características técnicas

A simulação orbital é baseada em cálculos trigonométricos simples aplicados em tempo real.

O sistema utiliza transformações CSS para posicionamento e escala da câmera.

A renderização é feita inteiramente via DOM, sem uso de WebGL ou engines externas.

O sistema inclui fallback interno de dados caso o arquivo JSON não seja carregado corretamente.

A arquitetura foi projetada para ser modular, com separação clara entre lógica de simulação, interface e dados.

---

## Objetivo do projeto

O projeto foi desenvolvido com finalidade educacional, focado em:

Manipulação avançada de DOM
Animações em tempo real no navegador
Arquitetura modular em JavaScript puro
Simulação visual de sistemas astronômicos
Migração de backend para arquitetura estática

---

## Estado atual

O projeto encontra-se totalmente funcional em ambiente estático.

Não depende de backend, PHP ou qualquer servidor dinâmico.
