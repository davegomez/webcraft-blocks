/* eslint-disable */

import { expect } from 'chai';
import sinon from 'sinon';
import observable from '../../src/factory/observable';

describe('observable', () => {
  const obj = observable();

  it('should have the properties', () => {
    expect(obj).to.have.property('on');
    expect(obj).to.have.property('off');
    expect(obj).to.have.property('trigger');
  });

  it('should invoke the callback', () => {
    const spy1 = sinon.spy();

    obj.on('foo', spy1);
    obj.trigger('foo');

    sinon.assert.calledOnce(spy1);
    spy1.called.should.equal.true;
  });

  xit('should invoke multiple callbacks on single event', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    obj.on('foo', spy1, spy2);
    obj.on('bar', spy3);
    obj.trigger('foo');

    sinon.assert.calledOnce(...[spy1, spy2]);

    spy1.called.should.equal.true;
    spy2.called.should.equal.true;
    spy3.called.should.equal.false;
  });

  it('should invoke multiple callbacks on multiple events', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    obj.on('foo  bar', spy1, spy2, spy3);
    obj.trigger('bar');

    sinon.assert.calledOnce(...[spy1, spy2, spy3]);

    spy1.called.should.equal.true;
    spy2.called.should.equal.true;
    spy3.called.should.equal.true;
  });

  //it('should invoke multiple callbacks on multiple events with additional spaces', () => {
  //});
  //
  //it('should invoke single callback on multiple events', () => {
  //});
  //
  //it('should invoke single callback on multiple events with additional spaces', () => {
  //});
  //
  //it('should invoke single callback on single event with unknown events', () => {
  //});
  //
  //it('should invoke single callback on multiple events with unknown events', () => {
  //});
  //
  //it('should invoke multiple callbacks on multiple events with unknown events', () => {
  //});
});
