/* eslint-disable */
// jscs: disable

import { expect } from 'chai';
import sinon from 'sinon';
import observable from '../../src/factory/observable';

describe('observable', () => {
  let obj = {};
      obj = observable();

  /**
   * Unit Tests for on() and emit() functions
   */

  it('should have the properties on, off, and emit', () => {
    expect(obj).to.have.property('on');
    expect(obj).to.have.property('off');
    expect(obj).to.have.property('emit');
  });

  it('should invoke the handler', () => {
    const spy1 = sinon.spy();

    obj.on('foo', spy1);
    obj.emit('foo');

    sinon.assert.calledOnce(spy1);
  });

  it('should invoke multiple handlers with single event', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    obj.on('foo', spy1, spy2);
    obj.on('bar', spy3);
    obj.emit('foo');

    sinon.assert.calledOnce(...[spy1, spy2]);
    sinon.assert.notCalled(spy3);
  });

  it('should invoke multiple handlers with multiple events', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    obj.on('foo   bar', spy1, spy2, spy3);
    obj.emit('foo');
    obj.emit('bar');

    sinon.assert.callCount(spy1, 2);
    sinon.assert.callCount(spy2, 2);
    sinon.assert.callCount(spy3, 2);
  });

  it('should invoke multiple handlers with multiple and single events', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();

    obj.on('foo bar', spy1, spy2);
    obj.on('bar  baz', spy3);
    obj.on(' zap ', spy1, spy4, spy2);
    obj.emit('foo');
    obj.emit('bar');
    obj.emit('baz');
    obj.emit('zap');

    sinon.assert.callCount(spy1, 3);
    sinon.assert.callCount(spy2, 3);
    sinon.assert.callCount(spy3, 2);
    sinon.assert.calledOnce(spy4);
  });

  it('should invoke single handler with argument', () => {
    const spy = sinon.spy();

    obj.on('foo', spy);
    obj.emit('foo', 'bar');

    sinon.assert.calledWith(spy, 'bar');
  });

  it('should invoke single handler with multiple arguments', () => {
    const spy = sinon.spy();

    obj.on('foo', spy);
    obj.emit('foo', 'bar', 'baz');

    sinon.assert.calledWith(spy, 'bar', 'baz');
  });

  it('should invoke multiple handlers with multiple arguments', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    obj.on('foo', spy1, spy2);
    obj.emit('foo', 'bar', 'baz');

    sinon.assert.calledWith(spy1, 'bar', 'baz');
    sinon.assert.calledWith(spy2, 'bar', 'baz');
  });

  it('should invoke multiple handlers with multiple events and arguments', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();

    obj.on('foo', spy1, spy2);
    obj.on('bar', spy2, spy4);
    obj.on('baz zap', spy1, spy3);
    obj.emit('foo', 'arg1', 'arg2', 'arg7');
    obj.emit('bar', 'arg1', 'arg3');
    obj.emit('baz', 'arg4', 'arg5', 'arg6');
    obj.emit('zap', 'arg2', 'arg3');

    sinon.assert.calledWith(spy1, 'arg1', 'arg2', 'arg7');
    sinon.assert.calledWith(spy1, 'arg4', 'arg5', 'arg6');
    sinon.assert.calledWith(spy1, 'arg2', 'arg3');
    sinon.assert.calledWith(spy2, 'arg1', 'arg2', 'arg7');
    sinon.assert.calledWith(spy2, 'arg1', 'arg3');
    sinon.assert.calledWith(spy3, 'arg4', 'arg5', 'arg6');
    sinon.assert.calledWith(spy3, 'arg2', 'arg3');
    sinon.assert.calledWith(spy4, 'arg1', 'arg3');
  });

  /**
   * Unit Tests for off() and emit() functions
   */

  it('should detach single handler for single event', () => {
    const spy = sinon.spy();

    obj.on('foo', spy);
    obj.emit('foo');

    sinon.assert.calledOnce(spy);

    obj.off('foo', spy);
    obj.emit('foo');

    sinon.assert.callCount(spy, 1);
  });

  it('should detach multiple handlers for single event', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    obj.on('foo', spy1, spy2, spy3);
    obj.emit('foo');

    sinon.assert.calledOnce(...[spy1, spy2, spy3]);

    obj.off('foo', spy1);
    obj.emit('foo');

    sinon.assert.callCount(spy1, 1);
    sinon.assert.callCount(spy2, 2);
    sinon.assert.callCount(spy3, 2);

    obj.off('foo', spy2);
    obj.emit('foo');

    sinon.assert.callCount(spy1, 1);
    sinon.assert.callCount(spy2, 2);
    sinon.assert.callCount(spy3, 3);

    obj.off('foo', spy3);
    obj.emit('foo');

    sinon.assert.callCount(spy1, 1);
    sinon.assert.callCount(spy2, 2);
    sinon.assert.callCount(spy3, 3);
  });

  it('should detach single handler for multiple events', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    obj.on('foo', spy1, spy2);
    obj.on('bar', spy1, spy3);
    obj.emit('foo');
    obj.emit('bar');

    sinon.assert.callCount(spy1, 2);
    sinon.assert.callCount(spy2, 1);
    sinon.assert.callCount(spy3, 1);

    obj.off(' foo bar', spy2);
    obj.emit('foo');
    obj.emit('bar');

    sinon.assert.callCount(spy1, 4);
    sinon.assert.callCount(spy2, 1);
    sinon.assert.callCount(spy3, 2);
  });

  it('should detach multiple handlers for multiple events', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();

    obj.on('foo', spy1, spy2, spy4);
    obj.on('bar', spy1, spy3);
    obj.emit('foo');
    obj.emit('bar');

    sinon.assert.callCount(spy1, 2);
    sinon.assert.callCount(spy2, 1);
    sinon.assert.callCount(spy3, 1);
    sinon.assert.callCount(spy4, 1);

    obj.off(' foo bar', spy2, spy4);
    obj.emit('foo');
    obj.emit('bar');

    sinon.assert.callCount(spy1, 4);
    sinon.assert.callCount(spy2, 1);
    sinon.assert.callCount(spy3, 2);
    sinon.assert.callCount(spy4, 1);
  });

  it('should detach all handlers for a single event', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    obj.on('foo', spy1, spy2);
    obj.emit('foo');

    sinon.assert.calledOnce(...[spy1, spy2]);

    obj.off('foo');
    obj.emit('foo');

    sinon.assert.callCount(spy1, 1);
    sinon.assert.callCount(spy2, 1);
  });

  it('should detach all handlers for multiple events', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    obj.on('foo', spy1, spy2);
    obj.on('bar', spy1, spy3);
    obj.emit('foo');
    obj.emit('bar');

    sinon.assert.callCount(spy1, 2);
    sinon.assert.callCount(spy2, 1);
    sinon.assert.callCount(spy3, 1);

    obj.off(' foo bar');
    obj.emit('foo');
    obj.emit('bar');

    sinon.assert.callCount(spy1, 2);
    sinon.assert.callCount(spy2, 1);
    sinon.assert.callCount(spy3, 1);
  });
});
