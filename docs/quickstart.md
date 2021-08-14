---
sidebar_position: 3
---

# Inicio Rápido

Esta página tiene todo lo que necesitas para empezar a recibir pagos con
Recurrente.

### Conceptos Principales

En Recurrente tenemos cinco entidades importantes con las que estarás
interactuando:

- `products`: son los productos que vas a vender.
- `prices`: son los precios de tus productos.
- `checkouts`: representan la página donde tus clientes meten su tarjeta.
- `users`: representan a los clientes a quienes vas a cobrar.
- `subscriptions`: son donde tienes la información de tus cobros recurrentes.

## Autenticación

Obtén tus claves API bajo Configuración -> Claves API en tu [cuenta de Recurrente](https://app.recurrente.com).

## Creando un checkout

### Crear un producto

Cada uno de tus productos necesita un precio asociado. En esta sección usaremos
el API endpoint [CREATE product](#) para crear un producto con su precio al
mismo tiempo.

Necesitarás el ID del precio para crear tus checkouts, así que asegúrate de
guardar el ID retornado en tu base de datos.

Ejemplo en código:

```shell
curl -X POST "https://app.recurrente.com/api/products" \
  -H 'X-PUBLIC-KEY: pk_live_XXXX' \
  -H 'X-SECRET-KEY: sk_live_XXXX' \
  -H 'Content-type: application/json' \
  -d '{"product": { "name": "Mi Producto Ejemplo", "prices_attributes": [{ "amount_as_decimal": "5.99", "currency": "GTQ", "charge_type": "one_time" }] }}'
```

```shell
# respuesta ejemplo
{
  "id": "pr_y281yvq1",
  "name": "Mi Producto Ejemplo",
  ...
  "prices": [
    {
      "id": "pr_szsupmle",
      "amount_in_cents": 599,
      "currency": "GTQ",
      "charge_type": "one_time",
      ...
    }
  ],
  "storefront_link": "https://app.recurrente.com/s/tu-tienda/mi-producto-ejemplo"
}
```

### Crear un checkout

Ahora vamos a crear un checkout para enviar un link de pago a tu cliente.
Tenemos dos formas de hacerlo:

#### Simple: Usando un Storefront Link

Habrás observado que cuando creas un producto, te generamos un
`storefront_link`. Al visitar ese link en un navegador, automáticamente se
generará un checkout nuevo para ese producto y te redireccionaremos a él.

```shell
curl https://app.recurrente.com/s/tu-tienda/mi-producto-ejemplo
<html><body>You are being <a href="http://app.recurrente.com/c/ch_<id_de_tu_checkout>">redirected</a>.</body></html>
```

En otras palabras, ya funciona! Puedes enviar ese storefront link a tus
clientes y empezar a recibir pagos.

¿Necesitas más customización? Sigue leyendo...

#### Avanzada: Crea tu propio checkout

Si necesitas crear un checkout customizado (por ejemplo, para atarlo a un `user` en particular), puedes usar el endpoint [CREATE checkout](#). Acepta un `items[price_id]`, que es el `id` del precio retornado de la sección anterior. Además, acepta el siguiente campo (como parte del json body):

- `items[userId]`: opcional ID de un `user`. Esto es útil cuando tienes un usuario que ha iniciado sesión en tu plataforma y quieres atar el checkout a ese usuario en particular. Esto prellenará la información del usuario en la página del `checkout`.

Por ejemplo:

```shell
curl -X POST "https://app.recurrente.com/api/checkouts" \
  -H 'X-PUBLIC-KEY: pk_live_XXXX' \
  -H 'X-SECRET-KEY: sk_live_XXXX' \
  -H 'Content-type: application/json' \
  -d '{ "items": [{ "price_id": "<priceId>", "user_id": "<userId>" }] }'
```

:::tip
Para obtener un `userId` debes crear un usuario con el endpoint [CREATE user](#)

```shell
curl -X POST "https://app.recurrente.com/api/users" \
  -H 'X-PUBLIC-KEY: pk_live_FXnlKW4kTW853tIkvapsIegIPLNMd5zhtiQzq7Kjy3z4x0qnOOQzHDLM1' \
  -H 'X-SECRET-KEY: sk_live_3kLfQRJVsAPzsigh2gKTkj8CNIfHRDHm9yCRJtNwZ1uR63mYuuEmdgWtD' \
  -H 'Content-Type: application/json' \
  -d '{ "email": "test@ejemplo.com", "full_name": "Usuario Ejemplo" }'

# respuesta
{"email": "test@ejemplo.com", "id": "us_ag9bvyzs"}
```
:::

Otro ejemplo, creando el producto en una misma llamada API:

```shell
curl -X POST "https://app.recurrente.com/api/checkouts" \
  -H 'X-PUBLIC-KEY: pk_live_XXXX' \
  -H 'X-SECRET-KEY: sk_live_XXXX' \
  -H 'Content-type: application/json' \
  -d '{ "items": [{ "name": "Otro Ejemplo", "currency": "GTQ", "amount_in_cents": 999, "images": ["https://source.unsplash.com/400x400/?sample"], "quantity": 1 }] }'
```


Todas las llamadas anteriores responden de la siguiente manera:

```shell
# respuesta ejemplo
{"checkout_url": "http://app.recurrente.com/c/ch_<id_del_checkout>"}
```

## Conclusión

¡Eso es todo! Solo hay tres llamadas a la API que usarás continuamente. Crear productos, crear checkouts y, en casos avanzados, crear usuarios. Todos están documentados aquí.
