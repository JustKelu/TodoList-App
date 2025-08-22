📝 TodoList App

Una moderna applicazione full-stack per la gestione delle attività quotidiane, costruita con React, Node.js, Express e PostgreSQL. \
✨ Caratteristiche \
🔐 Autenticazione sicura con JWT e bcrypt \
📱 Design responsive e interfaccia moderna \
✅ CRUD completo per i todos (Crea, Leggi, Aggiorna, Elimina) \
🔍 Filtri intelligenti (Tutte, Da fare, Completate) \
📊 Statistiche real-time delle attività \
✏️ Modifica inline dei todos \
🛡️ Protezione delle route e autorizzazione utenti 

🛠️ Tecnologie Utilizzate \
Frontend

React 18 \
React Router DOM \
Context API per state management \
CSS3 con design moderno

Backend

Node.js \
Express.js \
JWT per autenticazione \
bcrypt per hashing password \
CORS per cross-origin requests

Database

PostgreSQL \
pg (node-postgres) per connessione database 

🚀 Installazione e Setup \
Prerequisiti

Node.js (v14 o superiore) \
npm \
PostgreSQL installato e in esecuzione 

1. Clona il repository

git clone https://github.com/tuousername/todolist-app.git \
cd todolist-app

2. Installa le dipendenze 

Backend: \
npm install \
Frontend: \
cd public  # se il frontend è in una cartella separata \
npm install

3. Configura il Database PostgreSQL 

Crea un database chiamato todo_app: \
CREATE DATABASE todo_app; \
Crea le tabelle necessarie: \
CREATE TABLE users ( \
    id SERIAL PRIMARY KEY, \
    username VARCHAR(255) UNIQUE NOT NULL, \
    email VARCHAR(255) UNIQUE NOT NULL, \
    password_hash VARCHAR(255) NOT NULL, \
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP \
);

-- Tabella todos \
CREATE TABLE todos ( \
    id SERIAL PRIMARY KEY, \
    title VARCHAR(255) NOT NULL, \
    text TEXT NOT NULL, \
    completed BOOLEAN DEFAULT FALSE, \
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, \
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP \
); 

4. Configura le variabili d'ambiente 

Crea un file .env nella root del progetto: \
env# Database \
PSW_DB=tua_password_postgresql \

# JWT
JWT_SECRET=il_tuo_jwt_secret_molto_sicuro_e_lungo

# Server
PORT=8000 \
⚠️ Importante:

Sostituisci tua_password_postgresql con la password del tuo database PostgreSQL \
Genera un JWT_SECRET sicuro (almeno 32 caratteri casuali) \
Non condividere mai il file .env pubblicamente

5. Avvia l'applicazione \
Backend: \
npm start
# Il server sarà disponibile su http://localhost:8000
Frontend: \
cd public  # se necessario \
npm run dev
# Il frontend sarà disponibile su http://localhost:5173
📋 Script Disponibili \
Backend

npm start - Avvia il server in modalità produzione \
npm run dev - Avvia il server in modalità sviluppo (se hai nodemon) 

Frontend

npm run dev - Avvia il server di sviluppo Vite \
npm run build - Crea il build di produzione \
npm run preview - Anteprima del build di produzione 

🏗️ Struttura del Progetto
todolist-app/

├── server.js                 # Entry point del server \
├── routes/ \
│   ├── authRoutes.js         # Route per autenticazione \
│   └── usersRoutes.js        # Route per utenti e todos \
├── utils/ \
│   ├── database.js           # Configurazione database \
│   ├── authMiddleware.js     # Middleware autenticazione \
│   └── loggerMiddleware.js   # Middleware logging \
├── public/                    \
│   ├── src/ \
│   │   ├── components/       # Componenti React \
│   │   ├── context/          # Context API \
│   │   └── styles/           # File CSS \
│   └── ... \
├── .env                      # Variabili d'ambiente (non in git) \
├── .gitignore \
└── README.md 

🔧 API Endpoint \
Autenticazione

POST /auth/register - Registrazione utente \
POST /auth/login - Login utente \
POST /auth/verify-token - Verifica validità token 

Todos

GET /users/:userId/todos - Ottieni todos utente \
POST /users/:userId/todos - Crea nuovo todo \
GET /users/:userId/todos/:id - Ottieni todo specifico \
PUT /users/:userId/todos/:id - Aggiorna todo \
DELETE /users/:userId/todos/:id - Elimina todo 

🔒 Sicurezza

✅ Password crittografate con bcrypt \
✅ Autenticazione JWT \
✅ Middleware di autorizzazione \
✅ Query parametrizzate (protezione SQL injection) \
✅ CORS configurato \
✅ Validazione input 

🐛 Troubleshooting \
Problemi comuni:
1. Errore di connessione al database

Verifica che PostgreSQL sia in esecuzione \
Controlla le credenziali nel file .env \
Assicurati che il database todo_app esista

2. "JWT_SECRET is not defined"

Verifica che il file .env esista \
Controlla che JWT_SECRET sia configurato \
Riavvia il server dopo aver modificato .env

3. "Port already in use"

Cambia la PORT nel file .env \
Oppure termina il processo che usa la porta 8000

🤝 Contributi \
I contributi sono benvenuti! Sentiti libero di aprire issue o pull request.

📄 Licenza \
Questo progetto è distribuito sotto licenza MIT.

👨‍💻 Autore
Creato da JustKelu
