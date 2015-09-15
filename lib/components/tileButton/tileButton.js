import './tileButton.scss';
import Component from '../factory/component';

const tileButton = Component();

export default function(config) {
  return Object.create(tileButton);
}
