/* eslint-disable */
// jscs: disable

import { expect } from 'chai';
import sinon from 'sinon';
import observable from '../../src/factory/observable';

const { spy } = sinon;

const assertSpiesCalled = (times, ...spies) => {
  spies.forEach((spy) => sinon.assert.callCount(spy, times));
};

describe('observable', () => {
  let obj, spies;

  beforeEach(() => {
    obj = observable();
    spies = Array.from(new Array(5)).map(() => spy());
  });

  describe('on and emit events', () => {
    it('should have the properties on, off, and emit', () => {
      expect(obj).to.have.property('on');
      expect(obj).to.have.property('off');
      expect(obj).to.have.property('emit');
    });

    it('should return the same object after each method call', () => {
      expect(obj)
        .to.equal(obj.on('test'))
        .to.equal(obj.off('test'))
        .to.equal(obj.emit('test'));
    });

    it('should invoke the handler attached to the emitted event', () => {
      const [spy1] = spies;
      obj.on('foo', spy1).emit('foo');
      sinon.assert.calledOnce(spy1);
    });

    it('should invoke multiple handlers with single event', () => {
      const [spy1, spy2, spy3] = spies;

      obj
        .on('foo', spy1, spy2)
        .on('bar', spy3)
        .emit('foo');

      assertSpiesCalled(1, spy1, spy2);
      sinon.assert.notCalled(spy3);
    });

    it('should invoke multiple handlers with multiple events', () => {
      const [spy1, spy2, spy3] = spies;

      obj
        .on('foo   bar', spy1, spy2, spy3)
        .emit('foo')
        .emit('bar');

      assertSpiesCalled(2, spy1, spy2, spy3);
    });

    it('should invoke multiple handlers with multiple and single events', () => {
      const [spy1, spy2, spy3, spy4] = spies;

      obj
        .on('foo bar', spy1, spy2)
        .on('bar  baz', spy3)
        .on(' zap ', spy1, spy4, spy2)
        .emit('foo')
        .emit('bar')
        .emit('baz')
        .emit('zap');

      assertSpiesCalled(3, spy1, spy2);
      sinon.assert.calledTwice(spy3);
      sinon.assert.calledOnce(spy4);
    });

    it('should invoke single handler with argument', () => {
      const [spy] = spies;
      obj.on('foo', spy).emit('foo', 'bar');
      sinon.assert.calledWith(spy, 'bar');
    });

    it('should invoke single handler with multiple arguments', () => {
      const spy = sinon.spy();
      obj.on('foo', spy).emit('foo', 'bar', 'baz');
      sinon.assert.calledWith(spy, 'bar', 'baz');
    });

    it('should invoke multiple handlers with multiple arguments', () => {
      const [spy1, spy2] = spies;
      obj.on('foo', spy1, spy2).emit('foo', 'bar', 'baz');
      sinon.assert.calledWith(spy1, 'bar', 'baz');
      sinon.assert.calledWith(spy2, 'bar', 'baz');
    });

    it('should invoke multiple handlers with multiple events and arguments', () => {
      const [spy1, spy2, spy3, spy4] = spies;

      obj
        .on('foo', spy1, spy2)
        .on('bar', spy2, spy4)
        .on('baz zap', spy1, spy3)
        .emit('foo', 'arg1', 'arg2', 'arg7')
        .emit('bar', 'arg1', 'arg3')
        .emit('baz', 'arg4', 'arg5', 'arg6')
        .emit('zap', 'arg2', 'arg3');

      sinon.assert.calledWith(spy1, 'arg1', 'arg2', 'arg7');
      sinon.assert.calledWith(spy1, 'arg4', 'arg5', 'arg6');
      sinon.assert.calledWith(spy1, 'arg2', 'arg3');
      sinon.assert.calledWith(spy2, 'arg1', 'arg2', 'arg7');
      sinon.assert.calledWith(spy2, 'arg1', 'arg3');
      sinon.assert.calledWith(spy3, 'arg4', 'arg5', 'arg6');
      sinon.assert.calledWith(spy3, 'arg2', 'arg3');
      sinon.assert.calledWith(spy4, 'arg1', 'arg3');
    });
  });

  describe('off and emit', () => {
    it('should detach single handler for single event', () => {
      const [spy] = spies;

      obj.on('foo', spy).emit('foo');
      sinon.assert.calledOnce(spy);

      obj.off('foo', spy).emit('foo');
      sinon.assert.callCount(spy, 1);
    });

    it('should detach multiple handlers for single event', () => {
      const localSpies = spies.slice(0, 3);
      const [spy1, spy2, spy3] = localSpies;

      obj
        .on('foo', spy1, spy2, spy3)
        .emit('foo');

      assertSpiesCalled(1, ...localSpies);

      obj.off('foo', spy1).emit('foo');

      sinon.assert.callCount(spy1, 1);
      assertSpiesCalled(2, spy2, spy3);

      obj.off('foo', spy2).emit('foo');

      sinon.assert.callCount(spy1, 1);
      sinon.assert.callCount(spy2, 2);
      sinon.assert.callCount(spy3, 3);

      obj.off('foo', spy3).emit('foo');

      sinon.assert.callCount(spy1, 1);
      sinon.assert.callCount(spy2, 2);
      sinon.assert.callCount(spy3, 3);
    });

    it('should detach single handler for multiple events', () => {
      const [spy1, spy2, spy3] = spies;

      obj
        .on('foo', spy1, spy2)
        .on('bar', spy1, spy3)
        .emit('foo')
        .emit('bar');

      sinon.assert.callCount(spy1, 2);
      assertSpiesCalled(1, spy2, spy3);

      obj
        .off(' foo bar', spy2)
        .emit('foo')
        .emit('bar');

      sinon.assert.callCount(spy1, 4);
      sinon.assert.callCount(spy2, 1);
      sinon.assert.callCount(spy3, 2);
    });

    it('should detach multiple handlers for multiple events', () => {
      const [spy1, spy2, spy3, spy4] = spies;

      obj
        .on('foo', spy1, spy2, spy4)
        .on('bar', spy1, spy3)
        .emit('foo')
        .emit('bar');

      sinon.assert.callCount(spy1, 2);
      assertSpiesCalled(1, spy2, spy3, spy4);

      obj
        .off(' foo bar', spy2, spy4)
        .emit('foo')
        .emit('bar');

      assertSpiesCalled(1, spy2, spy4);
      sinon.assert.callCount(spy1, 4);
      sinon.assert.callCount(spy3, 2);
    });

    it('should detach all handlers for a single event', () => {
      const [spy1, spy2] = spies;

      obj.on('foo', spy1, spy2).emit('foo');
      sinon.assert.calledOnce(...[spy1, spy2]);

      obj.off('foo').emit('foo');
      assertSpiesCalled(1, spy1, spy2);
    });

    it('should detach all handlers for multiple events', () => {
      const [spy1, spy2, spy3] = spies;

      obj
        .on('foo', spy1, spy2)
        .on('bar', spy1, spy3)
        .emit('foo')
        .emit('bar');

      sinon.assert.callCount(spy1, 2);
      assertSpiesCalled(1, spy2, spy3);

      obj
        .off(' foo bar')
        .emit('foo')
        .emit('bar');

      sinon.assert.callCount(spy1, 2);
      assertSpiesCalled(1, spy2, spy3);
    });
  });
});
