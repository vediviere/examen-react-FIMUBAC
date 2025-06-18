# examen-react-FIMUBAC

Aplicación web desarrollada con **React**, **Vite** y **Tailwind CSS** para el registro y gestión de usuarios.

## Características

- Registro de usuarios con validación de datos.
- Edición y eliminación de usuarios.
- Persistencia local usando `localStorage`.
- Interfaz moderna y responsiva.
- Notificaciones visuales para acciones exitosas o con error.

## Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/icons/)

## Instalación

1. Clona el repositorio:
   ```sh
   git clone <url-del-repositorio>
   cd examen-react-FIMUBAC
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la versión de producción.
- `npm run preview` — Previsualiza la build de producción.
- `npm run lint` — Ejecuta ESLint para analizar el código.

## Estructura del proyecto

```
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── assets/
├── index.html
├── package.json
├── tailwind.config.js
└── ...
```

## Personalización

Puedes modificar los estilos en `src/index.css` y la configuración de Tailwind en `tailwind.config.js`.

---

Desarrollado por Marco Antonio Morales Castillo.
