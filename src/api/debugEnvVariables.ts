export function debugEnvVariables() {
    console.log('Debug: Environment Variables');
    console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
    console.log('API_KEY:', process.env.API_KEY);
    console.log('NEXT_PUBLIC_API_URL (encoded):', encodeURIComponent(process.env.NEXT_PUBLIC_API_URL || ''));
    console.log('API_KEY (encoded):', encodeURIComponent(process.env.API_KEY || ''));
    
    // Verificar si hay espacios en blanco o caracteres invisibles
    console.log('NEXT_PUBLIC_API_URL (length):', (process.env.NEXT_PUBLIC_API_URL || '').length);
    console.log('API_KEY (length):', (process.env.API_KEY || '').length);
    
    // Mostrar los últimos 5 caracteres de cada variable
    console.log('NEXT_PUBLIC_API_URL (last 5 chars):', (process.env.NEXT_PUBLIC_API_URL || '').slice(-5));
    console.log('API_KEY (last 5 chars):', (process.env.API_KEY || '').slice(-5));
  }