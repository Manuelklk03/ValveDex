# Despliegue de ValveDex: staging y producción

**Para qué sirve este archivo:** explica cómo se despliega ValveDex y qué tiene que configurar Manuel (una sola vez) en Render y en GitHub. El código ya está hecho: lo que falta son los **secretos y las variables**, que nunca van en el repositorio ni en el chat.

## Cómo funciona

```text
PR revisada → merge en main → imagen «latest» en Docker Hub → Render redespliega STAGING → el pipeline comprueba que responde
tag vX.Y.Z (sobre main) → imagen «X.Y.Z» en Docker Hub → aprobación manual en GitHub → Render despliega esa versión en PRODUCCIÓN → comprobación
```

- **Staging** se actualiza solo con cada cambio que llega a `main`: sirve para validar la versión candidata antes de publicarla.
- **Producción** solo cambia cuando se crea un **tag de versión** y Manuel **aprueba** el despliegue en GitHub. Despliega la imagen de esa versión concreta, no la última de `main`.
- Los trabajos están en `.github/workflows/docker-publish.yml` (`staging` y `produccion`, que dependen de `publicar`). Están apagados hasta que actives la variable `DEPLOY_ENABLED` (ver el paso 3b).

## 1. Render (dos servicios)

Crea una cuenta en [render.com](https://render.com) y, para cada entorno, **New → Web Service → Existing image**:

| Dato                | Staging                                  | Producción                                                                                   |
| ------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Nombre              | `valvedex-staging`                       | `valvedex`                                                                                   |
| Imagen              | `docker.io/<tu-usuario>/valvedex:latest` | `docker.io/<tu-usuario>/valvedex:0.3.0` (la versión actual; después la cambia el despliegue) |
| Variable de entorno | `PORT` = `3000`                          | `PORT` = `3000`                                                                              |
| Health Check Path   | `/`                                      | `/`                                                                                          |
| Plan                | Free                                     | Free (se duerme tras 15 minutos sin visitas; el primer acceso tarda unos 30–60 s)            |

- El repositorio de Docker Hub tiene que ser **público** para que Render descargue la imagen sin credenciales (o añades las credenciales de Docker Hub en Render, en «Registry Credentials»).
- En cada servicio, **Settings → Deploy Hook**: copia la URL. Es secreta: equivale a una contraseña de despliegue.

## 2. GitHub (entornos, secretos y variables)

En el repositorio: **Settings → Environments → New environment**.

| Entorno      | Secreto `RENDER_DEPLOY_HOOK`      | Variable (no secreta)                                   | Protección                                                      |
| ------------ | --------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| `staging`    | Deploy Hook de `valvedex-staging` | `STAGING_URL` = `https://valvedex-staging.onrender.com` | Ninguna                                                         |
| `production` | Deploy Hook de `valvedex`         | `PRODUCTION_URL` = `https://valvedex.onrender.com`      | **Required reviewers**: añádete tú para aprobar cada despliegue |

Las URLs exactas las muestra Render al crear cada servicio. `DOCKERHUB_USERNAME` y `DOCKERHUB_TOKEN` ya existen como secretos del repositorio.

## 3. Comprobarlo

1. **Staging:** fusiona cualquier PR en `main`. En la pestaña Actions, el trabajo «Desplegar en staging (Render)» debe pasar y abrir la URL de staging.
2. **Producción:** cuando haya una versión (ver [STATUS.md](STATUS.md#versiones-del-proyecto)), crea el tag. El trabajo «Desplegar en producción» queda esperando tu aprobación; apruébalo en GitHub y comprueba que la URL responde.
3. **Vuelta atrás:** vuelve a desplegar una versión anterior en Render con «Manual Deploy → Deploy a specific image» (por ejemplo, `…/valvedex:0.2.0`).

## 3b. Activar los despliegues

Los trabajos de despliegue están apagados hasta que crees una **variable del repositorio** (Settings → Secrets and variables → Actions → Variables) llamada `DEPLOY_ENABLED` con el valor `true`. Hazlo cuando Render y los dos entornos estén configurados. Mientras no exista, los trabajos aparecen como «skipped» (no como un despliegue correcto que no ocurrió); una vez activada, si falta el secreto o la URL de un entorno, el trabajo falla.

Producción solo despliega tags con el formato `vX.Y.Z` (por ejemplo `v0.4.0`).

## Cómo se comprueba que la versión nueva está publicada

La web publica en `/version` el commit con el que se construyó su imagen (`COMMIT_SHA`, un argumento de Docker que pasa el workflow). Tras pedir el despliegue, el pipeline consulta `<URL>/version` cada 15 segundos (hasta 10 minutos) y solo da el trabajo por bueno cuando devuelve el commit que acaba de publicarse: un `200` en `/` también lo daría la versión anterior. Si se pidió el despliegue y falta `STAGING_URL` o `PRODUCTION_URL`, el trabajo falla, porque no puede comprobar nada.

## Límites conocidos

- El plan gratuito de Render duerme el servicio sin tráfico: la comprobación del pipeline espera hasta 10 minutos a que arranque.
- Sin dominio propio ni HTTPS personalizado: se usan las URLs `onrender.com`. Un dominio propio se configura después en Render.
- La imagen solo se construye para `amd64`, que es lo que usa Render.
