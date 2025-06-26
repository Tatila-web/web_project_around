# Projeto EUA Afora

Descrição
Este projeto, chamado "EUA Afora", é uma aplicação interativa que permite aos usuários visualizar cartões com imagens de diversos lugares, como se fossem um "álbum de viagens". Os cartões podem ser adicionados ou removidos, e os usuários também podem editar seu perfil, alterando o nome e a descrição. A validação de formulários e a manipulação de popups são implementadas para garantir uma boa experiência de usuário.

# ✨ Funcionalidades

- 🖼️ 1. Exibição de Cartões

Os cartões exibem imagens com títulos representando locais diversos.

É possível curtir/descurtir os cartões (ícone de like).

Ao clicar na imagem, ela é exibida em tamanho ampliado (popup).

Os cartões podem ser excluídos.

- ➕ 2. Adição de Novos Cartões

Formulário para adicionar novos cartões com nome e link da imagem.

Validação de campos em tempo real garante entradas válidas.

Novo cartão é renderizado automaticamente na interface.

- 🧑‍💼 3. Edição de Perfil

Os usuários podem alterar dinamicamente seu nome e descrição.

Informações são refletidas imediatamente no perfil após envio do formulário.

- ✅ 4. Validação de Formulários

Campos obrigatórios são validados com JavaScript moderno (API ValidityState).

Validação acontece em tempo real com feedback visual.

O botão de envio só é ativado quando todos os campos estão corretos.

- 🪟 5. Manipulação de Popups

Popups para edição de perfil, adição de cartão e visualização de imagem.

Popups fecham ao clicar no botão "fechar", pressionar a tecla ESC ou clicar fora (overlay).

Inputs dos formulários são limpos automaticamente ao abrir/fechar.

# 🗂️ Estrutura de Arquivos

📁 projeto-eua-afora/
├── index.html # Estrutura principal da aplicação
├── index.css # Estilos globais e dos componentes
├── 📁 scripts/ # Código JavaScript modular
│ ├── index.js # Arquivo principal que integra os módulos
│ ├── Card.js # Classe Card (criação e lógica dos cartões)
│ ├── Section.js # Classe Section (renderização de múltiplos cards)
│ ├── UserInfo.js # Classe UserInfo (informações do perfil)
│ ├── Popup.js # Classe base para popups
│ ├── PopupWithImage.js # Subclasse para exibição de imagem ampliada
│ ├── PopupWithForm.js # Subclasse para popups com formulário
│ ├── FormValidator.js # Classe de validação de formulários
│ ├── config.js # Configurações da validação (seletor, classes, etc.)
│ └── utils.js # Funções utilitárias (abrir/fechar popups etc.)

# 🛠️ Tecnologias Utilizadas

- HTML5: Estrutura da página e templates reutilizáveis.

- CSS3: Estilização responsiva e interativa da interface.

- JavaScript ES6+: Manipulação de DOM, lógica de interação e modularização.

- POO (Programação Orientada a Objetos): Componentização e organização de funcionalidades com classes reutilizáveis.

🌐 Hospedagem

- Você pode acessar a versão online do projeto neste link:

🔗 https://tatila-web.github.io/web_project_around/
