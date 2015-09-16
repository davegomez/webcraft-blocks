import { FUNCTION } from './constant';

export function isFunction(value) {
  return typeof value === FUNCTION || false; // avoid IE problems
}
