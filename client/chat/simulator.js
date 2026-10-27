const messages = [
  '!forge Exploding rubber ducks on LUL', '!forge Floating stars', '!forge Shield boss',
  '1 1 1 vote 1!', 'PogChamp', '!boost', 'That boss is wild LUL', '2', '!shield', 'Vote 3!',
];

export function simulateCrowd(onLine) {
  let count = 0;
  const timer = setInterval(() => {
    const text = messages[count % messages.length];
    onLine(`viewer_${count + 1}`, text);
    count += 1;
    if (count >= 500) clearInterval(timer);
  }, 80);
  return () => clearInterval(timer);
}
