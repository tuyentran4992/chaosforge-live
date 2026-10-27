const STUDIO_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

export function validStudioId(studio) {
  return typeof studio === 'string' && STUDIO_ID.test(studio);
}

export function makeObsUrl(base, studio) {
  if (!validStudioId(studio)) throw new TypeError('Invalid Studio ID');
  const url = new URL('overlay.html', base);
  url.searchParams.set('studio', studio);
  return url;
}
