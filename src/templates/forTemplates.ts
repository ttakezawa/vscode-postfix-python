import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate, BaseTemplate } from './baseTemplates'
import { getIndentCharacters } from '../utils'

abstract class BaseForTemplate extends BaseTemplate {
  abstract buildCompletionItem (code: string, position: vsc.Position, node: ts.Node, suffix: string)

  canUse (node: ts.Node): boolean {
    return node.parent &&
      !this.inReturnStatement(node.parent) &&
      !this.inIfStatement(node.parent) &&
      (this.isExpression(node.parent) ||
        this.isCallExpression(node.parent) ||
        this.isArrayLiteral(node.parent))
  }

  protected isArrayLiteral = (node: ts.Node) => node.kind === ts.SyntaxKind.ArrayLiteralExpression
}

export class ForLoopTemplate extends BaseForTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('forloop', code)
      // .description('for (let i = 0; i < expr.Length; i++)')
      .description('for i in range(N):')
      // .replace(`for (let \${1:i} = 0; \${1} < \${2:{{expr}}}.length; \${1}++) {\n${getIndentCharacters()}\${0}\n}`, position, true)
      .replace(`for \${1:i} in range(\${2:{{expr}}}): \n${getIndentCharacters()}\${0}\n`, position, true)
      .build()
  }

  // canUse (node: ts.Node) {
  //   return super.canUse(node) && !this.isArrayLiteral(node.parent)
  // }
}

export class ForInTemplate extends BaseForTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('forin', code)
      // .description('for (let item of expr)')
      .description('for item in expr:')
      // .replace(`for (let \${1:item} of \${2:{{expr}}}) {\n${getIndentCharacters()}\${0}\n}`, position, true)
      .replace(`for \${1:item} in \${2:{{expr}}}: \n${getIndentCharacters()}\${0}\n`, position, true)
      .build()
  }
}

// export class ForEachTemplate extends BaseForTemplate {
//   buildCompletionItem (code: string, position: vsc.Position) {
//     return CompletionItemBuilder
//       .create('foreach', code)
//       .description('expr.forEach()')
//       .replace(`{{expr}}.forEach(\${1:item} => \${2})`, position, true)
//       .build()
//   }

//   canUse (node: ts.Node) {
//     return super.canUse(node)
//   }
// }

export const build = () => [
  new ForLoopTemplate(),
  new ForInTemplate(),
  // new ForEachTemplate()
]
