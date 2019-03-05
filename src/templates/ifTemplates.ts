import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'
import { getIndentCharacters } from '../utils'

export class IfTemplate extends BaseExpressionTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('if', code)
      .description(`if expr:`)
      .replace(`if {{expr}}: \n${getIndentCharacters()}\${0}\n`, position, true)
      .build()
  }
}

export class IfElseTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('ifelse', code)
      .description('if expr: ... else: ...')
      .replace(`if {{expr}}: \n${getIndentCharacters()}\${0}\nelse: \n${getIndentCharacters()}\n`, position, true)
      .build()
  }
}

export class IfElifTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('ifelif', code)
      .description('if expr: ... elif: ...')
      .replace(`if {{expr}}: \n${getIndentCharacters()}\${0}\nelif: \n${getIndentCharacters()}\n`, position, true)
      .build()
  }
}

// export class ElseTemplate extends BaseExpressionTemplate {
//   buildCompletionItem (code: string, position: vsc.Position, node: ts.Node) {
//     let replacement = '{{expr}}'
//     if (node.parent.kind === ts.SyntaxKind.BinaryExpression) {
//       replacement = `(${replacement})`
//     }

//     return CompletionItemBuilder
//       .create('else', code)
//       .description(`if (!expr)`)
//       .replace(`if (!${replacement}) {\n${getIndentCharacters()}\${0}\n}`, position, true)
//       .build()
//   }
// }

// export class IfEqualityTemplate extends BaseExpressionTemplate {
//   constructor (private keyword: string, private operator: string, private operand: string) {
//     super()
//   }

//   buildCompletionItem (code: string, position: vsc.Position) {
//     return CompletionItemBuilder
//       .create(this.keyword, code)
//       .description(`if (expr ${this.operator} ${this.operand})`)
//       .replace(`if ({{expr}} ${this.operator} ${this.operand}) {\n${getIndentCharacters()}\${0}\n}`, position, true)
//       .build()
//   }
// }

export const build = () => [
  new IfTemplate(),
  new IfElseTemplate(),
  new IfElifTemplate(),
  // new ElseTemplate(),
  // new IfEqualityTemplate('null', '===', null),
  // new IfEqualityTemplate('notnull', '!==', null),
  // new IfEqualityTemplate('undefined', '===', undefined),
  // new IfEqualityTemplate('notundefined', '!==', undefined)
]
