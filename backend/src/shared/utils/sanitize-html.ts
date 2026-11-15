import sanitizeHtml from 'sanitize-html';

/**
 * Allow-list for blog content produced by the admin editor. Anything else (scripts, iframes,
 * inline styles, event handlers, javascript: URLs) is removed before it reaches the database.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br', 'hr', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'mark',
    'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['https'] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href ?? '';
      const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?stemmantra\.com/i.test(href);
      return {
        tagName,
        attribs: external
          ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' }
          : { href, ...(attribs.title ? { title: attribs.title } : {}) },
      };
    },
    img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy' } }),
    b: 'strong',
    i: 'em',
  },
  // Relative /media/... image URLs are ours; absolute https images are allowed too.
  exclusiveFilter: (frame) => frame.tag === 'img' && !/^(\/media\/|\/images\/|https:\/\/)/.test(frame.attribs.src ?? ''),
};

export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS).trim();
}

export function htmlToText(html: string): string {
  // Keep words from adjacent blocks apart ("<h2>Intro</h2><p>Atal" -> "Intro Atal").
  const spaced = html.replace(/<\/(p|h[1-6]|li|blockquote|figcaption|td|th|pre)>|<br\s*\/?>/gi, ' ');
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readingMinutes(html: string): number {
  const words = htmlToText(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
