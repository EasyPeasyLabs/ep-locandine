# Guida Passo-Passo alla Configurazione e Deploy

Questa guida ti accompagnerà nella configurazione completa del progetto **Easy Peasy Flyer Creator**, dall'apertura in VS Code fino alla pubblicazione online su Vercel.

## 1. VS Code e Setup Locale

### Prerequisiti
Assicurati di avere installato:
- [Node.js](https://nodejs.org/) (versione 18 o superiore)
- [Visual Studio Code](https://code.visualstudio.com/)

### Istruzioni
1. **Apri il progetto**: Apri la cartella del progetto con VS Code.
2. **Apri il terminale**: In VS Code, premi `Ctrl + ò` (o vai su *Terminal* > *New Terminal*).
3. **Installa le dipendenze**:
   Digita il seguente comando e premi Invio:
   ```bash
   npm install
   ```
   Questo scaricherà tutte le librerie necessarie (React, Vite, Firebase, ecc.) elencate nel file `package.json`.

4. **Avvia il server di sviluppo**:
   Per vedere l'app in locale, digita:
   ```bash
   npm run dev
   ```
   Troverai l'indirizzo (es. `http://localhost:5173`) nel terminale. Ctrl+Click per aprirlo.

---

## 2. Firebase (Database e Backend)

Firebase serve per salvare i tuoi progetti (le locandine) nel cloud.

1. Vai su [Firebase Console](https://console.firebase.google.com/) e accedi con il tuo account Google.
2. Clicca su **Crea un progetto** (o "Aggiungi progetto").
3. Dai un nome al progetto (es. `easy-peasy-flyer`) e procedi (puoi disabilitare Google Analytics per semplicità).
4. **Crea l'App Web**:
   - Nella dashboard del progetto, clicca sull'icona **Web** (l'icona `</>`).
   - Dai un soprannome all'app (es. `Flyer App`) e clicca **Registra app**.
   - **IMPORTANTE**: Ti verrà mostrato un blocco di codice `const firebaseConfig = { ... }`. **Non chiudere questa finestra** o copia questi valori in un blocco note temporaneo. Ci serviranno tra poco.

5. **Attiva il Database (Firestore)**:
   - Nel menu a sinistra, clicca su **Build** > **Firestore Database**.
   - Clicca su **Crea database**.
   - Scegli una location (es. `eur3` o `europe-west` per l'Europa).
   - **Regole di sicurezza**: Scegli **Avvia in modalità di test** (Start in test mode). Questo permette a chiunque abbia l'app di leggere/scrivere per 30 giorni.
     *Nota: Per la produzione definitiva, dovrai configurare le regole di autenticazione, ma per iniziare va bene così.*

---

## 3. Configurazione Variabili d'Ambiente (Vite)

Ora dobbiamo collegare il tuo codice al progetto Firebase appena creato.

1. In VS Code, cerca il file `.env.example`.
2. Fai una copia di questo file e rinominala in `.env` (senza `.example`).
   *Comando terminale (Mac/Linux):* `cp .env.example .env`
   *Windows:* Copia e incolla manualmente.
3. Apri il file `.env` e incolla i valori che hai ottenuto al passaggio 2 (Firebase Config).
   
   Il file dovrà apparire così (sostituisci i `...` con i tuoi codici reali):
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyD...
   VITE_FIREBASE_AUTH_DOMAIN=easy-peasy-flyer.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=easy-peasy-flyer
   VITE_FIREBASE_STORAGE_BUCKET=easy-peasy-flyer.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
   VITE_FIREBASE_APP_ID=1:123456...:web:abcdef...
   ```
4. Salva il file.
5. Se il server locale (`npm run dev`) era attivo, fermalo (`Ctrl + C`) e riavvialo per caricare le nuove variabili.

---

## 4. Deploy su Vercel

Vercel è la piattaforma ideale per pubblicare questa app gratuitamente.

### Metodo A: Vercel CLI (Da VS Code)
1. Installa la CLI di Vercel globalmente (se non l'hai mai fatto):
   ```bash
   npm i -g vercel
   ```
2. Effettua il login:
   ```bash
   vercel login
   ```
3. Pubblica l'app:
   ```bash
   vercel
   ```
   - Rispondi `Y` (Yes) a "Set up and deploy?".
   - Accetta le impostazioni di default premendo Invio.
   
4. **Configura le Variabili su Vercel**:
   Quando usi `vercel` per la prima volta, il deploy potrebbe fallire o l'app non funzionare perché mancano le chiavi Firebase.
   - Vai sulla dashboard di Vercel (sul sito web).
   - Seleziona il progetto appena creato.
   - Vai su **Settings** > **Environment Variables**.
   - Aggiungi le stesse variabili che hai messo nel file `.env` (VITE_FIREBASE_API_KEY, ecc.) una per una.
   - Torna in VS Code e lancia di nuovo:
     ```bash
     vercel --prod
     ```

### Metodo B: Tramite GitHub (Consigliato)
1. Crea un repository su GitHub e carica questo codice.
2. Vai su [Vercel](https://vercel.com) -> **Add New...** -> **Project**.
3. Importa il repository GitHub.
4. Nella sezione **Environment Variables**, espandi e incolla tutte le variabili del file `.env`.
5. Clicca **Deploy**.

---

## Riepilogo Comandi Utili

| Azione | Comando |
|osservazione|---|
| Installare librerie | `npm install` |
| Avviare locale | `npm run dev` |
| Costruire per produzione | `npm run build` |
| Deploy rapido | `vercel` |
