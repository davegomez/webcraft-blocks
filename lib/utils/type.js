/**
 * Type constants intended to be use on comparisons
 */
export const FUNCTION = 'function';
export const NUMBER = 'number';
export const OBJECT = 'object';
export const STRING = 'string';
export const UNDEF = 'undefined';

/** Type helpers to check when a object complies a certain type */

/**
 * Checks if the passed value is a function
 * @param val Primitive JavaScript value
 * @returns {boolean} Returns true if the value is a function
 */
export function isFunction(val) {
  return typeof val === FUNCTION || false;
}

/**
 * Checks if the passed value is a number
 * @param val Primitive JavaScript value
 * @returns {boolean} Returns true if the value is a number
 */
export function isNumber(val) {
  return typeof val === NUMBER || false;
}

/**
 * Checks if the passed value is an object
 * @param val Primitive JavaScript value
 * @returns {boolean} Returns true if the value is an object
 */
export function isObject(val) {
  return val instanceof Object;
}

/**
 * Checks if the passed value is a string
 * @param val Primitive JavaScript value
 * @returns {boolean} Returns true if the value is a string
 */
export function isString(val) {
  return typeof val === STRING || false;
}
