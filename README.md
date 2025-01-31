# PS - Vaga de frontend CatiJr

# O que foi feito para a entrega

# Lista de Tarefas

## Funcionalidades

- ✅ Criar uma lista de tarefas  
- ✅ Criar uma tarefa  
- ✅ Editar informações de uma tarefa  
- ✅ Remover uma lista  
- ✅ Remover uma tarefa  
- ✅ Mover uma tarefa para outra lista  
- ✅ Responsividade  

## Milhas Extra

- ✅ Drag and drop para mover uma tarefa para outra lista  
- ✅ Anexar arquivos em uma tarefa, para disponibilizar o download do arquivo caso seja necessário  
- ✅ Testes de interface com Cypress  

## Extras (além do que foi pedido)

- ✅ Criação de endpoint no backend para listar arquivos referentes a uma lista
- ✅ Criação de endpoint no backend para deletar arquivos de uma lista
- ✅ Mecanismo para duplicar tasks


# Como rodar a aplicação

Primeiro, rodar o backend: 

1. Entrar na pasta do backend: `cd ps-backend`
2. Baixar as dependências: `npm install`
3. Criar pasta .tmp na raiz do projeto: `mkdir .tmp`
4. Rodar as migrations do prisma: `npx prisma migrate dev`
5. Subir a aplicação `npm run start:dev`

Depois, rodar o frontend

1. Entrar na pasta do backend: `cd ps-catijr-frontend`
2. Baixar as dependências: `npm install`
3. Rodar a aplicação: `npm run dev`

