# Weather App

Una aplicación para consultar el clima utilizando Next.js, Tailwind CSS y una API externa.

## Descripción

Esta es una aplicación de clima construida con Next.js y Tailwind CSS. Utiliza una API externa para obtener información del clima y mostrarla de manera estilizada.

## Tecnologías Utilizadas

- **Next.js**: Framework para React que permite renderizado del lado del servidor y generación de sitios estáticos.
- **Tailwind CSS**: Framework de CSS para estilizar la aplicación.
- **API externa**: Fuente de datos del clima Weather API openweathermap.org

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/natanael-lima/weather-app.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd weather-app
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Configura tu archivo de variables de entorno (`.env.local`):

    ```plaintext
    NEXT_PUBLIC_API_KEY=tu_api_key_aqui
    ```

5. Ejecuta la aplicación:

    ```bash
    npm run dev
    ```

6. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en funcionamiento.

## Uso

- Ingresa el nombre de la ciudad en el campo de búsqueda para obtener la información del clima.
- La aplicación muestra la temperatura actual, la descripción del clima, la humedad y las previsiones diarias.

## Contribuciones

Si deseas contribuir a este proyecto, abre un **issue** o envía una **pull request** con tus mejoras o correcciones.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

