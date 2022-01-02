// this can be implement with logger service later
export const log = (log: string) => {
  console.log(log);
}

export const warn = (log: string) => {
  console.warn(log);
}

export const error = (log: string) => {
  console.error(log);
}
export default {
  log,
  warn,
  error,
}