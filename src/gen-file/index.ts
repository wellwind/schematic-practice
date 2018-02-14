import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function genFile(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create(options.name || 'hello', 'world');
    return tree;
  };
}

const licenseText = `
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
`;

export function license(options: any): Rule {
  return chain([
    // 把多個rule串成一個
    // rule1: from external => collection: @schematics/angular, rule name: component
    // important: 不要直接呼叫其他的schematic方法, 而使用externalSchematic() or schematic()
    externalSchematic('@schematics/angular', 'component', options),
    // customize rule
    (tree: Tree, _context: SchematicContext) => {
      tree.getDir(options.sourceDir).visit(filePath => {
        if (!filePath.endsWith('.ts')) {
          return;
        }
        const content = tree.read(filePath);
        if (!content) {
          return;
        }

        // Prevent from writing license to files that already have one.
        if (content.indexOf(licenseText) == -1) {
          tree.overwrite(filePath, licenseText + content);
        }
      });
      return tree;
    }
  ]);
}
