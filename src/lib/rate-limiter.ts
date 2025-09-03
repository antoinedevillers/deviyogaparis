// Simple rate limiter en mémoire
const requests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(ip: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = ip;
  
  // Nettoyer les entrées expirées
  if (requests.has(key)) {
    const record = requests.get(key)!;
    if (now > record.resetTime) {
      requests.delete(key);
    }
  }
  
  // Vérifier/créer l'entrée
  if (!requests.has(key)) {
    requests.set(key, { count: 1, resetTime: now + windowMs });
    return true; // Première requête autorisée
  }
  
  const record = requests.get(key)!;
  
  if (record.count >= maxRequests) {
    return false; // Rate limit dépassé
  }
  
  record.count++;
  return true;
}