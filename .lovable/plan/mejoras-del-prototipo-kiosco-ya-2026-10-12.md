# Mejoras del prototipo Kiosco Ya

## Resultado
- Incorporar un selector claro/oscuro accesible desde el panel y recordar la elección en el navegador.
- Sustituir el teléfono por el alias de pago ficticio `kiosco.ejemplo` en la configuración y la tienda.
- Permitir configurar promociones 2x1, 3x2, porcentaje y precio promocional; señalarlas en catálogo y tienda y reflejarlas en el carrito simulado.
- Cambiar toda referencia visible de “Existencia” a “Cantidad”.
- Dejar “Retiro en el local” como única modalidad y eliminar delivery y “En camino”.

## Implementación
- Ampliar los datos compartidos del prototipo con tema, alias y configuración de promoción, manteniendo todo temporal y sin backend.
- Actualizar formularios, tablas, pedidos, tienda y carrito con controles y textos coherentes.
- Completar los tokens visuales del modo oscuro para fondos, tablas, tarjetas, formularios, diálogos, bordes, iconos y textos.
- Ajustar datos ficticios para incluir ejemplos promocionales y pedidos exclusivamente con retiro.

## Verificación
- Añadir pruebas concretas para promociones, totales promocionales, alias y modalidad única de retiro.
- Revisar el recorrido principal y la apariencia en computadora, tablet y celular, incluyendo cambio de tema y recarga.