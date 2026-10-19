# Local Shelf Hub

# KIOSCO YA — Contexto del proyecto y desarrollo del prototipo visual

## 1. CONTEXTO GENERAL DEL PROYECTO

Estoy desarrollando Kiosco Ya, una plataforma web pensada inicialmente para kioscos, almacenes, despensas y minimercados de Río Grande, Tierra del Fuego, Argentina, con la posibilidad de expandirse a otras localidades en el futuro.

Kiosco Ya busca ayudar a los comercios de cercanía a tener presencia online, mostrar sus productos y recibir pedidos de clientes sin que tengan que mantener manualmente dos catálogos diferentes.

La propuesta combina dos necesidades:

1. Una herramienta sencilla para que el comerciante gestione y organice su catálogo de productos.
2. Una tienda online para que los clientes encuentren el comercio, consulten sus productos, vean los precios y la disponibilidad, y puedan realizar pedidos.

La idea central es que la información del catálogo que administra el kiosquero sea la misma que se utiliza para mostrar los productos a los clientes.

El comerciante no debería tener que cargar manualmente cada producto en Kiosco Ya si ya dispone de esa información en su sistema de gestión habitual.

En una etapa futura se contempla la importación de archivos Excel exportados desde programas de gestión como Eleventa u otros sistemas compatibles. Esto permitiría importar productos, códigos de barras, precios y existencias cuando esos datos estén disponibles en el archivo.

## 2. OBJETIVO ACTUAL: CREAR UN PROTOTIPO VISUAL

IMPORTANTE: en esta etapa NO quiero desarrollar la aplicación funcional completa.

Necesito construir un prototipo visual navegable, profesional y convincente que me permita visitar kioscos, mostrarles una demostración concreta del producto y comprobar si estarían interesados en utilizar Kiosco Ya.

El prototipo debe parecer una aplicación real, aunque utilice datos ficticios.

No implementar todavía:
- Bases de datos.
- Autenticación real.
- Registro real de usuarios.
- Integraciones con Eleventa u otros sistemas.
- Importación real ni procesamiento de archivos Excel.
- Sistemas de pago.
- Procesamiento real de pedidos.
- Sincronización de inventario.
- APIs ni servicios externos innecesarios.

Los botones y controles principales deben permitir recorrer la demostración y mostrar estados de ejemplo cuando corresponda. Por ejemplo, el botón de importar Excel puede abrir una pantalla de demostración con un archivo ficticio, una vista previa de productos y un resultado simulado.

No quiero una página institucional estática ni una landing page como producto principal. Quiero una demostración del panel administrativo que utilizaría un kiosquero.

## 3. IDENTIDAD Y EXPERIENCIA VISUAL

Diseñar Kiosco Ya como un producto tecnológico moderno, confiable, sencillo y accesible para comerciantes que no necesariamente tienen conocimientos técnicos.

La interfaz debe transmitir que administrar una tienda online no tiene por qué ser complicado.

Características visuales:
- Diseño limpio y profesional.
- Jerarquía visual clara.
- Navegación intuitiva.
- Tipografía legible.
- Tarjetas, tablas y formularios bien organizados.
- Iconografía consistente.
- Espaciado equilibrado.
- Estados visuales claros para pedidos, productos y disponibilidad.
- Interfaz en español.
- Formato monetario argentino: $ y separadores habituales en Argentina.
- Ejemplos de productos y comercios realistas para el contexto argentino.

Evitar una estética excesivamente futurista, sobrecargada o corporativa. Debe sentirse como una herramienta práctica que un kiosquero pueda utilizar todos los días.

## 4. REQUISITO FUNDAMENTAL: DISEÑO RESPONSIVE

El prototipo debe adaptarse automáticamente al dispositivo desde el cual se utiliza.

No crear dos aplicaciones independientes. Desarrollar una única interfaz web responsive.

### Computadoras de escritorio y notebooks

- Panel administrativo con menú lateral.
- Área principal amplia.
- Tablas de productos con columnas visibles.
- Tarjetas de resumen.
- Gráficos o indicadores sencillos cuando aporten valor.
- Gestión de pedidos con información organizada.
- Formularios cómodos para trabajar con teclado y mouse.

### Celulares

- Interfaz reorganizada para pantallas pequeñas.
- Menú lateral convertido en menú desplegable o navegación compacta.
- Navegación inferior cuando resulte conveniente.
- Productos presentados en tarjetas verticales.
- Tablas convertidas en listas o tarjetas cuando sea necesario.
- Botones suficientemente grandes para pantallas táctiles.
- Formularios adaptados al ancho disponible.
- Textos legibles y acciones principales fáciles de encontrar.
- Sin desbordamientos horizontales innecesarios.

### Tablets

- Distribución intermedia entre escritorio y celular.
- Adaptación de columnas, tarjetas y navegación según el espacio disponible.

La adaptación debe modificar la distribución y la experiencia de uso, no limitarse a reducir el tamaño de los elementos.

## 5. ESTRUCTURA DEL PANEL DEL KIOSQUERO

Crear las siguientes secciones principales.

### A. Inicio / Resumen

Debe ser la pantalla principal del kiosquero.

Mostrar:
- Nombre del comercio.
- Mensaje de bienvenida.
- Cantidad de productos en el catálogo.
- Productos publicados y no publicados.
- Pedidos pendientes.
- Pedidos en preparación.
- Pedidos listos para entregar.
- Avisos de productos con poco stock o no disponibles.
- Accesos directos a las funciones principales.
- Una lista de pedidos recientes con datos ficticios.

Las estadísticas deben ser coherentes con los datos de demostración.

### B. Mi catálogo / Productos

Esta es una de las secciones más importantes de Kiosco Ya.

El comerciante debe poder visualizar cómo organizaría sus productos.

Mostrar:
- Imagen del producto.
- Nombre.
- Marca, cuando corresponda.
- Código de barras o identificador.
- Categoría.
- Precio de venta.
- Disponibilidad.
- Estado de publicación.
- Acción para editar.
- Acción para publicar o despublicar.

Incluir búsqueda por nombre o código y filtros por categoría, disponibilidad y publicación.

Utilizar ejemplos realistas: bebidas, golosinas, snacks, productos de almacén, galletitas, artículos de limpieza y otros productos habituales de un kiosco argentino.

Incluir una acción visual para agregar un producto manualmente, que abra un formulario de demostración.

El cliente final no debe ver las cantidades exactas de inventario. El comerciante puede ver cantidades en su panel de demostración, pero la vista pública utilizará etiquetas de disponibilidad.

### C. Importar productos desde Excel

Esta función es fundamental para comunicar la propuesta de Kiosco Ya.

Crear una pantalla que explique visualmente cómo un comercio podría importar su catálogo desde un sistema de gestión existente.

La pantalla debe incluir:

1. Una explicación breve: "Importá tu catálogo y evitá cargar tus productos uno por uno".
2. Un área para seleccionar o arrastrar un archivo Excel.
3. Una referencia visual a archivos exportados desde Eleventa u otros sistemas compatibles.
4. Un ejemplo ficticio de archivo seleccionado.
5. Una vista previa de los productos que se importarían.
6. Columnas de ejemplo: código, nombre del producto, precio, existencia y categoría.
7. Un indicador de productos detectados.
8. Un resumen de productos válidos, registros con errores y posibles duplicados.
9. Una simulación visual de la confirmación de importación.

IMPORTANTE: esta pantalla es solamente una simulación. No es necesario procesar archivos reales ni conectarse a Eleventa.

La interfaz debe comunicar que la compatibilidad y la estructura de los archivos se validarán durante el desarrollo real.

Incluir una nota discreta que indique que la actualización del catálogo dependerá de las futuras importaciones o integraciones disponibles.

### D. Gestión de stock y disponibilidad

Crear una sección visual para que el comerciante comprenda cómo se representaría el inventario.

Mostrar:
- Producto.
- Cantidad de ejemplo disponible para el comerciante.
- Indicador de stock.
- Estado de disponibilidad.
- Avisos de poco stock.
- Productos agotados.

Utilizar estados claros, como:
- Disponible.
- Poco stock.
- Agotado.

No asumir que existe sincronización en tiempo real con el sistema de gestión externo. El prototipo debe mostrar cómo sería la interfaz, sin afirmar que los datos se actualizan automáticamente.

### E. Pedidos

Crear una sección que muestre cómo el kiosquero recibiría y organizaría los pedidos de sus clientes.

Incluir:
- Número de pedido.
- Nombre ficticio del cliente.
- Fecha y hora.
- Productos solicitados.
- Cantidad por producto.
- Importe total.
- Modalidad de entrega.
- Estado del pedido.

Organizar los pedidos por estados:
- Pendiente.
- En preparación.
- Listo para retirar.
- En camino, cuando corresponda.
- Entregado.
- Cancelado.

Permitir abrir el detalle de un pedido y simular cambios de estado.

La interfaz debe diferenciar claramente los pedidos nuevos de los ya atendidos.

### F. Mi negocio

Crear una pantalla con los datos del comercio.

Incluir:
- Nombre del kiosco.
- Logo o imagen de perfil.
- Imagen de portada.
- Dirección.
- Teléfono de contacto.
- Horarios de atención.
- Descripción breve.
- Modalidades de entrega disponibles.
- Información de retiro en el local.
- Estado de la tienda online: publicada o pausada.

Agregar una vista de ejemplo de cómo aparecería el comercio para los clientes.

Todos los datos deben ser ficticios y editables dentro de la demostración.

### G. Vista previa de mi tienda

Esta sección es esencial para vender la idea al kiosquero.

Crear una vista que simule la tienda que verían los clientes desde sus propios teléfonos.

Debe incluir:
- Nombre e imagen del comercio.
- Dirección y horarios.
- Buscador de productos.
- Categorías.
- Tarjetas de productos con imágenes.
- Precios.
- Etiquetas de disponibilidad.
- Botones para agregar productos a un carrito de demostración.
- Vista del carrito.
- Ejemplo de selección entre retiro y entrega a domicilio, según las opciones del comercio.

El cliente debe ver etiquetas como:
- "Disponible".
- "Poco stock".
- "No disponible".

No mostrar cantidades exactas de inventario en esta vista.

La vista previa debe verse claramente diferente del panel administrativo: debe parecer una tienda online orientada al consumidor final.

Se puede permitir navegar entre el panel del kiosquero y la vista previa para mostrar cómo la información de un producto se reflejaría en la tienda.

## 6. NAVEGACIÓN Y COMPORTAMIENTO DEL PROTOTIPO

Crear una experiencia navegable entre las secciones.

El prototipo debe permitir:
- Cambiar de sección desde el menú.
- Abrir y cerrar formularios.
- Buscar productos ficticios.
- Aplicar filtros visuales.
- Abrir detalles de pedidos.
- Simular cambios de estado.
- Alternar entre el panel administrativo y la vista previa de la tienda.
- Recorrer el flujo de demostración de importación de Excel.
- Visualizar mensajes de confirmación o error simulados.

No implementar operaciones reales ni guardar información en una base de datos. Utilizar datos locales de demostración y estados temporales en la interfaz cuando sea necesario.

No crear botones decorativos que parezcan funcionales, pero no hagan absolutamente nada. Cada acción visible debe tener un comportamiento de demostración coherente.

## 7. DATOS FICTICIOS Y CONTEXTO LOCAL

Usar un comercio ficticio de Río Grande, Tierra del Fuego, Argentina.

Crear un catálogo variado con productos, imágenes, precios ilustrativos y estados de disponibilidad.

Incluir varios pedidos ficticios con diferentes estados.

Utilizar nombres y datos inventados. No utilizar información personal ni datos reales de comercios sin autorización.

Todos los precios son de demostración y no deben presentarse como precios de mercado verificados.

## 8. OBJETIVO COMERCIAL DEL PROTOTIPO

El objetivo no es solamente mostrar pantallas bonitas.

Quiero utilizar esta demostración para visitar comercios y explicarles una propuesta concreta.

El comerciante debe comprender rápidamente que Kiosco Ya busca:
- Dar visibilidad online a su negocio.
- Mostrar sus productos y precios.
- Facilitar que los clientes encuentren lo que vende.
- Permitir que los clientes preparen pedidos antes de visitar el local.
- Simplificar la administración del catálogo.
- Evitar, en la medida de lo posible, la duplicación de tareas de carga de productos.

El prototipo debe ayudarme a validar el interés comercial antes de invertir en el desarrollo completo.

No agregar funciones que no estén justificadas por esta propuesta.

## 9. CRITERIOS DE CALIDAD Y ENTREGA

Antes de finalizar:
- Revisar que todas las secciones estén implementadas.
- Verificar la navegación entre pantallas.
- Comprobar que los botones principales funcionen en modo demostración.
- Revisar el diseño responsive en escritorio y celular.
- Corregir desbordamientos y problemas de legibilidad.
- Mantener coherencia entre los productos del panel y la vista previa de la tienda.
- Mantener coherencia entre las cantidades, los estados de disponibilidad y los pedidos ficticios.
- Evitar errores visuales, componentes incompletos y pantallas vacías.

Priorizar un prototipo completo, claro y convincente antes que una gran cantidad de funciones secundarias.

Primero construir la estructura general y las pantallas principales. Después ajustar los detalles visuales y las interacciones.

El resultado final debe ser una demostración profesional de Kiosco Ya que pueda presentar personalmente a los comerciantes desde una computadora o un celular.

Recordatorio final: NO desarrollar todavía el producto de producción. Construir únicamente el prototipo visual navegable, utilizando datos ficticios y sin backend.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c949bb3c-4bd5-4b1e-8b88-c0a85b53a6d4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
