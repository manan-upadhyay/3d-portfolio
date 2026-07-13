import { useEffect } from 'react';

const SITE_URL = 'https://www.upadhyaymanan.in';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Update the single head tag identified by `key` in place (index.html seeds one
 * of each), creating it only if absent. Updating in place — rather than
 * appending — is the whole point: react-helmet-style appending would leave the
 * static homepage canonical/description alongside the route's, and two
 * conflicting canonicals read worse to Google than none.
 */
const upsert = (kind, keyAttr, key, valueAttr, value) => {
  let el = document.head.querySelector(`${kind}[${keyAttr}="${key}"]`);
  if (!el) {
    el = document.createElement(kind);
    el.setAttribute(keyAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
};

/**
 * Per-route SEO head.
 *
 * SEO metadata is intentionally NOT voiced (i18n) — the deliberate exception to
 * the "all copy lives in the bundles" rule. Crawlers index whatever voice
 * happens to be active at fetch time, so canonical title/description must be
 * stable English; voicing them would let an easter-egg voice leak into search
 * results.
 *
 * The homepage's authoritative head (title / OG / JSON-LD) is baked into
 * index.html so it's present on the crawler's first, pre-JS pass and for social
 * scrapers that don't run JS. This component rewrites those same nodes per route
 * on client render (Googlebot renders JS), chiefly so the coda pages
 * (/making-of, /time-machine) carry their own title + canonical and are indexed
 * as distinct pages rather than homepage duplicates. Chronicle re-asserts the
 * homepage values so SPA navigation back to `/` restores them.
 */
const Seo = ({ title, description, path = '/', image = OG_IMAGE, noindex = false }) => {
  const url = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = title;
    upsert('meta', 'name', 'title', 'content', title);
    upsert('meta', 'name', 'description', 'content', description);
    upsert('link', 'rel', 'canonical', 'href', url);
    upsert('meta', 'name', 'robots', 'content', noindex ? 'noindex, follow' : 'index, follow');

    upsert('meta', 'property', 'og:url', 'content', url);
    upsert('meta', 'property', 'og:title', 'content', title);
    upsert('meta', 'property', 'og:description', 'content', description);
    upsert('meta', 'property', 'og:image', 'content', image);

    upsert('meta', 'name', 'twitter:url', 'content', url);
    upsert('meta', 'name', 'twitter:title', 'content', title);
    upsert('meta', 'name', 'twitter:description', 'content', description);
    upsert('meta', 'name', 'twitter:image', 'content', image);
  }, [title, description, url, image, noindex]);

  return null;
};

export default Seo;
