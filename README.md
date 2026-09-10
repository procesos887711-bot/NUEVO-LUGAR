# Encuentra tu Lugar — proyecto para vender fuera de Claude

Esta es la versión real de la app: funciona en cualquier navegador, con tu propio
dominio si quieres, y sin depender de Claude para nada. Así está resuelto lo que
antes hacía el entorno de Claude por ti:

| Antes (artifact de Claude)              | Ahora (proyecto real)                              |
|------------------------------------------|-----------------------------------------------------|
| `window.storage` (guardado especial)     | `localStorage` del navegador — gratis, sin backend  |
| Llamada directa a la IA desde el navegador | Función `/api/reflect` en tu propio servidor, con tu clave oculta |
| Sin control de acceso                    | Pantalla de código de acceso (`VITE_ACCESS_CODE`)   |

## 1. Lo que necesitas antes de empezar

- Una cuenta gratuita en **[Vercel](https://vercel.com)** (para alojarla).
- [Node.js](https://nodejs.org) instalado en tu ordenador (para probarlo antes de subirlo).
- Opcional: una cuenta de **GitHub**, para conectar el proyecto a Vercel automáticamente.

**La reflexión con IA es opcional.** Si no quieres configurarla todavía, deja
`VITE_ENABLE_REFLECTIONS=false` (o bórralo) en tus variables de entorno — el botón
simplemente no aparece y el resto de la app funciona igual, sin ningún costo.
Si más adelante quieres activarla, solo necesitas una clave de
[console.anthropic.com](https://console.anthropic.com) y cambiar esa variable a `true`.

## 2. Probarlo en tu ordenador primero

```bash
cd encuentra-tu-lugar
npm install
cp .env.example .env.local
```

Edita `.env.local` y cambia `VITE_ACCESS_CODE` por el código que le darás a tus
compradoras (por ejemplo `RAICES2026`). Deja `VITE_ENABLE_REFLECTIONS=false` si
todavía no quieres la reflexión con IA.

```bash
npm run dev
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`).
**Ojo:** en modo `npm run dev`, la función `/api/reflect` no corre sola —
para probar el botón de reflexión completo, usa `vercel dev` (ver siguiente paso)
o simplemente pruébalo ya en producción, es gratis y rápido.

## 3. Subir el código a GitHub (recomendado)

```bash
git init
git add .
git commit -m "Encuentra tu Lugar"
```

Crea un repositorio nuevo en GitHub y sigue las instrucciones para subir estos
archivos (`git remote add origin ...` y `git push`).

## 4. Desplegar en Vercel (gratis)

1. Entra a [vercel.com](https://vercel.com) → **Add New Project** → conecta tu repositorio de GitHub.
2. Vercel detecta automáticamente que es un proyecto Vite — no cambies nada de la configuración.
3. Antes de darle a "Deploy", ve a **Environment Variables** y añade:
   - `VITE_ACCESS_CODE` → el código que quieres usar
   - (opcional, solo si quieres la reflexión con IA) `VITE_ENABLE_REFLECTIONS=true` y `ANTHROPIC_API_KEY` → tu clave real
4. Dale a **Deploy**. En 1-2 minutos tendrás una URL tipo `encuentra-tu-lugar.vercel.app`.

## 5. Poner tu propio dominio (opcional pero recomendado para vender)

En el proyecto dentro de Vercel → **Settings → Domains** → añade tu dominio
(por ejemplo `encuentratulugar.com`, cómpralo en Namecheap, Google Domains, etc.)
y sigue las instrucciones para apuntar el DNS. Vercel te lo deja listo en minutos.

## 6. Cómo venderla (sin construir un sistema de pagos desde cero)

La forma más simple para empezar:

1. Sube el **ebook en PDF** (o un enlace a esta app) como producto en **Gumroad**
   o **Hotmart** — ya sabes usar esto para el ebook.
2. En la descripción del producto entregable, escribe el **código de acceso**
   (`VITE_ACCESS_CODE`) y el link a tu app.
3. Gumroad/Hotmart se encargan del cobro y del envío automático del código por correo.

Esto no es un sistema de pago "en vivo" dentro de la app, pero es la forma más
rápida de empezar a vender sin desarrollar más. Si más adelante quieres pagos
dentro de la misma app (Stripe), es un paso adicional que podemos construir después.

## 7. Actualizar el contenido

Todo el contenido (capítulos, preguntas, afirmaciones) vive en un solo archivo:
`src/content.js`. Puedes editarlo directamente ahí sin tocar el resto del código.
Los estilos (colores, tipografía) están en `src/styles.css`.

## Estructura del proyecto

```
encuentra-tu-lugar/
├── api/
│   └── reflect.js       ← función de servidor que llama a la IA (clave oculta)
├── src/
│   ├── App.jsx           ← toda la lógica y pantallas de la app
│   ├── content.js        ← el texto: capítulos, preguntas, afirmaciones
│   ├── styles.css         ← diseño visual
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── .env.example
```
