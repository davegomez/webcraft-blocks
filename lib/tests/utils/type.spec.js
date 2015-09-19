/* eslint-disable */
// jscs: disable

import { expect } from 'chai';
import * as type from '../../src/utils/type';

describe('type', () => {
  it('should have constants as types', () => {
    expect(type.FUNCTION).to.equal('function');
    expect(type.NUMBER).to.equal('number');
    expect(type.OBJECT).to.equal('object');
    expect(type.STRING).to.equal('string');
    expect(type.UNDEF).to.equal('undefined');
  });

  it('should return true if the element is a function', () => {
    const { isFunction } = type;
    expect(isFunction(() => {})).to.equal(true);
    expect(isFunction(1)).to.not.equal(true);
    expect(isFunction('hello')).to.not.equal(true);
    expect(isFunction({})).to.not.equal(true);
  });

  it('should return true if the element is a number', () => {
    const { isNumber } = type;
    expect(isNumber(1)).to.equal(true);
    expect(isNumber(1.3)).to.equal(true);
    expect(isNumber('star')).to.not.equal(true);
    expect(isNumber({})).to.not.equal(true);
  });

  it('should return true if the element is a object', () => {
    const { isObject } = type;
    expect(isObject({})).to.equal(true);
    expect(isObject(null)).to.equal(true);
    expect(isObject(function(){})).to.equal(true);
    expect(isObject('star')).to.not.equal(true);
    expect(isObject(4)).to.not.equal(true);
  });

  it('should return true if the element is a string', () => {
    const { isString } = type;
    expect(isString('hello')).to.equal(true);
    expect(isString(1.3)).to.not.equal(true);
    expect(isString(function() {})).to.not.equal(true);
    expect(isString({})).to.not.equal(true);
  });
});
