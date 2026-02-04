# Support-Mail an alwaysdata

---

**Objet :** Problème d'accès HTTPS pour Googlebot - Site ID 989873

---

Bonjour,

Je vous contacte concernant un problème technique avec mon site hébergé chez alwaysdata. Google Search Console ne parvient pas à récupérer mon sitemap en HTTPS, alors que la version HTTP fonctionne parfaitement.

## Informations du compte

- **Site ID :** 989873
- **Domaine :** copilotenschule.de / www.copilotenschule.de
- **Type de site :** Fichiers statiques (Static files)
- **Registrar DNS :** IONOS (les enregistrements DNS pointent correctement vers alwaysdata)

## Configuration actuelle

- **WAF :** Désactivé (Profile = None)
- **SSL :** Force HTTPS activé
- **Idle timeout :** 1800 secondes
- **Trim path :** Désactivé

## Description du problème

Dans Google Search Console, j'ai soumis deux versions de mon sitemap :

| URL | Statut |
|-----|--------|
| `http://copilotenschule.de/sitemap.xml` | ✅ Succès (41 pages découvertes) |
| `https://copilotenschule.de/sitemap.xml` | ❌ Échec - "Erreur HTTP générale" |

Le message d'erreur exact dans Google Search Console est : **"Konnte nicht abgerufen werden"** (Impossible de récupérer) avec comme raison **"Allgemeiner HTTP-Fehler"** (Erreur HTTP générale).

## Ce que j'ai vérifié

1. Le sitemap est accessible dans mon navigateur via HTTPS : https://copilotenschule.de/sitemap.xml ✓
2. Le WAF est désactivé, donc il ne devrait pas bloquer Googlebot ✓
3. Le certificat SSL est valide ✓
4. La redirection HTTP → HTTPS fonctionne correctement ✓

## Ma question

Pourriez-vous vérifier dans les logs d'accès HTTP de mon site (ID 989873) si vous voyez des requêtes de Googlebot (User-Agent contenant "Googlebot") vers `/sitemap.xml` en HTTPS, et quelle réponse HTTP le serveur renvoie ?

Je soupçonne qu'il pourrait y avoir :
- Un problème de handshake TLS/SSL avec le crawler de Google
- Une limitation de débit (rate limiting) qui affecte uniquement les requêtes HTTPS
- Un problème de configuration côté serveur que je ne peux pas voir depuis mon interface d'administration

Merci d'avance pour votre aide. N'hésitez pas à me contacter si vous avez besoin d'informations supplémentaires.

Cordialement,
Martin
martin@yellow-boat.com

---
