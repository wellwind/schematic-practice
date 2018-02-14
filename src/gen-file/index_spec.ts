import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('schematic-practice', () => {
  it('should create default file named with hello', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('schematic-practice', {}, Tree.empty());
    expect(tree.files[0]).toEqual('/hello');
  });

  it('should create default file named with the options', () => {
    const name = 'test';
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('schematic-practice', { name: name }, Tree.empty());
    expect(tree.files[0]).toEqual(`/${name}`);
  });
});
