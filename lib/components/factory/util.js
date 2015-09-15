import { T_FUNCTION } from './constant';

export function isFunction(v) {
  return typeof v === T_FUNCTION || false; // avoid IE problems
}
