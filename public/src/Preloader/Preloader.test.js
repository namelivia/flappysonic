import Preloader, { SpriteSheetData, HurtSpriteSheetData} from './Sonic'
import {
	LoadQueue,
	Sound
} from 'createjs'

beforeEach(() => {
  jest.clearAllMocks();
});

test('test getting the loading queue progress', () => {
  const preloader = new Preloader(() => {}, () => {})
  expect(preloader.getProgress()).toBe(20)
});

test('test getting a resource from the queue', () => {
  const preloader = new Preloader(() => {}, () => {})
  expect(preloader.getResource()).toBe(20)
});

test('test loading data from the manifest', () => {
  const preloader = new Preloader(() => {}, () => {})
  expect(preloader.getResource()).toBe(20)
});
