import path from 'node:path'
import { fileURLToPath } from 'node:url'

// importando el motor de plantillas
import { create as createHandlebars } from 'express-handlebars'

// Importando la configuración de Vite
import { registerViteHelper } from './vite.js'

// creando constantes de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// exportar la funcion de configuración
export function configureHandlebars(app) {

  // configurando handlebars
  const exphbs = createHandlebars({
    extname: '.hbs',
    defaultLayout: 'main'
  })

  // registrar helper de vite
  registerViteHelper(exphbs.handlebars)

  // integrar handlebars
  app.engine('hbs', exphbs.engine)

  // extensión de vistas
  app.set('view engine', 'hbs')

  // carpeta views
  app.set('views', path.join(__dirname, '..', 'views'))
}