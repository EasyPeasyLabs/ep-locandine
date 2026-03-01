# Easy Peasy Flyer Creator

Questa è una Progressive Web App (PWA) per la creazione di locandine promozionali per **Easy Peasy Lemon Squeezy**.

## Funzionalità

- **3 Layout**: Classico, Moderno, Giocoso.
- **Editor**: Personalizzazione completa di testi, immagini, date e contatti.
- **Esportazione**: Salva la locandina come PDF o PNG.
- **Persistenza**: Salva e carica i progetti utilizzando Firebase Firestore.
- **PWA**: Installabile su dispositivi desktop e mobile.

## Configurazione Firebase

Per abilitare il salvataggio dei progetti, devi configurare Firebase:

1. Crea un progetto su [Firebase Console](https://console.firebase.google.com/).
2. Crea un database **Firestore**.
3. Imposta le regole di sicurezza (per testare puoi usare la modalità di test, ma per la produzione dovresti limitare gli accessi).
4. Copia le credenziali di configurazione web.
5. Inserisci le credenziali nel file `.env` (o nelle variabili d'ambiente di AI Studio):

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Utilizzo

1. Apri l'applicazione.
2. Scegli un layout dalla barra laterale.
3. Compila i campi con i dettagli dell'evento.
4. Carica un'immagine principale e opzionalmente il logo della sede.
5. Clicca su **Salva** (icona floppy) per salvare il progetto nel cloud.
6. Clicca su **Carica** (icona cartella) per recuperare progetti precedenti.
7. Clicca su **PDF** o **PNG** per scaricare la locandina pronta per la stampa o i social.
