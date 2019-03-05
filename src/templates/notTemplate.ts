import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'

export class NotTemplate extends BaseExpressionTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`not`, code)
      .description(`not expr`)
      .replace(`not \${1:{{expr}}} `, position, true)
      .build()
  }
}

export class IsNoneTemplate extends BaseExpressionTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`isnone`, code)
      .description(`expr is None`)
      .replace(`\${1:{{expr}}} is None`, position, true)
      .build()
  }
}

export class IsNotNoneTemplate extends BaseExpressionTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`isnotnone`, code)
      .description(`expr is not None`)
      .replace(`\${1:{{expr}}} is not None`, position, true)
      .build()
  }
}

export const build = () => [
  new NotTemplate(),
  new IsNoneTemplate(),
  new IsNotNoneTemplate(),
]
