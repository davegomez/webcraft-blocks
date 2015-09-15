
'use strict';
import { type } from './constant';


export function isFunction(v) {
  return typeof v === type.T_FUNCTION || false; // avoid IE problems
}
