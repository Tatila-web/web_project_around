# Projeto EUA Afora

Descrição
Este projeto, chamado "EUA Afora", é uma aplicação interativa que permite aos usuários visualizar cartões com imagens de diversos lugares, como se fossem um "álbum de viagens". Os cartões podem ser adicionados ou removidos, e os usuários também podem editar seu perfil, alterando o nome e a descrição. A validação de formulários e a manipulação de popups são implementadas para garantir uma boa experiência de usuário.

# Funcionalidades

1. Exibição de Cartões de Imagens

- O projeto exibe cartões com imagens e títulos representando diferentes lugares ao redor do mundo.

- Os cartões possuem funcionalidades de curtir e excluir, além de abrir uma imagem em tamanho maior ao clicar na foto.

2. Adicionar Novos Cartões

- É possível adicionar novos cartões com imagem e título através de um formulário de adição de cartão.

- O formulário de adição de cartão inclui validação para garantir que os dados inseridos sejam válidos.

3. Edição de Perfil-
   Os usuários podem editar seu nome e descrição através de um formulário de edição de perfil.

- O perfil exibe o nome e a descrição do usuário de forma dinâmica.

4. Validação de Formulários

- A validação de formulários é feita com JavaScript, garantindo que os campos sejam preenchidos corretamente.

- Utiliza a API de validity do HTML5 para validar entradas de texto.

- A validação é feita em tempo real, e o botão de envio do formulário só fica habilitado quando todos os campos estão corretamente preenchidos.

5. Popups

- Há popups para editar o perfil e adicionar novos cartões, que são controlados através de eventos de abrir e fechar.

- O fechamento dos popups é feito ao clicar em um botão de fechar ou ao enviar o formulário.

# Estrutura de Arquivos

- index.html: O arquivo principal HTML que contém a estrutura da página e os templates dos cartões.

- index.css: Arquivo de estilos para toda a aplicação.

- scripts/: Pasta contendo os arquivos JavaScript.

- Card.js: Classe responsável por criar e manipular os cartões.

- FormValidator.js: Classe responsável pela validação dos formulários.

- utils.js: Funções utilitárias para abrir e fechar popups.

- config.js: Contém a configuração de validação de formulário.

- index.js: Arquivo principal do JavaScript, que importa e utiliza as outras classes para gerar o conteúdo dinâmico da página.

# Tecnologias Utilizadas

- HTML5: Para a estruturação da página e templates dos cartões.

- CSS3: Para estilização da página e componentes.

- JavaScript (ES6+): Para interatividade, manipulação de DOM e validação de formulários.

- Utiliza POO com classes Card e FormValidator.

- Validação de formulários com a API ValidityState e eventos de input.
