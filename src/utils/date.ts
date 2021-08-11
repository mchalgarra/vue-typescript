/**
 * Gets an ISO string of the current date and time.
 *
 * @returns An ISO string of the current date and time.
 */
export const getNowISOString = (): string => {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR');
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const miliseconds = now.getMilliseconds().toString().padStart(3, '0');

  return `${year}-${month}-${day}T${time}.${miliseconds}Z`;
};
