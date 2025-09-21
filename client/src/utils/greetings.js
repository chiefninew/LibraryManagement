import greetings from './greetings.json';

export function getGreeting() {
  const now = new Date();
  const dateString = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const monthName = now.toLocaleString('en-US', { month: 'long' });
  const messages = greetings[monthName] || [];

  if (messages.length === 0) {
    return `On ${dateString}, may your reading be blessed!`;
  }

  // Pick random greeting
  const randomIndex = Math.floor(Math.random() * messages.length);
  let message = messages[randomIndex];

  // Ensure first letter is capitalized
  message = message.charAt(0).toUpperCase() + message.slice(1);
  return message;
}
