let accessToken = '';

export async function requestCompile(prompt) {
  async function send() {
    const headers = { 'Content-Type': 'application/json' };
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    return fetch('/api/compile', { method: 'POST', headers, body: JSON.stringify({ prompt }) });
  }
  let response = await send();
  if (response.status === 401) {
    accessToken = window.prompt('Enter the compiler access token:') || '';
    if (!accessToken) throw new Error('Authorization required');
    response = await send();
  }
  if (!response.ok) throw new Error(response.status === 429 ? 'Compiler rate limit reached' : 'Compiler unavailable');
  return response.json();
}
