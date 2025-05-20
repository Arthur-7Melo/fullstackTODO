# Todo API 📋

> **Backend:** Node.js · Express · TypeScript · MongoDB (Mongoose)  
> **Arquitetura em camadas:**  
> - **Controllers** → recebem requisições, chamam Services  
> - **Services** → regras de negócio/interações com o DB  
> - **Middlewares** → autenticação, autorização, erros, validação  
>  
> **Front-end:** React + Axios

---

## 📦 Instalação e setup

```bash
git clone https://…/todo-api.git
cd todo-api
npm install
cp .env.example .env    
npm run dev
```

## AUTH
### POST /api/auth/signup

- **Descrição:** Registra um novo Usuário
- **REQUEST BODY(json):**

```json
{
  "name": "string (≥1 chars)",
  "email": "string (válido, único)",
  "password": "string (≥8 chars)"
}
```

### POST /api/auth/signin

- **Descrição:** Autentica e retorna token JWT
- **REQUEST BODY:**

```json
{
  "email": "string",
  "password": "string"
}
```
- **RESPONSE:**

```json
{
  "success": "true",
  "token"
}
```

### POST /api/auth/forgot-password
**Ainda não implementado no front**

- **Descrição:** Envia e-mail com token de reset
- **REQUEST BODY:**

```json
{
  "email": "string"
}
```

### POST /api/auth/reset-password/:token
**Ainda não implementado no front**

- **Descrição:** Atualiza senha usando token de recuperação
- **REQUEST BODY:**

```json
{
  "email": "string",
  "newPassword": "string"
}
```

## Todos (camada de rotas /api/v1/todos)
Todos endpoints exigem header:

```http
Authorization: Bearer <token>
```

### GET /api/v1/todos
- **Descrição:** lista todos do usuário
- **Query Params (opcional):**
priority=alta|baixa

### POST /api/v1/todos
- **Descrição:** Cria novo todo

### PATCH /api/v1/todos/:id
- **Descrição:** Atualiza campos em um todo
- **URL PARAM:** :id (ID do todo)
- **REQUEST BODY:** (qualquer subset de campos)

```json
{
  "title"?: "string",
  "description"?: "string",
  "priority"?: "alta"|"baixa"
}
```

### DELETE /api/v1/todos/:id
- **Descrição:** Remove um todo
- **URL PARAM:** :id (ID do todo)

## MIDDLEWARES

### protect
- **Descrição:** Valida JWT em Authorization e popula req.user

### validateRequest(schema)
- **Descrição:** Usa Zod para validar req.body e retorna 400 em caso de erro

### authorizeTodos
- **Descrição:** Verifica no DB se todo.userId === req.user.id

### errorHandler
- **Descrição:** Captura exceções e formata JSON com { success:false, message }