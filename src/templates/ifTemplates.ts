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
      .replace(`if {{expr}} : \n${getIndentCharacters()}\${0}\n`, position, true)
      .build()
  }
}

export class IfIsNoneTemplate extends BaseExpressionTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('ifin', code)
      .description(`if expr is None:`)
      .replace(`if {{expr}} is None: \n${getIndentCharacters()}\${0}\n`, position, true)
      .build()
  }
}

export class IfIsNotNoneTemplate extends BaseExpressionTemplate {
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('ifnn', code)
      .description(`if expr is not None:`)
      .replace(`if {{expr}} is not None: \n${getIndentCharacters()}\${0}\n`, position, true)
      .build()
  }
}

export class IfElseTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('if else', code)
      .description('if expr: ... else: ...')
      .replace(`if {{expr}} : \n${getIndentCharacters()}\${0}\nelse: \n${getIndentCharacters()}\n`, position, true)
      .build()
  }
}

export class IfElifTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create('if elif', code)
      .description('if expr: ... elif: ...')
      .replace(`if {{expr}} : \n${getIndentCharacters()}\${0}\nelif: \n${getIndentCharacters()}\n`, position, true)
      .build()
  }
}


export const build = () => [
  new IfTemplate(),
  new IfElseTemplate(),
  new IfElifTemplate(),
  new IfIsNoneTemplate(),
  new IfIsNotNoneTemplate(),
]
